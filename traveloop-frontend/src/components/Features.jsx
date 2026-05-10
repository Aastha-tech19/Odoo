function Features() {
  const features = [
    {
      title: "Smart Planning",
      desc: "AI-powered recommendations for your dream trip.",
      icon: "🗺️",
    },
    {
      title: "Affordable Deals",
      desc: "Find budget-friendly stays and experiences.",
      icon: "💸",
    },
    {
      title: "Safe Journey",
      desc: "Trusted destinations with verified experiences.",
      icon: "🛡️",
    },
  ]

  return (
    <section className="bg-slate-950 text-white py-24 px-6 md:px-16">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-5xl font-bold text-center mb-4">
          Why Choose Traveloop? 🌍
        </h2>

        <p className="text-center text-gray-400 mb-14 text-lg">
          Travel smarter with modern AI-powered planning
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((item, index) => (
            <div
              key={index}
              className="bg-slate-900 border border-slate-800 rounded-[30px] p-10 text-center hover:border-cyan-500 hover:-translate-y-2 transition duration-500"
            >
              <div className="text-6xl mb-6">
                {item.icon}
              </div>

              <h3 className="text-3xl font-bold">
                {item.title}
              </h3>

              <p className="text-gray-400 mt-4 text-lg">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Features