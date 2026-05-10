import {
  Upload,
  Calendar,
} from "lucide-react"

function CreateTrip() {
  const moods = [
    "Adventure",
    "Luxury",
    "Budget",
    "Romantic",
    "Foodie",
    "Family",
  ]

  return (
    <div className="min-h-screen bg-slate-950 text-white px-8 py-10">
      <h1 className="text-5xl font-bold">
        Create New Trip ✈️
      </h1>

      <p className="text-gray-400 mt-3">
        Plan your dream travel experience
      </p>

      <div className="bg-slate-900 border border-slate-800 rounded-[40px] p-8 mt-10 max-w-5xl">

        {/* Trip Name */}
        <div>
          <label className="text-lg font-medium">
            Trip Name
          </label>

          <input
            type="text"
            placeholder="Summer Vacation"
            className="w-full mt-3 bg-slate-800 border border-slate-700 rounded-2xl p-5 outline-none"
          />
        </div>

        {/* Description */}
        <div className="mt-6">
          <label className="text-lg font-medium">
            Description
          </label>

          <textarea
            rows="5"
            placeholder="Tell us about your trip..."
            className="w-full mt-3 bg-slate-800 border border-slate-700 rounded-2xl p-5 outline-none"
          ></textarea>
        </div>

        {/* Dates */}
        <div className="grid md:grid-cols-2 gap-5 mt-6">
          <div>
            <label className="text-lg font-medium">
              Start Date
            </label>

            <div className="bg-slate-800 border border-slate-700 rounded-2xl mt-3 p-5 flex items-center gap-3">
              <Calendar size={20} />

              <input
                type="date"
                className="bg-transparent outline-none w-full"
              />
            </div>
          </div>

          <div>
            <label className="text-lg font-medium">
              End Date
            </label>

            <div className="bg-slate-800 border border-slate-700 rounded-2xl mt-3 p-5 flex items-center gap-3">
              <Calendar size={20} />

              <input
                type="date"
                className="bg-transparent outline-none w-full"
              />
            </div>
          </div>
        </div>

        {/* Mood */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">
            Travel Mood ✨
          </h2>

          <div className="flex flex-wrap gap-4">
            {moods.map(
              (mood, index) => (
                <button
                  key={index}
                  className="bg-slate-800 border border-slate-700 px-5 py-3 rounded-2xl hover:bg-cyan-500 hover:text-black transition"
                >
                  {mood}
                </button>
              )
            )}
          </div>
        </div>

        {/* Upload */}
        <div className="mt-8">
          <label className="text-lg font-medium">
            Cover Photo
          </label>

          <div className="bg-slate-800 border border-dashed border-slate-600 rounded-3xl mt-3 p-10 text-center">
            <Upload
              size={40}
              className="mx-auto text-cyan-400"
            />

            <p className="mt-4 text-gray-400">
              Upload Trip Cover Image
            </p>
          </div>
        </div>

        {/* Budget Preview */}
        <div className="mt-8 bg-cyan-500/10 border border-cyan-500/30 rounded-3xl p-6">
          <h2 className="text-xl font-bold text-cyan-400">
            Estimated Budget
          </h2>

          <p className="text-3xl font-bold mt-3">
            ₹45k – ₹60k
          </p>
        </div>

        <button className="mt-8 bg-cyan-500 hover:bg-cyan-400 text-black px-8 py-4 rounded-2xl font-semibold transition">
          Save Trip 🚀
        </button>
      </div>
    </div>
  )
}

export default CreateTrip