export default function AboutUsSection() {
  return (
    <section className="w-full bg-white py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-6 md:px-24">
        <div className="flex flex-col items-center gap-5 mb-12">
          <h2 className="text-3xl md:text-4xl font-medium text-center">
            About <span className="text-[#C45D16]">NUESA</span>
          </h2>
          <p className="text-lg md:text-xl text-[#212121] text-center max-w-4xl leading-relaxed">
            The Nigerian Universities Engineering Students' Association (NUESA) is a prominent student organization under the Nigerian Society of Engineers (NSE). It was established to represent and support engineering students across Nigeria, promoting technical development, academic excellence, and professional opportunities within the field of engineering.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
          <div className="w-full lg:w-1/2">
            <div className="relative rounded-xl border-4 border-[#C45D16] shadow-lg overflow-hidden">
              <img
                src="https://api.builder.io/api/v1/image/assets/TEMP/0c76ac64cb2d834e523a913672a9b6f0b730e9b1?width=1708"
                alt="NUESA Team"
                className="w-full h-auto"
              />
            </div>
          </div>

          <div className="w-full lg:w-1/2 space-y-5">
            <h3 className="text-2xl md:text-3xl font-medium">
              Our <span className="text-[#C45D16]">Identity</span>
            </h3>
            <div className="space-y-4 text-base md:text-lg text-[#212121] leading-relaxed">
              <p>
                The Nigerian Universities Engineering Students Association (NUESA) LASU Chapter is dedicated to promoting academic excellence, professional development, and innovation among engineering students.
              </p>
              <p>
                The association serves as a unifying platform that bridges classroom learning with real-world engineering practice, empowering students with the knowledge, skills, and opportunities needed to excel as future engineers and leaders in society.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
