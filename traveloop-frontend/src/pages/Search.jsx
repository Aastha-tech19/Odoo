import { useState } from "react"
import {
  Search as SearchIcon,
  PlusCircle,
  MapPinned,
} from "lucide-react"

function Search() {
  const [query, setQuery] = useState("")

  const cities = [
    {
      city: "Paris",
      country: "France",
      image:
        "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=1200&auto=format&fit=crop",
      cost: "₹80k Avg",
    },
    {
      city: "Dubai",
      country: "UAE",
      image:
        "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1200&auto=format&fit=crop",
      cost: "₹1L Avg",
    },
    {
      city: "Goa",
      country: "India",
      image:
        "https://images.unsplash.com/photo-1512343879784-a960bf40e7f?q=80&w=1200&auto=format&fit=crop",
      cost: "₹25k Avg",
    },
    {
      city: "Tokyo",
      country: "Japan",
      image:
        "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=1200&auto=format&fit=crop",
      cost: "₹1.2L Avg",
    },
  ]

  const filteredCities =
    cities.filter((city) =>
      city.city
        .toLowerCase()
        .includes(query.toLowerCase())
    )

  return (
    <div className="min-h-screen px-8 py-10 bg-slate-950 text-white">

      <h1 className="text-5xl font-bold">
        Explore Cities 🌍
      </h1>

      <p className="text-gray-400 mt-3">
        Discover your next destination
      </p>

      {/* Search */}
      <div className="bg-slate-900 border border-slate-800 rounded-[30px] p-4 mt-8 flex items-center gap-4">
        <SearchIcon
          className="text-cyan-400"
          size={24}
        />

        <input
          type="text"
          placeholder="Search city..."
          value={query}
          onChange={(e) =>
            setQuery(e.target.value)
          }
          className="bg-transparent outline-none w-full text-lg"
        />
      </div>

      {/* Categories */}
      <div className="flex gap-4 mt-8 flex-wrap">
        {[
          "Beach",
          "Luxury",
          "Adventure",
          "Budget",
        ].map((tag, index) => (
          <button
            key={index}
            className="bg-slate-900 border border-slate-800 px-5 py-3 rounded-2xl hover:bg-cyan-500 hover:text-black transition"
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Cards */}
      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-8 mt-12">
        {filteredCities.map(
          (city, index) => (
            <div
              key={index}
              className="group bg-slate-900 rounded-[35px] overflow-hidden border border-slate-800 hover:border-cyan-400 transition-all duration-500 hover:-translate-y-2"
            >
              <div className="overflow-hidden">
                <img
                  src={city.image}
                  alt={city.city}
                  className="h-64 w-full object-cover group-hover:scale-110 transition duration-700"
                />
              </div>

              <div className="p-6">
                <div className="flex items-center gap-2 text-cyan-400">
                  <MapPinned size={18} />
                  {city.country}
                </div>

                <h2 className="text-3xl font-bold mt-3">
                  {city.city}
                </h2>

                <p className="text-gray-400 mt-2">
                  {city.cost}
                </p>

                <button className="mt-5 w-full bg-cyan-500 hover:bg-cyan-400 text-black px-5 py-3 rounded-2xl flex items-center justify-center gap-2 font-semibold transition">
                  <PlusCircle size={20} />
                  Add to Trip
                </button>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  )
}

export default Search