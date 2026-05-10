function Destinations() {
  const destinations = [
    {
      name: "Paris",
      image:
        "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=1200&auto=format&fit=crop",
    },
    {
      name: "Bali",
      image:
        "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=1200&auto=format&fit=crop",
    },
    {
      name: "Dubai",
      image:
        "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1200&auto=format&fit=crop",
    },
  ]

  return (
    <section className="bg-slate-950 text-white py-24 px-6 md:px-16">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-5xl font-bold text-center mb-4">
          Popular Destinations ✈️
        </h2>

        <p className="text-center text-gray-400 mb-14 text-lg">
          Explore breathtaking destinations around the world
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {destinations.map((place, index) => (
            <div
              key={index}
              className="group bg-slate-900 rounded-[30px] overflow-hidden border border-slate-800 hover:border-cyan-500 transition-all duration-500 hover:-translate-y-2"
            >
              <div className="overflow-hidden">
                <img
                  src={place.image}
                  alt={place.name}
                  className="h-72 w-full object-cover group-hover:scale-110 transition duration-700"
                />
              </div>

              <div className="p-6">
                <h3 className="text-3xl font-bold text-white">
                  {place.name}
                </h3>

                <p className="text-gray-400 mt-3">
                  Discover amazing experiences and hidden gems.
                </p>

                <button className="mt-6 bg-cyan-500 hover:bg-cyan-400 text-black font-semibold px-6 py-3 rounded-2xl transition">
                  Explore →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Destinations