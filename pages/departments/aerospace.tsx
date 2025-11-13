import { useState, useEffect } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import StayInTheLoop from '../../components/StayInTheLoop';
import BackgroundDecor from '../../components/BackgroundDecor';
import ComingSoonSection from '../../components/ComingSoonSection';
import { motion } from "framer-motion";
import { FaTools, FaRocket, FaCogs, FaHourglassHalf } from "react-icons/fa";

interface Lecturer {
  id: string;
  name: string;
  specialization: string;
  image_url: string;
  courses?: any[];
}

const departmentNames: Record<string, string> = {
  'aerospace': 'Aerospace Engineering',
  'mechanical': 'Mechanical Engineering',
  'chemical': 'Chemical Engineering',
  'electronics-computer': 'Electronics & Computer Engineering',
  'civil': 'Civil Engineering',
  'industrial': 'Industrial Engineering',
};

const departmentAbbrev: Record<string, string> = {
  'aerospace': 'ASE',
  'mechanical': 'ME',
  'chemical': 'CHE',
  'electronics-computer': 'ECE',
  'civil': 'CVE',
  'industrial': 'IE',
};

export default function AerospaceDepartment() {
  const [lecturerIndex, setLecturerIndex] = useState(0);
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [lecturers, setLecturers] = useState<Lecturer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const dept = 'aerospace';
  const deptName = departmentNames[dept];
  const deptCode = departmentAbbrev[dept];

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

  return (
    <div className="min-h-screen bg-white relative">
      <BackgroundDecor />

      <div className="relative z-10">
        <Header />

      {/* HERO SECTION */}
      <section className="w-full py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-6 md:px-24">
          <div className="flex flex-col items-center gap-5">
            <h1 className="text-3xl md:text-4xl font-medium text-center">
              Department of <span className="text-[#C45D16]">Aerospace Engineering</span>
            </h1>
            <p className="text-lg md:text-xl text-[#212121] text-center max-w-5xl leading-relaxed">
              Dedicated to the study of flight, aircraft, and space systems, the Department of Aerospace Engineering at Lagos State University equips students with the knowledge and technical expertise to shape the future of air and space travel. Through rigorous training in aerodynamics, propulsion, flight mechanics, and aircraft design, we nurture innovators and problem-solvers ready to tackle the challenges of modern aviation and aerospace exploration. Our goal is to inspire the next generation of engineers to push boundaries, pioneer sustainable technologies, and redefine what's possible in the skies and beyond.
            </p>
          </div>
        </div>
      </section>

      {/* LECTURERS' DIRECTORY */}
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
                    <img
                      src={lecturer.image}
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

          {/* PAGINATION DOTS */}
          <div className="flex items-center justify-center gap-3">
            <div className="w-12 h-3 rounded-full bg-[#E6731F]"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-[#C45D16] opacity-40"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-[#C45D16] opacity-40"></div>
          </div>
        </div>
      </section>

      <ComingSoonSection />


      {/* STAY IN THE LOOP */}

      <StayInTheLoop />
      <div className="w-full bg-[#E6731F] h-20"></div>

      <Footer />
      </div>
    </div>
  );
}
