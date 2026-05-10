import { motion } from "framer-motion"
import {
  MapPinned,
  Wallet,
  Plane,
  Calendar,
  Sparkles,
} from "lucide-react"
import { Link } from "react-router-dom"

function Dashboard() {
  const trips = [
    {
      city: "Paris",
      days: "7 Days",
      image:
        "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=1200&auto=format&fit=crop",
    },
    {
      city: "Dubai",
      days: "5 Days",
      image:
        "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1200&auto=format&fit=crop",
    },
    {
      city: "Goa",
      days: "4 Days",
      image:
        "https://images.unsplash.com/photo-1590371769210-16f5f0d5d3c2?q=80&w=1200&auto=format&fit=crop",
    },
  ]

  const recommendations = [
    {
      city: "Bali",
      score: "94%",
      image:
        "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=1200&auto=format&fit=crop",
    },
    {
      city: "Japan",
      score: "91%",
      image:
        "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=1200&auto=format&fit=crop",
    },
    {
      city: "Switzerland",
      score: "89%",
      image:
        "https://images.unsplash.com/photo-1527668752968-14dc70a27c95?q=80&w=1200&auto=format&fit=crop",
    },
    {
      city: "Iceland",
      score: "87%",
      image:
        "https://images.unsplash.com/photo-1504893524553-b855bce32c67?q=80&w=1200&auto=format&fit=crop",
    },
  ]

  const stats = [
    {
      icon: Plane,
      value: "12",
      title: "Trips Planned",
    },
    {
      icon: Wallet,
      value: "₹2.5L",
      title: "Budget Managed",
    },
    {
      icon: Calendar,
      value: "28",
      title: "Travel Days",
    },
    {
      icon: MapPinned,
      value: "8",
      title: "Destinations",
    },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-slate-950 text-white px-8 py-10"
    >
      {/* Hero */}
      <div
        className="relative overflow-hidden rounded-[45px] p-10 md:p-14 shadow-2xl bg-cover bg-center min-h-[450px] flex items-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2000&auto=format&fit=crop')",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/60" />

        {/* Glow */}
        <div className="absolute top-0 right-0 h-96 w-96 rounded-full bg-cyan-500/20 blur-[120px]" />

        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-cyan-500/20 border border-cyan-400/20 rounded-full px-5 py-2 text-cyan-300 mb-6">
            <Sparkles size={18} />
            AI Travel Companion
          </div>

          <h1 className="text-5xl md:text-7xl font-bold leading-tight">
            Ready For Your
            <br />
            Next Adventure? 🌍
          </h1>

          <p className="text-lg text-gray-300 mt-6 max-w-2xl">
            Plan trips, manage itineraries,
            track budgets and discover dream
            destinations all in one place.
          </p>

          <div className="flex flex-wrap gap-4 mt-8">
            <Link
              to="/create-trip"
              className="bg-cyan-500 hover:bg-cyan-400 text-black px-8 py-4 rounded-2xl font-semibold transition hover:scale-105"
            >
              Plan New Trip ✈️
            </Link>

            <Link
              to="/search"
              className="bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 px-8 py-4 rounded-2xl transition"
            >
              Explore Destinations
            </Link>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6 mt-10">
        {stats.map((item, index) => {
          const Icon = item.icon

          return (
            <div
              key={index}
              className="bg-slate-900 border border-slate-800 rounded-[35px] p-8 hover:border-cyan-400 transition-all duration-300 hover:-translate-y-1"
            >
              <Icon
                className="text-cyan-400 mb-4"
                size={36}
              />

              <h2 className="text-4xl font-bold">
                {item.value}
              </h2>

              <p className="text-gray-400 mt-2">
                {item.title}
              </p>
            </div>
          )
        })}
      </div>

      {/* Recommendations */}
      <div className="mt-16">
        <h2 className="text-3xl font-bold mb-8">
          Recommended For You 🌍
        </h2>

        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-8">
          {recommendations.map(
            (place, index) => (
              <div
                key={index}
                className="group bg-slate-900 border border-slate-800 rounded-[35px] overflow-hidden hover:border-cyan-400 transition-all duration-500 hover:-translate-y-2"
              >
                <div className="overflow-hidden">
                  <img
                    src={place.image}
                    alt={place.city}
                    className="h-56 w-full object-cover brightness-90 group-hover:brightness-110 group-hover:scale-110 transition duration-700"
                  />
                </div>

                <div className="p-5">
                  <h3 className="text-2xl font-bold">
                    {place.city}
                  </h3>

                  <p className="text-cyan-400 mt-2">
                    Match Score:
                    {" "}
                    {place.score}
                  </p>

                  <button className="mt-4 bg-cyan-500 hover:bg-cyan-400 text-black px-5 py-3 rounded-2xl font-semibold w-full transition">
                    Explore
                  </button>
                </div>
              </div>
            )
          )}
        </div>
      </div>

      {/* Trips */}
      <div className="mt-16">
        <h2 className="text-3xl font-bold mb-8">
          Recent Trips ✈️
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {trips.map((trip, index) => (
            <div
              key={index}
              className="group bg-slate-900 rounded-[35px] overflow-hidden border border-slate-800 hover:border-cyan-400 transition-all duration-500 hover:-translate-y-2"
            >
              <div className="overflow-hidden">
                <img
                  src={trip.image}
                  alt={trip.city}
                  className="h-64 w-full object-cover brightness-90 group-hover:brightness-110 group-hover:scale-110 transition duration-700"
                />
              </div>

              <div className="p-6">
                <h3 className="text-3xl font-bold">
                  {trip.city}
                </h3>

                <p className="text-gray-400 mt-2">
                  {trip.days}
                </p>

                <button className="mt-5 bg-cyan-500 hover:bg-cyan-400 text-black px-5 py-3 rounded-2xl font-semibold transition">
                  View Trip
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default Dashboard