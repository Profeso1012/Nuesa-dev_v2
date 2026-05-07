import { useState, useEffect, useRef, useCallback } from 'react';

export interface EventCard {
  id: string;
  title: string;
  category: string;
  date: string;
  time: string;
  venue: string;
  form_link: string | null;
  image_url: string;
}

interface Props {
  items: EventCard[];
  autoInterval?: number;
}

const PLACEHOLDER: EventCard = {
  id: '__placeholder__',
  title: 'Event Title',
  category: 'Category',
  date: '',
  time: '00:00',
  venue: 'Venue',
  form_link: null,
  image_url: '/image.png',
};

function buildList(items: EventCard[]): EventCard[] {
  const filled = [...items];
  while (filled.length < 3) filled.push({ ...PLACEHOLDER, id: `__ph_${filled.length}` });
  return filled;
}

const isPlaceholder = (item: EventCard) => item.id.startsWith('__');

function Card({ item }: { item: EventCard }) {
  const ph = isPlaceholder(item);
  return (
    <article className="bg-white rounded-xl overflow-hidden" style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
      {/* Image container — object-contain so full image shows */}
      <img
          src={item.image_url || '/image.png'}
          alt={item.title}
          loading="lazy"
          className={`w-full h-56 object-cover ${ph ? 'opacity-30' : ''}`}
          onError={(e) => { (e.target as HTMLImageElement).src = '/image.png'; }}
        />
      
      <div className="p-4">
        <h4 className={`font-medium text-sm md:text-base line-clamp-2 ${ph ? 'text-gray-300' : 'text-[#5B933C]'}`}>{item.title}</h4>
        <p className={`font-semibold mt-1 text-xs md:text-sm ${ph ? 'text-gray-300' : 'text-[#212121]'}`}>{item.category}</p>
        <p className={`mt-2 text-xs md:text-sm ${ph ? 'text-gray-300' : 'text-[#4B5563]'}`}>
          {ph ? <>Date: —<br />Time: —<br />Venue: —</> : (
            <>Date: {new Date(item.date).toLocaleDateString()}<br />Time: {item.time}<br />Venue: {item.venue}</>
          )}
        </p>
        <div className="mt-3">
          {!ph && item.form_link ? (
            <a href={item.form_link} target="_blank" rel="noopener noreferrer"
              className="inline-block text-[#E6731F] border border-[#E6731F] px-3 py-1.5 rounded text-xs font-semibold hover:bg-[#E6731F] hover:text-white transition">
              Register Now
            </a>
          ) : (
            <button disabled className={`border px-3 py-1.5 rounded text-xs font-semibold cursor-not-allowed ${ph ? 'border-gray-200 text-gray-300' : 'border-[#999] text-[#999]'}`}>
              Register Now
            </button>
          )}
        </div>
      </div>
    </article>
  );
}

export default function EventCarousel({ items, autoInterval = 4000 }: Props) {
  const list = buildList(items);
  const [sliding, setSliding] = useState(false);
  const [startIdx, setStartIdx] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [cardWidth, setCardWidth] = useState(0);
  const GAP = 32;

  useEffect(() => {
    const measure = () => {
      if (containerRef.current) {
        setCardWidth((containerRef.current.offsetWidth - GAP * 2) / 3);
      }
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  const getCard = (i: number) => list[(startIdx + i) % list.length];

  const advance = useCallback(() => {
    if (sliding || cardWidth === 0) return;
    setSliding(true);
    setTimeout(() => {
      setStartIdx(prev => (prev + 1) % list.length);
      setSliding(false);
    }, 500);
  }, [sliding, cardWidth, list.length]);

  useEffect(() => {
    const t = setInterval(advance, autoInterval);
    return () => clearInterval(t);
  }, [advance, autoInterval]);

  useEffect(() => { setStartIdx(0); setSliding(false); }, [items.length]);

  const cardStyle = cardWidth > 0
    ? { width: `${cardWidth}px`, flexShrink: 0 as const }
    : { width: 'calc(33.333% - 22px)', flexShrink: 0 as const };

  return (
    <div>
      <div ref={containerRef} className="overflow-hidden">
        <div style={{
          display: 'flex',
          gap: `${GAP}px`,
          transform: `translateX(${cardWidth > 0 && sliding ? -(cardWidth + GAP) : 0}px)`,
          transition: cardWidth > 0 && sliding ? 'transform 0.5s ease-in-out' : 'none',
        }}>
          {[0, 1, 2, 3].map((i) => (
            <div key={`${startIdx}-${i}`} style={cardStyle}>
              <Card item={getCard(i)} />
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-center justify-center gap-3 mt-8">
        {list.map((_, idx) => (
          <div key={idx} className={`h-3 rounded-full transition-all duration-300 ${idx === startIdx ? 'w-12 bg-[#E6731F]' : 'w-3 bg-[#C45D16] opacity-40'}`} />
        ))}
      </div>
    </div>
  );
}

