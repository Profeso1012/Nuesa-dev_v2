import { useState, useEffect, useRef, useCallback } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import StayInTheLoop from '../components/StayInTheLoop';
import { getCachedData, setCachedData } from '../lib/cacheUtils';

interface Event {
  id: string;
  title: string;
  category: string;
  date: string;
  time: string;
  venue: string;
  form_link: string | null;
  image_url: string;
  created_at: string;
}

interface GalleryItem {
  id: string;
  title: string;
  description: string;
  type: 'news_photo' | 'event_photo';
  date: string;
  image_url: string;
  created_at: string;
}

const GALLERY_PH: GalleryItem = {
  id: '__ph__',
  title: 'Event Title',
  description: '',
  type: 'event_photo',
  date: '',
  image_url: '/image.png',
  created_at: '',
};

function fillMin5(items: GalleryItem[]): GalleryItem[] {
  const out = [...items];
  while (out.length < 5) out.push({ ...GALLERY_PH, id: `__ph_${out.length}` });
  return out;
}

const isPh = (id: string) => id.startsWith('__ph');

export default function Events() {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');
  const [viewAllPastEvents, setViewAllPastEvents] = useState(false);
  const [upcomingEvents, setUpcomingEvents] = useState<Event[]>([]);
  const [pastEvents, setPastEvents] = useState<Event[]>([]);
  const [eventPhotoGallery, setEventPhotoGallery] = useState<GalleryItem[]>([]);
  const [newsPhotoGallery, setNewsPhotoGallery] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetchAllData(); }, []);

  const fetchAllData = async () => {
    try {
      setLoading(true);
      await Promise.all([fetchUpcomingEvents(), fetchPastEvents(), fetchEventPhotos(), fetchNewsPhotos()]);
    } catch (error) {
      console.error('Error fetching events and gallery:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUpcomingEvents = async () => {
    try {
      const cacheKey = 'events_upcoming_all';
      const cached = getCachedData<Event[]>(cacheKey);
      if (cached && cached.length > 0) { setUpcomingEvents(cached); return; }
      const response = await fetch('/api/events?upcoming=true');
      if (!response.ok) throw new Error('Failed');
      const data = await response.json();
      setCachedData(cacheKey, data);
      setUpcomingEvents(data);
    } catch { setUpcomingEvents([]); }
  };

  const fetchPastEvents = async () => {
    try {
      const cacheKey = 'events_past_all';
      const cached = getCachedData<Event[]>(cacheKey);
      if (cached && cached.length > 0) { setPastEvents(cached); return; }
      const response = await fetch('/api/events?past=true');
      if (!response.ok) throw new Error('Failed');
      const data = await response.json();
      setCachedData(cacheKey, data);
      setPastEvents(data);
    } catch { setPastEvents([]); }
  };

  const fetchEventPhotos = async () => {
    try {
      const cacheKey = 'gallery_event_photos';
      const cached = getCachedData<GalleryItem[]>(cacheKey);
      if (cached && cached.length > 0) { setEventPhotoGallery(cached); return; }
      const response = await fetch('/api/gallery?type=event_photo');
      if (!response.ok) throw new Error('Failed');
      const data = await response.json();
      setCachedData(cacheKey, data);
      setEventPhotoGallery(data);
    } catch { setEventPhotoGallery([]); }
  };

  const fetchNewsPhotos = async () => {
    try {
      const cacheKey = 'gallery_news_photos';
      const cached = getCachedData<GalleryItem[]>(cacheKey);
      if (cached && cached.length > 0) { setNewsPhotoGallery(cached); return; }
      const response = await fetch('/api/gallery?type=news_photo');
      if (!response.ok) throw new Error('Failed');
      const data = await response.json();
      setCachedData(cacheKey, data);
      setNewsPhotoGallery(data);
    } catch { setNewsPhotoGallery([]); }
  };

  const createPlaceholderEvent = () => ({
    id: `placeholder-${Math.random()}`,
    title: 'Event Title',
    category: 'Category',
    date: '',
    time: 'â€”',
    venue: 'â€”',
    form_link: null,
    image_url: '/image.png',
    created_at: new Date().toISOString(),
    isPlaceholder: true,
  } as any);

  const displayedUpcomingEvents = () => {
    const out = [...upcomingEvents];
    while (out.length < 3) out.push(createPlaceholderEvent());
    return out.slice(0, Math.max(upcomingEvents.length, 3));
  };

  const displayedPastEvents = () => {
    if (viewAllPastEvents) return pastEvents;
    const out = [...pastEvents];
    while (out.length < 3) out.push(createPlaceholderEvent());
    return out.slice(0, 3);
  };

  const EventCard = ({ event, isPast }: any) => {
    if (event.isPlaceholder) {
      return (
        <article className="bg-gray-100 rounded-2xl overflow-hidden opacity-50" style={{ boxShadow: '0 2px 8px 0 rgba(0,0,0,0.10), 0 6px 10px 0 rgba(0,0,0,0.08), 0 12px 16px -2px rgba(0,0,0,0.10)' }}>
          <div className="relative h-64 bg-gray-300"></div>
          <div className="p-5 space-y-4">
            <div className="space-y-2">
              <div className="h-6 bg-gray-300 rounded w-3/4"></div>
              <div className="h-4 bg-gray-300 rounded w-1/2"></div>
            </div>
            <div className="space-y-1">
              <div className="h-3 bg-gray-300 rounded"></div>
              <div className="h-3 bg-gray-300 rounded"></div>
              <div className="h-3 bg-gray-300 rounded"></div>
            </div>
            <div className="h-10 bg-gray-300 rounded w-1/3"></div>
          </div>
        </article>
      );
    }
    return (
      <article className="bg-white rounded-2xl overflow-hidden" style={{ boxShadow: '0 2px 8px 0 rgba(0,0,0,0.10), 0 6px 10px 0 rgba(0,0,0,0.08), 0 12px 16px -2px rgba(0,0,0,0.10)' }}>
        <div className="relative h-64">
          <img src={event.image_url} alt={event.title} className="w-full h-full object-cover"
                  loading="lazy" />
        </div>
        <div className="p-5 space-y-4">
          <div className="space-y-2">
            <h3 className={`text-xl font-medium ${isPast ? 'text-[rgba(196,93,22,0.4)]' : 'text-[#5B933C]'}`}>{event.title}</h3>
            <p className="text-lg text-[#212121]">{event.category}</p>
          </div>
          <div className="text-sm font-medium text-[#212121] space-y-1">
            <p>Date: {new Date(event.date).toLocaleDateString()}</p>
            <p>Time: {event.time}</p>
            <p>Venue: {event.venue}</p>
          </div>
          {!isPast && event.form_link ? (
            <a href={event.form_link} target="_blank" rel="noopener noreferrer"
              className="inline-block border border-[#E6731F] text-[#E6731F] hover:bg-[#E6731F] hover:text-white rounded font-semibold text-sm px-6 py-3 transition-colors">
              Register Now
            </a>
          ) : (
            <button disabled className={`border rounded font-semibold text-sm px-6 py-3 ${isPast ? 'border-[rgba(196,93,22,0.4)] text-[rgba(196,93,22,0.4)] cursor-not-allowed' : 'border-[#E6731F] text-[#E6731F]'}`}>
              Register Now
            </button>
          )}
        </div>
      </article>
    );
  };

  return (
    <div className="min-h-screen bg-white relative">
      <div className="relative z-10">
        <Header />

        <section className="w-full py-16 md:py-20">
          <div className="max-w-7xl mx-auto px-6 md:px-24">
            <div className="flex flex-col items-center gap-5 mb-12">
              <h1 className="text-3xl md:text-4xl font-medium text-center">
                NUESA LASU <span className="text-[#C45D16]">Events and Gallery</span>
              </h1>
              <p className="text-lg md:text-xl text-[#212121] text-center max-w-3xl leading-relaxed">
                Stay updated on the latest programs, seminars, and activities organized by NUESA LASU to promote learning, innovation, and professional development across the Faculty of Engineering.
              </p>
            </div>

            {!viewAllPastEvents && (
              <>
                <div className="flex justify-center mb-10">
                  <div className="inline-flex rounded-[23px] bg-[rgba(196,93,22,0.4)] p-4 gap-1">
                    <button onClick={() => setActiveTab('upcoming')}
                      className={`px-3 md:px-5 py-2 rounded-lg text-sm md:text-2xl lg:text-3xl font-medium transition-colors whitespace-nowrap ${activeTab === 'upcoming' ? 'bg-[#C93601] text-white' : 'bg-transparent text-[#5B933C]'}`}>
                      Upcoming ({upcomingEvents.length})
                    </button>
                    <button onClick={() => setActiveTab('past')}
                      className={`px-3 md:px-5 py-2 rounded-lg text-sm md:text-2xl lg:text-3xl font-medium transition-colors whitespace-nowrap ${activeTab === 'past' ? 'bg-[#C93601] text-white' : 'bg-transparent text-[#5B933C]'}`}>
                      Past Events ({pastEvents.length})
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
                  {activeTab === 'upcoming'
                    ? displayedUpcomingEvents().map((event) => (
                        <EventCard key={event.id} event={event} isPast={false} />
                      ))
                    : displayedPastEvents().map((event) => (
                        <EventCard key={event.id} event={event} isPast={true} />
                      ))
                  }
                </div>

                {activeTab === 'past' && pastEvents.length > 3 && (
                  <div className="flex justify-center mt-10">
                    <button onClick={() => setViewAllPastEvents(true)}
                      className="px-8 py-3.5 bg-[#E6731F] text-white rounded text-sm font-semibold shadow-md hover:bg-[#C45D16] transition-colors">
                      View All Past Events
                    </button>
                  </div>
                )}
              </>
            )}

            {viewAllPastEvents && pastEvents.length > 0 && (
              <>
                <div className="flex items-center gap-4 mb-8">
                  <button onClick={() => setViewAllPastEvents(false)}
                    className="flex items-center gap-2 text-[#E6731F] hover:text-[#C45D16] transition-colors">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span className="font-semibold">Back to Events</span>
                  </button>
                </div>
                <h2 className="text-3xl font-medium mb-8 text-center">
                  All <span className="text-[#C45D16]">Past Events</span>
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
                  {pastEvents.map((event) => (
                    <EventCard key={event.id} event={event} isPast={true} />
                  ))}
                </div>
              </>
            )}
          </div>
        </section>

        {!viewAllPastEvents && (
          <section className="w-full py-16 md:py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-6 md:px-24">
              <h2 className="text-3xl md:text-4xl font-medium mb-10 text-center">
                Event <span className="text-[#C45D16]">Photo Gallery</span>
              </h2>
              <GallerySlider items={eventPhotoGallery} />
            </div>
          </section>
        )}

        {!viewAllPastEvents && (
          <section className="w-full py-16 md:py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-6 md:px-24">
              <h2 className="text-3xl md:text-4xl font-medium mb-10 text-center">
                Photo <span className="text-[#C45D16]">News</span>
              </h2>
              <GallerySlider items={newsPhotoGallery} />
            </div>
          </section>
        )}

        <StayInTheLoop />
        <div className="w-full bg-[#E6731F] h-20"></div>
        <Footer />
      </div>
    </div>
  );
}

// Cascading gallery: fixed slots, data changes. Large top + 1 black-border + 3 orange thumbs.
function GallerySlider({ items }: { items: GalleryItem[] }) {
  const list = fillMin5(items);
  const [slots, setSlots] = useState<GalleryItem[]>(list.slice(0, 5));
  const [nextIdx, setNextIdx] = useState(5 % list.length);
  const [fading, setFading] = useState(false);
  const [busy, setBusy] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const l = fillMin5(items);
    setSlots(l.slice(0, 5));
    setNextIdx(5 % l.length);
  }, [items.length]);

  const advance = useCallback(() => {
    if (busy) return;
    setBusy(true);
    setFading(true);
    setTimeout(() => {
      setSlots(prev => {
        const next = [...prev];
        next[0] = prev[1]; next[1] = prev[2]; next[2] = prev[3]; next[3] = prev[4];
        next[4] = list[nextIdx];
        return next;
      });
      setNextIdx(p => (p + 1) % list.length);
      setFading(false);
      setBusy(false);
    }, 400);
  }, [busy, list, nextIdx]);

  useEffect(() => {
    const t = setInterval(advance, 4000);
    return () => clearInterval(t);
  }, [advance]);

  const handleThumbClick = (slotIdx: number) => {
    if (busy || isPh(slots[slotIdx].id)) return;
    setBusy(true);
    setFading(true);
    setTimeout(() => {
      setSlots(prev => {
        const next = [...prev];
        [next[0], next[slotIdx]] = [next[slotIdx], next[0]];
        return next;
      });
      setFading(false);
      setBusy(false);
    }, 400);
  };

  const main = slots[0];
  const thumbs = slots.slice(1);

  return (
    <div>
      {/* Large featured slot */}
      <div className="relative rounded-2xl overflow-hidden mb-10" style={{ boxShadow: '0 4px 8px 0 rgba(0,0,0,0.10), 0 8px 12px 0 rgba(0,0,0,0.08), 0 12px 20px -2px rgba(0,0,0,0.10)' }}>
        <img
          src={main.image_url || '/image.png'}
          alt={main.title || 'Gallery'}
          className={`w-full h-auto max-h-[630px] md:max-h-[630px] object-cover transition-opacity duration-400 ${fading ? 'opacity-0' : 'opacity-100'} ${isPh(main.id) ? 'opacity-30' : ''}`}
          onError={e => { (e.target as HTMLImageElement).src = '/image.png'; }}
        />
        <div className="absolute bottom-0 left-0 bg-[#C93601] rounded-tr-2xl p-5 space-y-2 md:p-5 md:space-y-2 w-full md:w-auto">
          <h3 className={`text-white text-sm md:text-2xl lg:text-3xl font-medium min-h-[1.5rem] md:min-h-[2rem] transition-opacity duration-400 ${fading ? 'opacity-0' : 'opacity-100'}`}>
            {isPh(main.id) ? 'Event Title' : main.title}
          </h3>
          <p className={`text-white text-xs md:text-xl lg:text-2xl font-medium min-h-[1.25rem] md:min-h-[1.75rem] transition-opacity duration-400 ${fading ? 'opacity-0' : 'opacity-100'}`}>
            {isPh(main.id) ? 'â€”' : new Date(main.date).toLocaleDateString()}
          </p>
        </div>
      </div>

      {/* thumbnail slots â€” 2 on mobile, 4 on desktop */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-10 w-[90%] mx-auto">
        {thumbs.map((item, idx) => {
          // On mobile, only show first 2 thumbs; on desktop show all 4
          if (isMobile && idx >= 2) return null;

          return (
            <div
              key={idx}
              onClick={() => handleThumbClick(idx + 1)}
              className={`relative transition-all ${
                idx === 0
                  ? 'border-[3px] border-[#212121] rounded-lg overflow-hidden'
                  : 'border-2 border-[#C45D16]'
              } ${isPh(item.id) ? 'cursor-default' : 'cursor-pointer'}`}
            >
              {idx === 0 ? (
                <img
                  src={item.image_url || '/image.png'}
                  alt={item.title || 'Gallery'}
                  className={`w-full h-40 object-cover ${isPh(item.id) ? 'opacity-30' : ''}`}
                  onError={e => { (e.target as HTMLImageElement).src = '/image.png'; }}
                />
              ) : (
                <div className="overflow-hidden rounded-lg">
                  <img
                    src={item.image_url || '/image.png'}
                    alt={item.title || 'Gallery'}
                    className={`w-full h-40 object-cover ${isPh(item.id) ? 'opacity-30' : ''}`}
                    onError={e => { (e.target as HTMLImageElement).src = '/image.png'; }}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}


