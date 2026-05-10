import { useState } from "react"
import { Bot, X, Sparkles } from "lucide-react"

function AIAssistant() {
  const [open, setOpen] = useState(false)
  const [prompt, setPrompt] =
    useState("")
  const [result, setResult] =
    useState("")

  const generateTrip = () => {
    if (!prompt.trim()) return

    setResult(`
📍 Destination: Goa

🗓 Day 1
Beach + Cafe Visit + Sunset

🗓 Day 2
Water Sports + Night Market

🗓 Day 3
Island Tour + Local Food

💰 Estimated Budget:
₹18,000 – ₹22,000

🎒 Essentials:
Sunscreen, Swimwear, Powerbank
    `)
  }

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() =>
          setOpen(!open)
        }
        className="fixed bottom-8 right-8 z-50 bg-cyan-500 hover:bg-cyan-400 text-black p-5 rounded-full shadow-2xl hover:scale-110 transition"
      >
        <Bot size={28} />
      </button>

      {/* Popup */}
      {open && (
        <div className="fixed bottom-28 right-8 z-50 w-[380px] bg-slate-900 border border-slate-800 rounded-[35px] shadow-2xl overflow-hidden">

          {/* Header */}
          <div className="bg-gradient-to-r from-cyan-500 to-blue-600 p-5 flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold text-black">
                Travel AI 🤖
              </h2>

              <p className="text-black/70 text-sm">
                Your smart travel buddy
              </p>
            </div>

            <button
              onClick={() =>
                setOpen(false)
              }
              className="text-black"
            >
              <X />
            </button>
          </div>

          {/* Body */}
          <div className="p-6">
            <p className="text-gray-400 mb-4">
              Try:
              <span className="text-cyan-400">
                {" "}
                “3-day Goa trip under ₹20k”
              </span>
            </p>

            <textarea
              rows="4"
              placeholder="Tell AI your dream trip..."
              value={prompt}
              onChange={(e) =>
                setPrompt(
                  e.target.value
                )
              }
              className="w-full bg-slate-800 border border-slate-700 rounded-2xl p-4 text-white outline-none"
            />

            <button
              onClick={generateTrip}
              className="mt-4 w-full bg-cyan-500 hover:bg-cyan-400 text-black py-4 rounded-2xl font-semibold flex items-center justify-center gap-2 transition"
            >
              <Sparkles size={20} />
              Generate Trip
            </button>

            {result && (
              <div className="mt-5 bg-slate-800 rounded-2xl p-4 whitespace-pre-line text-gray-300 max-h-[250px] overflow-y-auto">
                {result}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}

export default AIAssistant