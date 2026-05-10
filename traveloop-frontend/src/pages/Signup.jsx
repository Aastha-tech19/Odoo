import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

import { signupUser } from "../services/api"

function Signup() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    password: "",
  })
  const [error, setError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

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
    setIsSubmitting(true)

    try {
      await signupUser(formData)
      navigate("/login")
    } catch (apiError) {
      setError(apiError.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center relative px-4"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2000&auto=format&fit=crop')",
      }}
    >
      <div className="absolute inset-0 bg-black/60" />
      <div className="absolute bottom-20 right-20 h-72 w-72 bg-cyan-500/20 blur-[120px] rounded-full" />

      <div className="relative z-10 backdrop-blur-2xl bg-white/10 border border-white/20 rounded-[40px] p-10 shadow-2xl w-full max-w-md">
        <h1 className="text-5xl font-bold text-white text-center">
          Join Traveloop
        </h1>

        <p className="text-gray-300 text-center mt-3">
          Create your travel account
        </p>

        <form
          onSubmit={handleSubmit}
          className="space-y-5 mt-10"
        >
          <input
            type="text"
            name="full_name"
            placeholder="Full Name"
            value={formData.full_name}
            onChange={handleChange}
            className="w-full bg-white/10 border border-white/20 rounded-2xl p-5 text-white placeholder:text-gray-300 outline-none"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className="w-full bg-white/10 border border-white/20 rounded-2xl p-5 text-white placeholder:text-gray-300 outline-none"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full bg-white/10 border border-white/20 rounded-2xl p-5 text-white placeholder:text-gray-300 outline-none"
            required
          />

          {error ? (
            <p className="text-sm text-red-300">
              {error}
            </p>
          ) : null}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-cyan-500 hover:bg-cyan-400 disabled:opacity-70 disabled:cursor-not-allowed text-black font-bold py-4 rounded-2xl transition duration-300 hover:scale-[1.02]"
          >
            {isSubmitting
              ? "Creating Account..."
              : "Create Account"}
          </button>
        </form>

        <p className="text-center text-gray-300 mt-8">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-cyan-400 font-semibold"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Signup
