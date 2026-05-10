import { useState } from "react"
import {
  Upload,
  Calendar,
} from "lucide-react"
import { useNavigate } from "react-router-dom"

import { createTrip } from "../services/api"

function CreateTrip() {
  const navigate = useNavigate()
  const storedUser = localStorage.getItem(
    "traveloopUser"
  )
  const user = storedUser
    ? JSON.parse(storedUser)
    : null

  const moods = [
    "Adventure",
    "Luxury",
    "Budget",
    "Romantic",
    "Foodie",
    "Family",
  ]

  const [selectedMood, setSelectedMood] =
    useState("")
  const [formData, setFormData] = useState({
    trip_name: "",
    description: "",
    start_date: "",
    end_date: "",
    cover_photo: "",
  })
  const [error, setError] = useState("")
  const [message, setMessage] = useState("")
  const [isSaving, setIsSaving] = useState(false)

  function handleChange(event) {
    const { name, value } = event.target
    setFormData((current) => ({
      ...current,
      [name]: value,
    }))
  }

  async function handleSubmit(event) {
    event.preventDefault()

    if (!user?.user_id) {
      setError("Please log in again.")
      setMessage("")
      return
    }

    setError("")
    setMessage("")
    setIsSaving(true)

    try {
      const result = await createTrip({
        user_id: user.user_id,
        trip_name: formData.trip_name,
        description: selectedMood
          ? `${formData.description}\n\nMood: ${selectedMood}`.trim()
          : formData.description,
        start_date: formData.start_date,
        end_date: formData.end_date,
        cover_photo:
          formData.cover_photo.trim() || null,
        is_public: false,
      })

      setMessage(result.message)
      navigate("/my-trips")
    } catch (apiError) {
      setError(apiError.message)
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white px-8 py-10">
      <h1 className="text-5xl font-bold">
        Create New Trip
      </h1>

      <p className="text-gray-400 mt-3">
        Plan your dream travel experience
      </p>

      <form
        onSubmit={handleSubmit}
        className="bg-slate-900 border border-slate-800 rounded-[40px] p-8 mt-10 max-w-5xl"
      >
        <div>
          <label className="text-lg font-medium">
            Trip Name
          </label>

          <input
            type="text"
            name="trip_name"
            placeholder="Summer Vacation"
            value={formData.trip_name}
            onChange={handleChange}
            className="w-full mt-3 bg-slate-800 border border-slate-700 rounded-2xl p-5 outline-none"
            required
          />
        </div>

        <div className="mt-6">
          <label className="text-lg font-medium">
            Description
          </label>

          <textarea
            rows="5"
            name="description"
            placeholder="Tell us about your trip..."
            value={formData.description}
            onChange={handleChange}
            className="w-full mt-3 bg-slate-800 border border-slate-700 rounded-2xl p-5 outline-none"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-5 mt-6">
          <div>
            <label className="text-lg font-medium">
              Start Date
            </label>

            <div className="bg-slate-800 border border-slate-700 rounded-2xl mt-3 p-5 flex items-center gap-3">
              <Calendar size={20} />

              <input
                type="date"
                name="start_date"
                value={formData.start_date}
                onChange={handleChange}
                className="bg-transparent outline-none w-full"
                required
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
                name="end_date"
                value={formData.end_date}
                onChange={handleChange}
                className="bg-transparent outline-none w-full"
                required
              />
            </div>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">
            Travel Mood
          </h2>

          <div className="flex flex-wrap gap-4">
            {moods.map((mood) => (
              <button
                key={mood}
                type="button"
                onClick={() =>
                  setSelectedMood(mood)
                }
                className={`border px-5 py-3 rounded-2xl transition ${
                  selectedMood === mood
                    ? "bg-cyan-500 text-black border-cyan-400"
                    : "bg-slate-800 border-slate-700 hover:bg-cyan-500 hover:text-black"
                }`}
              >
                {mood}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-8">
          <label className="text-lg font-medium">
            Cover Photo URL
          </label>

          <div className="bg-slate-800 border border-dashed border-slate-600 rounded-3xl mt-3 p-10 text-center">
            <Upload
              size={40}
              className="mx-auto text-cyan-400"
            />

            <p className="mt-4 text-gray-400">
              Paste an image URL for your trip cover
            </p>

            <input
              type="url"
              name="cover_photo"
              placeholder="https://example.com/trip-cover.jpg"
              value={formData.cover_photo}
              onChange={handleChange}
              className="w-full mt-5 bg-slate-900 border border-slate-700 rounded-2xl p-4 outline-none"
            />
          </div>
        </div>

        <div className="mt-8 bg-cyan-500/10 border border-cyan-500/30 rounded-3xl p-6">
          <h2 className="text-xl font-bold text-cyan-400">
            Estimated Budget
          </h2>

          <p className="text-3xl font-bold mt-3">
            Rs 45k - Rs 60k
          </p>
        </div>

        {error ? (
          <p className="mt-6 text-red-400">
            {error}
          </p>
        ) : null}

        {message ? (
          <p className="mt-6 text-emerald-400">
            {message}
          </p>
        ) : null}

        <button
          type="submit"
          disabled={isSaving}
          className="mt-8 bg-cyan-500 hover:bg-cyan-400 disabled:opacity-70 disabled:cursor-not-allowed text-black px-8 py-4 rounded-2xl font-semibold transition"
        >
          {isSaving
            ? "Saving Trip..."
            : "Save Trip"}
        </button>
      </form>
    </div>
  )
}

export default CreateTrip
