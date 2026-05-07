import Header from '../components/Header';
import Footer from '../components/Footer';
import Link from 'next/link';

const contacts = [
  {
    label: 'Gmail',
    handle: 'nuesalasu@gmail.com',
    href: 'mailto:nuesalasu@gmail.com',
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
        <path d="M6 8h36c1.1 0 2 .9 2 2v28c0 1.1-.9 2-2 2H6c-1.1 0-2-.9-2-2V10c0-1.1.9-2 2-2z" fill="#fff" stroke="#ddd"/>
        <path d="M4 10l20 14L44 10" stroke="#EA4335" strokeWidth="2.5" fill="none"/>
        <path d="M4 10l20 14L44 10V38H4V10z" fill="#fff"/>
        <path d="M4 10l20 14L44 10" fill="none" stroke="#EA4335" strokeWidth="2.5"/>
        <path d="M4 10v28h40V10L24 24 4 10z" fill="#fff"/>
        {/* Gmail M shape */}
        <path d="M4 10l20 14L44 10" stroke="#EA4335" strokeWidth="3" fill="none" strokeLinecap="round"/>
      </svg>
    ),
    color: '#EA4335',
  },
  {
    label: 'X (Twitter)',
    handle: '@nuesa_lasu',
    href: 'https://x.com/nuesa_lasu',
    icon: (
      <svg width="48" height="48" viewBox="0 0 24 24" fill="#000">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
    color: '#000000',
  },
  {
    label: 'Instagram',
    handle: '@info.nuesalasu',
    href: 'https://www.instagram.com/info.nuesalasu',
    icon: (
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
        <defs>
          <radialGradient id="ig-grad" cx="30%" cy="107%" r="150%">
            <stop offset="0%" stopColor="#fdf497"/>
            <stop offset="5%" stopColor="#fdf497"/>
            <stop offset="45%" stopColor="#fd5949"/>
            <stop offset="60%" stopColor="#d6249f"/>
            <stop offset="90%" stopColor="#285AEB"/>
          </radialGradient>
        </defs>
        <rect width="24" height="24" rx="6" fill="url(#ig-grad)"/>
        <circle cx="12" cy="12" r="4.5" stroke="white" strokeWidth="1.8" fill="none"/>
        <circle cx="17.5" cy="6.5" r="1.2" fill="white"/>
      </svg>
    ),
    color: '#d6249f',
  },
  {
    label: 'TikTok',
    handle: '@nuesalasu.socials',
    href: 'https://www.tiktok.com/@nuesalasu.socials',
    icon: (
      <svg width="48" height="48" viewBox="0 0 24 24" fill="#000">
        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.75a4.85 4.85 0 01-1.01-.06z"/>
      </svg>
    ),
    color: '#000000',
  },
];

export default function Contact() {
  return (
    <div className="min-h-screen bg-white font-roboto">
      <Header />

      <section className="w-full py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-6 md:px-24">
          <div className="text-center mb-16">
            <h1 className="text-3xl md:text-5xl font-medium text-[#212121] mb-4">
              Get in Touch with <span className="text-[#E6731F]">NUESA LASU</span>
            </h1>
            <p className="text-lg md:text-xl text-[#4B5563] max-w-2xl mx-auto leading-relaxed">
              Reach out to us through any of the channels below.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 justify-items-center">
            {contacts.map((c) => (
              <a
                key={c.label}
                href={c.href}
                target={c.href.startsWith('mailto') ? undefined : '_blank'}
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-3 group"
              >
                <div className="transition-transform group-hover:scale-110">
                  {c.icon}
                </div>
                <span className="text-base font-semibold text-[#212121]">{c.label}</span>
                <span className="text-sm text-[#4B5563] text-center">{c.handle}</span>
              </a>
            ))}
          </div>

          <div className="mt-16 text-center">
            <Link href="/" className="inline-flex items-center gap-2 text-[#E6731F] hover:text-[#C45D16] font-semibold transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Back to Home
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
