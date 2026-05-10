import { useEffect, useState } from "react"
import {
  CalendarDays,
  MapPinned,
} from "lucide-react"

import {
  getTripStops,
  getUserTrips,
} from "../services/api"

function ItineraryView() {
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
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(true)

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

  return (
    <div className="min-h-screen bg-slate-950 text-white px-8 py-10">
      <h1 className="text-5xl font-bold">
        Trip Timeline
      </h1>

      <p className="text-gray-400 mt-3">
        Your travel itinerary overview
      </p>

      <select
        value={selectedTripId}
        onChange={(event) =>
          setSelectedTripId(
            event.target.value
          )
        }
        className="w-full max-w-xl bg-slate-900 border border-slate-800 rounded-2xl p-5 mt-8 outline-none"
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

      {isLoading ? (
        <p className="text-gray-400 mt-10">
          Loading itinerary...
        </p>
      ) : null}

      {error ? (
        <p className="text-red-400 mt-10">
          {error}
        </p>
      ) : null}

      {!isLoading &&
      !error &&
      stops.length === 0 ? (
        <div className="bg-slate-900 border border-slate-800 rounded-[35px] p-8 mt-10">
          No itinerary stops added yet.
        </div>
      ) : null}

      <div className="space-y-6 mt-10">
        {stops.map((item, index) => (
          <div
            key={item.stop_id}
            className="bg-slate-900 border border-slate-800 rounded-[35px] p-8 flex gap-5 hover:border-cyan-400 transition"
          >
            <div className="bg-cyan-500 text-black p-4 rounded-2xl h-fit">
              <CalendarDays />
            </div>

            <div>
              <h2 className="text-3xl font-bold">
                Day {index + 1}
              </h2>

              <div className="flex items-center gap-2 text-cyan-400 mt-2">
                <MapPinned size={18} />
                {item.city_name}
              </div>

              <p className="text-gray-400 mt-2">
                {item.arrival_date} to{" "}
                {item.departure_date}
              </p>

              <p className="text-gray-400 mt-4">
                {item.activities ||
                  "No activities added yet."}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ItineraryView
