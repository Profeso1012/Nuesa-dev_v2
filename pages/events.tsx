import { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import StayInTheLoop from '../components/StayInTheLoop';

export default function Events() {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [activeThumbIndex, setActiveThumbIndex] = useState(0);

  const upcomingEvents = [
    {
      title: 'E-library Launching',
      type: 'Flagship Event',
      date: '6th of November, 2025',
      time: '10:00am',
      venue: 'Faculty of Engineering Lecture Theatre',
      image: 'https://api.builder.io/api/v1/image/assets/TEMP/a5787550b8f710ce6dd4c1296066b31dca55388f?width=996',
    },
    {
      title: 'E-library Launching',
      type: 'Flagship Event',
      date: '6th of November, 2025',
      time: '10:00am',
      venue: 'Faculty of Engineering Lecture Theatre',
      image: 'https://api.builder.io/api/v1/image/assets/TEMP/a5787550b8f710ce6dd4c1296066b31dca55388f?width=996',
    },
    {
      title: 'E-library Launching',
      type: 'Flagship Event',
      date: '6th of November, 2025',
      time: '10:00am',
      venue: 'Faculty of Engineering Lecture Theatre',
      image: 'https://api.builder.io/api/v1/image/assets/TEMP/a8b5d182647c3ad408199ea683f72ae0b251720a?width=996',
    },
  ];

  const pastEvents = [
    {
      title: 'E-library Launching',
      type: 'Flagship Event',
      date: '6th of November, 2025',
      time: '10:00am',
      venue: 'Faculty of Engineering Lecture Theatre',
      image: 'https://api.builder.io/api/v1/image/assets/TEMP/5a4e63687844ff3a58b345dff4b24a49b15f5ee6?width=996',
    },
    {
      title: 'E-library Launching',
      type: 'Flagship Event',
      date: '6th of November, 2025',
      time: '10:00am',
      venue: 'Faculty of Engineering Lecture Theatre',
      image: 'https://api.builder.io/api/v1/image/assets/TEMP/5a4e63687844ff3a58b345dff4b24a49b15f5ee6?width=996',
    },
    {
      title: 'E-library Launching',
      type: 'Flagship Event',
      date: '6th of November, 2025',
      time: '10:00am',
      venue: 'Faculty of Engineering Lecture Theatre',
      image: 'https://api.builder.io/api/v1/image/assets/TEMP/3e3b28d12e6cc51e62a72bf45044e8d83c9d5a8d?width=996',
    },
    {
      title: 'E-library Launching',
      type: 'Flagship Event',
      date: '6th of November, 2025',
      time: '10:00am',
      venue: 'Faculty of Engineering Lecture Theatre',
      image: 'https://api.builder.io/api/v1/image/assets/TEMP/1d8a9fc895395d8f2e474e1f109994777164925f?width=996',
    },
  ];

  const allGalleryImages = [
    {
      image: 'https://api.builder.io/api/v1/image/assets/TEMP/31c91664892725e38b775899aa15b6d5119f844a?width=3072',
      title: 'NUESA LASU Tech Expo 1.0',
      date: 'July 2025.',
    },
    {
      image: 'https://api.builder.io/api/v1/image/assets/TEMP/0e18bad089f58b090377197d1552ec3900efc20f?width=586',
      title: 'NUESA LASU Tech Expo 1.0',
      date: 'July 2025.',
    },
    {
      image: 'https://api.builder.io/api/v1/image/assets/TEMP/67c49ea26d23b67474d61612e588d8c966be7054?width=586',
      title: 'NUESA LASU Tech Expo 1.0',
      date: 'July 2025.',
    },
    {
      image: 'https://api.builder.io/api/v1/image/assets/TEMP/67c49ea26d23b67474d61612e588d8c966be7054?width=586',
      title: 'NUESA LASU Tech Expo 1.0',
      date: 'July 2025.',
    },
    {
      image: 'https://api.builder.io/api/v1/image/assets/TEMP/67c49ea26d23b67474d61612e588d8c966be7054?width=586',
      title: 'NUESA LASU Tech Expo 1.0',
      date: 'July 2025.',
    },
  ];

  const allPhotoNewsImages = [
    {
      image: 'https://api.builder.io/api/v1/image/assets/TEMP/6a1b12b8c5312c9139a24c0e6b7a7f56a3bcd987?width=3072',
      title: 'Engineering Students Excel at National Innovation Summit',
      date: 'October 2025',
    },
    {
      image: 'https://api.builder.io/api/v1/image/assets/TEMP/f214a8c641e6a952d3b0cba5e1df0a847f3b3e8d?width=586',
      title: 'NUESA Hosts Career Tech Talk Series',
      date: 'September 2025',
    },
    {
      image: 'https://api.builder.io/api/v1/image/assets/TEMP/54b61a2a88e8b0a4b67b9b0b4a8453d72e65e019?width=586',
      title: 'Students Participate in AI & Robotics Challenge',
      date: 'August 2025',
    },
    {
      image: 'https://api.builder.io/api/v1/image/assets/TEMP/5a27c0f4983a4c293dcb8c414a5275c65b7895f9?width=586',
      title: 'NUESA LASU Team Visits Dangote Refinery',
      date: 'July 2025',
    },
    {
      image: 'https://api.builder.io/api/v1/image/assets/TEMP/47a64bcb731b42bba8d42d1a3cc4c28cf65af29a?width=586',
      title: 'Engineering Week 2025 Highlights and Awards',
      date: 'June 2025',
    },
  ];

  // Auto-cycle carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveThumbIndex((prev) => (prev + 1) % allGalleryImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [allGalleryImages.length]);

  const mainImage = allGalleryImages[activeThumbIndex];
  const thumbnails = allGalleryImages.filter((_, idx) => idx !== activeThumbIndex);

  const events = activeTab === 'upcoming' ? upcomingEvents : pastEvents;

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* EVENTS AND GALLERY SECTION */}
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

          {/* TAB SELECTOR */}
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
                Upcoming (5)
              </button>
              <button
                onClick={() => setActiveTab('past')}
                className={`px-5 py-2 rounded-lg text-2xl md:text-3xl font-medium transition-colors ${
                  activeTab === 'past'
                    ? 'bg-[#C93601] text-white'
                    : 'bg-transparent text-[#5B933C]'
                }`}
              >
                Past Events
              </button>
            </div>
          </div>

          {/* EVENTS GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
            {events.map((event, idx) => (
              <article key={idx} className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="relative h-64">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-5 space-y-4">
                  <div className="space-y-2">
                    <h3 className={`text-xl font-medium ${activeTab === 'past' ? 'text-[rgba(196,93,22,0.4)]' : 'text-[#5B933C]'}`}>
                      {event.title}
                    </h3>
                    <p className="text-lg text-[#212121]">{event.type}</p>
                  </div>
                  <div className="text-sm font-medium text-[#212121] space-y-1">
                    <p>Date: {event.date}</p>
                    <p>Time: {event.time}</p>
                    <p>Venue: {event.venue}</p>
                  </div>
                  <button 
                    className={`border rounded font-semibold text-sm px-6 py-3 transition-colors ${
                      activeTab === 'past'
                        ? 'border-[rgba(196,93,22,0.4)] text-[rgba(196,93,22,0.4)]'
                        : 'border-[#E6731F] text-[#E6731F] hover:bg-[#E6731F] hover:text-white'
                    }`}
                  >
                    Register Now
                  </button>
                </div>
              </article>
            ))}
          </div>

          {/* VIEW ALL PAST EVENTS BUTTON (only show when on past events tab) */}
          {activeTab === 'past' && (
            <div className="flex justify-center mt-10">
              <button className="px-8 py-3.5 bg-[#E6731F] text-white rounded text-sm font-semibold shadow-md hover:bg-[#C45D16] transition-colors">
                View All Past Events
              </button>
            </div>
          )}

          {/* PAGINATION DOTS (only show when on upcoming tab) */}
          {activeTab === 'upcoming' && (
            <div className="flex items-center justify-center gap-3">
              <div className="w-12 h-3 rounded-full bg-[#E6731F]"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-[#C45D16] opacity-40"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-[#C45D16] opacity-40"></div>
            </div>
          )}
        </div>
      </section>

      {/* EVENT PHOTO GALLERY */}
      <section className="w-full py-16 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 md:px-24">
          <h2 className="text-3xl md:text-4xl font-medium mb-10 text-center">
            Event <span className="text-[#C45D16]">Photo Gallery</span>
          </h2>

          {/* MAIN GALLERY IMAGE */}
          <div className="relative rounded-2xl shadow-xl overflow-hidden mb-10">
            <img
              src={mainImage.image}
              alt="Event Gallery"
              className="w-full h-auto max-h-[630px] object-cover"
            />
            <div className="absolute bottom-0 left-0 bg-[#C93601] rounded-tr-2xl p-5 space-y-2">
              <h3 className="text-white text-2xl md:text-3xl font-medium">
                {mainImage.title}
              </h3>
              <p className="text-white text-xl md:text-2xl font-medium">
                {mainImage.date}
              </p>
            </div>
          </div>

          {/* THUMBNAIL GALLERY */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10 mb-10">
            {thumbnails.map((thumb, idx) => (
              <div
                key={idx}
                onClick={() => {
                  const originalIndex = allGalleryImages.findIndex(img => img.image === thumb.image);
                  setActiveThumbIndex(originalIndex);
                }}
                className={`relative overflow-hidden cursor-pointer transition-all ${
                  idx === 0 ? 'border-[3px] border-[#212121]' : 'border border-[#C45D16]'
                }`}
              >
                <img
                  src={thumb.image}
                  alt={`Gallery thumbnail ${idx + 1}`}
                  className="w-full h-56 object-cover"
                />
              </div>
            ))}
          </div>

          {/* PAGINATION DOTS */}
          <div className="flex items-center justify-center gap-3">
            <div className="w-12 h-3 rounded-full bg-[#E6731F]"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-[#C45D16] opacity-40"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-[#C45D16] opacity-40"></div>
          </div>
        </div>
      </section>

      {/* PHOTO NEWS GALLERY */}
      <section className="w-full py-16 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 md:px-24">
          <h2 className="text-3xl md:text-4xl font-medium mb-10 text-center">
            Photo <span className="text-[#C45D16]">News</span>
          </h2>

          {/* MAIN IMAGE */}
          <div className="relative rounded-2xl shadow-xl overflow-hidden mb-10">
            <img
              src={mainImage.image}
              alt="Photo News"
              className="w-full h-auto max-h-[630px] object-cover"
            />
            <div className="absolute bottom-0 left-0 bg-[#C93601] rounded-tr-2xl p-5 space-y-2">
              <h3 className="text-white text-2xl md:text-3xl font-medium">
                {mainImage.title}
              </h3>
              <p className="text-white text-xl md:text-2xl font-medium">
                {mainImage.date}
              </p>
            </div>
          </div>

          {/* THUMBNAIL GRID */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10 mb-10">
            {thumbnails.map((thumb, idx) => (
              <div
                key={idx}
                onClick={() => {
                  const originalIndex = allPhotoNewsImages.findIndex(
                    img => img.image === thumb.image
                  );
                  setActiveThumbIndex(originalIndex);
                }}
                className={`relative overflow-hidden cursor-pointer transition-all ${idx === 0 ? 'border-[3px] border-[#212121]' : 'border border-[#C45D16]'
                  }`}
              >
                <img
                  src={thumb.image}
                  alt={`Photo news thumbnail ${idx + 1}`}
                  className="w-full h-56 object-cover"
                />
              </div>
            ))}
          </div>

          {/* PAGINATION DOTS */}
          <div className="flex items-center justify-center gap-3">
            <div className="w-12 h-3 rounded-full bg-[#E6731F]"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-[#C45D16] opacity-40"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-[#C45D16] opacity-40"></div>
          </div>
        </div>
      </section>

      {/* Orange Spacing Before Stay in the Loop */}
      <div className="w-full" style={{ background: 'rgba(196, 93, 22, 0.20)', height: '2px' }}></div>

      {/* STAY IN THE LOOP */}
      <StayInTheLoop />

      {/* Orange Spacing Before Footer */}
      <div className="w-full" style={{ background: 'rgba(196, 93, 22, 0.20)', height: '2px' }}></div>

      <Footer />
    </div>
  );
}
