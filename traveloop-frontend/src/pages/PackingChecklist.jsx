import { Backpack } from "lucide-react"

function PackingChecklist() {
  const items = [
    "Passport",
    "Clothes",
    "Phone Charger",
    "Shoes",
    "Travel Tickets",
    "Toiletries",
  ]

  return (
    <div className="min-h-screen bg-slate-950 text-white px-8 py-10">
      <h1 className="text-5xl font-bold">
        Packing Checklist 🎒
      </h1>

      <p className="text-gray-400 mt-3">
        Don’t forget essentials
      </p>

      <div className="bg-slate-900 border border-slate-800 rounded-[40px] p-8 mt-10 max-w-4xl">

        <div className="space-y-5">
          {items.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between bg-slate-800 rounded-2xl p-5"
            >
              <div className="flex items-center gap-4">
                <Backpack className="text-cyan-400" />
                <span className="text-lg">
                  {item}
                </span>
              </div>

              <input
                type="checkbox"
                className="h-5 w-5 accent-cyan-500"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default PackingChecklist