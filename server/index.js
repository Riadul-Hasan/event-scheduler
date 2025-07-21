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

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    // GET /events/upcoming - return 5 nearest upcoming events
    app.get("/events/upcoming", async (req, res) => {
      try {
        const eventsCollection = client
          .db("eventSchedulerDB")
          .collection("events");

        const currentDate = new Date().toISOString().split("T")[0]; // YYYY-MM-DD

        const upcomingEvents = await eventsCollection
          .find({ date: { $gte: currentDate }, archived: false })
          .sort({ date: 1, time: 1 })
          .limit(5)
          .toArray();

        res.status(200).json(upcomingEvents);
      } catch (error) {
        console.error("Error fetching upcoming events:", error);
        res.status(500).json({ message: "Server error while fetching events" });
      }
    });

    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Event Scheduler running");
});

app.listen(port, () => {
  console.log("Event scheduler running on port", port);
});
