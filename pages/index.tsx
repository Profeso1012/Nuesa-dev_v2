import { useState, useEffect } from "react";
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AboutUsSection from '../components/AboutUsSection';
import StayInTheLoop from '../components/StayInTheLoop';
import PersonCarousel, { PersonCard } from '../components/PersonCarousel';
import EventCarousel, { EventCard } from '../components/EventCarousel';
import { getCachedData, setCachedData } from '../lib/cacheUtils';

export default function Home() {
  const [leaders, setLeaders] = useState<PersonCard[]>([]);
  const [events, setEvents] = useState<EventCard[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    await Promise.all([fetchExecutives(), fetchEvents()]);
    setLoading(false);
  };

  const fetchExecutives = async () => {
    try {
      const cacheKey = 'executives_current';
      const cached = getCachedData<PersonCard[]>(cacheKey);
      if (cached && cached.length > 0) { setLeaders(cached); return; }

      const response = await fetch('/api/executives?type=current');
      if (!response.ok) throw new Error('Failed to fetch executives');
      const data = await response.json();

      const mapped: PersonCard[] = data.map((e: any) => ({
        id: e.id,
        name: e.name,
        position: e.position,
        bio: e.bio,
        image_url: e.image_url || '/person.png',
        email: e.email,
        linkedin_url: e.linkedin_url,
        x_url: e.x_url,
      }));

      setCachedData(cacheKey, mapped);
      setLeaders(mapped);
    } catch {
      setLeaders([]);
    }
  };

  const fetchEvents = async () => {
    try {
      const cacheKey = 'events_upcoming_3';
      const cached = getCachedData<EventCard[]>(cacheKey);
      if (cached && cached.length > 0) { setEvents(cached); return; }

      const response = await fetch('/api/events?upcoming=true');
      if (!response.ok) throw new Error('Failed to fetch events');
      const data = await response.json();
      const mapped: EventCard[] = data.slice(0, 3).map((e: any) => ({
        id: e.id,
        title: e.title,
        category: e.category,
        date: e.date,
        time: e.time,
        venue: e.venue,
        form_link: e.form_link,
        image_url: e.image_url || '/image.png',
      }));

      setCachedData(cacheKey, mapped);
      setEvents(mapped);
    } catch {
      setEvents([]);
    }
  };

  return (
    <div className="min-h-screen bg-white font-roboto">
      <Header />

      <section className="w-full">
        <div className="max-w-7xl mx-auto px-6 md:px-24 flex flex-col lg:flex-row items-center gap-8">
          <div className="lg:w-1/2 w-full py-12 lg:py-24">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium text-[#212121]">
              Nigerian Universities Engineering Students Association
              <br />
              <span className="text-[#5B933C]">LASU Chapter</span>
            </h2>
            <p className="mt-6 text-lg md:text-xl text-[#212121] max-w-xl">
              Empowering Engineering Education at LASU
            </p>
            <div className="mt-8">
              <Link href="https://www.nuesalasuelibrary.com" target="_blank" rel="noopener noreferrer" className="inline-block bg-[#E6731F] text-white px-4 py-2 rounded shadow-md text-sm font-semibold">
                Access E-library
              </Link>
            </div>
          </div>

          <div className="lg:w-1/2 w-full flex justify-end py-12 lg:py-24">
            <div className="relative rounded-xl border-4 border-[#C45D16] shadow-lg overflow-hidden w-full max-w-[820px]">
              <img
                src="https://api.builder.io/api/v1/image/assets/TEMP/687e721b183a8cb5f0263e54fe86147841d39eb7?width=1582"
                alt="Hero"
                className="w-full h-auto block rounded-lg"
                loading="eager"
                fetchPriority="high"
              />
            </div>
          </div>
        </div>
      </section>

      <AboutUsSection />

      {/* Meet Our Leaders */}
      <section className="w-full py-16">
        <div className="max-w-7xl mx-auto px-6 md:px-24">
          <h2 className="text-3xl font-medium text-center mb-12">
            Meet Our <span className="text-[#C45D16]">Leaders</span>
          </h2>
          <PersonCarousel items={leaders} />
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="max-w-7xl mx-auto px-6 md:px-24 py-16">
        <h3 className="text-center text-2xl md:text-3xl font-semibold text-[#212121]">
          Upcoming <span className="text-[#E6731F]">Events</span>
        </h3>
        <div className="mt-10">
          <EventCarousel items={events} />
        </div>
        <div className="mt-10 flex justify-center">
          <Link href="/events" className="bg-[#5B933C] text-white px-6 py-3 rounded shadow-md hover:bg-[#4a7a31] transition">
            View All Events
          </Link>
        </div>
      </section>

      <StayInTheLoop />
      <div className="w-full bg-[#E6731F] h-20"></div>
      <Footer />
    </div>
  );
}

