import {
  LayoutDashboard,
  PlusCircle,
  Plane,
  Map,
  Wallet,
  Notebook,
  CheckSquare,
  Users,
  User,
  Settings,
  Search,
  LogOut,
} from "lucide-react"
import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom"

function Sidebar() {
  const location = useLocation()
  const navigate = useNavigate()

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

  const menuItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Create Trip",
      path: "/create-trip",
      icon: PlusCircle,
    },
    {
      name: "My Trips",
      path: "/my-trips",
      icon: Plane,
    },
    {
      name: "Itinerary",
      path: "/itinerary-builder",
      icon: Map,
    },
    {
      name: "Search",
      path: "/search",
      icon: Search,
    },
    {
      name: "Budget",
      path: "/budget",
      icon: Wallet,
    },
    {
      name: "Checklist",
      path: "/checklist",
      icon: CheckSquare,
    },
    {
      name: "Notes",
      path: "/notes",
      icon: Notebook,
    },
    {
      name: "Community",
      path: "/community",
      icon: Users,
    },
    {
      name: "Profile",
      path: "/profile",
      icon: User,
    },
    {
      name: "Admin",
      path: "/admin",
      icon: Settings,
    },
  ]

  function handleLogout() {
    localStorage.removeItem("traveloopUser")
    navigate("/login")
  }

  return (
    <aside className="fixed top-0 left-0 h-screen w-[290px] overflow-y-auto bg-slate-900 border-r border-slate-800 hidden lg:flex flex-col justify-between p-6 scrollbar-hide">
      <div>
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-cyan-400">
            Traveloop
          </h1>

          <p className="text-gray-400 text-sm mt-2">
            Travel smarter
          </p>
        </div>

        <div className="bg-slate-800 rounded-[30px] p-5 border border-slate-700 mb-8">
          <div className="flex items-center gap-4">
            <div className="h-14 w-14 rounded-full bg-cyan-500 flex items-center justify-center text-black font-bold text-xl">
              {initials}
            </div>

            <div className="min-w-0">
              <h2 className="font-bold text-lg truncate">
                {user?.full_name || "Guest User"}
              </h2>

              <p className="text-gray-400 text-sm truncate">
                {user?.email || "Traveler"}
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-2 pb-20">
          {menuItems.map((item, index) => {
            const Icon = item.icon
            const isActive =
              location.pathname === item.path

            return (
              <Link
                key={index}
                to={item.path}
                className={`flex items-center gap-4 px-5 py-4 rounded-2xl transition duration-300 ${
                  isActive
                    ? "bg-cyan-500 text-black font-semibold"
                    : "text-gray-300 hover:bg-slate-800"
                }`}
              >
                <Icon size={22} />
                {item.name}
              </Link>
            )
          })}
        </div>
      </div>

      <button
        type="button"
        onClick={handleLogout}
        className="flex items-center gap-4 text-red-400 hover:bg-red-500/10 rounded-2xl px-5 py-4 transition"
      >
        <LogOut size={22} />
        Logout
      </button>
    </aside>
  )
}

export default Sidebar
