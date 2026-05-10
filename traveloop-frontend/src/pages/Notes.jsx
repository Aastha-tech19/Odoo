import { Save, PlusCircle } from "lucide-react"

function Notes() {
  const notes = [
    {
      title: "Hotel Reminder",
      text: "Check-in at Hilton at 2 PM",
    },
    {
      title: "Flight Reminder",
      text: "Reach airport 3 hours early",
    },
  ]

  return (
    <div className="min-h-screen bg-slate-950 text-white px-8 py-10">
      <h1 className="text-5xl font-bold">
        Travel Journal 📝
      </h1>

      <p className="text-gray-400 mt-3">
        Save important reminders for your trip
      </p>

      {/* Add Note */}
      <div className="bg-slate-900 border border-slate-800 rounded-[40px] p-8 mt-10">
        <input
          type="text"
          placeholder="Note Title"
          className="w-full bg-slate-800 border border-slate-700 rounded-2xl p-5 outline-none"
        />

        <textarea
          rows="5"
          placeholder="Write your travel note..."
          className="w-full bg-slate-800 border border-slate-700 rounded-2xl p-5 mt-5 outline-none"
        ></textarea>

        <button className="mt-5 bg-cyan-500 hover:bg-cyan-400 text-black px-6 py-4 rounded-2xl flex items-center gap-3 font-semibold transition">
          <PlusCircle size={20} />
          Add Note
        </button>
      </div>

      {/* Notes List */}
      <div className="grid md:grid-cols-2 gap-6 mt-10">
        {notes.map((note, index) => (
          <div
            key={index}
            className="bg-slate-900 border border-slate-800 rounded-[35px] p-6 hover:border-cyan-400 transition"
          >
            <h2 className="text-2xl font-bold">
              {note.title}
            </h2>

            <p className="text-gray-400 mt-3">
              {note.text}
            </p>

            <button className="mt-5 text-cyan-400 flex items-center gap-2">
              <Save size={18} />
              Saved
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Notes