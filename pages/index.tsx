import { useState, useEffect } from "react";
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AboutUsSection from '../components/AboutUsSection';
import StayInTheLoop from '../components/StayInTheLoop';
import { getCachedData, setCachedData } from '../lib/cacheUtils';

interface Executive {
  id: string;
  name: string;
  position: string;
  bio: string;
  image_url: string;
  email: string;
  type: string;
  council: string;
  year: string;
  created_at: string;
}

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

export default function Home() {
  const [leadersIndex, setLeadersIndex] = useState(0);
  const [leaders, setLeaders] = useState<Executive[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      
      await Promise.all([fetchExecutives(), fetchEvents()]);
      
      setError(null);
    } catch (err: any) {
      console.error('Error fetching data:', err);
      setError(err.message || 'Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const fetchExecutives = async () => {
    try {
      const cacheKey = 'executives_current';
      
      const cached = getCachedData<Executive[]>(cacheKey);
      if (cached && cached.length > 0) {
        setLeaders(cached);
        return;
      }

      const response = await fetch('/api/executives?type=current');
      if (!response.ok) throw new Error('Failed to fetch executives');
      
      const data: Executive[] = await response.json();
      
      while (data.length < 9) {
        const postNum = data.length + 1;
        data.push({
          id: `empty-${postNum}`,
          name: `Post ${postNum}`,
          position: `Post ${postNum}`,
          bio: 'No executive assigned',
          image_url: 'https://cdn.builder.io/api/v1/image/assets%2F00f3c2731bef40b8b4a8d1dddbc4395b%2Fcdd139978eae4454a840b2529f738d38?format=webp&width=800',
          email: '',
          type: 'current',
          council: '',
          year: '',
          created_at: new Date().toISOString(),
        });
      }

      setCachedData(cacheKey, data);
      setLeaders(data);
    } catch (err) {
      console.error('Error fetching executives:', err);
      const dummyData: Executive[] = Array.from({ length: 9 }, (_, i) => ({
        id: `placeholder-${i}`,
        name: `Post ${i + 1}`,
        position: `Post ${i + 1}`,
        bio: 'No executive assigned',
        image_url: 'https://cdn.builder.io/api/v1/image/assets%2F00f3c2731bef40b8b4a8d1dddbc4395b%2Fcdd139978eae4454a840b2529f738d38?format=webp&width=800',
        email: '',
        type: 'current',
        council: '',
        year: '',
        created_at: new Date().toISOString(),
      }));
      setLeaders(dummyData);
    }
  };

  const fetchEvents = async () => {
    try {
      const cacheKey = 'events_upcoming_3';
      
      const cached = getCachedData<Event[]>(cacheKey);
      if (cached && cached.length > 0) {
        setEvents(cached);
        return;
      }

      const response = await fetch('/api/events?upcoming=true');
      if (!response.ok) throw new Error('Failed to fetch events');
      
      const data: Event[] = await response.json();
      const latestThree = data.slice(0, 3);

      setCachedData(cacheKey, latestThree);
      setEvents(latestThree);
    } catch (err) {
      console.error('Error fetching events:', err);
      setEvents([]);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setLeadersIndex((prev) => (prev + 1) % 3);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

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
              <Link href="/elibrary" className="inline-block bg-[#E6731F] text-white px-4 py-2 rounded shadow-md text-sm font-semibold">
                Access E-library
              </Link>
            </div>
          </div>

          <div className="lg:w-1/2 w-full flex justify-end py-12 lg:py-24">
            <div className="relative rounded-xl border-4 border-[#C45D16] shadow-lg overflow-hidden w-full max-w-[820px] lg:max-w-[820px]">
              <img
                src="https://api.builder.io/api/v1/image/assets/TEMP/687e721b183a8cb5f0263e54fe86147841d39eb7?width=1582"
                alt="Hero"
                className="w-full h-auto block rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      <AboutUsSection />

      <section className="w-full py-16">
        <div className="max-w-7xl mx-auto px-6 md:px-24">
          <h2 className="text-3xl font-medium text-center mb-12">
            Meet Our <span className="text-[#C45D16]">Leaders</span>
          </h2>

          {loading ? (
            <div className="text-center py-12">
              <p className="text-gray-600">Loading executives...</p>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-red-600">Note: Using placeholder executives</p>
            </div>
          ) : (
            <>
              <div className="relative overflow-hidden">
                <div
                  className="flex transition-transform duration-700 ease-in-out"
                  style={{ transform: `translateX(-${leadersIndex * 100}%)` }}
                >
                  {[0, 1, 2].map((slideIndex) => (
                    <div key={slideIndex} className="w-full flex-shrink-0 px-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {leaders.slice(slideIndex * 3, (slideIndex + 1) * 3).map((leader, idx) => (
                          <div
                            key={leader.id}
                            className="bg-white rounded-2xl shadow-md overflow-hidden"
                          >
                            <img
                              src={leader.image_url}
                              alt={leader.name}
                              className="w-full h-64 object-cover"
                            />
                            <div className="p-6">
                              <h4 className="text-xl font-medium text-[#212121]">
                                {leader.name}
                              </h4>
                              <div className="inline-block mt-2 bg-[#C93601] text-white text-sm px-3 py-1 rounded">
                                {leader.position}
                              </div>
                              <p className="mt-4 text-sm text-[#4B5563] line-clamp-3">{leader.bio}</p>
                              <div className="mt-4 flex gap-3">
                                {leader.email && (
                                  <a href={`mailto:${leader.email}`} className="text-[#E6731F] hover:text-[#C45D16]">
                                    <svg width="24" height="24" viewBox="0 0 32 32" fill="none">
                                      <path d="M25.3333 4C26.0406 4 26.7189 4.28095 27.219 4.78105C27.719 5.28115 28 5.95942 28 6.66667V25.3333C28 26.0406 27.719 26.7189 27.219 27.219C26.7189 27.719 26.0406 28 25.3333 28H6.66667C5.95942 28 5.28115 27.719 4.78105 27.219C4.28095 26.7189 4 26.0406 4 25.3333V6.66667C4 5.95942 4.28095 5.28115 4.78105 4.78105C5.28115 4.28095 5.95942 4 6.66667 4H25.3333ZM24.6667 24.6667V17.6C24.6667 16.4472 24.2087 15.3416 23.3936 14.5264C22.5784 13.7113 21.4728 13.2533 20.32 13.2533C19.1867 13.2533 17.8667 13.9467 17.2267 14.9867V13.5067H13.5067V24.6667H17.2267V18.0933C17.2267 17.0667 18.0533 16.2267 19.08 16.2267C19.5751 16.2267 20.0499 16.4233 20.3999 16.7734C20.75 17.1235 20.9467 17.5983 20.9467 18.0933V24.6667H24.6667ZM9.17333 11.4133C9.76742 11.4133 10.3372 11.1773 10.7573 10.7573C11.1773 10.3372 11.4133 9.76742 11.4133 9.17333C11.4133 7.93333 10.4133 6.92 9.17333 6.92C8.57571 6.92 8.00257 7.1574 7.57999 7.57999C7.1574 8.00257 6.92 8.57571 6.92 9.17333C6.92 10.4133 7.93333 11.4133 9.17333 11.4133ZM11.0267 24.6667V13.5067H7.33333V24.6667H11.0267Z" fill="#E6731F"/>
                                    </svg>
                                  </a>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-center gap-3 mt-8">
                {[0, 1, 2].map((idx) => (
                  <div
                    key={idx}
                    className={`h-3 rounded-full transition-all ${leadersIndex === idx ? "w-12 bg-[#E6731F]" : "w-3 bg-[#C45D16] opacity-40"}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 md:px-24 py-16">
        <h3 className="text-center text-2xl md:text-3xl font-semibold text-[#212121]">
          Upcoming <span className="text-[#E6731F]">Events</span>
        </h3>

        {events.length === 0 ? (
          <div className="mt-10 text-center py-12 text-gray-600">
            <p>No upcoming events at this time.</p>
          </div>
        ) : (
          <>
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {events.map((event) => (
                <article key={event.id} className="bg-white rounded-xl shadow-md overflow-hidden">
                  <div className="relative">
                    <img
                      src={event.image_url}
                      alt={event.title}
                      className="w-full h-56 object-cover"
                    />
                  </div>

                  <div className="p-5">
                    <h4 className="text-[#5B933C] font-medium">{event.title}</h4>
                    <p className="text-[#212121] font-semibold">{event.category}</p>
                    <p className="mt-3 text-sm text-[#4B5563]">
                      Date: {new Date(event.date).toLocaleDateString()}<br />
                      Time: {event.time}<br />
                      Venue: {event.venue}
                    </p>
                    <div className="mt-4">
                      {event.form_link ? (
                        <a
                          href={event.form_link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block text-[#E6731F] border border-[#E6731F] px-3 py-2 rounded text-sm font-semibold hover:bg-[#E6731F] hover:text-white transition"
                        >
                          Register Now
                        </a>
                      ) : (
                        <button className="text-[#999] border border-[#999] px-3 py-2 rounded text-sm font-semibold cursor-not-allowed">
                          Registration Closed
                        </button>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <div className="mt-10 flex justify-center">
              <Link href="/events" className="bg-[#5B933C] text-white px-6 py-3 rounded shadow-md hover:bg-[#4a7a31] transition">
                View All Events
              </Link>
            </div>
          </>
        )}
      </section>

      <StayInTheLoop />

      <div className="w-full bg-[#E6731F] h-20"></div>   

      <Footer />
    </div>
  );
}
