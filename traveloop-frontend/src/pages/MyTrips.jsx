function MyTrips() {
  const trips = [
    {
      city: "Paris",
      date: "12 May - 20 May",
      image:
        "https://images.unsplash.com/photo-1502602898657-3e91760cbb34",
    },
    {
      city: "Dubai",
      date: "1 June - 5 June",
      image:
        "https://images.unsplash.com/photo-1512453979798-5ea266f8880c",
    },
    {
      city: "Goa",
      date: "15 July - 22 July",
      image:
         "https://images.unsplash.com/photo-1582972236019-ea9b4d5e8c95?q=80&w=1200&auto=format&fit=crop",
    },
  ]

  return (
    <div className="min-h-screen px-8 py-10">
      <h1 className="text-5xl font-bold mb-10">
        My Trips 🌍
      </h1>

      <div className="grid md:grid-cols-3 gap-8">
        {trips.map((trip, index) => (
          <div
            key={index}
            className="bg-slate-900 rounded-[35px] overflow-hidden border border-slate-800 hover:scale-105 transition"
          >
            <img
              src={trip.image}
              alt={trip.city}
              className="h-60 w-full object-cover"
            />

            <div className="p-6">
              <h2 className="text-3xl font-bold">
                {trip.city}
              </h2>

              <p className="text-gray-400 mt-2">
                {trip.date}
              </p>

              <button className="mt-5 bg-cyan-500 hover:bg-cyan-400 text-black px-5 py-3 rounded-2xl font-semibold">
                View Trip
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MyTrips