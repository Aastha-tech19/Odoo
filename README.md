https://drive.google.com/file/d/1lYP2Z1NklAVW80QKV8N4W430jjMf4ThS/view?usp=drivesdk
# Traveloop

Traveloop is a full-stack travel planning web application built with a React + Tailwind CSS frontend and a FastAPI backend.  
It currently uses SQLite for local data storage, so you can run the full project without setting up PostgreSQL.

## Tech Stack

### Frontend
- React
- Vite
- Tailwind CSS
- React Router
- Lucide React
- Framer Motion

### Backend
- FastAPI
- Uvicorn
- Python Dotenv

### Database
- SQLite

## Current Features

- User signup
- User login
- Logout
- Profile view and update
- Create and save trips
- View saved trips
- Add trips directly from search page
- Add and save notes
- Build itinerary by adding stops
- View saved itinerary stops

## Project Structure

```text
Odoo/
├── traveloop-backend/
│   ├── app/
│   │   ├── main.py
│   │   ├── db.py
│   │   ├── security.py
│   │   └── routes/
│   │       └── user_routes.py
│   ├── requirements.txt
│   ├── .env.example
│   └── traveloop.db
│
├── traveloop-frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
│
└── treveloop_database/
    ├── user.sql
    ├── trips.sql
    ├── trip_note.sql
    ├── tripe_stops.sql
    └── other schema files

Setup Instructions
1. Backend Setup
Open terminal in the backend folder:

cd D:\Odoo\traveloop-backend
.\venv\Scripts\Activate.ps1
pip install -r requirements.txt
Create a .env file inside traveloop-backend:

DATABASE_PATH=D:\Odoo\traveloop-backend\traveloop.db
Run the backend:

uvicorn app.main:app --reload
Backend runs on:

http://127.0.0.1:8000
Test backend health:

http://127.0.0.1:8000/api/health
2. Frontend Setup
Open another terminal:

cd D:\Odoo\traveloop-frontend
npm install
npm run dev
Frontend runs on:

http://localhost:5173
How to Use
Signup and Login
Open http://localhost:5173/signup
Create a new account
Login with the same email and password
Create a Trip
Open Create Trip
Fill trip details
Save trip
Check it in My Trips
Add Trip from Search
Open Search
Click Add to Trip on a city
The trip will be saved automatically
Add Notes
Open Notes
Select a trip
Add a title and note text
Save note
Add Itinerary Stops
Open Itinerary Builder
Select a trip
Add city, dates, and activities
Save stop
View it in Itinerary View
API Endpoints
Auth
POST /api/auth/signup
POST /api/auth/login
Users
GET /api/users
PUT /api/users/{user_id}
Trips
POST /api/trips
GET /api/users/{user_id}/trips
Notes
POST /api/notes
GET /api/users/{user_id}/notes
Itinerary Stops
POST /api/stops
GET /api/trips/{trip_id}/stops
Health
GET /api/health
Database Notes
SQLite is used for now for easy local development
Data is stored in traveloop-backend/traveloop.db
No PostgreSQL password or setup is needed right now
PostgreSQL can be added later when needed
Important Notes
Restart backend after backend code changes
Keep both backend and frontend servers running at the same time
If signup or login hangs, check whether backend is running properly
If needed later, the project can be migrated from SQLite to PostgreSQL
Future Improvements
Edit and delete trips
Edit and delete itinerary stops
Better trip detail pages
Real image upload instead of URL input
JWT authentication
PostgreSQL migration
Deployment setup
Author
Traveloop Project
