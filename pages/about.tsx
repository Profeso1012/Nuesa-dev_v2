import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import StayInTheLoop from "../components/StayInTheLoop";
import PersonCarousel, { PersonCard, isPlaceholder } from "../components/PersonCarousel";
import { getCachedData, setCachedData } from "../lib/cacheUtils";

// â”€â”€â”€ Placeholders â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

const HOD_PH: PersonCard = {
  id: '__ph__',
  name: 'Name',
  position: 'HOD',
  bio: 'Bio will appear here once data is available.',
  image_url: '/person.png',
};

const EXEC_PH: PersonCard = {
  id: '__ph__',
  name: 'Name',
  position: 'Position',
  bio: 'Bio will appear here once data is available.',
  image_url: '/person.png',
};

function buildHODList(items: PersonCard[]): PersonCard[] {
  const filled = [...items];
  while (filled.length < 6) filled.push({ ...HOD_PH, id: `__ph_hod_${filled.length}` });
  return filled.slice(0, 6);
}

function buildExecList(items: PersonCard[], minCount: number = 4): PersonCard[] {
  const filled = [...items];
  while (filled.length < minCount) filled.push({ ...EXEC_PH, id: `__ph_exec_${filled.length}` });
  return filled;
}

// â”€â”€â”€ Department URL helper â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

const getDeptUrl = (dept: string): string => {
  const map: Record<string, string> = {
    mechanical: '/departments/mechanical',
    aerospace: '/departments/aerospace',
    chemical: '/departments/chemical',
    civil: '/departments/civil',
    industrial: '/departments/industrial',
    electronics: '/departments/electronics-computer',
    'electronics-computer': '/departments/electronics-computer',
  };
  return map[(dept || '').toLowerCase()] || '/departments';
};

// â”€â”€â”€ HOD Card (desktop grid) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

function HODCard({ item }: { item: PersonCard }) {
  const ph = isPlaceholder(item);
  return (
    <div className="bg-white rounded-2xl overflow-hidden flex flex-col" style={{ boxShadow: '0 2px 4px 0 rgba(0,0,0,0.08), 0 4px 6px 0 rgba(0,0,0,0.06), 0 8px 12px -2px rgba(0,0,0,0.08)' }}>
      <img
        src={item.image_url || '/person.png'}
        alt={item.name}
        loading="lazy"
          className={`w-full h-56 object-cover ${ph ? 'opacity-30' : ''}`}
        onError={(e) => { (e.target as HTMLImageElement).src = '/person.png'; }}
      />
      <div className="p-6 flex flex-col flex-1">
        <h4 className={`text-xl font-medium ${ph ? 'text-gray-300' : 'text-[#212121]'}`}>
          {item.name}
        </h4>
        <div className={`inline-block mt-2 text-white text-sm px-3 py-1 rounded bg-[#5B933C] self-start ${ph ? 'opacity-30' : ''}`}>
          {item.position}
        </div>
        <p className={`mt-4 text-sm line-clamp-3 flex-1 ${ph ? 'text-gray-300' : 'text-[#4B5563]'}`}>
          {item.bio}
        </p>
        <div className="mt-6">
          <Link
            href={ph ? '#' : (item.link_url || '/departments')}
            className={`inline-block border border-[#C45D16] text-[#C45D16] bg-white text-sm px-4 py-2 rounded-lg hover:bg-orange-50 transition-colors ${ph ? 'opacity-30 pointer-events-none' : ''}`}
          >
            View Department
          </Link>
        </div>
      </div>
    </div>
  );
}

// â”€â”€â”€ Executive Card (circular image with adjusted styling) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

function ExecCard({ item }: { item: PersonCard }) {
  const ph = isPlaceholder(item);
  return (
    <div className="bg-white flex flex-col items-center text-center h-full" style={{
      boxShadow: '0 2px 6px 2px rgba(0,0,0,0.08), 0 1px 2px 0 rgba(0,0,0,0.15), 0 6px 12px -4px rgba(0,0,0,0.10)',
      borderTopLeftRadius: '0',
      borderTopRightRadius: '1rem',
      borderBottomLeftRadius: '0',
      borderBottomRightRadius: '1rem',
      minHeight: '340px',
      paddingTop: '2rem',
      paddingBottom: '1.5rem',
      paddingLeft: '1rem',
      paddingRight: '1rem'
    }}>
      <img
        src={item.image_url || '/person.png'}
        alt={item.name}
        className={`w-36 h-36 rounded-full object-cover flex-shrink-0 ${ph ? 'opacity-30' : ''}`}
        onError={(e) => { (e.target as HTMLImageElement).src = '/person.png'; }}
      />
      <div className="mt-4 flex flex-col items-center gap-2 w-full flex-1 flex justify-center">
        <h4 className={`text-lg font-medium leading-snug ${ph ? 'text-gray-300' : 'text-[#212121]'}`}>
          {item.name}
        </h4>
        <div className={`text-white text-sm px-3 py-1 rounded bg-[#C93601] ${ph ? 'opacity-30' : ''}`}>
          {item.position}
        </div>
      </div>
    </div>
  );
}

// â”€â”€â”€ Exec Mobile/Tablet Carousel â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

function ExecCarousel({ items, autoInterval = 4000 }: { items: PersonCard[]; autoInterval?: number }) {
  const [startIdx, setStartIdx] = useState(0);
  const [sliding, setSliding] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [cardWidth, setCardWidth] = useState(0);
  const [visibleCount, setVisibleCount] = useState(1);
  const GAP = 24;

  useEffect(() => {
    const measureAll = () => {
      const vc = window.innerWidth < 768 ? 1 : window.innerWidth < 1024 ? 3 : 4;
      setVisibleCount(vc);
      if (containerRef.current) {
        const w = containerRef.current.offsetWidth;
        setCardWidth((w - GAP * (vc - 1)) / vc);
      }
    };
    measureAll();
    window.addEventListener('resize', measureAll);
    return () => window.removeEventListener('resize', measureAll);
  }, []);

  useEffect(() => { setSliding(false); }, [visibleCount]);

  const advance = useCallback(() => {
    if (sliding || cardWidth === 0) return;
    setSliding(true);
    setTimeout(() => {
      setStartIdx(prev => (prev + 1) % items.length);
      setSliding(false);
    }, 500);
  }, [sliding, cardWidth, items.length]);

  useEffect(() => {
    const timer = setInterval(advance, autoInterval);
    return () => clearInterval(timer);
  }, [advance, autoInterval]);

  const translateX = sliding ? -(cardWidth + GAP) : 0;

  const cardStyle = cardWidth > 0
    ? { width: `${cardWidth}px`, flexShrink: 0 as const }
    : { width: `calc((100% - ${GAP * (visibleCount - 1)}px) / ${visibleCount})`, flexShrink: 0 as const };

  return (
    <div>
      <div ref={containerRef} className="overflow-hidden">
        <div style={{
          display: 'flex',
          gap: `${GAP}px`,
          transform: `translateX(${translateX}px)`,
          transition: sliding ? 'transform 0.5s ease-in-out' : 'none',
        }}>
          {Array.from({ length: visibleCount + 1 }, (_, i) => (
            <div key={`${startIdx}-${i}-${visibleCount}`} style={cardStyle}>
              <ExecCard item={items[(startIdx + i) % items.length]} />
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-center justify-center gap-3 mt-8">
        {items.map((_, idx) => (
          <div
            key={idx}
            className={`h-3 rounded-full transition-all duration-300 ${idx === startIdx ? 'w-12 bg-[#E6731F]' : 'w-3 bg-[#C45D16] opacity-40'}`}
          />
        ))}
      </div>
    </div>
  );
}

// â”€â”€â”€ Dean of Faculty Section â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

const DEAN_PH: PersonCard = {
  id: '__ph_dean__',
  name: 'Prof. Name',
  position: 'Dean of Faculty of Engineering',
  bio: 'Bio will appear here once data is available.',
  image_url: '/person.png',
};

const DEAN_BIO = "The dean of the faculty of Engineering provides strategic leadership and academic direction for the faculty. He is committed to fostering excellence in teaching, research, and innovation. With a strong focus on student development, the Dean supports a culture of discipline, creativity, and professionalism. Under his leadership the faculty continues to advance in both academic performance and industry relevance. The Dean plays a vital role in shaping future engineers equipped to solve real world challenges.";

function DeanSection({ dean }: { dean: PersonCard | null }) {
  const ph = !dean;
  const person = dean || DEAN_PH;

  return (
    <section className="w-full bg-white py-16">
      <div className="max-w-7xl mx-auto px-6 md:px-24">
        {/* Title */}
        <h2 className="text-3xl font-medium text-center mb-12">
          <span className="text-[#212121]">Current </span>
          <span className="text-[#C45D16]">Dean Of Faculty</span>
        </h2>

        {/* Content: image | divider | text */}
        <div className="flex flex-col lg:flex-row items-start gap-10 lg:gap-16">
          {/* Photo */}
          <div className="flex-shrink-0 w-full lg:w-auto">
            <img
              src={person.image_url || '/person.png'}
              alt={person.name}
              className={`w-full lg:w-[400px] xl:w-[498px] h-[320px] md:h-[420px] lg:h-[530px] object-cover rounded-2xl border-[3px] border-[#E6731F] ${ph ? 'opacity-30' : ''}`}
              onError={(e) => { (e.target as HTMLImageElement).src = '/person.png'; }}
            />
          </div>

          {/* Vertical divider â€” desktop only */}
          <div className="hidden lg:block w-px flex-shrink-0 bg-[#C45D16] opacity-40" />

          {/* Text */}
          <div className="flex flex-col gap-5 flex-1">
            <div className="flex flex-col gap-2">
              <h3 className="text-2xl md:text-3xl xl:text-4xl font-medium leading-tight text-[#C45D16]">
                {person.name}
              </h3>
              <h4 className="text-xl md:text-2xl xl:text-3xl font-medium leading-snug text-[#212121]">
                {person.position}
              </h4>
            </div>
            <p className="text-base md:text-lg xl:text-xl leading-relaxed text-[#212121]">
              {DEAN_BIO}
            </p>
          </div>
        </div>

        {/* Bottom divider */}
        <div className="mt-14 h-px bg-[#C45D16] opacity-40" />
      </div>
    </section>
  );
}

// â”€â”€â”€ Council Section â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

function CouncilSection({
  title,
  highlightWord,
  subtitle,
  items,
  bg,
}: {
  title: [string, string, string];
  highlightWord: string;
  subtitle: string;
  items: PersonCard[];
  bg: string;
}) {
  const execList = buildExecList(items, 4);
  return (
    <section className={`w-full ${bg} py-16`}>
      <div className="max-w-7xl mx-auto px-6 md:px-24">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-medium">
            <span className="text-[#212121]">{title[0]} </span>
            <span className="text-[#C45D16]">{title[1]}</span>
            <span className="text-[#212121]"> {title[2]}</span>
          </h2>
          <p className="mt-3 text-lg text-[#212121] max-w-2xl mx-auto">{subtitle}</p>
        </div>

        {/* Desktop: 4-column carousel (showing 4 at a time) */}
        <ExecCarousel items={execList} />
      </div>
    </section>
  );
}

// â”€â”€â”€ Page â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

export default function About() {
  const [dean, setDean] = useState<PersonCard | null>(null);
  const [departmentAdmins, setDepartmentAdmins] = useState<PersonCard[]>([]);
  const [secExecutives, setSecExecutives] = useState<PersonCard[]>([]);
  const [spcExecutives, setSpcExecutives] = useState<PersonCard[]>([]);
  const [pastExecutives, setPastExecutives] = useState<PersonCard[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);

      // Dean of Faculty — stored as a department_admin with department='faculty-dean'
      const deanCache = getCachedData<any[]>('dept_admin_faculty_dean');
      if (deanCache) {
        const d = deanCache[0];
        if (d) setDean({ id: d.id, name: d.name, position: 'Dean of Faculty of Engineering', bio: d.bio || '', image_url: d.image_url || '/person.png', email: '' });
      } else {
        const res = await fetch('/api/department-admins?department=faculty-dean');
        if (res.ok) {
          const data = await res.json();
          setCachedData('dept_admin_faculty_dean', data);
          const d = data[0];
          if (d) setDean({ id: d.id, name: d.name, position: 'Dean of Faculty of Engineering', bio: d.bio || '', image_url: d.image_url || '/person.png', email: '' });
        }
      }

      // Department admins
      const deptCache = getCachedData<any[]>('department_admins');
      if (deptCache) {
        setDepartmentAdmins(mapAdmins(deptCache));
      } else {
        const res = await fetch('/api/department-admins');
        if (res.ok) {
          const data = await res.json();
          setCachedData('department_admins', data);
          setDepartmentAdmins(mapAdmins(data));
        }
      }

      // SEC executives (current)
      const secCache = getCachedData<any[]>('executives_sec');
      if (secCache) {
        setSecExecutives(mapExecs(secCache));
      } else {
        const res = await fetch('/api/executives?type=current&council=SEC');
        if (res.ok) {
          const data = await res.json();
          setCachedData('executives_sec', data);
          setSecExecutives(mapExecs(data));
        }
      }

      // SPC executives (current)
      const spcCache = getCachedData<any[]>('executives_spc');
      if (spcCache) {
        setSpcExecutives(mapExecs(spcCache));
      } else {
        const res = await fetch('/api/executives?type=current&council=SPC');
        if (res.ok) {
          const data = await res.json();
          setCachedData('executives_spc', data);
          setSpcExecutives(mapExecs(data));
        }
      }

      // Past executives (all councils)
      const pastCache = getCachedData<any[]>('executives_past');
      if (pastCache) {
        setPastExecutives(mapExecs(pastCache));
      } else {
        const res = await fetch('/api/executives?type=past');
        if (res.ok) {
          const data = await res.json();
          setCachedData('executives_past', data);
          setPastExecutives(mapExecs(data));
        }
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const mapExecs = (data: any[]): PersonCard[] =>
    data.map((e) => ({
      id: e.id,
      name: e.name,
      position: e.position,
      bio: e.bio,
      image_url: e.image_url || '/person.png',
      email: e.email,
    }));

  const mapAdmins = (data: any[]): PersonCard[] =>
    data.map((a) => ({
      id: a.id,
      name: a.name,
      position: a.position || 'HOD',
      bio: a.bio,
      image_url: a.image_url || '/person.png',
      email: '',
      link_url: getDeptUrl(a.department || ''),
    }));

  const hodList = buildHODList(departmentAdmins);

  return (
    <div className="min-h-screen bg-white relative">
      <div className="relative z-10">
        <Header />

        {/* â”€â”€ HERO â”€â”€ */}
        <section className="w-full bg-white">
          <div className="max-w-7xl mx-auto px-6 md:px-24 py-12 lg:py-20 flex flex-col lg:flex-row items-center gap-8">
            <div className="lg:w-1/2 w-full">
              <img
                src="https://api.builder.io/api/v1/image/assets/TEMP/687e721b183a8cb5f0263e54fe86147841d39eb7?width=1582"
                alt="Faculty Building"
                className="w-full rounded-xl border-4 border-[#C45D16]" style={{ boxShadow: '0 2px 8px 0 rgba(0,0,0,0.10), 0 6px 10px 0 rgba(0,0,0,0.08), 0 12px 16px -2px rgba(0,0,0,0.10)' }}
              />
            </div>

            <div className="lg:w-1/2 w-full space-y-6">
              <h1 className="text-3xl md:text-4xl font-medium text-[#212121]">
                Philosophy of <span className="text-[#E6731F]">The Faculty</span>
              </h1>
              <p className="text-base text-[#212121] leading-relaxed">
                The philosophy of the Faculty of Engineering at Lagos State University is rooted in
                the belief that engineering education should not only impart technical knowledge but
                also cultivate creativity, critical thinking, and problem-solving abilities. The
                faculty is dedicated to producing graduates who can apply scientific and engineering
                principles to address societal challenges while upholding the highest standards of
                ethics, professionalism, and integrity.
              </p>

              <div>
                <h2 className="text-2xl font-medium text-[#212121] mb-4">
                  Guiding <span className="text-[#E6731F]">Principles</span>
                </h2>
                <p className="text-base text-[#212121] leading-relaxed">
                  In line with the university's broader mission, the faculty emphasizes innovation,
                  research, and collaboration as key drivers of sustainable development. By
                  integrating theory with practical experience, the faculty aims to nurture engineers
                  who are globally competitive yet locally relevantâ€”individuals equipped to
                  contribute meaningfully to technological advancement and nation-building.
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-4">
                {[
                  { value: '2K+', label: 'Members', color: 'text-[#E6731F]' },
                  { value: '6', label: 'Departments', color: 'text-[#5B933C]' },
                  { value: '10', label: 'Annual Events', color: 'text-[#5B933C]' },
                  { value: '26', label: 'Years Active', color: 'text-[#5B933C]' },
                ].map((stat) => (
                  <div key={stat.label} className="text-center">
                    <div className={`text-3xl md:text-4xl font-bold ${stat.color}`}>{stat.value}</div>
                    <div className="text-sm text-[#212121] mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* â”€â”€ ABOUT NUESA â”€â”€ */}
        <section className="w-full bg-gray-50 py-16">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-4xl font-medium mb-6">
              <span className="text-[#212121]">About </span>
              <span className="text-[#C45D16]">NUESA</span>
            </h2>
            <p className="text-xl text-[#212121] leading-7">
              The Nigeria Union of Engineering Students Association (NUESA) is the official body
              representing Engineering students within the faculty. It is committed to promoting
              academic excellence, leadership and collaboration among students. Through its
              structured leadership, NUESA serves as a platform for student representation,
              professional growth, and the coordination of activities that support both academic and
              social developement.
            </p>
          </div>
        </section>

        {/* â”€â”€ DEAN OF FACULTY â”€â”€ */}
        <DeanSection dean={dean} />

        {/* â”€â”€ ENGINEERING DEPARTMENTS â”€â”€ */}
        <section className="w-full bg-white py-16">
          <div className="max-w-7xl mx-auto px-6 md:px-24">
            <h2 className="text-3xl font-medium text-center mb-12">
              Engineering <span className="text-[#C45D16]">Departments</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { icon: "/icons/Vector (1).png", title: "Mechanical Engineering", desc: "Focused on the design, analysis, and manufacturing of mechanical systems. Students gain hands-on experience in thermodynamics, fluid mechanics, and machine design â€” shaping innovators who build the technologies that drive industries." },
                { icon: "/icons/Vector (2).png", title: "Aerospace Engineering", desc: "Dedicated to the study of flight and space systems, this department trains students in aerodynamics, propulsion, and aircraft design, preparing them to lead advancements in aviation and space technology." },
                { icon: "/icons/Vector (3).png", title: "Chemical Engineering", desc: "Combines chemistry and engineering to develop processes that transform raw materials into valuable products, emphasizing innovation in sustainable and industrial chemical production." },
                { icon: "/icons/Vector (4).png", title: "Electronics & Computer Engineering", desc: "Covers the principles of electrical circuits, power systems, and electronics. The department equips students with the skills to design and optimize systems that power modern technology." },
                { icon: "/icons/Vector (5).png", title: "Civil Engineering", desc: "Centers on the planning, design, and construction of infrastructure projects such as roads, bridges, and water systems, promoting sustainable development and environmental stewardship." },
                { icon: "/icons/Vector (6).png", title: "Industrial Engineering", desc: "Focused on optimizing systems, processes, and resources for maximum efficiency and productivity. The department equips students with analytical, managerial, and technical skills to design smarter workflows and improve performance across industries." },
              ].map((dept, i) => (
                <div key={i} className="bg-white p-6 rounded-2xl border border-gray-100" style={{ boxShadow: '0 2px 4px 0 rgba(0,0,0,0.08), 0 4px 6px 0 rgba(0,0,0,0.06), 0 8px 12px -2px rgba(0,0,0,0.08)' }}>
                  <div className="w-12 h-12 mb-4">
                    <img src={dept.icon} alt={dept.title} className="w-full h-full object-contain" />
                  </div>
                  <h3 className="text-xl font-medium text-[#212121] mb-3">{dept.title}</h3>
                  <p className="text-sm text-[#212121] leading-relaxed">{dept.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* â”€â”€ HEADS OF DEPARTMENT â”€â”€ */}
        <section className="w-full bg-gray-50 py-16">
          <div className="max-w-7xl mx-auto px-6 md:px-24">
            <h2 className="text-3xl font-medium text-center mb-4">
              <span className="text-[#212121]">Heads of </span>
              <span className="text-[#C45D16]">Department</span>
            </h2>
            <p className="text-center text-[#212121] mb-12 text-lg">
              Meet the academic leaders guiding each engineering department
            </p>

            {/* Desktop: 3 Ã— 2 static grid */}
            <div className="hidden lg:grid grid-cols-3 gap-8">
              {hodList.map((item, i) => (
                <HODCard key={i} item={item} />
              ))}
            </div>

            {/* Mobile / Tablet: carousel (1 on mobile, 2 on tablet) */}
            <div className="lg:hidden">
              <PersonCarousel items={departmentAdmins} badgeColor="bg-[#5B933C]" />
            </div>
          </div>
        </section>

        {/* â”€â”€ STUDENT EXECUTIVE COUNCIL â”€â”€ */}
        <CouncilSection
          title={['Student', 'Executive', 'Council']}
          highlightWord="Executive"
          subtitle="The Executive Council manages the day-to-day leadership, administration, and student representation of NUESA"
          items={secExecutives}
          bg="bg-white"
        />

        {/* â”€â”€ STUDENT PARLIAMENTARY COUNCIL â”€â”€ */}
        <CouncilSection
          title={['Student', 'Parliamentary', 'Council']}
          highlightWord="Parliamentary"
          subtitle="The Parliamentary Council provides legislative oversight and represents the student body's collective voice within NUESA"
          items={spcExecutives}
          bg="bg-gray-50"
        />

        {/* â”€â”€ PAST EXECUTIVES â”€â”€ */}
        <section className="w-full bg-white py-16">
          <div className="max-w-7xl mx-auto px-6 md:px-24">
            <h2 className="text-3xl font-medium text-center mb-4">
              <span className="text-[#212121]">Past </span>
              <span className="text-[#C45D16]">Executives</span>
            </h2>
            <p className="text-center text-[#212121] mb-12 text-lg">
              Honoring the leadership that shaped our community
            </p>

            {/* Carousel: 4 on desktop, 3 on tablet, 1 on mobile */}
            <div className="mb-8">
              <ExecCarousel items={buildExecList(pastExecutives, 4)} />
            </div>

            {/* See More Button */}
            <div className="text-center">
              <Link
                href="/executives"
                className="inline-block border border-[#C45D16] text-[#C45D16] bg-white text-base px-6 py-3 rounded-lg hover:bg-orange-50 transition-colors font-semibold"
              >
                See More Executives
              </Link>
            </div>
          </div>
        </section>

        <StayInTheLoop />
        <div className="w-full bg-[#E6731F] h-20"></div>
        <Footer />
      </div>
    </div>
  );
}



