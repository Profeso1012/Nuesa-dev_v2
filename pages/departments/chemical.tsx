import { useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import StayInTheLoop from '../../components/StayInTheLoop';
import BackgroundDecor from '../../components/BackgroundDecor';

export default function ChemicalDepartment() {
  const lecturers = [
    {
      name: 'Dr Olofinkua Joseph',
      specialization: 'Process Engineering',
      image: 'https://api.builder.io/api/v1/image/assets/TEMP/86769e554b9e8dd4e432c4f3fd92b469a1c60d98?width=200',
      courses: [
        'CHE 205 [Chemical Thermodynamics]',
        'CHE 305 [Process Control]',
        'CHE 405 [Reactor Design]',
        'CHE 205 [Unit Operations]',
        'CHE 305 [Mass Transfer]',
        'CHE 405 [Petrochemicals]',
        'CHE 505 [Process Safety]',
      ],
    },
    {
      name: 'Dr Olofinkua Joseph',
      specialization: 'Petrochemical Engineering',
      image: 'https://api.builder.io/api/v1/image/assets/TEMP/86769e554b9e8dd4e432c4f3fd92b469a1c60d98?width=200',
      courses: [
        'CHE 205 [Chemical Thermodynamics]',
        'CHE 305 [Process Control]',
        'CHE 405 [Reactor Design]',
        'CHE 205 [Unit Operations]',
        'CHE 305 [Mass Transfer]',
        'CHE 405 [Petrochemicals]',
        'CHE 505 [Process Safety]',
      ],
    },
    {
      name: 'Dr Olofinkua Joseph',
      specialization: 'Environmental Engineering',
      image: 'https://api.builder.io/api/v1/image/assets/TEMP/ad33659c33381eac40061641b81f19d65a13ad9f?width=200',
      courses: [
        'CHE 205 [Chemical Thermodynamics]',
        'CHE 305 [Process Control]',
        'CHE 405 [Reactor Design]',
        'CHE 205 [Unit Operations]',
        'CHE 305 [Mass Transfer]',
        'CHE 405 [Petrochemicals]',
        'CHE 505 [Process Safety]',
      ],
    },
  ];

  const allCourses = Array(15).fill(null).map((_, idx) => ({
    '100': idx < 12 ? 'CHE 105\n[Chemistry Fundamentals]' : 'NIL',
    '200': 'CHE 205\n[Chemical Thermodynamics]',
    '300': 'CHE 305\n[Process Control]',
    '400': 'CHE 405\n[Reactor Design]',
    '500': 'CHE 505\n[Process Safety]',
  }));

  return (
    <div className="min-h-screen bg-white relative">
      <BackgroundDecor />

      <div className="relative z-10">
        <Header />

      <section className="w-full py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-6 md:px-24">
          <div className="flex flex-col items-center gap-5">
            <h1 className="text-3xl md:text-4xl font-medium text-center">
              Department of <span className="text-[#C45D16]">Chemical Engineering</span>
            </h1>
            <p className="text-lg md:text-xl text-[#212121] text-center max-w-5xl leading-relaxed">
              Combines chemistry and engineering to develop processes that transform raw materials into valuable products. The department emphasizes innovation in sustainable and industrial chemical production, training engineers to address global challenges in energy, environment, and materials.
            </p>
          </div>
        </div>
      </section>

      <section className="w-full py-16 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 md:px-24">
          <h2 className="text-3xl md:text-4xl font-medium mb-10">
            Lecturers' <span className="text-[#C45D16]">Directory</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
            {lecturers.map((lecturer, idx) => (
              <div key={idx} className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="p-5 space-y-5">
                  <div className="flex items-center gap-3">
                    <img src={lecturer.image} alt={lecturer.name} className="w-24 h-24 rounded-full object-cover" />
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
                    {lecturer.courses.slice(0, 7).map((course, cidx) => (
                      <div key={cidx} className="pb-2 border-b border-[#C93601]">
                        <p className="text-base text-[#212121]">{course}</p>
                      </div>
                    ))}
                    <button className="text-[#E6731F] text-lg font-medium">View more</button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-center gap-3">
            <div className="w-12 h-3 rounded-full bg-[#E6731F]"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-[#C45D16] opacity-40"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-[#C45D16] opacity-40"></div>
          </div>
        </div>
      </section>

      <section className="w-full py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-6 md:px-24">
          <h2 className="text-3xl md:text-4xl font-medium mb-10">
            Departmental <span className="text-[#C45D16]">Courses</span>
          </h2>

          <div className="space-y-6">
            <div className="flex justify-end">
              <div className="inline-flex items-center gap-2 px-5 py-3 rounded bg-[rgba(196,93,22,0.2)]">
                <span className="text-[#5B933C] font-semibold text-sm">Filter by semester</span>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M6 9L12 15L18 9" stroke="#5B933C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>

            <div className="bg-[#5B933C] rounded-t-xl px-8 py-6">
              <div className="grid grid-cols-5 gap-4 text-white text-center text-2xl font-medium">
                <div>100 Level</div>
                <div>200 Level</div>
                <div>300 Level</div>
                <div>400 Level</div>
                <div>500 Level</div>
              </div>
            </div>

            <div className="space-y-6">
              {allCourses.map((row, idx) => (
                <div key={idx} className="bg-[rgba(196,93,22,0.2)] px-4 py-4">
                  <div className="grid grid-cols-5 gap-4">
                    {['100', '200', '300', '400', '500'].map((level) => (
                      <div key={level} className="flex justify-center items-center">
                        <div className="text-center border-b border-[#E6731F] pb-2">
                          <p className="text-base md:text-lg text-[#212121] whitespace-pre-line">
                            {row[level as keyof typeof row]}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
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
