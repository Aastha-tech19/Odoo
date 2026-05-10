import {
  Users,
  Plane,
  MapPinned,
  Wallet,
} from "lucide-react"

function Admin() {
  const stats = [
    {
      title: "Users",
      value: "1,240",
      icon: Users,
    },
    {
      title: "Trips",
      value: "850",
      icon: Plane,
    },
    {
      title: "Top City",
      value: "Goa",
      icon: MapPinned,
    },
    {
      title: "Revenue",
      value: "₹3.2L",
      icon: Wallet,
    },
  ]

  return (
    <div className="min-h-screen bg-slate-950 text-white px-8 py-10">

      <h1 className="text-5xl font-bold">
        Admin Dashboard 📊
      </h1>

      <p className="text-gray-400 mt-3">
        Monitor platform insights
      </p>

      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6 mt-10">
        {stats.map((item, index) => {
          const Icon = item.icon

          return (
            <div
              key={index}
              className="bg-slate-900 border border-slate-800 rounded-[35px] p-8 hover:border-cyan-400 transition"
            >
              <Icon
                className="text-cyan-400 mb-5"
                size={35}
              />

              <h2 className="text-4xl font-bold">
                {item.value}
              </h2>

              <p className="text-gray-400 mt-2">
                {item.title}
              </p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Admin