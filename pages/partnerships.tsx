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
      <section className="w-full py-5" style={{ background: 'rgba(196, 93, 22, 0.20)' }}>
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

      {/* Why Partner With NUESA LASU Section */}
      <section className="w-full bg-white py-16 lg:py-22">
        <div className="max-w-7xl mx-auto px-6 md:px-24">
          <h2 className="text-4xl md:text-5xl font-medium text-center mb-12 leading-tight">
            <span className="text-[#212121]">Why </span>
            <span className="text-[#C45D16]">Partner With NUESA LASU?</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Benefit Card 1 */}
            <div className="bg-white rounded-2xl shadow-lg p-5 flex flex-col gap-4">
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M34.29 27.4199V20.5649H13.71V27.4199H0V47.9999H48V27.4199H34.29ZM13.71 45.7049H2.295V29.7149H13.71V45.7049ZM31.995 45.7049H16.005V22.8599H31.995V45.7049ZM45.72 45.7049H34.29V29.7149H45.72V45.7049Z" fill="#C93601"/>
                <path d="M43.4252 31.995H36.5702V34.29H41.1452V36.57H36.5702V38.85H41.1452V41.145H36.5702V43.425H43.4252V31.995ZM38.8652 9.135H43.4252V11.43H38.8652V9.135ZM36.5702 0H38.8652V2.28H36.5702V0ZM34.2902 2.28H36.5702V4.575H34.2902V2.28ZM27.4352 34.29H25.1402V25.14H20.5802V27.42H22.8602V34.29H20.5802V36.57H27.4352V34.29ZM22.8602 0H25.1402V4.575H22.8602V0ZM13.7102 6.855V15.99H16.0052V18.285H31.9952V15.99H34.2902V6.855H31.9952V9.135H29.7152V11.43H27.4352V9.135H25.1402V6.855H22.8602V9.135H20.5802V11.43H18.2852V9.135H16.0052V6.855H13.7102ZM27.4352 13.71H29.7152V15.99H27.4352V13.71ZM22.8602 13.71H25.1402V15.99H22.8602V13.71ZM18.2852 13.71H20.5802V15.99H18.2852V13.71ZM11.4302 2.28H13.7102V4.575H11.4302V2.28ZM9.1502 0H11.4302V2.28H9.1502V0ZM11.4302 41.145H6.8552V38.85H11.4302V31.995H4.5752V34.29H9.1502V36.57H4.5752V43.425H11.4302V41.145ZM4.5752 9.135H9.1502V11.43H4.5752V9.135Z" fill="#C93601"/>
              </svg>
              <p className="text-xl md:text-2xl text-[#212121] leading-relaxed">
                Connect with bright and innovative engineering students.
              </p>
            </div>

            {/* Benefit Card 2 */}
            <div className="bg-white rounded-2xl shadow-lg p-5 flex flex-col gap-4">
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M24 32C26.5 32 28.6253 31.1253 30.376 29.376C32.1267 27.6267 33.0013 25.5013 33 23C32.9987 20.4987 32.124 18.374 30.376 16.626C28.628 14.878 26.5027 14.0027 24 14C21.4973 13.9973 19.3727 14.8727 17.626 16.626C15.8793 18.3793 15.004 20.504 15 23C14.996 25.496 15.8713 27.6213 17.626 29.376C19.3807 31.1307 21.5053 32.0053 24 32ZM24 28.4C22.5 28.4 21.2253 27.8747 20.176 26.824C19.1267 25.7733 18.6013 24.4987 18.6 23C18.5987 21.5013 19.124 20.2267 20.176 19.176C21.228 18.1253 22.5027 17.6 24 17.6C25.4973 17.6 26.7727 18.1253 27.826 19.176C28.8793 20.2267 29.404 21.5013 29.4 23C29.396 24.4987 28.8713 25.774 27.826 26.826C26.7807 27.878 25.5053 28.4027 24 28.4ZM24 38C19.1333 38 14.7 36.642 10.7 33.926C6.7 31.21 3.8 27.568 2 23C3.8 18.4333 6.7 14.792 10.7 12.076C14.7 9.36 19.1333 8.00133 24 8C28.8667 7.99867 33.3 9.35733 37.3 12.076C41.3 14.7947 44.2 18.436 46 23C44.2 27.5667 41.3 31.2087 37.3 33.926C33.3 36.6433 28.8667 38.0013 24 38Z" fill="#C93601"/>
              </svg>
              <p className="text-xl md:text-2xl text-[#212121] leading-relaxed">
                Showcase your brand across our events, website, and campus activities.
              </p>
            </div>

            {/* Benefit Card 3 */}
            <div className="bg-white rounded-2xl shadow-lg p-5 flex flex-col gap-4">
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10.286 28C8.78535 25.5425 7.99414 22.7175 8.00003 19.838C8.00003 11.09 15.164 4 24 4C32.836 4 40 11.09 40 19.838C40.0059 22.7175 39.2147 25.5425 37.714 28" stroke="#C93601" strokeWidth="3" strokeLinecap="round"/>
                <path d="M29.9998 38L29.7398 39.294C29.4598 40.708 29.3178 41.414 28.9998 41.974C28.5097 42.8371 27.7164 43.4872 26.7738 43.798C26.1638 44 25.4398 44 23.9998 44C22.5598 44 21.8358 44 21.2258 43.8C20.2828 43.4887 19.4894 42.8379 18.9998 41.974C18.6818 41.414 18.5398 40.708 18.2598 39.294L17.9998 38M14.7658 34.196C14.5818 33.644 14.4898 33.366 14.4998 33.142C14.5111 32.9104 14.5893 32.687 14.7248 32.4989C14.8604 32.3108 15.0476 32.166 15.2638 32.082C15.4718 32 15.7638 32 16.3438 32H31.6558C32.2378 32 32.5278 32 32.7358 32.08C32.9522 32.1641 33.1396 32.3092 33.2752 32.4977C33.4108 32.6862 33.4888 32.91 33.4998 33.142C33.5098 33.366 33.4178 33.642 33.2338 34.196C32.8938 35.218 32.7238 35.73 32.4618 36.144C31.9138 37.0092 31.0548 37.6313 30.0618 37.882C29.5858 38 29.0498 38 27.9758 38H20.0238C18.9498 38 18.4118 38 17.9378 37.88C16.9451 37.6298 16.0861 37.0085 15.5378 36.144C15.2758 35.73 15.1058 35.218 14.7658 34.196Z" stroke="#C93601" strokeWidth="3"/>
                <path d="M16.5 19.5L21 24V32M31.5 19.5L27 24V32M16.5 21C16.8978 21 17.2794 20.842 17.5607 20.5607C17.842 20.2794 18 19.8978 18 19.5C18 19.1022 17.842 18.7206 17.5607 18.4393C17.2794 18.158 16.8978 18 16.5 18C16.1022 18 15.7206 18.158 15.4393 18.4393C15.158 18.7206 15 19.1022 15 19.5C15 19.8978 15.158 20.2794 15.4393 20.5607C15.7206 20.842 16.1022 21 16.5 21ZM31.5 21C31.1022 21 30.7206 20.842 30.4393 20.5607C30.158 20.2794 30 19.8978 30 19.5C30 19.1022 30.158 18.7206 30.4393 18.4393C30.7206 18.158 31.1022 18 31.5 18C31.8978 18 32.2794 18.158 32.5607 18.4393C32.842 18.7206 33 19.1022 33 19.5C33 19.8978 32.842 20.2794 32.5607 20.5607C32.2794 20.842 31.8978 21 31.5 21Z" stroke="#C93601" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <p className="text-xl md:text-2xl text-[#212121] leading-relaxed">
                Collaborate on projects, challenges, and research initiatives.
              </p>
            </div>

            {/* Benefit Card 4 */}
            <div className="bg-white rounded-2xl shadow-lg p-5 flex flex-col gap-4">
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.5 11.5C17.5 9.77609 18.1848 8.12279 19.4038 6.90381C20.6228 5.68482 22.2761 5 24 5C25.7239 5 27.3772 5.68482 28.5962 6.90381C29.8152 8.12279 30.5 9.77609 30.5 11.5C30.5 13.2239 29.8152 14.8772 28.5962 16.0962C27.3772 17.3152 25.7239 18 24 18C22.2761 18 20.6228 17.3152 19.4038 16.0962C18.1848 14.8772 17.5 13.2239 17.5 11.5ZM9.5 9C8.04131 9 6.64236 9.57946 5.61091 10.6109C4.57946 11.6424 4 13.0413 4 14.5C4 15.9587 4.57946 17.3576 5.61091 18.3891C6.64236 19.4205 8.04131 20 9.5 20C10.9587 20 12.3576 19.4205 13.3891 18.3891C14.4205 17.3576 15 15.9587 15 14.5C15 13.0413 14.4205 11.6424 13.3891 10.6109C12.3576 9.57946 10.9587 9 9.5 9ZM38.5 9C37.0413 9 35.6424 9.57946 34.6109 10.6109C33.5795 11.6424 33 13.0413 33 14.5C33 15.9587 33.5795 17.3576 34.6109 18.3891C35.6424 19.4205 37.0413 20 38.5 20C39.9587 20 41.3576 19.4205 42.3891 18.3891C43.4205 17.3576 44 15.9587 44 14.5C44 13.0413 43.4205 11.6424 42.3891 10.6109C41.3576 9.57946 39.9587 9 38.5 9ZM18.25 21C17.388 21 16.5614 21.3424 15.9519 21.9519C15.3424 22.5614 15 23.388 15 24.25V32C15 34.3869 15.9482 36.6761 17.636 38.364C19.3239 40.0518 21.6131 41 24 41C26.3869 41 28.6761 40.0518 30.364 38.364C32.0518 36.6761 33 34.3869 33 32V24.25C33 23.388 32.6576 22.5614 32.0481 21.9519C31.4386 21.3424 30.612 21 29.75 21H18.25ZM13.152 22.99C13.0513 23.394 13.0007 23.814 13 24.25V32C12.9985 33.6411 13.3648 35.2616 14.0721 36.7425C14.7794 38.2233 15.8096 39.5268 17.087 40.557C16.9357 40.607 16.7823 40.6523 16.627 40.693C15.4854 40.9991 14.2946 41.0773 13.1227 40.9232C11.9508 40.7691 10.8208 40.3857 9.79709 39.7948C8.7734 39.2039 7.87612 38.4172 7.1565 37.4796C6.43687 36.5419 5.90899 35.4717 5.603 34.33L4.114 28.776C4.00362 28.3637 3.97552 27.9337 4.03132 27.5106C4.08711 27.0874 4.22571 26.6794 4.43919 26.3098C4.65268 25.9403 4.93686 25.6164 5.27553 25.3566C5.6142 25.0969 6.00071 24.9064 6.413 24.796L13.152 22.99ZM30.912 40.557C32.1896 39.5269 33.22 38.2234 33.9275 36.7426C34.6349 35.2618 35.0014 33.6412 35 32V24.25C34.9987 23.814 34.948 23.394 34.848 22.99L41.586 24.795C42.4185 25.0181 43.1282 25.5628 43.5592 26.3091C43.9901 27.0555 44.107 27.9425 43.884 28.775L42.396 34.329C42.0797 35.5097 41.5262 36.6136 40.7693 37.5734C40.0123 38.5332 39.0678 39.3288 37.9933 39.9115C36.9189 40.4943 35.7369 40.8521 34.5196 40.963C33.3023 41.074 32.0742 40.9359 30.912 40.557Z" fill="#C93601"/>
              </svg>
              <p className="text-xl md:text-2xl text-[#212121] leading-relaxed">
                Contribute to the development of future engineers and tech leaders.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Partner With Us Section */}
      <section className="w-full bg-white py-16 lg:py-22">
        <div className="max-w-4xl mx-auto px-6 md:px-24">
          <div className="flex flex-col items-center gap-5 text-center">
            <h2 className="text-4xl md:text-5xl font-medium leading-tight">
              <span className="text-[#212121]">Partner </span>
              <span className="text-[#C45D16]">With Us</span>
            </h2>
            <p className="text-xl md:text-2xl text-[#212121] leading-relaxed max-w-3xl">
              Join us in shaping the future of engineering education and innovation at Lagos State University. We welcome collaborations, sponsorships, and strategic partnerships from organizations and individuals passionate about growth and impact.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-16 lg:py-22" style={{ background: 'rgba(196, 93, 22, 0.20)' }}>
        <div className="max-w-5xl mx-auto px-6 md:px-24 flex flex-col items-center gap-10">
          <div className="text-center space-y-3">
            <h2 className="text-2xl md:text-4xl font-medium leading-tight">
              <span className="text-[#212121]">Interested in </span>
              <span className="text-[#C45D16]">partnering with NUESA LASU</span>
              <span className="text-[#212121]"> or supporting our initiatives?</span>
            </h2>
            <p className="text-lg md:text-2xl text-[#212121] leading-relaxed">
              Reach out to our team via WhatsApp for quick inquiries or submit your details through our partnership form to get started.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-5">
            <button className="px-8 py-3.5 bg-[#E6731F] text-white rounded text-sm font-semibold shadow-md hover:bg-[#C45D16] transition-colors">
              Become A Partner
            </button>
            <button className="px-8 py-3.5 border border-[#E6731F] text-[#E6731F] rounded text-sm font-semibold shadow-md hover:bg-[#E6731F] hover:text-white transition-colors">
              Contact Us
            </button>
          </div>
        </div>
      </section>

      {/* Orange Spacing Before Footer */}
      <div className="w-full bg-[rgba(196,93,22,0.2)]" style={{ height: '1px' }}></div>

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
