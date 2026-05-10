import {
  MapPinned,
  PlusCircle,
} from "lucide-react"

function ItineraryBuilder() {
  const stops = [
    {
      city: "Paris",
      date: "12 May",
      activities:
        "Eiffel Tower, Cafe Visit, Museum",
    },
    {
      city: "Rome",
      date: "15 May",
      activities:
        "Colosseum, Pizza Tour, Shopping",
    },
  ]

  return (
    <div className="min-h-screen px-8 py-10 bg-slate-950 text-white">

      <h1 className="text-5xl font-bold">
        Itinerary Builder 🗺️
      </h1>

      <p className="text-gray-400 mt-3">
        Plan every stop of your journey
      </p>

      {/* Add Stop Form */}
      <div className="bg-slate-900 border border-slate-800 rounded-[40px] p-8 mt-10">

        <div className="grid md:grid-cols-2 gap-5">
          <input
            type="text"
            placeholder="Enter City"
            className="bg-slate-800 border border-slate-700 p-5 rounded-2xl outline-none"
          />

          <input
            type="date"
            className="bg-slate-800 border border-slate-700 p-5 rounded-2xl outline-none"
          />
        </div>

        <textarea
          rows="4"
          placeholder="Activities..."
          className="w-full bg-slate-800 border border-slate-700 p-5 rounded-2xl mt-5 outline-none"
        ></textarea>

        <button className="mt-5 bg-cyan-500 hover:bg-cyan-400 text-black px-6 py-4 rounded-2xl flex items-center gap-3 font-semibold">
          <PlusCircle size={20} />
          Add Stop
        </button>
      </div>

      {/* Timeline */}
      <div className="mt-14">
        <h2 className="text-3xl font-bold mb-8">
          Trip Timeline 📍
        </h2>

        <div className="space-y-6">
          {stops.map((stop, index) => (
            <div
              key={index}
              className="bg-slate-900 border border-slate-800 rounded-[35px] p-8 flex gap-5 items-start"
            >
              <div className="bg-cyan-500 p-4 rounded-2xl text-black">
                <MapPinned size={28} />
              </div>

              <div>
                <h3 className="text-3xl font-bold">
                  {stop.city}
                </h3>

                <p className="text-cyan-400 mt-2">
                  {stop.date}
                </p>

                <p className="text-gray-400 mt-3">
                  {stop.activities}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ItineraryBuilder