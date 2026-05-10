import { useEffect, useState } from "react"

import { getUserTrips } from "../services/api"

function formatDateRange(startDate, endDate) {
  const start = new Date(startDate)
  const end = new Date(endDate)

  return `${start.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
  })} - ${end.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
  })}`
}

function MyTrips() {
  const storedUser = localStorage.getItem(
    "traveloopUser"
  )
  const user = storedUser
    ? JSON.parse(storedUser)
    : null
  const [trips, setTrips] = useState([])
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
      } catch (apiError) {
        setError(apiError.message)
      } finally {
        setIsLoading(false)
      }
    }

    loadTrips()
  }, [user?.user_id])

  return (
    <div className="min-h-screen px-8 py-10">
      <h1 className="text-5xl font-bold mb-10">
        My Trips
      </h1>

      {isLoading ? (
        <p className="text-gray-400">
          Loading your trips...
        </p>
      ) : null}

      {error ? (
        <p className="text-red-400 mb-6">
          {error}
        </p>
      ) : null}

      {!isLoading && !error && trips.length === 0 ? (
        <div className="bg-slate-900 border border-slate-800 rounded-[35px] p-8">
          <h2 className="text-2xl font-bold">
            No trips saved yet
          </h2>

          <p className="text-gray-400 mt-3">
            Create your first trip from the
            Plan New Trip page.
          </p>
        </div>
      ) : null}

      <div className="grid md:grid-cols-3 gap-8">
        {trips.map((trip) => (
          <div
            key={trip.trip_id}
            className="bg-slate-900 rounded-[35px] overflow-hidden border border-slate-800 hover:scale-105 transition"
          >
            <img
              src={
                trip.cover_photo ||
                "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop"
              }
              alt={trip.trip_name}
              className="h-60 w-full object-cover"
            />

            <div className="p-6">
              <h2 className="text-3xl font-bold">
                {trip.trip_name}
              </h2>

              <p className="text-gray-400 mt-2">
                {formatDateRange(
                  trip.start_date,
                  trip.end_date
                )}
              </p>

              <p className="text-gray-300 mt-4 line-clamp-3">
                {trip.description ||
                  "No description added yet."}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MyTrips
