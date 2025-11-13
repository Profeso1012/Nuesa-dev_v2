import { useState, useEffect } from 'react';
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

export default function Events() {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [activeThumbIndex, setActiveThumbIndex] = useState(0);
  const [viewAllPastEvents, setViewAllPastEvents] = useState(false);

  const [upcomingEvents, setUpcomingEvents] = useState<Event[]>([]);
  const [pastEvents, setPastEvents] = useState<Event[]>([]);
  const [eventPhotoGallery, setEventPhotoGallery] = useState<GalleryItem[]>([]);
  const [newsPhotoGallery, setNewsPhotoGallery] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    try {
      setLoading(true);
      await Promise.all([
        fetchUpcomingEvents(),
        fetchPastEvents(),
        fetchEventPhotos(),
        fetchNewsPhotos(),
      ]);
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
      if (cached && cached.length > 0) {
        setUpcomingEvents(cached);
        return;
      }

      const response = await fetch('/api/events?upcoming=true');
      if (!response.ok) throw new Error('Failed to fetch upcoming events');
      const data = await response.json();
      setCachedData(cacheKey, data);
      setUpcomingEvents(data);
    } catch (error) {
      console.error('Error fetching upcoming events:', error);
      setUpcomingEvents([]);
    }
  };

  const fetchPastEvents = async () => {
    try {
      const cacheKey = 'events_past_all';
      const cached = getCachedData<Event[]>(cacheKey);
      if (cached && cached.length > 0) {
        setPastEvents(cached);
        return;
      }

      const response = await fetch('/api/events?past=true');
      if (!response.ok) throw new Error('Failed to fetch past events');
      const data = await response.json();
      setCachedData(cacheKey, data);
      setPastEvents(data);
    } catch (error) {
      console.error('Error fetching past events:', error);
      setPastEvents([]);
    }
  };

  const fetchEventPhotos = async () => {
    try {
      const cacheKey = 'gallery_event_photos';
      const cached = getCachedData<GalleryItem[]>(cacheKey);
      if (cached && cached.length > 0) {
        setEventPhotoGallery(cached);
        return;
      }

      const response = await fetch('/api/gallery?type=event_photo');
      if (!response.ok) throw new Error('Failed to fetch event photos');
      const data = await response.json();
      setCachedData(cacheKey, data);
      setEventPhotoGallery(data);
    } catch (error) {
      console.error('Error fetching event photos:', error);
      setEventPhotoGallery([]);
    }
  };

  const fetchNewsPhotos = async () => {
    try {
      const cacheKey = 'gallery_news_photos';
      const cached = getCachedData<GalleryItem[]>(cacheKey);
      if (cached && cached.length > 0) {
        setNewsPhotoGallery(cached);
        return;
      }

      const response = await fetch('/api/gallery?type=news_photo');
      if (!response.ok) throw new Error('Failed to fetch news photos');
      const data = await response.json();
      setCachedData(cacheKey, data);
      setNewsPhotoGallery(data);
    } catch (error) {
      console.error('Error fetching news photos:', error);
      setNewsPhotoGallery([]);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const galleryToUse = newsPhotoGallery.length > 0 ? newsPhotoGallery : [];
      setActiveThumbIndex((prev) => (prev + 1) % Math.max(galleryToUse.length, 1));
    }, 5000);
    return () => clearInterval(interval);
  }, [newsPhotoGallery.length]);

  const events = activeTab === 'upcoming' ? upcomingEvents : pastEvents;

  const createPlaceholderEvent = () => ({
    id: `placeholder-${Math.random()}`,
    title: '',
    category: '',
    date: '',
    time: '',
    venue: '',
    form_link: null,
    image_url: 'https://api.builder.io/api/v1/image/assets/TEMP/placeholder',
    created_at: new Date().toISOString(),
    isPlaceholder: true,
  } as any);

  const displayedPastEvents = () => {
    if (viewAllPastEvents) {
      return pastEvents;
    }
    const eventsToShow = [...pastEvents];
    while (eventsToShow.length < 3) {
      eventsToShow.push(createPlaceholderEvent());
    }
    return eventsToShow.slice(0, 3);
  };

  const EventCard = ({ event, isPast }: any) => {
    if (event.isPlaceholder) {
      return (
        <article className="bg-gray-100 rounded-2xl shadow-lg overflow-hidden opacity-50">
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
            <div className="h-10 bg-gray-300 rounded"></div>
          </div>
        </article>
      );
    }

    return (
      <article className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="relative h-64">
          <img
            src={event.image_url}
            alt={event.title}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-5 space-y-4">
          <div className="space-y-2">
            <h3 className={`text-xl font-medium ${isPast ? 'text-[rgba(196,93,22,0.4)]' : 'text-[#5B933C]'}`}>
              {event.title}
            </h3>
            <p className="text-lg text-[#212121]">{event.category}</p>
          </div>
          <div className="text-sm font-medium text-[#212121] space-y-1">
            <p>Date: {new Date(event.date).toLocaleDateString()}</p>
            <p>Time: {event.time}</p>
            <p>Venue: {event.venue}</p>
          </div>
          {!isPast && event.form_link ? (
            <a
              href={event.form_link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block border border-[#E6731F] text-[#E6731F] hover:bg-[#E6731F] hover:text-white rounded font-semibold text-sm px-6 py-3 transition-colors"
            >
              Register Now
            </a>
          ) : (
            <button 
              className={`border rounded font-semibold text-sm px-6 py-3 transition-colors ${
                isPast
                  ? 'border-[rgba(196,93,22,0.4)] text-[rgba(196,93,22,0.4)] cursor-not-allowed'
                  : 'border-[#E6731F] text-[#E6731F]'
              }`}
              disabled={isPast}
            >
              Register Now
            </button>
          )}
        </div>
      </article>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="flex items-center justify-center py-32">
          <p className="text-gray-600">Loading events and gallery...</p>
        </div>
        <Footer />
      </div>
    );
  }

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
                  <div className="inline-flex rounded-[23px] bg-[rgba(196,93,22,0.4)] p-4">
                    <button
                      onClick={() => setActiveTab('upcoming')}
                      className={`px-5 py-2 rounded-lg text-2xl md:text-3xl font-medium transition-colors ${
                        activeTab === 'upcoming'
                          ? 'bg-[#C93601] text-white'
                          : 'bg-transparent text-[#5B933C]'
                      }`}
                    >
                      Upcoming ({upcomingEvents.length})
                    </button>
                    <button
                      onClick={() => setActiveTab('past')}
                      className={`px-5 py-2 rounded-lg text-2xl md:text-3xl font-medium transition-colors ${
                        activeTab === 'past'
                          ? 'bg-[#C93601] text-white'
                          : 'bg-transparent text-[#5B933C]'
                      }`}
                    >
                      Past Events ({pastEvents.length})
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
                  {activeTab === 'upcoming' ? (
                    upcomingEvents.length > 0 ? (
                      upcomingEvents.map((event) => (
                        <EventCard key={event.id} event={event} isPast={false} />
                      ))
                    ) : (
                      <div className="col-span-full text-center py-8 text-gray-500">
                        <p>No upcoming events at this time.</p>
                      </div>
                    )
                  ) : (
                    displayedPastEvents().map((event) => (
                      <EventCard key={event.id} event={event} isPast={true} />
                    ))
                  )}
                </div>

                {activeTab === 'past' && pastEvents.length > 3 && (
                  <div className="flex justify-center mt-10">
                    <button 
                      onClick={() => setViewAllPastEvents(true)}
                      className="px-8 py-3.5 bg-[#E6731F] text-white rounded text-sm font-semibold shadow-md hover:bg-[#C45D16] transition-colors"
                    >
                      View All Past Events
                    </button>
                  </div>
                )}

                {activeTab === 'upcoming' && upcomingEvents.length > 0 && (
                  <div className="flex items-center justify-center gap-3">
                    <div className="w-12 h-3 rounded-full bg-[#E6731F]"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-[#C45D16] opacity-40"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-[#C45D16] opacity-40"></div>
                  </div>
                )}
              </>
            )}

            {viewAllPastEvents && pastEvents.length > 0 && (
              <>
                <div className="flex items-center gap-4 mb-8">
                  <button
                    onClick={() => setViewAllPastEvents(false)}
                    className="flex items-center gap-2 text-[#E6731F] hover:text-[#C45D16] transition-colors"
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
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

        {!viewAllPastEvents && eventPhotoGallery.length > 0 && (
          <section className="w-full py-16 md:py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-6 md:px-24">
              <h2 className="text-3xl md:text-4xl font-medium mb-10 text-center">
                Event <span className="text-[#C45D16]">Photo Gallery</span>
              </h2>

              <div className="relative rounded-2xl shadow-xl overflow-hidden mb-10">
                <img
                  src={eventPhotoGallery[activeThumbIndex]?.image_url}
                  alt="Event Gallery"
                  className="w-full h-auto max-h-[630px] object-cover"
                />
                <div className="absolute bottom-0 left-0 bg-[#C93601] rounded-tr-2xl p-5 space-y-2">
                  <h3 className="text-white text-2xl md:text-3xl font-medium">
                    {eventPhotoGallery[activeThumbIndex]?.title}
                  </h3>
                  <p className="text-white text-xl md:text-2xl font-medium">
                    {new Date(eventPhotoGallery[activeThumbIndex]?.date).toLocaleDateString()}
                  </p>
                </div>
              </div>

              {eventPhotoGallery.length > 1 && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10 mb-10">
                  {eventPhotoGallery.map((item, idx) => (
                    <div
                      key={item.id}
                      onClick={() => setActiveThumbIndex(idx)}
                      className={`relative overflow-hidden cursor-pointer transition-all ${
                        idx === activeThumbIndex ? 'border-[3px] border-[#212121]' : 'border border-[#C45D16]'
                      }`}
                    >
                      <img
                        src={item.image_url}
                        alt={item.title}
                        className="w-full h-56 object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
        )}

        {!viewAllPastEvents && newsPhotoGallery.length > 0 && (
          <section className="w-full py-16 md:py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-6 md:px-24">
              <h2 className="text-3xl md:text-4xl font-medium mb-10 text-center">
                Photo <span className="text-[#C45D16]">News</span>
              </h2>

              <div className="relative rounded-2xl shadow-xl overflow-hidden mb-10">
                <img
                  src={newsPhotoGallery[activeThumbIndex]?.image_url}
                  alt="Photo News"
                  className="w-full h-auto max-h-[630px] object-cover"
                />
                <div className="absolute bottom-0 left-0 bg-[#C93601] rounded-tr-2xl p-5 space-y-2">
                  <h3 className="text-white text-2xl md:text-3xl font-medium">
                    {newsPhotoGallery[activeThumbIndex]?.title}
                  </h3>
                  <p className="text-white text-xl md:text-2xl font-medium">
                    {new Date(newsPhotoGallery[activeThumbIndex]?.date).toLocaleDateString()}
                  </p>
                </div>
              </div>

              {newsPhotoGallery.length > 1 && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10 mb-10">
                  {newsPhotoGallery.map((item, idx) => (
                    <div
                      key={item.id}
                      onClick={() => setActiveThumbIndex(idx)}
                      className={`relative overflow-hidden cursor-pointer transition-all ${
                        idx === activeThumbIndex ? 'border-[3px] border-[#212121]' : 'border border-[#C45D16]'
                      }`}
                    >
                      <img
                        src={item.image_url}
                        alt={item.title}
                        className="w-full h-56 object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}
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
