import React, { useEffect, useState } from "react";
import { FiTag, FiTrash2, FiArchive } from "react-icons/fi";
import axios from "axios";

type Event = {
  id: string;
  title: string;
  date: string;
  time: string;
  notes?: string;
  category: "Work" | "Personal" | "Other";
  archived: boolean;
};

const categoryColors: Record<Event["category"], string> = {
  Work: "text-indigo-400",
  Personal: "text-pink-400",
  Other: "text-purple-400",
};

const categoryBg: Record<Event["category"], string> = {
  Work: "bg-indigo-900/20 border-indigo-700/30",
  Personal: "bg-pink-900/20 border-pink-700/30",
  Other: "bg-purple-900/20 border-purple-700/30",
};

const API_URL = import.meta.env.VITE_API_URL;

const AllEvents: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<"All" | Event["category"]>("All");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(`${API_URL}/events`);

        if (!Array.isArray(response.data)) {
          console.error("Invalid API response:", response.data);
          setError("Server returned invalid data.");
          return;
        }

        const mapped: Event[] = response.data.map((e: any) => ({
          id: e._id,
          title: e.title,
          date: e.date,
          time: e.time,
          notes: e.notes,
          category: e.category ?? "Other",
          archived: e.archived ?? false,
        }));

        mapped.sort((a, b) => {
          const dateTimeA = new Date(`${a.date}T${a.time}`).getTime();
          const dateTimeB = new Date(`${b.date}T${b.time}`).getTime();
          return dateTimeA - dateTimeB;
        });

        setEvents(mapped);
      } catch (err) {
        console.error(err);
        setError("Failed to load events.");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const deleteEvent = async (id: string) => {
    try {
      await axios.delete(`${API_URL}/events/${id}`);
      setEvents((prev) => prev.filter((event) => event.id !== id));
    } catch (err) {
      console.error(err);
      setError("Failed to delete event.");
    }
  };

  const archiveEvent = async (id: string) => {
    try {
      await axios.put(`${API_URL}/events/${id}`);
      setEvents((prev) =>
        prev.map((event) =>
          event.id === id ? { ...event, archived: true } : event
        )
      );
    } catch (err) {
      console.error(err);
      setError("Failed to archive event.");
    }
  };

  const filteredEvents = events.filter((event) => {
    if (filter !== "All" && event.category !== filter) return false;
    if (search.trim() !== "") {
      const combined = `${event.title} ${event.notes ?? ""}`.toLowerCase();
      return combined.includes(search.trim().toLowerCase());
    }
    return true;
  });

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4 text-white">All Events</h2>

      {/* Filter + Search */}
      <div className="flex flex-col sm:flex-row sm:justify-between gap-4 mb-4">
        <div className="flex gap-2">
          {["All", "Work", "Personal", "Other"].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat as any)}
              className={`px-3 py-1 rounded-full border ${
                filter === cat
                  ? "bg-slate-700 border-slate-500 text-white"
                  : "border-slate-700 text-slate-400"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        <input
          type="text"
          placeholder="Search events..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-3 py-2 rounded-md border border-slate-700 bg-slate-800 text-slate-200 placeholder-slate-400"
        />
      </div>

      {loading && <p className="text-slate-400">Loading events...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && filteredEvents.length === 0 && (
        <p className="text-slate-400">No events found.</p>
      )}

      <div className="space-y-4">
        {filteredEvents.map((event) => (
          <div
            key={event.id}
            className={`p-4 rounded-lg border ${categoryBg[event.category]} ${
              event.archived ? "opacity-50" : ""
            }`}
          >
            <div className="flex items-center mb-2">
              <FiTag className={`mr-2 ${categoryColors[event.category]}`} />
              <span className="text-sm text-slate-400">
                {event.category} {event.archived && "(Archived)"}
              </span>
            </div>
            <h3 className="text-lg font-semibold text-white">{event.title}</h3>
            <p className="text-slate-400">
              {event.date} at {event.time}
            </p>
            {event.notes && (
              <p className="text-slate-300 mt-1">{event.notes}</p>
            )}

            <div className="flex gap-3 mt-4">
              <button
                onClick={() => deleteEvent(event.id)}
                className="flex items-center text-red-400 hover:text-red-500"
              >
                <FiTrash2 className="mr-1" /> Delete
              </button>
              {!event.archived && (
                <button
                  onClick={() => archiveEvent(event.id)}
                  className="flex items-center text-slate-400 hover:text-slate-200"
                >
                  <FiArchive className="mr-1" /> Archive
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllEvents;
