import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts"

function Budget() {
  const data = [
    { name: "Flights", value: 35000 },
    { name: "Hotel", value: 20000 },
    { name: "Food", value: 10000 },
    { name: "Activities", value: 15000 },
  ]

  const COLORS = [
    "#06b6d4",
    "#3b82f6",
    "#8b5cf6",
    "#14b8a6",
  ]

  return (
    <div className="min-h-screen px-8 py-10">
      <h1 className="text-5xl font-bold">
        Budget Breakdown 💰
      </h1>

      <div className="bg-slate-900 border border-slate-800 rounded-[40px] p-8 mt-10">
        <div className="h-[400px]">
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                outerRadius={140}
                dataKey="value"
                label
              >
                {data.map((entry, index) => (
                  <Cell
                    key={index}
                    fill={COLORS[index]}
                  />
                ))}
              </Pie>

              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}

export default Budget