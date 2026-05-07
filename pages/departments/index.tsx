import Link from 'next/link';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import StayInTheLoop from '../../components/StayInTheLoop';

const departments = [
  {
    icon: "/icons/Vector (1).png",
    title: "Mechanical Engineering",
    desc: "Focused on the design, analysis, and manufacturing of mechanical systems. Students gain hands-on experience in thermodynamics, fluid mechanics, and machine design — shaping innovators who build the technologies that drive industries.",
    path: "/departments/mechanical"
  },
  {
    icon: "/icons/Vector (2).png",
    title: "Aerospace Engineering",
    desc: "Dedicated to the study of flight and space systems, this department trains students in aerodynamics, propulsion, and aircraft design, preparing them to lead advancements in aviation and space technology.",
    path: "/departments/aerospace"
  },
  {
    icon: "/icons/Vector (3).png",
    title: "Chemical Engineering",
    desc: "Combines chemistry and engineering to develop processes that transform raw materials into valuable products, emphasizing innovation in sustainable and industrial chemical production.",
    path: "/departments/chemical"
  },
  {
    icon: "/icons/Vector (4).png",
    title: "Electronics & Computer Engineering",
    desc: "Covers the principles of electrical circuits, power systems, and electronics. The department equips students with the skills to design and optimize systems that power modern technology.",
    path: "/departments/electronics-computer"
  },
  {
    icon: "/icons/Vector (5).png",
    title: "Civil Engineering",
    desc: "Centers on the planning, design, and construction of infrastructure projects such as roads, bridges, and water systems, promoting sustainable development and environmental stewardship.",
    path: "/departments/civil"
  },
  {
    icon: "/icons/Vector (6).png",
    title: "Industrial Engineering",
    desc: "Focused on optimizing systems, processes, and resources for maximum efficiency and productivity. The department equips students with analytical, managerial, and technical skills to design smarter workflows and improve performance across industries.",
    path: "/departments/industrial"
  }
];

export default function Departments() {
  return (
    <div className="min-h-screen bg-white font-roboto">
      <Header />

      {/* ── HERO SECTION ── */}
      <section className="w-full bg-gradient-to-r from-[#f8f4f0] to-[#f5f1ed] py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 md:px-24">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            {/* Left: Text Content */}
            <div className="lg:w-1/2 w-full space-y-6">
              <div className="space-y-4">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium text-[#212121] leading-tight">
                  Explore Our <span className="text-[#E6731F]">Engineering</span> Disciplines
                </h1>
                <p className="text-lg md:text-xl text-[#4B5563] leading-relaxed">
                  The Faculty of Engineering at Lagos State University comprises six dynamic departments, each dedicated to advancing knowledge, fostering innovation, and training the next generation of engineering leaders who will shape the future of technology and infrastructure.
                </p>
              </div>

              <div className="space-y-3 pt-4">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#5B933C] flex items-center justify-center mt-1">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="text-base text-[#212121]">World-class faculty committed to excellence in teaching and research</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#5B933C] flex items-center justify-center mt-1">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="text-base text-[#212121]">State-of-the-art facilities and hands-on learning opportunities</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#5B933C] flex items-center justify-center mt-1">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="text-base text-[#212121]">Industry partnerships and career advancement pathways</p>
                </div>
              </div>
            </div>

            {/* Right: Statistics */}
            <div className="lg:w-1/2 w-full">
              <div className="grid grid-cols-2 gap-8">
                <div className="space-y-3 text-center">
                  <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#E6731F]">6</div>
                  <p className="text-base md:text-lg text-[#212121] font-medium">Departments</p>
                  <p className="text-xs md:text-sm text-[#4B5563]">Diverse engineering disciplines</p>
                </div>
                <div className="space-y-3 text-center">
                  <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#5B933C]">100+</div>
                  <p className="text-base md:text-lg text-[#212121] font-medium">Faculty Members</p>
                  <p className="text-xs md:text-sm text-[#4B5563]">Expert educators</p>
                </div>
                <div className="space-y-3 text-center">
                  <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#E6731F]">2000+</div>
                  <p className="text-base md:text-lg text-[#212121] font-medium">Active Students</p>
                  <p className="text-xs md:text-sm text-[#4B5563]">Future leaders</p>
                </div>
                <div className="space-y-3 text-center">
                  <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#5B933C]">26</div>
                  <p className="text-base md:text-lg text-[#212121] font-medium">Years Strong</p>
                  <p className="text-xs md:text-sm text-[#4B5563]">Proven excellence</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── DEPARTMENTS GRID ── */}
      <section className="w-full bg-white py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-6 md:px-24">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-3xl md:text-4xl font-medium">
              <span className="text-[#212121]">Our Engineering </span>
              <span className="text-[#E6731F]">Disciplines</span>
            </h2>
            <p className="mt-4 text-lg text-[#4B5563] max-w-2xl mx-auto">
              Each department is designed to provide comprehensive education and practical experience in its respective field
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {departments.map((dept, i) => (
              <div
                key={i}
                className="bg-white p-6 rounded-2xl border border-gray-100 flex flex-col h-full group hover:border-[#C93601] transition-all duration-300"
                style={{
                  boxShadow: '0 2px 4px 0 rgba(0,0,0,0.08), 0 4px 6px 0 rgba(0,0,0,0.06), 0 8px 12px -2px rgba(0,0,0,0.08)',
                  transitionProperty: 'box-shadow, border-color'
                }}
              >
                <div className="w-12 h-12 mb-4">
                  <img src={dept.icon} alt={dept.title} className="w-full h-full object-contain" />
                </div>
                <h3 className="text-xl font-medium text-[#212121] mb-3 group-hover:text-[#C93601] transition-colors">
                  {dept.title}
                </h3>
                <p className="text-sm text-[#4B5563] leading-relaxed flex-1 mb-6">
                  {dept.desc}
                </p>
                <Link href={dept.path}>
                  <button className="inline-flex items-center gap-2 bg-[#C93601] text-white px-4 py-2 rounded text-sm font-semibold hover:bg-[#9b1c00] transition-colors">
                    View Details
                    <span className="text-lg leading-none">›</span>
                  </button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STAY IN THE LOOP ── */}
      <StayInTheLoop />

      {/* ── ORANGE DIVIDER ── */}
      <div className="w-full bg-[#E6731F] h-20"></div>

      <Footer />
    </div>
  );
}
