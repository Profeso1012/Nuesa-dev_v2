import { useState, useEffect, useRef, useCallback } from 'react';

export interface PersonCard {
  id: string;
  name: string;
  position: string;
  bio: string;
  image_url: string;
  email?: string;
  link_url?: string;
  linkedin_url?: string;
  x_url?: string;
}

interface Props {
  items: PersonCard[];
  badgeColor?: string;
  autoInterval?: number;
}

const PLACEHOLDER: PersonCard = {
  id: '__placeholder__',
  name: 'Name',
  position: 'Position',
  bio: 'Bio will appear here once data is available.',
  image_url: '/person.png',
  email: '',
};

function buildList(items: PersonCard[]): PersonCard[] {
  const filled = [...items];
  while (filled.length < 3) filled.push({ ...PLACEHOLDER, id: `__ph_${filled.length}` });
  return filled;
}

export const isPlaceholder = (item: PersonCard) => item.id.startsWith('__');

function Card({ item, badgeColor }: { item: PersonCard; badgeColor: string }) {
  const ph = isPlaceholder(item);
  return (
    <div className="bg-white rounded-2xl overflow-hidden h-full" style={{ boxShadow: '0 2px 4px 0 rgba(0,0,0,0.08), 0 4px 6px 0 rgba(0,0,0,0.06), 0 8px 12px -2px rgba(0,0,0,0.08)' }}>
      <img
        src={item.image_url || '/person.png'}
        alt={item.name}
        className={`w-full h-64 object-cover ${ph ? 'opacity-30' : ''}`}
          loading="lazy"
        onError={(e) => { (e.target as HTMLImageElement).src = '/person.png'; }}
      />
      <div className="p-6">
        <h4 className={`text-xl font-medium ${ph ? 'text-gray-300' : 'text-[#212121]'}`}>
          {item.name}
        </h4>
        <div className={`inline-block mt-2 text-white text-sm px-3 py-1 rounded ${badgeColor} ${ph ? 'opacity-30' : ''}`}>
          {item.position}
        </div>
        <p className={`mt-4 text-sm line-clamp-3 ${ph ? 'text-gray-300' : 'text-[#4B5563]'}`}>
          {item.bio}
        </p>
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

export default function PersonCarousel({ items, badgeColor = 'bg-[#C93601]', autoInterval = 4000 }: Props) {
  const list = buildList(items);
  const [sliding, setSliding] = useState(false);
  const [startIdx, setStartIdx] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [cardWidth, setCardWidth] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const GAP = 32;

  useEffect(() => {
    const measureAll = () => {
      // Mobile: 1, Tablet: 2, Desktop: 3
      const vc = window.innerWidth < 768 ? 1 : window.innerWidth < 1024 ? 2 : 3;
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

  // Reset sliding when visible count changes (e.g. on resize)
  useEffect(() => {
    setSliding(false);
  }, [visibleCount]);

  const advance = useCallback(() => {
    if (sliding || cardWidth === 0) return;
    setSliding(true);
    setTimeout(() => {
      setStartIdx(prev => (prev + 1) % list.length);
      setSliding(false);
    }, 500);
  }, [sliding, cardWidth, list.length]);

  useEffect(() => {
    timerRef.current = setInterval(advance, autoInterval);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [advance, autoInterval]);

  useEffect(() => {
    setStartIdx(0);
    setSliding(false);
  }, [items.length]);

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
              <Card item={list[(startIdx + i) % list.length]} badgeColor={badgeColor} />
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-center gap-3 mt-8">
        {list.map((_, idx) => (
          <div
            key={idx}
            className={`h-3 rounded-full transition-all duration-300 ${
              idx === startIdx ? 'w-12 bg-[#E6731F]' : 'w-3 bg-[#C45D16] opacity-40'
            }`}
          />
        ))}
      </div>
    </div>
  );
}



