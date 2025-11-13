import { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { getCachedData, setCachedData } from '../lib/cacheUtils';
import StayInTheLoop from '../components/StayInTheLoop';

interface Partner {
  id: string;
  logo_url: string;
  name: string;
  created_at: string;
}

export default function Partnerships() {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPartners();
  }, []);

  const fetchPartners = async () => {
    try {
      const cacheKey = 'partners_all';
      
      const cached = getCachedData<Partner[]>(cacheKey);
      if (cached && cached.length > 0) {
        setPartners(cached);
        setLoading(false);
        return;
      }

      const response = await fetch('/api/partners');
      if (!response.ok) throw new Error('Failed to fetch partners');
      
      const data: Partner[] = await response.json();
      setCachedData(cacheKey, data);
      setPartners(data);
    } catch (error) {
      console.error('Error fetching partners:', error);
      setPartners([
        {
          id: '1',
          logo_url: 'https://api.builder.io/api/v1/image/assets/TEMP/8018abdf3cda3ae217a47536116433c51bd6d6eb?width=227',
          name: 'Partner 1',
          created_at: new Date().toISOString(),
        },
        {
          id: '2',
          logo_url: 'https://api.builder.io/api/v1/image/assets/TEMP/d284db8c98d5ef2dd7ef1877b67afbf797c4ab3f?width=782',
          name: 'Partner 2',
          created_at: new Date().toISOString(),
        },
        {
          id: '3',
          logo_url: 'https://api.builder.io/api/v1/image/assets/TEMP/4e9953c91b219726188361aa89b249728d63f55e?width=319',
          name: 'Partner 3',
          created_at: new Date().toISOString(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: 'Roboto, sans-serif' }}>
      <Header />

      <section className="w-full bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-24 py-16 lg:py-22 flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20">
          <div className="lg:w-1/2 w-full space-y-5">
            <h1 className="text-4xl md:text-5xl font-medium leading-tight">
              <span className="text-[#212121]">Building </span>
              <span className="text-[#C45D16]">Impactful Collaborations</span>
            </h1>
            <p className="text-xl md:text-2xl text-[#212121] leading-relaxed">
              At NUESA LASU, we believe in the power of collaboration to drive innovation, learning, and community growth. Our partnerships create opportunities for engineering students to gain exposure, develop skills, and contribute to real-world solutions.
            </p>
          </div>

          <div className="lg:w-1/2 w-full flex justify-center items-center">
            <div className="relative rounded-xl border-3 border-[#C45D16] shadow-2xl overflow-hidden" style={{ borderWidth: '3px' }}>
              <img
                src="https://api.builder.io/api/v1/image/assets/TEMP/be4645e3e0af5655f6c0e4ea1b43287bcd6146f6?width=1362"
                alt="Partners collaboration"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="w-full bg-gray-50 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 md:px-24">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-medium">
              Our <span className="text-[#C45D16]">Partners</span>
            </h2>
            <p className="text-lg text-[#212121] mt-4">Driving Growth Through Strategic Collaborations</p>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <p className="text-gray-600">Loading partners...</p>
            </div>
          ) : partners.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600">No partners yet.</p>
            </div>
          ) : (
            <div className={`flex items-center justify-center gap-8 flex-wrap ${partners.length > 4 ? 'overflow-x-auto py-4' : ''}`}>
              {partners.length > 4 ? (
                <div className="flex gap-8 animate-scroll w-full">
                  {[...partners, ...partners].map((partner, idx) => (
                    <div
                      key={idx}
                      className="flex-shrink-0 w-32 h-32 flex items-center justify-center bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
                    >
                      <img
                        src={partner.logo_url}
                        alt={partner.name}
                        className="w-full h-full object-contain p-4"
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex gap-8 flex-wrap justify-center w-full">
                  {partners.map((partner) => (
                    <div
                      key={partner.id}
                      className="w-32 h-32 flex items-center justify-center bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
                    >
                      <img
                        src={partner.logo_url}
                        alt={partner.name}
                        className="w-full h-full object-contain p-4"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      <section className="w-full py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 md:px-24">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-[#C45D16] text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 text-3xl font-bold">
                1
              </div>
              <h3 className="text-2xl font-semibold text-[#212121] mb-3">Industry Connection</h3>
              <p className="text-[#4B5563]">
                Gain hands-on experience and insights from leading organizations in the engineering sector.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-[#C45D16] text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 text-3xl font-bold">
                2
              </div>
              <h3 className="text-2xl font-semibold text-[#212121] mb-3">Skill Development</h3>
              <p className="text-[#4B5563]">
                Access workshops, seminars, and mentorship programs designed to enhance your professional capabilities.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-[#C45D16] text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 text-3xl font-bold">
                3
              </div>
              <h3 className="text-2xl font-semibold text-[#212121] mb-3">Career Opportunities</h3>
              <p className="text-[#4B5563]">
                Explore internships, job placements, and career pathways with our partner organizations.
              </p>
            </div>
          </div>
        </div>
      </section>

      <StayInTheLoop />

      <div className="w-full bg-[#E6731F] h-20"></div>

      <Footer />

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-scroll {
          animation: scroll 20s linear infinite;
        }
      `}</style>
    </div>
  );
}
