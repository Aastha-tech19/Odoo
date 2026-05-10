import { Link } from "react-router-dom"
import { useState } from "react"

function Navbar() {
  const [menuOpen, setMenuOpen] =
    useState(false)

  return (
    <nav className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">

        <Link
          to="/dashboard"
          className="text-3xl font-bold text-cyan-400"
        >
          Traveloop ✈️
        </Link>

        <div className="hidden lg:flex items-center gap-7 text-gray-300 font-medium">
          <Link to="/dashboard">
            Dashboard
          </Link>

          <Link to="/create-trip">
            Create Trip
          </Link>

          <Link to="/my-trips">
            My Trips
          </Link>

          <Link to="/community">
            Community
          </Link>

          <Link to="/profile">
            Profile
          </Link>

          <Link to="/login">
            Login
          </Link>

          <Link
            to="/signup"
            className="bg-cyan-500 text-black px-5 py-2 rounded-2xl font-semibold"
          >
            Sign Up
          </Link>
        </div>

        <button
          className="lg:hidden text-3xl"
          onClick={() =>
            setMenuOpen(!menuOpen)
          }
        >
          ☰
        </button>
      </div>

      {menuOpen && (
        <div className="lg:hidden flex flex-col gap-4 mt-5 bg-slate-900 p-5 rounded-3xl">
          <Link to="/dashboard">
            Dashboard
          </Link>

          <Link to="/create-trip">
            Create Trip
          </Link>

          <Link to="/my-trips">
            My Trips
          </Link>

          <Link to="/community">
            Community
          </Link>

          <Link to="/profile">
            Profile
          </Link>

          <Link to="/login">
            Login
          </Link>

          <Link to="/signup">
            Sign Up
          </Link>
        </div>
      )}
    </nav>
  )
}

export default Navbar