import { useEffect, useState } from "react"
import {
  MapPinned,
  PlusCircle,
} from "lucide-react"

import {
  createTripStop,
  getTripStops,
  getUserTrips,
} from "../services/api"

function ItineraryBuilder() {
  const storedUser = localStorage.getItem(
    "traveloopUser"
  )
  const user = storedUser
    ? JSON.parse(storedUser)
    : null
  const [trips, setTrips] = useState([])
  const [selectedTripId, setSelectedTripId] =
    useState("")
  const [stops, setStops] = useState([])
  const [formData, setFormData] = useState({
    city_name: "",
    arrival_date: "",
    departure_date: "",
    activities: "",
  })
  const [error, setError] = useState("")
  const [message, setMessage] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    async function loadTrips() {
      if (!user?.user_id) {
        setError("Please log in again.")
        setIsLoading(false)
        return
      }

      try {
        const result = await getUserTrips(
          user.user_id
        )
        setTrips(result.trips)

        if (result.trips.length > 0) {
          setSelectedTripId(
            result.trips[0].trip_id
          )
        }
      } catch (apiError) {
        setError(apiError.message)
      } finally {
        setIsLoading(false)
      }
    }

    loadTrips()
  }, [user?.user_id])

  useEffect(() => {
    async function loadStops() {
      if (!selectedTripId) {
        setStops([])
        return
      }

      try {
        const result = await getTripStops(
          selectedTripId
        )
        setStops(result.stops)
      } catch (apiError) {
        setError(apiError.message)
      }
    }

    loadStops()
  }, [selectedTripId])

  function handleChange(event) {
    const { name, value } = event.target
    setFormData((current) => ({
      ...current,
      [name]: value,
    }))
  }

  async function handleSubmit(event) {
    event.preventDefault()

    if (!selectedTripId) {
      setError("Please create a trip first.")
      return
    }

    setError("")
    setMessage("")
    setIsSaving(true)

    try {
      const result = await createTripStop({
        trip_id: selectedTripId,
        city_name: formData.city_name,
        arrival_date: formData.arrival_date,
        departure_date: formData.departure_date,
        activities: formData.activities,
      })

      setStops((current) => [
        ...current,
        result.stop,
      ])
      setFormData({
        city_name: "",
        arrival_date: "",
        departure_date: "",
        activities: "",
      })
      setMessage(result.message)
    } catch (apiError) {
      setError(apiError.message)
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="min-h-screen px-8 py-10 bg-slate-950 text-white">
      <h1 className="text-5xl font-bold">
        Itinerary Builder
      </h1>

      <p className="text-gray-400 mt-3">
        Plan every stop of your journey
      </p>

      <form
        onSubmit={handleSubmit}
        className="bg-slate-900 border border-slate-800 rounded-[40px] p-8 mt-10"
      >
        <select
          value={selectedTripId}
          onChange={(event) =>
            setSelectedTripId(
              event.target.value
            )
          }
          className="w-full bg-slate-800 border border-slate-700 p-5 rounded-2xl outline-none mb-5"
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

        <div className="grid md:grid-cols-2 gap-5">
          <input
            type="text"
            name="city_name"
            value={formData.city_name}
            onChange={handleChange}
            placeholder="Enter City"
            className="bg-slate-800 border border-slate-700 p-5 rounded-2xl outline-none"
            required
          />

          <input
            type="date"
            name="arrival_date"
            value={formData.arrival_date}
            onChange={handleChange}
            className="bg-slate-800 border border-slate-700 p-5 rounded-2xl outline-none"
            required
          />
        </div>

        <input
          type="date"
          name="departure_date"
          value={formData.departure_date}
          onChange={handleChange}
          className="w-full bg-slate-800 border border-slate-700 p-5 rounded-2xl mt-5 outline-none"
          required
        />

        <textarea
          rows="4"
          name="activities"
          value={formData.activities}
          onChange={handleChange}
          placeholder="Activities..."
          className="w-full bg-slate-800 border border-slate-700 p-5 rounded-2xl mt-5 outline-none"
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
          className="mt-5 bg-cyan-500 hover:bg-cyan-400 disabled:opacity-70 disabled:cursor-not-allowed text-black px-6 py-4 rounded-2xl flex items-center gap-3 font-semibold"
        >
          <PlusCircle size={20} />
          {isSaving
            ? "Adding Stop..."
            : "Add Stop"}
        </button>
      </form>

      <div className="mt-14">
        <h2 className="text-3xl font-bold mb-8">
          Trip Timeline
        </h2>

        {isLoading ? (
          <p className="text-gray-400">
            Loading itinerary...
          </p>
        ) : null}

        {!isLoading &&
        !error &&
        stops.length === 0 ? (
          <div className="bg-slate-900 border border-slate-800 rounded-[35px] p-8">
            No stops added yet.
          </div>
        ) : null}

        <div className="space-y-6">
          {stops.map((stop) => (
            <div
              key={stop.stop_id}
              className="bg-slate-900 border border-slate-800 rounded-[35px] p-8 flex gap-5 items-start"
            >
              <div className="bg-cyan-500 p-4 rounded-2xl text-black">
                <MapPinned size={28} />
              </div>

              <div>
                <h3 className="text-3xl font-bold">
                  {stop.city_name}
                </h3>

                <p className="text-cyan-400 mt-2">
                  {stop.arrival_date} to{" "}
                  {stop.departure_date}
                </p>

                <p className="text-gray-400 mt-3">
                  {stop.activities ||
                    "No activities added yet."}
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
