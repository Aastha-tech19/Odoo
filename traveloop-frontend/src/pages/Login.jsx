import { Link } from "react-router-dom"

function Login() {
  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center relative px-4"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2000&auto=format&fit=crop')",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Glow */}
      <div className="absolute top-20 left-20 h-72 w-72 bg-cyan-500/20 blur-[120px] rounded-full" />

      <div className="relative z-10 backdrop-blur-2xl bg-white/10 border border-white/20 rounded-[40px] p-10 shadow-2xl w-full max-w-md">

        <h1 className="text-5xl font-bold text-white text-center">
          Welcome Back ✈️
        </h1>

        <p className="text-gray-300 text-center mt-3">
          Login to continue your travel journey
        </p>

        <div className="space-y-5 mt-10">
          <input
            type="email"
            placeholder="Email Address"
            className="w-full bg-white/10 border border-white/20 rounded-2xl p-5 text-white placeholder:text-gray-300 outline-none"
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full bg-white/10 border border-white/20 rounded-2xl p-5 text-white placeholder:text-gray-300 outline-none"
          />

          <button className="w-full bg-cyan-500 hover:bg-cyan-400 text-black font-bold py-4 rounded-2xl transition duration-300 hover:scale-[1.02]">
            Login
          </button>
        </div>

        <p className="text-center text-gray-300 mt-8">
          Don’t have an account?{" "}
          <Link
            to="/signup"
            className="text-cyan-400 font-semibold"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Login