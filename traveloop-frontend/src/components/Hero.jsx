import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"
import { useState } from "react"

function Hero() {
  const [search, setSearch] = useState("")
  const navigate = useNavigate()

  const handleSearch = () => {
    navigate(`/trips?search=${search}`)
  }

  return (
    <section
      className="relative min-h-screen bg-cover bg-center flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2070&auto=format&fit=crop')",
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Glow circles */}
      <div className="absolute top-20 left-10 h-72 w-72 rounded-full bg-blue-500/20 blur-[120px]" />
      <div className="absolute bottom-20 right-10 h-72 w-72 rounded-full bg-cyan-400/20 blur-[120px]" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 text-white max-w-5xl">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-4 text-lg text-cyan-300 font-semibold"
        >
          ✈️ Explore • Discover • Travel
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-6xl md:text-8xl font-extrabold leading-tight"
        >
          Discover The
          <span className="text-cyan-400"> World </span>
          Like Never Before
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-6 text-lg md:text-xl text-gray-200 max-w-3xl mx-auto"
        >
          AI-powered travel planning with smart destination
          recommendations, budgets, and unforgettable experiences.
        </motion.p>

        {/* Glass search box */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-10 backdrop-blur-xl bg-white/10 border border-white/20 rounded-[30px] p-4 flex flex-col md:flex-row gap-4 max-w-3xl mx-auto shadow-2xl"
        >
          <input
            type="text"
            placeholder="Where do you want to go?"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 bg-white/20 text-white placeholder:text-gray-300 p-4 rounded-2xl outline-none"
          />

          <button
            onClick={handleSearch}
            className="bg-cyan-500 hover:bg-cyan-400 px-8 py-4 rounded-2xl font-bold transition hover:scale-105"
          >
            Explore Now 🚀
          </button>
        </motion.div>

        {/* Floating stats */}
        <div className="grid grid-cols-3 gap-6 mt-16 max-w-2xl mx-auto">
          <div className="backdrop-blur-lg bg-white/10 p-5 rounded-3xl border border-white/20">
            <h2 className="text-3xl font-bold">100+</h2>
            <p className="text-gray-300">Destinations</p>
          </div>

          <div className="backdrop-blur-lg bg-white/10 p-5 rounded-3xl border border-white/20">
            <h2 className="text-3xl font-bold">10K+</h2>
            <p className="text-gray-300">Travelers</p>
          </div>

          <div className="backdrop-blur-lg bg-white/10 p-5 rounded-3xl border border-white/20">
            <h2 className="text-3xl font-bold">4.9★</h2>
            <p className="text-gray-300">Ratings</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero