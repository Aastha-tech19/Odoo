import { useEffect, useState } from "react"
import { Save, PlusCircle } from "lucide-react"

import {
  createNote,
  getUserNotes,
  getUserTrips,
} from "../services/api"

function Notes() {
  const storedUser = localStorage.getItem(
    "traveloopUser"
  )
  const user = storedUser
    ? JSON.parse(storedUser)
    : null
  const [trips, setTrips] = useState([])
  const [notes, setNotes] = useState([])
  const [formData, setFormData] = useState({
    trip_id: "",
    title: "",
    note_text: "",
  })
  const [error, setError] = useState("")
  const [message, setMessage] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    async function loadData() {
      if (!user?.user_id) {
        setError("Please log in again.")
        setIsLoading(false)
        return
      }

      try {
        const [tripResult, noteResult] =
          await Promise.all([
            getUserTrips(user.user_id),
            getUserNotes(user.user_id),
          ])

        setTrips(tripResult.trips)
        setNotes(noteResult.notes)
        setFormData((current) => ({
          ...current,
          trip_id:
            current.trip_id ||
            tripResult.trips[0]?.trip_id ||
            "",
        }))
      } catch (apiError) {
        setError(apiError.message)
      } finally {
        setIsLoading(false)
      }
    }

    loadData()
  }, [user?.user_id])

  function handleChange(event) {
    const { name, value } = event.target
    setFormData((current) => ({
      ...current,
      [name]: value,
    }))
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setError("")
    setMessage("")
    setIsSaving(true)

    try {
      const result = await createNote(formData)
      setNotes((current) => [
        result.note,
        ...current,
      ])
      setFormData((current) => ({
        ...current,
        title: "",
        note_text: "",
      }))
      setMessage(result.message)
    } catch (apiError) {
      setError(apiError.message)
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white px-8 py-10">
      <h1 className="text-5xl font-bold">
        Travel Journal
      </h1>

      <p className="text-gray-400 mt-3">
        Save important reminders for your trip
      </p>

      <form
        onSubmit={handleSubmit}
        className="bg-slate-900 border border-slate-800 rounded-[40px] p-8 mt-10"
      >
        <select
          name="trip_id"
          value={formData.trip_id}
          onChange={handleChange}
          className="w-full bg-slate-800 border border-slate-700 rounded-2xl p-5 outline-none"
          disabled={trips.length === 0}
        >
          {trips.length === 0 ? (
            <option value="">
              Create a trip first
            </option>
          ) : null}

          {trips.map((trip) => (
            <option
              key={trip.trip_id}
              value={trip.trip_id}
            >
              {trip.trip_name}
            </option>
          ))}
        </select>

        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Note Title"
          className="w-full bg-slate-800 border border-slate-700 rounded-2xl p-5 outline-none mt-5"
          required
        />

        <textarea
          rows="5"
          name="note_text"
          value={formData.note_text}
          onChange={handleChange}
          placeholder="Write your travel note..."
          className="w-full bg-slate-800 border border-slate-700 rounded-2xl p-5 mt-5 outline-none"
          required
        />

        {error ? (
          <p className="mt-5 text-red-400">
            {error}
          </p>
        ) : null}

        {message ? (
          <p className="mt-5 text-emerald-400">
            {message}
          </p>
        ) : null}

        <button
          type="submit"
          disabled={isSaving || trips.length === 0}
          className="mt-5 bg-cyan-500 hover:bg-cyan-400 disabled:opacity-70 disabled:cursor-not-allowed text-black px-6 py-4 rounded-2xl flex items-center gap-3 font-semibold transition"
        >
          <PlusCircle size={20} />
          {isSaving
            ? "Saving Note..."
            : "Add Note"}
        </button>
      </form>

      {isLoading ? (
        <p className="text-gray-400 mt-10">
          Loading your notes...
        </p>
      ) : null}

      {!isLoading &&
      !error &&
      notes.length === 0 ? (
        <div className="bg-slate-900 border border-slate-800 rounded-[35px] p-6 mt-10">
          No notes saved yet.
        </div>
      ) : null}

      <div className="grid md:grid-cols-2 gap-6 mt-10">
        {notes.map((note) => (
          <div
            key={note.note_id}
            className="bg-slate-900 border border-slate-800 rounded-[35px] p-6 hover:border-cyan-400 transition"
          >
            <h2 className="text-2xl font-bold">
              {note.title}
            </h2>

            <p className="text-cyan-400 mt-2">
              {note.trip_name}
            </p>

            <p className="text-gray-400 mt-3">
              {note.note_text}
            </p>

            <button
              type="button"
              className="mt-5 text-cyan-400 flex items-center gap-2"
            >
              <Save size={18} />
              Saved
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Notes
