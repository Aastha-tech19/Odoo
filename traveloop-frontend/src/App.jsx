import { BrowserRouter, Routes, Route } from "react-router-dom"

import Sidebar from "./components/Sidebar"
import Footer from "./components/Footer"
import AIAssistant from "./components/AIAssistant"

import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Dashboard from "./pages/Dashboard"
import CreateTrip from "./pages/CreateTrip"
import MyTrips from "./pages/MyTrips"
import ItineraryBuilder from "./pages/ItineraryBuilder"
import ItineraryView from "./pages/ItineraryView"
import Search from "./pages/Search"
import Profile from "./pages/Profile"
import Community from "./pages/Community"
import PackingChecklist from "./pages/PackingChecklist"
import Notes from "./pages/Notes"
import Budget from "./pages/Budget"
import Admin from "./pages/Admin"

function App() {
  return (
    <BrowserRouter>
      <div className="bg-slate-950 text-white min-h-screen">
        <Sidebar />

        <main className="lg:ml-[290px] min-h-screen">
          <Routes>
            {/* Main Routes */}
            <Route
              path="/"
              element={<Dashboard />}
            />

            <Route
              path="/dashboard"
              element={<Dashboard />}
            />

            <Route
              path="/create-trip"
              element={<CreateTrip />}
            />

            <Route
              path="/my-trips"
              element={<MyTrips />}
            />

            <Route
              path="/itinerary-builder"
              element={<ItineraryBuilder />}
            />

            <Route
              path="/itinerary-view"
              element={<ItineraryView />}
            />

            <Route
              path="/search"
              element={<Search />}
            />

            <Route
              path="/community"
              element={<Community />}
            />

            <Route
              path="/profile"
              element={<Profile />}
            />

            <Route
              path="/checklist"
              element={<PackingChecklist />}
            />

            <Route
              path="/notes"
              element={<Notes />}
            />

            <Route
              path="/budget"
              element={<Budget />}
            />

            <Route
              path="/admin"
              element={<Admin />}
            />

            {/* Auth */}
            <Route
              path="/login"
              element={<Login />}
            />

            <Route
              path="/signup"
              element={<Signup />}
            />
          </Routes>

          {/* Floating AI */}
          <AIAssistant />

          {/* Footer */}
          <Footer />
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App