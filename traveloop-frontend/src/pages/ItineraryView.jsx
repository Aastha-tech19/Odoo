import {
  CalendarDays,
  MapPinned,
} from "lucide-react"

function ItineraryView() {
  const itinerary = [
    {
      day: "Day 1",
      city: "Paris",
      activity:
        "Eiffel Tower, Cafe Visit, Museum",
    },
    {
      day: "Day 2",
      city: "Rome",
      activity:
        "Colosseum, Pizza Tour",
    },
  ]

  return (
    <div className="min-h-screen bg-slate-950 text-white px-8 py-10">

      <h1 className="text-5xl font-bold">
        Trip Timeline 📅
      </h1>

      <p className="text-gray-400 mt-3">
        Your travel itinerary overview
      </p>

      <div className="space-y-6 mt-10">
        {itinerary.map((item, index) => (
          <div
            key={index}
            className="bg-slate-900 border border-slate-800 rounded-[35px] p-8 flex gap-5 hover:border-cyan-400 transition"
          >
            <div className="bg-cyan-500 text-black p-4 rounded-2xl h-fit">
              <CalendarDays />
            </div>

            <div>
              <h2 className="text-3xl font-bold">
                {item.day}
              </h2>

              <div className="flex items-center gap-2 text-cyan-400 mt-2">
                <MapPinned size={18} />
                {item.city}
              </div>

              <p className="text-gray-400 mt-4">
                {item.activity}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ItineraryView