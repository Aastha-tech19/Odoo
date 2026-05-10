import {
  Heart,
  MessageCircle,
  Share2,
  MapPinned,
} from "lucide-react"

function Community() {
  const posts = [
    {
      user: "Rahul",
      city: "Dubai",
      image:
        "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1200&auto=format&fit=crop",
      caption:
        "Luxury trip with amazing skyline ✨",
    },
    {
      user: "Priya",
      city: "Goa",
      image:
        "https://images.unsplash.com/photo-1512343879784-a960bf40e7f?q=80&w=1200&auto=format&fit=crop",
      caption:
        "Beach vibes and sunsets 🌊",
    },
  ]

  return (
    <div className="min-h-screen bg-slate-950 text-white px-8 py-10">

      <h1 className="text-5xl font-bold">
        Travel Community 🌍
      </h1>

      <p className="text-gray-400 mt-3">
        Explore travel stories from others
      </p>

      <div className="grid md:grid-cols-2 gap-8 mt-10">

        {posts.map((post, index) => (
          <div
            key={index}
            className="bg-slate-900 border border-slate-800 rounded-[35px] overflow-hidden hover:border-cyan-400 transition"
          >
            <img
              src={post.image}
              alt={post.city}
              className="h-72 w-full object-cover"
            />

            <div className="p-6">

              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">
                  {post.user}
                </h2>

                <div className="flex items-center gap-2 text-cyan-400">
                  <MapPinned size={18} />
                  {post.city}
                </div>
              </div>

              <p className="text-gray-400 mt-4">
                {post.caption}
              </p>

              <div className="flex gap-5 mt-6 text-gray-400">
                <button className="flex items-center gap-2 hover:text-cyan-400 transition">
                  <Heart size={20} />
                  Like
                </button>

                <button className="flex items-center gap-2 hover:text-cyan-400 transition">
                  <MessageCircle size={20} />
                  Comment
                </button>

                <button className="flex items-center gap-2 hover:text-cyan-400 transition">
                  <Share2 size={20} />
                  Share
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Community