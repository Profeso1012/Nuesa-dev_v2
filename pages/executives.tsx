import { useState, useEffect } from "react";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import StayInTheLoop from "../components/StayInTheLoop";
import { getCachedData, setCachedData } from "../lib/cacheUtils";

interface ExecutiveCard {
  id: string;
  name: string;
  position: string;
  image_url: string;
  linkedin_url?: string;
  x_url?: string;
}

const PLACEHOLDER: ExecutiveCard = {
  id: '__placeholder__',
  name: 'Name',
  position: 'Position',
  image_url: '/person.png',
};

function isPlaceholder(id: string): boolean {
  return id.startsWith('__');
}

function Executive({ item }: { item: ExecutiveCard }) {
  const ph = isPlaceholder(item.id);
  return (
    <div className="bg-white rounded-2xl overflow-hidden h-full" style={{ boxShadow: '0 2px 4px 0 rgba(0,0,0,0.08), 0 4px 6px 0 rgba(0,0,0,0.06), 0 8px 12px -2px rgba(0,0,0,0.08)' }}>
      <img
        src={item.image_url || '/person.png'}
        alt={item.name}
        className={`w-full h-64 object-cover ${ph ? 'opacity-30' : ''}`}
        onError={(e) => { (e.target as HTMLImageElement).src = '/person.png'; }}
      />
      <div className="p-6">
        <h4 className={`text-xl font-medium ${ph ? 'text-gray-300' : 'text-[#212121]'}`}>
          {item.name}
        </h4>
        <div className={`inline-block mt-2 text-white text-sm px-3 py-1 rounded bg-[#C93601] ${ph ? 'opacity-30' : ''}`}>
          {item.position}
        </div>
        <div className="mt-4 flex items-center gap-3 min-h-6">
          <div className={`w-6 h-6 flex items-center justify-center ${item.x_url ? '' : 'opacity-20'}`}>
            {item.x_url ? (
              <a href={item.x_url} target="_blank" rel="noopener noreferrer" className="text-[#C93601] hover:opacity-75" aria-label={`${item.name} on X`}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.736-8.84L1.254 2.25H8.08l4.259 5.624L18.244 2.25zM17.083 19.77h1.833L7.084 4.126H5.117L17.083 19.77z"/>
                </svg>
              </a>
            ) : (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" className="text-gray-300">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.736-8.84L1.254 2.25H8.08l4.259 5.624L18.244 2.25zM17.083 19.77h1.833L7.084 4.126H5.117L17.083 19.77z"/>
              </svg>
            )}
          </div>
          <div className={`w-6 h-6 flex items-center justify-center ${item.linkedin_url ? '' : 'opacity-20'}`}>
            {item.linkedin_url ? (
              <a href={item.linkedin_url} target="_blank" rel="noopener noreferrer" className="text-[#0077B5] hover:opacity-75" aria-label={`${item.name} on LinkedIn`}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            ) : (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" className="text-gray-300">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function fillToMinimum(items: ExecutiveCard[], minCount: number = 6): ExecutiveCard[] {
  const filled = [...items];
  while (filled.length < minCount) {
    filled.push({ ...PLACEHOLDER, id: `__ph_${filled.length}` });
  }
  return filled;
}

export default function ExecutivesPage() {
  const [allExecutives, setAllExecutives] = useState<Record<string, Record<string, ExecutiveCard[]>>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);

      // Fetch all SEC executives
      const secRes = await fetch('/api/executives?council=SEC');
      const secData = secRes.ok ? await secRes.json() : [];

      // Fetch all SPC executives
      const spcRes = await fetch('/api/executives?council=SPC');
      const spcData = spcRes.ok ? await spcRes.json() : [];

      // Organize by council and year
      const organized = organizeByCouncilAndYear([
        ...secData.map((e: any) => ({ ...e, council: 'SEC' })),
        ...spcData.map((e: any) => ({ ...e, council: 'SPC' })),
      ]);

      setAllExecutives(organized);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const organizeByCouncilAndYear = (
    data: any[]
  ): Record<string, Record<string, ExecutiveCard[]>> => {
    const organized: Record<string, Record<string, ExecutiveCard[]>> = {
      SEC: {},
      SPC: {},
    };

    data.forEach((e: any) => {
      const council = e.council || 'SEC';
      const year = e.type === 'current' ? '2025/2026' : e.year || 'No Year';

      if (!organized[council]) organized[council] = {};
      if (!organized[council][year]) organized[council][year] = [];

      organized[council][year].push({
        id: e.id,
        name: e.name,
        position: e.position,
        image_url: e.image_url || '/person.png',
        linkedin_url: e.linkedin_url,
        x_url: e.x_url,
      });
    });

    // Ensure current year sections exist (even if empty)
    if (!organized.SEC['2025/2026']) organized.SEC['2025/2026'] = [];
    if (!organized.SPC['2025/2026']) organized.SPC['2025/2026'] = [];

    // Also ensure past year if none exist
    const allYears = new Set<string>();
    Object.values(organized).forEach((council) => {
      Object.keys(council).forEach((year) => allYears.add(year));
    });

    if (allYears.size <= 1) {
      if (!organized.SEC['2024/2025']) organized.SEC['2024/2025'] = [];
      if (!organized.SPC['2024/2025']) organized.SPC['2024/2025'] = [];
    }

    return organized;
  };

  const sortYears = (years: string[]): string[] => {
    const yearOrder: Record<string, number> = {
      '2025/2026': 0,
      '2024/2025': 1,
      '2023/2024': 2,
      '2022/2023': 3,
    };
    return years.sort(
      (a, b) => (yearOrder[a] ?? 999) - (yearOrder[b] ?? 999)
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl text-[#212121]">Loading executives...</div>
      </div>
    );
  }

  const secYears = sortYears(Object.keys(allExecutives.SEC || {}));
  const spcYears = sortYears(Object.keys(allExecutives.SPC || {}));

  return (
    <div className="min-h-screen bg-white relative">
      <div className="relative z-10">
        <Header />

        {/* ── BACK NAVIGATION ── */}
        <div className="w-full bg-gray-50 border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-6 md:px-24 py-4">
            <Link
              href="/"
              className="inline-flex items-center text-[#C45D16] hover:text-[#E6731F] transition-colors"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Back to Home
            </Link>
          </div>
        </div>

        {/* ── HERO ── */}
        <section className="w-full bg-gray-50 py-12 lg:py-20">
          <div className="max-w-7xl mx-auto px-6 md:px-24 text-center">
            <h1 className="text-4xl md:text-5xl font-medium text-[#212121] mb-4">
              All <span className="text-[#E6731F]">Executives</span>
            </h1>
            <p className="text-lg text-[#212121] max-w-2xl mx-auto">
              Meet the leadership driving NUESA across Student Executive Council and Student Parliamentary Council
            </p>
          </div>
        </section>

        {/* ── YEARS SECTION ── */}
        <section className="w-full bg-white py-16">
          <div className="max-w-7xl mx-auto px-6 md:px-24">
            {secYears.map((year) => (
              <div key={`sec-${year}`} className="mb-20">
                {/* Year Header */}
                <div className="mb-12">
                  <h2 className="text-3xl md:text-4xl font-medium text-[#212121] mb-2">
                    {year}
                  </h2>
                  <div className="w-24 h-1 bg-[#E6731F] rounded"></div>
                </div>

                {/* SEC Subsection */}
                <div className="mb-16">
                  <h3 className="text-2xl font-semibold text-[#212121] mb-8">
                    <span className="text-[#212121]">Student </span>
                    <span className="text-[#C45D16]">Executive Council</span>
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {fillToMinimum(allExecutives.SEC?.[year] || [], 6).map((exec) => (
                      <Executive key={exec.id} item={exec} />
                    ))}
                  </div>
                </div>

                {/* SPC Subsection */}
                <div>
                  <h3 className="text-2xl font-semibold text-[#212121] mb-8">
                    <span className="text-[#212121]">Student </span>
                    <span className="text-[#C45D16]">Parliamentary Council</span>
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {fillToMinimum(allExecutives.SPC?.[year] || [], 6).map((exec) => (
                      <Executive key={exec.id} item={exec} />
                    ))}
                  </div>
                </div>

                {/* Divider between years */}
                {secYears.indexOf(year) < secYears.length - 1 && (
                  <div className="mt-20 pt-20 border-t border-gray-200"></div>
                )}
              </div>
            ))}
          </div>
        </section>

        <StayInTheLoop />
        <div className="w-full bg-[#E6731F] h-20"></div>
        <Footer />
      </div>
    </div>
  );
}
