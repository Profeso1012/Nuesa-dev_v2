import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="w-full bg-white border-b border-[#9BBBE5] shadow-sm">
      <div className="max-w-7xl mx-auto px-6 md:px-24 py-6 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <img 
            src="https://api.builder.io/api/v1/image/assets/TEMP/f63c9f0843d1fa4c98224886a4f06161bc5ab51f?width=97" 
            alt="NUESA LASU Logo" 
            className="w-12 h-12" 
            style={{ fontFamily: 'Roboto, sans-serif' }}
          />
          <span className="text-[#5B933C] font-medium" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '1.375rem', lineHeight: '1.75rem' }}>
            NUESA LASU
          </span>
        </div>

        <nav className="hidden md:flex items-center gap-2" style={{ fontFamily: 'Roboto, sans-serif' }}>
          <Link href="/" className="px-2.5 py-1.5 text-sm font-medium hover:bg-gray-50 rounded">Home</Link>
          <Link href="/about" className="px-2.5 py-1.5 text-sm font-medium hover:bg-gray-50 rounded">About</Link>
          <Link href="/events" className="px-2.5 py-1.5 text-sm font-medium hover:bg-gray-50 rounded">Events</Link>
          <Link href="/departments" className="px-2.5 py-1.5 text-sm font-medium hover:bg-gray-50 rounded flex items-center gap-1">
            Departments
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 9L12 15L6 9" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
          <Link href="/elibrary" className="px-2.5 py-1.5 text-sm font-medium hover:bg-gray-50 rounded">E-library</Link>
        </nav>

        <div className="hidden md:flex items-center gap-4" style={{ fontFamily: 'Roboto, sans-serif' }}>
          <Link href="/contact" className="px-8 py-3.5 border border-[#E6731F] text-[#E6731F] rounded text-sm font-semibold shadow-sm">
            Contact Faculty Admin
          </Link>
          <Link href="/login" className="px-8 py-3.5 bg-[#E6731F] text-white rounded text-sm font-semibold shadow-sm">
            Lecturer Login
          </Link>
        </div>

        <button
          className="md:hidden p-2"
          onClick={() => setOpen((s) => !s)}
          aria-label="Toggle menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M4 6H20M4 12H20M4 18H20" stroke="#111827" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      {/* Mobile panel - left side slide-in */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 z-40 ${
          open ? 'translate-x-0' : '-translate-x-full'
        } md:hidden`}
        style={{ transformOrigin: 'left' }}
      >
        <div className="p-6" style={{ fontFamily: 'Roboto, sans-serif' }}>
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2.5">
              <img 
                src="https://api.builder.io/api/v1/image/assets/TEMP/f63c9f0843d1fa4c98224886a4f06161bc5ab51f?width=97" 
                alt="NUESA LASU Logo" 
                className="w-10 h-10" 
              />
              <span className="text-[#5B933C] font-medium">NUESA LASU</span>
            </div>
            <button onClick={() => setOpen(false)} aria-label="Close" className="text-2xl">✕</button>
          </div>

          <nav className="flex flex-col gap-4">
            <Link href="/" className="font-medium text-sm py-2 hover:text-[#5B933C]">Home</Link>
            <Link href="/about" className="font-medium text-sm py-2 hover:text-[#5B933C]">About</Link>
            <Link href="/events" className="font-medium text-sm py-2 hover:text-[#5B933C]">Events</Link>
            <Link href="/departments" className="font-medium text-sm py-2 hover:text-[#5B933C] flex items-center gap-1">
              Departments
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M18 9L12 15L6 9" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
            <Link href="/elibrary" className="font-medium text-sm py-2 hover:text-[#5B933C]">E-library</Link>
            <Link href="/contact" className="mt-4 px-3 py-2 border border-[#E6731F] text-[#E6731F] rounded text-center text-sm font-semibold">
              Contact Faculty Admin
            </Link>
            <Link href="/login" className="px-3 py-2 bg-[#E6731F] text-white rounded text-center text-sm font-semibold">
              Lecturer Login
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
