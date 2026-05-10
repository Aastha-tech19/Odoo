import { useState } from "react"
import {
  Mail,
  MapPin,
  Camera,
} from "lucide-react"
import { updateUserProfile } from "../services/api"

function Profile() {
  const storedUser = localStorage.getItem(
    "traveloopUser"
  )
  const user = storedUser
    ? JSON.parse(storedUser)
    : null
  const initials = user?.full_name
    ? user.full_name
        .split(" ")
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part[0]?.toUpperCase())
        .join("")
    : "GU"

  const [formData, setFormData] = useState({
    full_name: user?.full_name || "",
    email: user?.email || "",
    country: user?.country || "India",
    travel_preference:
      user?.travel_preference || "",
  })
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")

  function handleChange(event) {
    const { name, value } = event.target
    setFormData((current) => ({
      ...current,
      [name]: value,
    }))
  }

  async function handleSave() {
    if (!user?.user_id) {
      setError("Please log in again.")
      setMessage("")
      return
    }

    setError("")
    setMessage("")

    try {
      const result =
        await updateUserProfile(
          user.user_id,
          formData
        )

      localStorage.setItem(
        "traveloopUser",
        JSON.stringify(result.user)
      )
      setMessage(result.message)
    } catch (apiError) {
      setError(apiError.message)
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white px-8 py-10">
      <h1 className="text-5xl font-bold">
        My Profile
      </h1>

      <p className="text-gray-400 mt-3">
        Manage your travel profile
      </p>

      <div className="grid lg:grid-cols-3 gap-8 mt-10">
        <div className="bg-slate-900 border border-slate-800 rounded-[40px] p-8 text-center">
          <div className="relative w-fit mx-auto">
            <div className="h-36 w-36 rounded-full bg-cyan-500 flex items-center justify-center text-black text-5xl font-bold">
              {initials}
            </div>

            <button
              type="button"
              className="absolute bottom-0 right-0 bg-cyan-500 p-3 rounded-full text-black"
            >
              <Camera size={18} />
            </button>
          </div>

          <h2 className="text-3xl font-bold mt-6">
            {formData.full_name ||
              "Guest User"}
          </h2>

          <div className="flex items-center justify-center gap-2 text-gray-400 mt-3">
            <Mail size={18} />
            {formData.email ||
              "No email available"}
          </div>

          <div className="flex items-center justify-center gap-2 text-gray-400 mt-2">
            <MapPin size={18} />
            {formData.country || "No country set"}
          </div>
        </div>

        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-[40px] p-8">
          <h2 className="text-3xl font-bold">
            Edit Profile
          </h2>

          <div className="grid md:grid-cols-2 gap-5 mt-8">
            <input
              type="text"
              name="full_name"
              placeholder="Full Name"
              value={formData.full_name}
              onChange={handleChange}
              className="bg-slate-800 border border-slate-700 rounded-2xl p-5 outline-none"
            />

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              className="bg-slate-800 border border-slate-700 rounded-2xl p-5 outline-none"
            />

            <input
              type="text"
              name="country"
              placeholder="Country"
              value={formData.country}
              onChange={handleChange}
              className="bg-slate-800 border border-slate-700 rounded-2xl p-5 outline-none"
            />

            <input
              type="text"
              name="travel_preference"
              placeholder="Travel Preference"
              value={formData.travel_preference}
              onChange={handleChange}
              className="bg-slate-800 border border-slate-700 rounded-2xl p-5 outline-none"
            />
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
            type="button"
            onClick={handleSave}
            className="mt-8 bg-cyan-500 hover:bg-cyan-400 text-black px-7 py-4 rounded-2xl font-semibold transition"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  )
}

export default Profile
