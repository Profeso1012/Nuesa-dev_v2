export default function StayInTheLoop() {
  return (
    <section className="w-full bg-[#793D14] text-white">
      <div className="max-w-7xl mx-auto px-6 md:px-24 py-12 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="text-2xl md:text-3xl font-medium">Stay in the Loop with NUESA LASU</h3>
          <p className="mt-2 text-sm md:text-base">Subscribe to our newsletter for the latest updates on upcoming events.</p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
          <input
            aria-label="email"
            placeholder="Enter your email"
            className="px-3 py-2 rounded text-black w-full sm:w-64"
          />
          <button className="bg-[#E6731F] px-4 py-2 rounded text-white whitespace-nowrap w-full sm:w-auto">
            Subscribe Now
          </button>
        </div>
      </div>
    </section>
  );
}