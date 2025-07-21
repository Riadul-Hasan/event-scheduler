require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

const app = express();
const port = process.env.PORT || 3000;

// middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.nttz9vg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    await client.connect();
    console.log("✅ Successfully connected to MongoDB");

    const eventsCollection = client.db("eventSchedulerDB").collection("events");

    /**
     * GET /events/upcoming
     * Fetch 5 nearest upcoming events (sorted by date and time)
     */
    app.get("/events/upcoming", async (req, res) => {
      try {
        const currentDate = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
        const upcomingEvents = await eventsCollection
          .find({ date: { $gte: currentDate }, archived: { $ne: true } })
          .sort({ date: 1, time: 1 })
          .limit(5)
          .toArray();

        res.status(200).json(upcomingEvents);
      } catch (error) {
        console.error("❌ Error fetching upcoming events:", error);
        res.status(500).json({ message: "Server error while fetching events" });
      }
    });

    /**
     * POST /events
     * Add a new event with basic AI categorization
     */
    app.post("/events", async (req, res) => {
      try {
        const { title, date, time, notes } = req.body;

        // Validation: title, date, and time are required
        if (!title || !date || !time) {
          return res
            .status(400)
            .json({ message: "Title, date, and time are required." });
        }

        // Auto-category detection (cleaned and extendable)
        const text = `${title} ${notes || ""}`.toLowerCase();
        let category = "Other";

        if (
          /\\b(meeting|project|client|call|deadline|interview|report|presentation)\\b/.test(
            text
          )
        ) {
          category = "Work";
        } else if (
          /\\b(birthday|party|dinner|family|friend|vacation|outing)\\b/.test(
            text
          )
        ) {
          category = "Personal";
        }

        // Auto-archive check
        const eventDate = new Date(date);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const archived = eventDate < today;

        // Prepare event object
        const newEvent = {
          title,
          date,
          time,
          notes: notes || "",
          category,
          archived,
          createdAt: new Date(),
        };

        // Insert into MongoDB
        const result = await eventsCollection.insertOne(newEvent);

        // Return insertedId and assigned category for frontend display-only category population
        res.status(201).json({
          insertedId: result.insertedId,
          category,
          archived,
        });
      } catch (error) {
        console.error("❌ Error adding event:", error);
        res.status(500).json({ message: "Failed to add event." });
      }
    });

    app.delete("/events/:id", async (req, res) => {
      try {
        const { id } = req.params;
        const result = await eventsCollection.deleteOne({
          _id: new ObjectId(id),
        });

        if (result.deletedCount === 0) {
          return res.status(404).json({ message: "Event not found." });
        }

        res.status(200).json({ message: "Event deleted successfully." });
      } catch (error) {
        console.error("❌ Error deleting event:", error);
        res.status(500).json({ message: "Failed to delete event." });
      }
    });

    app.put("/events/:id", async (req, res) => {
      try {
        const { id } = req.params;

        const result = await eventsCollection.updateOne(
          { _id: new ObjectId(id) },
          { $set: { archived: true } }
        );

        if (result.matchedCount === 0) {
          return res.status(404).json({ message: "Event not found." });
        }

        res.status(200).json({ message: "Event marked as archived." });
      } catch (error) {
        console.error("❌ Error archiving event:", error);
        res.status(500).json({ message: "Failed to archive event." });
      }
    });

    app.put("/events/:id/unarchive", async (req, res) => {
      try {
        const { id } = req.params;

        const result = await eventsCollection.updateOne(
          { _id: new ObjectId(id) },
          { $set: { archived: false } }
        );

        if (result.matchedCount === 0) {
          return res.status(404).json({ message: "Event not found." });
        }

        res.status(200).json({ message: "Event unarchived successfully." });
      } catch (error) {
        console.error("❌ Error unarchiving event:", error);
        res.status(500).json({ message: "Failed to unarchive event." });
      }
    });

    /**
     * GET /events
     * Fetch all events sorted by date and time
     */
    app.get("/events", async (req, res) => {
      try {
        const events = await eventsCollection
          .find()
          .sort({ date: 1, time: 1 })
          .toArray();

        res.status(200).json(events);
      } catch (error) {
        console.error("❌ Error fetching all events:", error);
        res.status(500).json({ message: "Failed to fetch events." });
      }
    });
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
  }
}

run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("✅ Event Scheduler API is running.");
});

app.listen(port, () => {
  console.log(`🚀 Event Scheduler running on port ${port}`);
});
