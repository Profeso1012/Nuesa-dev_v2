import { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { supabase } from '../lib/supabaseClient';

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
      const { data, error } = await supabase
        .from('partners')
        .select('*')
        .order('created_at', { ascending: true });

      if (error) throw error;
      setPartners(data || []);
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

      {/* Hero Section - Building Impactful Collaborations */}
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

      {/* Our Valued Partners Section */}
      <section className="w-full bg-white py-16 lg:py-22">
        <div className="max-w-5xl mx-auto px-6 md:px-24">
          <div className="flex flex-col items-center gap-5 mb-12">
            <h2 className="text-4xl md:text-5xl font-medium text-center leading-tight">
              <span className="text-[#212121]">Our Valued </span>
              <span className="text-[#C45D16]">Partners</span>
            </h2>
            <p className="text-xl md:text-2xl text-[#212121] text-center leading-relaxed max-w-3xl">
              We are proud to collaborate with organizations and initiatives that share our commitment to advancing engineering education and innovation.
            </p>
          </div>
        </div>
      </section>

      {/* Partner Logos Carousel */}
      <section className="w-full py-5 mb-16" style={{ background: 'rgba(196, 93, 22, 0.20)' }}>
        <div className="w-full overflow-hidden">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="text-[#C45D16] text-xl">Loading partners...</div>
            </div>
          ) : partners.length === 0 ? (
            <div className="flex items-center justify-center py-12">
              <div className="text-[#212121] text-xl">No partners yet</div>
            </div>
          ) : partners.length <= 4 ? (
            <div 
              className="flex items-center justify-center gap-12 lg:gap-32 px-6 md:px-24 py-5"
              style={{
                gridTemplateColumns: `repeat(${partners.length}, 1fr)`,
              }}
            >
              {partners.map((partner) => (
                <div key={partner.id} className="flex items-center justify-center">
                  <img
                    src={partner.logo_url}
                    alt={partner.name}
                    className="h-24 lg:h-28 w-auto object-contain"
                  />
                </div>
              ))}
            </div>
          ) : (
            <LogoCarousel partners={partners} />
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}

function LogoCarousel({ partners }: { partners: Partner[] }) {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setOffset((prev) => prev - 1);
    }, 30);

    return () => clearInterval(interval);
  }, []);

  const duplicatedPartners = [...partners, ...partners, ...partners];

  return (
    <div className="relative w-full overflow-hidden py-5">
      <div
        className="flex items-center gap-32"
        style={{
          transform: `translateX(${offset}px)`,
          willChange: 'transform',
        }}
        onTransitionEnd={() => {
          const logoWidth = 300;
          if (Math.abs(offset) >= partners.length * logoWidth) {
            setOffset(0);
          }
        }}
      >
        {duplicatedPartners.map((partner, idx) => (
          <div
            key={`${partner.id}-${idx}`}
            className="flex-shrink-0 flex items-center justify-center"
            style={{ minWidth: '200px' }}
          >
            <img
              src={partner.logo_url}
              alt={partner.name}
              className="h-24 lg:h-28 w-auto object-contain"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
