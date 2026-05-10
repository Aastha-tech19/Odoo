import { useState } from "react"

function TripPlanner() {
  const [destination, setDestination] = useState("")
  const [budget, setBudget] = useState("")
  const [result, setResult] = useState([])

  const trips = [
    {
      place: "Goa",
      budget: 15000,
      desc: "Budget-friendly beaches and nightlife.",
    },
    {
      place: "Bali",
      budget: 40000,
      desc: "Relaxing tropical paradise.",
    },
    {
      place: "Dubai",
      budget: 80000,
      desc: "Luxury shopping and desert fun.",
    },
    {
      place: "Paris",
      budget: 120000,
      desc: "Romantic city with iconic landmarks.",
    },
  ]

  const getRecommendations = () => {
    const filtered = trips.filter(
      (trip) =>
        trip.place
          .toLowerCase()
          .includes(destination.toLowerCase()) ||
        trip.budget <= Number(budget)
    )

    setResult(filtered)
  }

  return (
    <section className="bg-slate-950 text-white py-24 px-6 md:px-16">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-5xl font-bold text-center mb-4">
          AI Trip Planner 🤖
        </h2>

        <p className="text-center text-gray-400 mb-12">
          Find personalized travel ideas instantly
        </p>

        <div className="bg-slate-900 border border-slate-800 rounded-[40px] p-8 shadow-2xl">
          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Destination"
              value={destination}
              onChange={(e) =>
                setDestination(e.target.value)
              }
              className="bg-slate-800 text-white border border-slate-700 p-4 rounded-2xl outline-none"
            />

            <input
              type="number"
              placeholder="Budget"
              value={budget}
              onChange={(e) =>
                setBudget(e.target.value)
              }
              className="bg-slate-800 text-white border border-slate-700 p-4 rounded-2xl outline-none"
            />
          </div>

          <button
            onClick={getRecommendations}
            className="mt-5 bg-cyan-500 hover:bg-cyan-400 text-black font-bold px-6 py-4 rounded-2xl w-full transition"
          >
            Get Recommendations 🚀
          </button>

          <div className="grid md:grid-cols-2 gap-5 mt-8">
            {result.map((trip, index) => (
              <div
                key={index}
                className="bg-slate-800 rounded-3xl p-6 border border-slate-700"
              >
                <h3 className="text-2xl font-bold">
                  {trip.place}
                </h3>

                <p className="text-gray-400 mt-2">
                  {trip.desc}
                </p>

                <p className="mt-4 font-semibold text-cyan-400">
                  ₹{trip.budget}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default TripPlanner