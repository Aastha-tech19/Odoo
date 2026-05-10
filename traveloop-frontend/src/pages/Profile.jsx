import {
  Mail,
  MapPin,
  Camera,
} from "lucide-react"

function Profile() {
  return (
    <div className="min-h-screen bg-slate-950 text-white px-8 py-10">

      <h1 className="text-5xl font-bold">
        My Profile 👤
      </h1>

      <p className="text-gray-400 mt-3">
        Manage your travel profile
      </p>

      <div className="grid lg:grid-cols-3 gap-8 mt-10">

        {/* Profile Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-[40px] p-8 text-center">

          <div className="relative w-fit mx-auto">
            <div className="h-36 w-36 rounded-full bg-cyan-500 flex items-center justify-center text-black text-5xl font-bold">
              A
            </div>

            <button className="absolute bottom-0 right-0 bg-cyan-500 p-3 rounded-full text-black">
              <Camera size={18} />
            </button>
          </div>

          <h2 className="text-3xl font-bold mt-6">
            Aastha Gupta
          </h2>

          <div className="flex items-center justify-center gap-2 text-gray-400 mt-3">
            <Mail size={18} />
            aastha@email.com
          </div>

          <div className="flex items-center justify-center gap-2 text-gray-400 mt-2">
            <MapPin size={18} />
            India
          </div>
        </div>

        {/* Edit Form */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-[40px] p-8">

          <h2 className="text-3xl font-bold">
            Edit Profile
          </h2>

          <div className="grid md:grid-cols-2 gap-5 mt-8">

            <input
              type="text"
              placeholder="Full Name"
              className="bg-slate-800 border border-slate-700 rounded-2xl p-5 outline-none"
            />

            <input
              type="email"
              placeholder="Email Address"
              className="bg-slate-800 border border-slate-700 rounded-2xl p-5 outline-none"
            />

            <input
              type="text"
              placeholder="Country"
              className="bg-slate-800 border border-slate-700 rounded-2xl p-5 outline-none"
            />

            <input
              type="text"
              placeholder="Travel Preference"
              className="bg-slate-800 border border-slate-700 rounded-2xl p-5 outline-none"
            />
          </div>

          <button className="mt-8 bg-cyan-500 hover:bg-cyan-400 text-black px-7 py-4 rounded-2xl font-semibold transition">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  )
}

export default Profile