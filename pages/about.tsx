import { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import StayInTheLoop from "../components/StayInTheLoop";
import BackgroundDecor from "../components/BackgroundDecor";
import { getCachedData, setCachedData } from "../lib/cacheUtils";

interface Executive {
  id: string;
  name: string;
  position: string;
  bio: string;
  image_url: string;
  email: string;
  type: string;
  council: string;
  year: string;
  created_at: string;
}

interface DepartmentAdmin {
  id: string;
  name: string;
  department: string;
  bio: string;
  image_url: string;
  created_at: string;
}

export default function About() {
  const [adminsIndex, setAdminsIndex] = useState(0);
  const [pastLeadersIndex, setPastLeadersIndex] = useState(0);
  const [departmentAdmins, setDepartmentAdmins] = useState<DepartmentAdmin[]>([]);
  const [currentExecutives, setCurrentExecutives] = useState<Executive[]>([]);
  const [pastExecutives, setPastExecutives] = useState<Executive[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);

      // Fetch department admins
      const deptAdminsCache = getCachedData<DepartmentAdmin[]>('department_admins');
      if (deptAdminsCache) {
        setDepartmentAdmins(deptAdminsCache);
      } else {
        const deptAdminsResponse = await fetch('/api/department-admins');
        if (deptAdminsResponse.ok) {
          const deptAdminsData = await deptAdminsResponse.json();
          setCachedData('department_admins', deptAdminsData);
          setDepartmentAdmins(deptAdminsData);
        }
      }

      // Fetch current executives
      const currentExecsCache = getCachedData<Executive[]>('executives_current');
      if (currentExecsCache) {
        setCurrentExecutives(currentExecsCache);
      } else {
        const currentExecsResponse = await fetch('/api/executives?type=current');
        if (currentExecsResponse.ok) {
          const currentExecsData = await currentExecsResponse.json();
          setCachedData('executives_current', currentExecsData);
          setCurrentExecutives(currentExecsData);
        }
      }

      // Fetch past executives (SEC)
      const pastExecsCache = getCachedData<Executive[]>('executives_past');
      if (pastExecsCache) {
        setPastExecutives(pastExecsCache);
      } else {
        const pastExecsResponse = await fetch('/api/executives?type=past&council=SEC');
        if (pastExecsResponse.ok) {
          const pastExecsData = await pastExecsResponse.json();
          setCachedData('executives_past', pastExecsData);
          setPastExecutives(pastExecsData);
        }
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Auto-scroll carousels
  useEffect(() => {
    const interval = setInterval(() => {
      setAdminsIndex((prev) => (prev + 1) % 3);
      setPastLeadersIndex((prev) => (prev + 1) % 3);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Fallback data for display
  const displayCurrentExecutives = currentExecutives.slice(0, 3).length > 0 ? currentExecutives.slice(0, 3) : [
    {
      id: 'placeholder-1',
      name: 'Executive 1',
      position: 'Position 1',
      bio: 'No data',
      image_url: 'https://api.builder.io/api/v1/image/assets/TEMP/026e3cf0530cd4d9cd88a968d92527b75c8b3dcd?width=1472',
      email: '',
      type: 'current',
      council: 'SEC',
      year: '',
      created_at: new Date().toISOString(),
    },
    {
      id: 'placeholder-2',
      name: 'Executive 2',
      position: 'Position 2',
      bio: 'No data',
      image_url: 'https://api.builder.io/api/v1/image/assets/TEMP/026e3cf0530cd4d9cd88a968d92527b75c8b3dcd?width=1472',
      email: '',
      type: 'current',
      council: 'SEC',
      year: '',
      created_at: new Date().toISOString(),
    },
    {
      id: 'placeholder-3',
      name: 'Executive 3',
      position: 'Position 3',
      bio: 'No data',
      image_url: 'https://api.builder.io/api/v1/image/assets/TEMP/fec7b632254edccf5502369320e0f9c632ad3649?width=1472',
      email: '',
      type: 'current',
      council: 'SEC',
      year: '',
      created_at: new Date().toISOString(),
    },
  ];

  const displayPastExecutives = pastExecutives.slice(0, 3).length > 0 ? pastExecutives.slice(0, 3) : [
    {
      id: 'past-placeholder-1',
      name: 'Past Executive 1',
      position: 'Position',
      bio: 'No data',
      image_url: 'https://api.builder.io/api/v1/image/assets/TEMP/026e3cf0530cd4d9cd88a968d92527b75c8b3dcd?width=1472',
      email: '',
      type: 'past',
      council: 'SEC',
      year: '',
      created_at: new Date().toISOString(),
    },
    {
      id: 'past-placeholder-2',
      name: 'Past Executive 2',
      position: 'Position',
      bio: 'No data',
      image_url: 'https://api.builder.io/api/v1/image/assets/TEMP/026e3cf0530cd4d9cd88a968d92527b75c8b3dcd?width=1472',
      email: '',
      type: 'past',
      council: 'SEC',
      year: '',
      created_at: new Date().toISOString(),
    },
    {
      id: 'past-placeholder-3',
      name: 'Past Executive 3',
      position: 'Position',
      bio: 'No data',
      image_url: 'https://api.builder.io/api/v1/image/assets/TEMP/fec7b632254edccf5502369320e0f9c632ad3649?width=1472',
      email: '',
      type: 'past',
      council: 'SEC',
      year: '',
      created_at: new Date().toISOString(),
    },
  ];

  const displayDepartmentAdmins = departmentAdmins.slice(0, 3).length > 0 ? departmentAdmins.slice(0, 3) : [
    {
      id: 'admin-placeholder-1',
      name: 'HOD',
      department: 'mechanical',
      bio: 'No data',
      image_url: 'https://api.builder.io/api/v1/image/assets/TEMP/026e3cf0530cd4d9cd88a968d92527b75c8b3dcd?width=1472',
      created_at: new Date().toISOString(),
    },
    {
      id: 'admin-placeholder-2',
      name: 'HOD',
      department: 'civil',
      bio: 'No data',
      image_url: 'https://api.builder.io/api/v1/image/assets/TEMP/026e3cf0530cd4d9cd88a968d92527b75c8b3dcd?width=1472',
      created_at: new Date().toISOString(),
    },
    {
      id: 'admin-placeholder-3',
      name: 'HOD',
      department: 'electronics-computer',
      bio: 'No data',
      image_url: 'https://api.builder.io/api/v1/image/assets/TEMP/fec7b632254edccf5502369320e0f9c632ad3649?width=1472',
      created_at: new Date().toISOString(),
    },
  ];

  return (
    <div className="min-h-screen bg-white relative">
      <div className="relative z-10">
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

            {loading ? (
              <div className="text-center py-12 text-gray-600">Loading administrators...</div>
            ) : (
              <>
                <div className="relative overflow-hidden">
                  <div
                    className="flex transition-transform duration-700 ease-in-out"
                    style={{ transform: `translateX(-${adminsIndex * 100}%)` }}
                  >
                    {[0, 1, 2].map((slideIndex) => (
                      <div key={slideIndex} className="w-full flex-shrink-0 px-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                          {displayDepartmentAdmins.map((admin) => (
                            <div
                              key={admin.id}
                              className="bg-white rounded-2xl shadow-md overflow-hidden"
                            >
                              <img
                                src={admin.image_url}
                                alt={admin.name}
                                className="w-full h-64 object-cover"
                              />
                              <div className="p-6">
                                <h4 className="text-xl font-medium text-[#212121]">
                                  {admin.name}
                                </h4>
                                <div className="inline-block mt-2 bg-[#C93601] text-white text-sm px-3 py-1 rounded">
                                  HOD
                                </div>
                                <p className="mt-4 text-sm text-[#4B5563]">{admin.bio}</p>
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
                  {[0, 1, 2].map((idx) => (
                    <div
                      key={idx}
                      className={`h-3 rounded-full transition-all ${adminsIndex === idx ? "w-12 bg-[#E6731F]" : "w-3 bg-[#C45D16] opacity-40"}`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        </section>

        {/* PAST NUESA LASU LEADERS - CAROUSEL */}
        <section className="w-full py-16">
          <div className="max-w-7xl mx-auto px-6 md:px-24">
            <h2 className="text-3xl font-medium text-center mb-12">
              Past <span className="text-[#C45D16]">NUESA LASU Leaders</span>
            </h2>

            {loading ? (
              <div className="text-center py-12 text-gray-600">Loading past leaders...</div>
            ) : (
              <>
                <div className="relative overflow-hidden">
                  <div
                    className="flex transition-transform duration-700 ease-in-out"
                    style={{ transform: `translateX(-${pastLeadersIndex * 100}%)` }}
                  >
                    {[0, 1, 2].map((slideIndex) => (
                      <div key={slideIndex} className="w-full flex-shrink-0 px-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                          {displayPastExecutives.map((leader) => (
                            <div
                              key={leader.id}
                              className="bg-white rounded-2xl shadow-md overflow-hidden"
                            >
                              <img
                                src={leader.image_url}
                                alt={leader.name}
                                className="w-full h-64 object-cover"
                              />
                              <div className="p-6">
                                <h4 className="text-xl font-medium text-[#212121]">
                                  {leader.name}
                                </h4>
                                <div className="inline-block mt-2 bg-[#C93601] text-white text-sm px-3 py-1 rounded">
                                  {leader.position}
                                </div>
                                <p className="mt-4 text-sm text-[#4B5563]">{leader.bio}</p>
                                <div className="mt-4 flex gap-3">
                                  {leader.email && (
                                    <a href={`mailto:${leader.email}`} className="text-[#E6731F] hover:text-[#C45D16]">
                                      <svg width="24" height="24" viewBox="0 0 32 32" fill="none">
                                        <path d="M25.3333 4C26.0406 4 26.7189 4.28095 27.219 4.78105C27.719 5.28115 28 5.95942 28 6.66667V25.3333C28 26.0406 27.719 26.7189 27.219 27.219C26.7189 27.719 26.0406 28 25.3333 28H6.66667C5.95942 28 5.28115 27.719 4.78105 27.219C4.28095 26.7189 4 26.0406 4 25.3333V6.66667C4 5.95942 4.28095 5.28115 4.78105 4.78105C5.28115 4.28095 5.95942 4 6.66667 4H25.3333ZM24.6667 24.6667V17.6C24.6667 16.4472 24.2087 15.3416 23.3936 14.5264C22.5784 13.7113 21.4728 13.2533 20.32 13.2533C19.1867 13.2533 17.8667 13.9467 17.2267 14.9867V13.5067H13.5067V24.6667H17.2267V18.0933C17.2267 17.0667 18.0533 16.2267 19.08 16.2267C19.5751 16.2267 20.0499 16.4233 20.3999 16.7734C20.75 17.1235 20.9467 17.5983 20.9467 18.0933V24.6667H24.6667ZM9.17333 11.4133C9.76742 11.4133 10.3372 11.1773 10.7573 10.7573C11.1773 10.3372 11.4133 9.76742 11.4133 9.17333C11.4133 7.93333 10.4133 6.92 9.17333 6.92C8.57571 6.92 8.00257 7.1574 7.57999 7.57999C7.1574 8.00257 6.92 8.57571 6.92 9.17333C6.92 10.4133 7.93333 11.4133 9.17333 11.4133ZM11.0267 24.6667V13.5067H7.33333V24.6667H11.0267Z" fill="#E6731F"/>
                                      </svg>
                                    </a>
                                  )}
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
                  {[0, 1, 2].map((idx) => (
                    <div
                      key={idx}
                      className={`h-3 rounded-full transition-all ${pastLeadersIndex === idx ? "w-12 bg-[#E6731F]" : "w-3 bg-[#C45D16] opacity-40"}`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        </section>

        {/* STAY IN THE LOOP */}
        <StayInTheLoop />

        <div className="w-full bg-[#E6731F] h-20"></div>

        <Footer />
      </div>
    </div>
  );
}
