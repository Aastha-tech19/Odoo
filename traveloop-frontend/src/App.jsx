import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router-dom"

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

function ProtectedRoute({ children }) {
  const storedUser = localStorage.getItem(
    "traveloopUser"
  )

  if (!storedUser) {
    return <Navigate to="/login" replace />
  }

  return children
}

function AppLayout() {
  const location = useLocation()
  const isAuthPage =
    location.pathname === "/login" ||
    location.pathname === "/signup"

  return (
    <div className="bg-slate-950 text-white min-h-screen">
      {!isAuthPage ? <Sidebar /> : null}

      <main
        className={
          isAuthPage
            ? "min-h-screen"
            : "lg:ml-[290px] min-h-screen"
        }
      >
        <Routes>
          <Route
            path="/"
            element={
              <Navigate
                to="/dashboard"
                replace
              />
            }
          />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/create-trip"
            element={
              <ProtectedRoute>
                <CreateTrip />
              </ProtectedRoute>
            }
          />

          <Route
            path="/my-trips"
            element={
              <ProtectedRoute>
                <MyTrips />
              </ProtectedRoute>
            }
          />

          <Route
            path="/itinerary-builder"
            element={
              <ProtectedRoute>
                <ItineraryBuilder />
              </ProtectedRoute>
            }
          />

          <Route
            path="/itinerary-view"
            element={
              <ProtectedRoute>
                <ItineraryView />
              </ProtectedRoute>
            }
          />

          <Route
            path="/search"
            element={
              <ProtectedRoute>
                <Search />
              </ProtectedRoute>
            }
          />

          <Route
            path="/community"
            element={
              <ProtectedRoute>
                <Community />
              </ProtectedRoute>
            }
          />

          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />

          <Route
            path="/checklist"
            element={
              <ProtectedRoute>
                <PackingChecklist />
              </ProtectedRoute>
            }
          />

          <Route
            path="/notes"
            element={
              <ProtectedRoute>
                <Notes />
              </ProtectedRoute>
            }
          />

          <Route
            path="/budget"
            element={
              <ProtectedRoute>
                <Budget />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <Admin />
              </ProtectedRoute>
            }
          />

          <Route
            path="/login"
            element={<Login />}
          />

          <Route
            path="/signup"
            element={<Signup />}
          />
        </Routes>

        {!isAuthPage ? <AIAssistant /> : null}
        {!isAuthPage ? <Footer /> : null}
      </main>
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  )
}

export default App
