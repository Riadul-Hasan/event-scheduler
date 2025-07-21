# Event Scheduler (EventAI) 🗓️✨

A **full-stack event management system** with **AI-powered categorization** and **archive functionality** to streamline personal and organizational event tracking.

Built with:
- **React (Vite)** frontend
- **Express & Node.js** backend
- **MongoDB** for data storage
- **AI categorization** to automatically group events by type, urgency, and category.

---

## 🚀 Features

✅ Create, edit, and delete events easily  
✅ AI-powered event categorization on creation  
✅ Archive past events for a clean dashboard  
✅ Responsive, clean UI for desktop & mobile  
✅ RESTful API for seamless frontend-backend communication

---

## 🖇️ Project Structure

```
event-scheduler/
├── client/                 # React frontend (PORT 5173)
│   ├── src/                # React application source
│   └── vite.config.ts      # Build configuration
│
├── server/                 # Express backend (PORT 3000)
│   ├── models/             # Mongoose schemas
│   └── routes/             # API endpoints
│
└── README.md               # Project documentation
```

---

## 🛠️ Getting Started

### Prerequisites

- Node.js v18+
- MongoDB Atlas account or local MongoDB
- Git

---

### 1️⃣ Clone and Setup

```bash
git clone https://github.com/yourusername/event-scheduler.git
cd event-scheduler
```

---

### 2️⃣ Install Dependencies

Install all dependencies for both the frontend and backend:

```bash
npm run setup
```

---

### 3️⃣ Environment Variables

Create a `.env` file in the `server/` directory with:

```
MONGODB_URI=<your_mongodb_connection_string>
PORT=3000
```

---

### 4️⃣ Running the Application

- **Start the backend**:

```bash
cd server
npm start
```

- **Start the frontend**:

```bash
cd client
npm run dev
```

- Visit: [http://localhost:5173](http://localhost:5173)

---

## 📡 API Endpoints

Base URL: `http://localhost:3000`

| Method | Endpoint                    | Purpose                                   |
| ------ | --------------------------- | ----------------------------------------- |
| GET    | `/api/events`               | Retrieve all events                       |
| POST   | `/api/events`               | Create a new event (AI categorization)    |
| PUT    | `/api/events/:id`           | Update an existing event                  |
| DELETE | `/api/events/:id`           | Delete an event                           |
| GET    | `/api/events/archive`       | Retrieve archived events                  |
| POST   | `/api/events/:id/archive`   | Archive a specific event                  |
| POST   | `/api/events/:id/unarchive` | Unarchive a specific event                |

---

## 🤖 AI Categorization

When a new event is created, **EventAI automatically categorizes the event based on its title and description** to improve organization, filtering, and personalized suggestions.

---

## 🪐 Contributing

Pull requests are welcome. Please open issues to discuss changes before submitting them.

---

