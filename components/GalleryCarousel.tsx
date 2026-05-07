import { useState, useEffect, useRef, useCallback } from 'react';

export interface GalleryItem {
  id: string;
  title: string;
  description?: string;
  date: string;
  image_url: string;
}

interface Props {
  items: GalleryItem[];
  autoInterval?: number;
}

const PLACEHOLDER: GalleryItem = {
  id: '__placeholder__',
  title: 'Event Title',
  date: '',
  image_url: '/image.png',
};

function buildList(items: GalleryItem[]): GalleryItem[] {
  const filled = [...items];
  while (filled.length < 5) filled.push({ ...PLACEHOLDER, id: `__ph_${filled.length}` });
  return filled;
}

const isPlaceholder = (item: GalleryItem) => item.id.startsWith('__');

export default function GalleryCarousel({ items, autoInterval = 4000 }: Props) {
  const list = buildList(items);

  // slots[0] = large featured, slots[1] = black-bordered thumb, slots[2-4] = orange thumbs
  const [slots, setSlots] = useState<GalleryItem[]>([
    list[0], list[1], list[2], list[3], list[4],
  ]);
  const [nextIdx, setNextIdx] = useState(5 % list.length);
  const [fading, setFading] = useState(false);
  const [transitioning, setTransitioning] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const advance = useCallback(() => {
    if (transitioning) return;
    setTransitioning(true);
    setFading(true); // fade out large slot

    setTimeout(() => {
      setSlots(prev => {
        // cascade: slot0 ← slot1 ← slot2 ← slot3 ← slot4 ← new item
        const next = [...prev];
        next[0] = prev[1];
        next[1] = prev[2];
        next[2] = prev[3];
        next[3] = prev[4];
        next[4] = list[nextIdx];
        return next;
      });
      setNextIdx(prev => (prev + 1) % list.length);
      setFading(false);
      setTransitioning(false);
    }, 400);
  }, [transitioning, list, nextIdx]);

  useEffect(() => {
    timerRef.current = setInterval(advance, autoInterval);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [advance, autoInterval]);

  // Reset when items change
  useEffect(() => {
    const l = buildList(items);
    setSlots([l[0], l[1 % l.length], l[2 % l.length], l[3 % l.length], l[4 % l.length]]);
    setNextIdx(5 % l.length);
  }, [items.length]);

  const handleThumbClick = (thumbSlotIdx: number) => {
    if (transitioning) return;
    setTransitioning(true);
    setFading(true);
    setTimeout(() => {
      setSlots(prev => {
        const next = [...prev];
        const clicked = next[thumbSlotIdx];
        next[thumbSlotIdx] = next[0];
        next[0] = clicked;
        return next;
      });
      setFading(false);
      setTransitioning(false);
    }, 400);
  };

  const main = slots[0];
  const thumbs = slots.slice(1);

  return (
    <div>
      {/* Large featured slot — content fades, div stays */}
      <div className="relative rounded-2xl overflow-hidden mb-10" style={{ boxShadow: '0 4px 8px 0 rgba(0,0,0,0.10), 0 8px 12px 0 rgba(0,0,0,0.08), 0 12px 20px -2px rgba(0,0,0,0.10)' }}>
        <img
          src={main.image_url || '/image.png'}
          alt={main.title}
          className={`w-full h-auto max-h-[630px] object-cover transition-opacity duration-400 ${fading ? 'opacity-0' : 'opacity-100'} ${isPlaceholder(main) ? 'opacity-30' : ''}`}
          onError={(e) => { (e.target as HTMLImageElement).src = '/image.png'; }}
        />
        <div className="absolute bottom-0 left-0 bg-[#C93601] rounded-tr-2xl p-5 space-y-2 w-full md:w-auto transition-all duration-300" style={{ width: 'clamp(30%, 100%, 100%)' }}>
          <h3 className={`text-white text-lg md:text-3xl font-medium min-h-[1.2rem] md:min-h-[2rem] transition-opacity duration-400 truncate md:truncate-none ${fading ? 'opacity-0' : 'opacity-100'}`}>
            {isPlaceholder(main) ? 'Event Title' : main.title}
          </h3>
          <p className={`text-white text-base md:text-2xl font-medium min-h-[1rem] md:min-h-[1.75rem] transition-opacity duration-400 truncate md:truncate-none ${fading ? 'opacity-0' : 'opacity-100'}`}>
            {isPlaceholder(main) ? '—' : new Date(main.date).toLocaleDateString()}
          </p>
        </div>
      </div>

      {/* Thumbnail slots — fixed positions, data changes */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10 mb-10">
        {thumbs.map((item, idx) => (
          <div
            key={idx}
            onClick={() => !isPlaceholder(item) && handleThumbClick(idx + 1)}
            className={`relative overflow-hidden transition-opacity duration-400 ${
              idx === 0 ? 'border-[3px] border-[#212121]' : 'border border-[#C45D16]'
            } ${isPlaceholder(item) ? 'opacity-30 cursor-default' : 'cursor-pointer'}`}
          >
            <img
              src={item.image_url || '/image.png'}
              alt={item.title}
              className="w-full h-56 object-cover"
              onError={(e) => { (e.target as HTMLImageElement).src = '/image.png'; }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
