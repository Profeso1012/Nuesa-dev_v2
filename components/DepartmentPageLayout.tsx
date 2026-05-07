import { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import StayInTheLoop from './StayInTheLoop';
import PersonCarousel, { PersonCard } from './PersonCarousel';
import LecturerCarousel from './LecturerCarousel';
import { Lecturer } from '../lib/departmentUtils';

export interface DeptPageProps {
  deptKey: string;
  deptName: string;
  subtitle: string;
  aboutImage: string;
  aboutParagraphs: string[];
}

interface HOD {
  id: string;
  name: string;
  bio: string;
  image_url: string;
  linkedin_url?: string;
  x_url?: string;
}

interface DeptExec {
  id: string;
  name: string;
  position: string;
  bio: string;
  image_url: string;
  email?: string;
  linkedin_url?: string;
  x_url?: string;
}

export default function DepartmentPageLayout({
  deptKey,
  deptName,
  subtitle,
  aboutImage,
  aboutParagraphs,
}: DeptPageProps) {
  const [lecturers, setLecturers] = useState<Lecturer[]>([]);
  const [hod, setHod] = useState<HOD | null>(null);
  const [deptExecs, setDeptExecs] = useState<DeptExec[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const [lecRes, hodRes, execRes] = await Promise.all([
        fetch(`/api/lecturers?department=${deptKey}`),
        fetch(`/api/department-admins?department=${deptKey}`),
        fetch(`/api/department-executives?department=${deptKey}&type=current`),
      ]);

      const lecData = await lecRes.json();
      const hodData = await hodRes.json();
      const execData = await execRes.json();

      setLecturers(Array.isArray(lecData) ? lecData.map((l: any) => ({
        ...l,
        description: l.bio || l.description || '',
      })) : []);

      if (Array.isArray(hodData) && hodData.length > 0) setHod(hodData[0]);
      setDeptExecs(Array.isArray(execData) ? execData : []);
    };

    fetchData();
  }, [deptKey]);

  // Map lecturers to PersonCard for carousel
  const lecturerCards: Lecturer[] = lecturers;

  // Map dept execs to PersonCard
  const execCards: PersonCard[] = deptExecs.map(e => ({
    id: e.id,
    name: e.name,
    position: e.position,
    bio: e.bio || '',
    image_url: e.image_url || '/person.png',
    email: e.email,
  }));

  return (
    <div className="min-h-screen bg-white font-roboto">
      <Header />

      {/* Title */}
      <section className="py-12 md:py-14">
        <div className="max-w-7xl mx-auto px-6 md:px-24 flex flex-col items-center gap-3">
          <h1 className="text-3xl md:text-[36px] font-medium text-center text-[#212121] leading-tight">{deptName}</h1>
          <p className="text-xl md:text-[22px] text-[#212121] text-center leading-relaxed max-w-2xl">{subtitle}</p>
        </div>
      </section>

      {/* About */}
      <section className="pb-12 md:pb-14">
        <div className="max-w-7xl mx-auto px-6 md:px-24">
          <div className="flex flex-col md:flex-row md:items-center gap-10 md:gap-16 lg:gap-20">
            <div className="w-full md:w-1/2 flex-shrink-0">
              <img src={aboutImage} alt={`${deptName} students`} className="w-full h-full object-cover"
                style={{ minHeight: '400px', clipPath: 'path("M 60 18 C 140 -8, 310 0, 400 48 C 470 86, 498 170, 480 250 C 462 326, 390 372, 300 368 C 210 364, 90 344, 40 280 C -8 218, -6 130, 24 78 C 38 54, 52 24, 60 18 Z")' }} />
            </div>
            <div className="w-full md:w-1/2 flex flex-col gap-5">
              <h2 className="text-3xl md:text-[32px] font-medium leading-tight">
                <span className="text-[#212121]">About </span><span className="text-[#C45D16]">Department</span>
              </h2>
              {aboutParagraphs.map((para, i) => (
                <p key={i} className="text-base md:text-[18px] text-[#212121] leading-relaxed">{para}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 md:px-24 my-2"><div className="h-px bg-[#C45D16] opacity-40" /></div>

      {/* HOD */}
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-6 md:px-24">
          <h2 className="text-3xl md:text-[36px] font-medium text-[#212121] text-center mb-10">Head Of Department (H.O.D)</h2>
          <div className="flex flex-col items-center gap-6">
            <div className="rounded-full overflow-hidden w-56 h-56 md:w-72 md:h-72 flex-shrink-0" style={{ border: '4px solid #C45D16' }}>
              <img
                src={hod?.image_url || '/person.png'}
                alt={hod?.name || 'HOD'}
                loading="lazy"
                className={`w-full h-full object-cover ${!hod ? 'opacity-30' : ''}`}
                onError={e => { (e.target as HTMLImageElement).src = '/person.png'; }}
              />
            </div>
            <div className="text-center max-w-2xl">
              <h3 className={`text-[32px] font-medium leading-tight mb-4 ${!hod ? 'text-gray-300' : 'text-[#C45D16]'}`}>
                {hod?.name || 'Name'}
              </h3>
              {hod?.bio && <p className="text-[18px] text-[#212121] leading-relaxed">{hod.bio}</p>}
              {!hod && <p className="text-gray-300 text-[18px]">Bio will appear here once data is available.</p>}
              {hod && (hod.linkedin_url || hod.x_url) && (
                <div className="flex justify-center gap-4 mt-4">
                  {hod.linkedin_url && <a href={hod.linkedin_url} target="_blank" rel="noopener noreferrer" className="text-[#E6731F] text-sm underline">LinkedIn</a>}
                  {hod.x_url && <a href={hod.x_url} target="_blank" rel="noopener noreferrer" className="text-[#E6731F] text-sm underline">X</a>}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 md:px-24 my-2"><div className="h-px bg-[#C45D16] opacity-40" /></div>

      {/* Core Lecturers */}
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-6 md:px-24 flex flex-col gap-10">
          <h2 className="text-3xl md:text-[36px] font-medium text-center text-[#212121]">Core Lecturers of Department</h2>
          <LecturerCarousel items={lecturerCards} />
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 md:px-24 my-2"><div className="h-px bg-[#C45D16] opacity-40" /></div>

      {/* Departmental Executives */}
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-6 md:px-24 flex flex-col gap-10">
          <h2 className="text-3xl md:text-[36px] font-medium text-center text-[#212121]">
            Departmental <span className="text-[#C45D16]">Executives</span>
          </h2>
          <PersonCarousel items={execCards} badgeColor="bg-[#C93601]" />
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 md:px-24 my-2"><div className="h-px bg-[#C45D16] opacity-40" /></div>

      <StayInTheLoop />
      <div className="w-full bg-[#E6731F] h-20" />
      <Footer />
    </div>
  );
}


