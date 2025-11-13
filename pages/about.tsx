import { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import StayInTheLoop from "../components/StayInTheLoop";

export default function About() {
  const [leadersIndex, setLeadersIndex] = useState(0);
  const [adminsIndex, setAdminsIndex] = useState(0);
  const [pastLeadersIndex, setPastLeadersIndex] = useState(0);

  // Auto-scroll carousels
  useEffect(() => {
    const interval = setInterval(() => {
      setLeadersIndex((prev) => (prev + 1) % 3);
      setAdminsIndex((prev) => (prev + 1) % 3);
      setPastLeadersIndex((prev) => (prev + 1) % 3);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const leaders = [
    {
      name: "Tony Elumelu",
      role: "President",
      img: "https://api.builder.io/api/v1/image/assets/TEMP/026e3cf0530cd4d9cd88a968d92527b75c8b3dcd?width=1472",
      bio: "I'm a passionate and visionary student leader dedicated to advancing innovation, academic excellence, and unity among engineering students. Committed to creating lasting impact through collaborative projects and representing the voice of all members of the faculty.",
    },
    {
      name: "Tony Elumelu",
      role: "President",
      img: "https://api.builder.io/api/v1/image/assets/TEMP/026e3cf0530cd4d9cd88a968d92527b75c8b3dcd?width=1472",
      bio: "I'm a passionate and visionary student leader dedicated to advancing innovation, academic excellence, and unity among engineering students. Committed to creating lasting impact through collaborative projects and representing the voice of all members of the faculty.",
    },
    {
      name: "Tony Elumelu",
      role: "President",
      img: "https://api.builder.io/api/v1/image/assets/TEMP/fec7b632254edccf5502369320e0f9c632ad3649?width=1472",
      bio: "I'm a passionate and visionary student leader dedicated to advancing innovation, academic excellence, and unity among engineering students. Committed to creating lasting impact through collaborative projects and representing the voice of all members of the faculty.",
    },
  ];

  const admins = [
    {
      name: "Tony Elumelu",
      role: "HOD [Mechanical Engineering]",
      img: "https://api.builder.io/api/v1/image/assets/TEMP/026e3cf0530cd4d9cd88a968d92527b75c8b3dcd?width=1472",
      bio: "I'm a passionate and visionary student leader dedicated to advancing innovation, academic excellence, and unity among engineering students. Committed to creating lasting impact through collaborative projects and representing the voice of all members of the faculty.",
    },
    {
      name: "Tony Elumelu",
      role: "HOD [Civil Engineering]",
      img: "https://api.builder.io/api/v1/image/assets/TEMP/026e3cf0530cd4d9cd88a968d92527b75c8b3dcd?width=1472",
      bio: "I'm a passionate and visionary student leader dedicated to advancing innovation, academic excellence, and unity among engineering students. Committed to creating lasting impact through collaborative projects and representing the voice of all members of the faculty.",
    },
    {
      name: "Tony Elumelu",
      role: "HOD [Electronics & Computer Engineering]",
      img: "https://api.builder.io/api/v1/image/assets/TEMP/fec7b632254edccf5502369320e0f9c632ad3649?width=1472",
      bio: "I'm a passionate and visionary student leader dedicated to advancing innovation, academic excellence, and unity among engineering students. Committed to creating lasting impact through collaborative projects and representing the voice of all members of the faculty.",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* HERO */}
      <section className="w-full bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-24 py-12 lg:py-20 flex flex-col lg:flex-row items-center gap-8">
          <div className="lg:w-1/2 w-full">
            <img
              src="https://api.builder.io/api/v1/image/assets/TEMP/687e721b183a8cb5f0263e54fe86147841d39eb7?width=1582"
              alt="Faculty Building"
              className="w-full rounded-xl border-4 border-[#C45D16] shadow-lg"
            />
          </div>

          <div className="lg:w-1/2 w-full space-y-6">
            <h1 className="text-3xl md:text-4xl font-medium text-[#212121]">
              Philosophy of <span className="text-[#E6731F]">The Faculty</span>
            </h1>
            <p className="text-base text-[#212121] leading-relaxed">
              The philosophy of the Faculty of Engineering at Lagos State
              University is rooted in the belief that engineering education
              should not only impart technical knowledge but also cultivate
              creativity, critical thinking, and problem-solving abilities. The
              faculty is dedicated to producing graduates who can apply
              scientific and engineering principles to address societal
              challenges while upholding the highest standards of ethics,
              professionalism, and integrity.
            </p>

            <div>
              <h2 className="text-2xl font-medium text-[#212121] mb-4">
                Guiding <span className="text-[#E6731F]">Principles</span>
              </h2>
              <p className="text-base text-[#212121] leading-relaxed">
                In line with the university's broader mission, the faculty
                emphasizes innovation, research, and collaboration as key
                drivers of sustainable development. By integrating theory with
                practical experience, the faculty aims to nurture engineers who
                are globally competitive yet locally relevant—individuals
                equipped to contribute meaningfully to technological advancement
                and nation-building.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-4">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-[#E6731F]">
                  2K+
                </div>
                <div className="text-sm text-[#212121] mt-1">Members</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-[#5B933C]">
                  6
                </div>
                <div className="text-sm text-[#212121] mt-1">Departments</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-[#5B933C]">
                  10
                </div>
                <div className="text-sm text-[#212121] mt-1">Annual Events</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-[#5B933C]">
                  26
                </div>
                <div className="text-sm text-[#212121] mt-1">Years Active</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ENGINEERING DEPARTMENTS */}
      <section className="w-full bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-6 md:px-24">
          <h2 className="text-3xl font-medium text-center mb-12">
            Engineering <span className="text-[#C45D16]">Departments</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: "⚙️",
                title: "Mechanical Engineering",
                desc: "Focused on the design, analysis, and manufacturing of mechanical systems. Students gain hands-on experience in thermodynamics, fluid mechanics, and machine design — shaping innovators who build the technologies that drive industries.",
              },
              {
                icon: "🚀",
                title: "Aerospace Engineering",
                desc: "Dedicated to the study of flight and space systems, this department trains students in aerodynamics, propulsion, and aircraft design, preparing them to lead advancements in aviation and space technology.",
              },
              {
                icon: "🧪",
                title: "Chemical Engineering",
                desc: "Combines chemistry and engineering to develop processes that transform raw materials into valuable products, emphasizing innovation in sustainable and industrial chemical production.",
              },
              {
                icon: "⚡",
                title: "Electronics & Computer Engineering",
                desc: "Covers the principles of electrical circuits, power systems, and electronics. The department equips students with the skills to design and optimize systems that power modern technology.",
              },
              {
                icon: "🧱",
                title: "Civil Engineering",
                desc: "Centers on the planning, design, and construction of infrastructure projects such as roads, bridges, and water systems, promoting sustainable development and environmental stewardship.",
              },
              {
                icon: "🏭",
                title: "Industrial Engineering",
                desc: "Focused on optimizing systems, processes, and resources for maximum efficiency and productivity. The department equips students with analytical, managerial, and technical skills to design smarter workflows and improve performance across industries.",
              },
            ].map((dept, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl shadow-md">
                <div className="text-4xl mb-4">{dept.icon}</div>
                <h3 className="text-xl font-medium text-[#212121] mb-3">
                  {dept.title}
                </h3>
                <p className="text-sm text-[#212121] leading-relaxed">
                  {dept.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>



      {/* DEPARTMENTAL ADMINISTRATORS - CAROUSEL */}
      <section className="w-full bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-6 md:px-24">
          <h2 className="text-3xl font-medium text-center mb-12">
            Departmental <span className="text-[#C45D16]">Administrators</span>
          </h2>

          <div className="relative overflow-hidden">
            <div
              className="flex transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${adminsIndex * 100}%)` }}
            >
              {admins.map((admin, idx) => (
                <div key={idx} className="w-full flex-shrink-0 px-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {admins.map((a, i) => (
                      <div
                        key={i}
                        className="bg-white rounded-2xl shadow-md overflow-hidden"
                      >
                        <img
                          src={a.img}
                          alt={a.name}
                          className="w-full h-64 object-cover"
                        />
                        <div className="p-6">
                          <h4 className="text-xl font-medium text-[#212121]">
                            {a.name}
                          </h4>
                          <div className="inline-block mt-2 bg-[#C93601] text-white text-sm px-3 py-1 rounded">
                            {a.role}
                          </div>
                          <p className="mt-4 text-sm text-[#4B5563]">{a.bio}</p>
                          <button className="mt-4 text-[#E6731F] border border-[#E6731F] px-4 py-2 rounded text-sm font-semibold">
                            View Department
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-center gap-3 mt-8">
            <div
              className={`h-3 rounded-full transition-all ${adminsIndex === 0 ? "w-12 bg-[#E6731F]" : "w-3 bg-[#C45D16] opacity-40"}`}
            />
            <div
              className={`h-3 rounded-full transition-all ${adminsIndex === 1 ? "w-12 bg-[#E6731F]" : "w-3 bg-[#C45D16] opacity-40"}`}
            />
            <div
              className={`h-3 rounded-full transition-all ${adminsIndex === 2 ? "w-12 bg-[#E6731F]" : "w-3 bg-[#C45D16] opacity-40"}`}
            />
          </div>
        </div>
      </section>

      {/* PAST NUESA LASU LEADERS - CAROUSEL */}
      <section className="w-full py-16">
        <div className="max-w-7xl mx-auto px-6 md:px-24">
          <h2 className="text-3xl font-medium text-center mb-12">
            Past <span className="text-[#C45D16]">NUESA LASU Leaders</span>
          </h2>

          <div className="relative overflow-hidden">
            <div
              className="flex transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${pastLeadersIndex * 100}%)` }}
            >
              {leaders.map((leader, idx) => (
                <div key={idx} className="w-full flex-shrink-0 px-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {leaders.map((l, i) => (
                      <div
                        key={i}
                        className="bg-white rounded-2xl shadow-md overflow-hidden"
                      >
                        <img
                          src={l.img}
                          alt={l.name}
                          className="w-full h-64 object-cover"
                        />
                        <div className="p-6">
                          <h4 className="text-xl font-medium text-[#212121]">
                            {l.name}
                          </h4>
                          <div className="inline-block mt-2 bg-[#C93601] text-white text-sm px-3 py-1 rounded">
                            President
                          </div>
                          <p className="mt-4 text-sm text-[#4B5563]">{l.bio}</p>
                          <div className="mt-4 flex gap-3">
                            <svg
                              width="24"
                              height="24"
                              viewBox="0 0 32 32"
                              fill="none"
                            >
                              <path
                                d="M25.3333 4C26.0406 4 26.7189 4.28095 27.219 4.78105C27.719 5.28115 28 5.95942 28 6.66667V25.3333C28 26.0406 27.719 26.7189 27.219 27.219C26.7189 27.719 26.0406 28 25.3333 28H6.66667C5.95942 28 5.28115 27.719 4.78105 27.219C4.28095 26.7189 4 26.0406 4 25.3333V6.66667C4 5.95942 4.28095 5.28115 4.78105 4.78105C5.28115 4.28095 5.95942 4 6.66667 4H25.3333ZM24.6667 24.6667V17.6C24.6667 16.4472 24.2087 15.3416 23.3936 14.5264C22.5784 13.7113 21.4728 13.2533 20.32 13.2533C19.1867 13.2533 17.8667 13.9467 17.2267 14.9867V13.5067H13.5067V24.6667H17.2267V18.0933C17.2267 17.0667 18.0533 16.2267 19.08 16.2267C19.5751 16.2267 20.0499 16.4233 20.3999 16.7734C20.75 17.1235 20.9467 17.5983 20.9467 18.0933V24.6667H24.6667ZM9.17333 11.4133C9.76742 11.4133 10.3372 11.1773 10.7573 10.7573C11.1773 10.3372 11.4133 9.76742 11.4133 9.17333C11.4133 7.93333 10.4133 6.92 9.17333 6.92C8.57571 6.92 8.00257 7.1574 7.57999 7.57999C7.1574 8.00257 6.92 8.57571 6.92 9.17333C6.92 10.4133 7.93333 11.4133 9.17333 11.4133ZM11.0267 24.6667V13.5067H7.33333V24.6667H11.0267Z"
                                fill="#E6731F"
                              />
                            </svg>
                            <svg
                              width="24"
                              height="24"
                              viewBox="0 0 32 32"
                              fill="none"
                            >
                              <path
                                d="M25.2 1.49951H30.1074L19.3874 13.7829L32 30.5007H22.1257L14.3863 20.3635L5.54057 30.5007H0.628571L12.0937 17.3578L0 1.5018H10.1257L17.1109 10.7658L25.2 1.49951ZM23.4743 27.5567H26.1943L8.64 4.29037H5.72343L23.4743 27.5567Z"
                                fill="#E6731F"
                              />
                            </svg>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-center gap-3 mt-8">
            <div
              className={`h-3 rounded-full transition-all ${pastLeadersIndex === 0 ? "w-12 bg-[#E6731F]" : "w-3 bg-[#C45D16] opacity-40"}`}
            />
            <div
              className={`h-3 rounded-full transition-all ${pastLeadersIndex === 1 ? "w-12 bg-[#E6731F]" : "w-3 bg-[#C45D16] opacity-40"}`}
            />
            <div
              className={`h-3 rounded-full transition-all ${pastLeadersIndex === 2 ? "w-12 bg-[#E6731F]" : "w-3 bg-[#C45D16] opacity-40"}`}
            />
          </div>
        </div>
      </section>

      {/* STAY IN THE LOOP */}
      <StayInTheLoop />

      <Footer />
    </div>
  );
}
