import { useState, useEffect } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import StayInTheLoop from '../../components/StayInTheLoop';
import BackgroundDecor from '../../components/BackgroundDecor';
import ComingSoonSection from '../../components/ComingSoonSection';
import { departmentNames, Lecturer } from '../../lib/departmentUtils';

export default function ChemicalDepartment() {
  const [lecturers, setLecturers] = useState<Lecturer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const dept = 'chemical';
  const deptName = departmentNames[dept];

  useEffect(() => {
    fetchLecturers();
  }, []);

  const fetchLecturers = async () => {
    try {
      const response = await fetch(`/api/lecturers?department=${dept}`);
      if (!response.ok) throw new Error('Failed to fetch lecturers');
      const data = await response.json();
      setLecturers(data || []);
    } catch (err: any) {
      setError(err.message);
      setLecturers([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white relative">
        {/*<BackgroundDecor />*/}
        
        <div className="relative z-10">
          <Header />
          <div className="flex items-center justify-center min-h-[50vh]">
            <p className="text-2xl text-gray-500">Loading lecturers...</p>
          </div>
          <Footer />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white relative">
      {/*<BackgroundDecor />*/}
      
      <div className="relative z-10">
        <Header />

      <section className="w-full py-16 md:py-20 bg-transparent">
        <div className="max-w-7xl mx-auto px-6 md:px-24">
          <div className="flex flex-col items-center gap-5">
            <h1 className="text-3xl md:text-4xl font-medium text-center">
              Department of <span className="text-[#C45D16]">{deptName}</span>
            </h1>
            <p className="text-lg md:text-xl text-[#212121] text-center max-w-5xl leading-relaxed">
              Focused on the study and application of chemical processes, the Department of {deptName} provides students with advanced training in thermodynamics, process control, reactor design, and chemical safety. Our program shapes innovators who solve complex problems in energy, pharmaceuticals, and sustainable industries.
            </p>
          </div>
        </div>
      </section>

      <section className="w-full py-16 md:py-20 bg-transparent">
        <div className="max-w-7xl mx-auto px-6 md:px-24">
          <h2 className="text-3xl md:text-4xl font-medium mb-10">
            Lecturers' <span className="text-[#C45D16]">Directory</span>
          </h2>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-8">
              Error loading lecturers: {error}
            </div>
          )}

          {lecturers.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-xl">No lecturers found for this department.</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
                {lecturers.slice(0, 3).map((lecturer) => (
                  <div key={lecturer.id} className="bg-white rounded-2xl shadow-lg overflow-hidden">
                    <div className="p-5 space-y-5">
                      <div className="flex items-center gap-3">
                        <img
                          src={lecturer.image_url}
                          alt={lecturer.name}
                          className="w-24 h-24 rounded-full object-cover"
                        />
                        <div>
                          <h3 className="text-2xl font-medium text-[#212121]">{lecturer.name}</h3>
                          <p className="text-lg text-[#212121]">{lecturer.specialization}</p>
                        </div>
                      </div>

                      <button className="w-full bg-[#E6731F] text-white px-6 py-3 rounded font-semibold text-sm">
                        Access Course Materials
                      </button>
                    </div>

                    <div className="p-5 space-y-3">
                      <h4 className="text-xl font-medium text-[#212121]">Courses Handled</h4>
                      <div className="space-y-2">
                        {lecturer.courses && lecturer.courses.length > 0 ? (
                          <>
                            {lecturer.courses.slice(0, 7).map((course, cidx) => (
                              <div key={cidx} className="pb-2 border-b border-[#C93601]">
                                <p className="text-base text-[#212121]">
                                  {course.code} [{course.title}]
                                </p>
                              </div>
                            ))}
                            {lecturer.courses.length > 7 && (
                              <button className="text-[#E6731F] text-lg font-medium">View more</button>
                            )}
                          </>
                        ) : (
                          <p className="text-gray-500">No courses assigned</p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-center gap-3">
                {lecturers.map((_, idx) => (
                  <div
                    key={idx}
                    className={`rounded-full ${
                      idx === 0 ? 'w-12 h-3 bg-[#E6731F]' : 'w-2.5 h-2.5 bg-[#C45D16] opacity-40'
                    }`}
                  ></div>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      <ComingSoonSection />

      <StayInTheLoop />
      <div className="w-full bg-[#E6731F] h-20"></div>

      <Footer />
      </div>
    </div>
  );
}
