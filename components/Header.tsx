import Link from 'next/link';
import { useState, useMemo } from 'react';
import { useRouter } from 'next/router';

export default function Header() {
  const [open, setOpen] = useState(false);
  const [deptDropdown, setDeptDropdown] = useState(false);
  const router = useRouter();

  const departments = [
    { name: 'Mechanical Engineering', slug: 'mechanical' },
    { name: 'Aerospace Engineering', slug: 'aerospace' },
    { name: 'Chemical Engineering', slug: 'chemical' },
    { name: 'Electronics & Computer Engineering', slug: 'electronics-computer' },
    { name: 'Civil Engineering', slug: 'civil' },
    { name: 'Industrial Engineering', slug: 'industrial' },
  ];

  const currentDeptName = useMemo(() => {
    const pathname = router.pathname;
    if (pathname.startsWith('/departments/')) {
      const slug = pathname.replace('/departments/', '');
      const dept = departments.find(d => d.slug === slug);
      return dept?.name || 'Departments';
    }
    return 'Departments';
  }, [router.pathname]);

  const isActive = (path: string) => {
    return router.pathname === path;
  };

  return (
    <header className="w-full bg-white border-b border-[#9BBBE5] shadow-sm">
      <div className="max-w-7xl mx-auto px-6 md:px-24 py-6 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <img 
            src="https://api.builder.io/api/v1/image/assets/TEMP/8daa62c44e137d724c296a6b2aaf25f3123e1f0a?width=97" 
            alt="NUESA LASU Logo" 
            className="w-12 h-12" 
            style={{ fontFamily: 'Roboto, sans-serif' }}
          />
          <span className="text-[#5B933C] font-medium" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '1.375rem', lineHeight: '1.75rem' }}>
            NUESA LASU
          </span>
        </div>

        <nav className="hidden md:flex items-center gap-2" style={{ fontFamily: 'Roboto, sans-serif' }}>
          <Link
            href="/"
            className={`px-2.5 py-1.5 text-sm font-medium rounded ${isActive('/') ? 'bg-[#C45D16] text-white' : 'hover:bg-gray-50'}`}
          >
            Home
          </Link>
          <Link
            href="/about"
            className={`px-2.5 py-1.5 text-sm font-medium rounded ${isActive('/about') ? 'bg-[#C45D16] text-white' : 'hover:bg-gray-50'}`}
          >
            About
          </Link>
          <Link
            href="/events"
            className={`px-2.5 py-1.5 text-sm font-medium rounded ${isActive('/events') ? 'bg-[#C45D16] text-white' : 'hover:bg-gray-50'}`}
          >
            Events
          </Link>
          <Link
            href="/departments"
            className={`px-2.5 py-1.5 text-sm font-medium rounded ${isActive('/departments') ? 'bg-[#C45D16] text-white' : 'hover:bg-gray-50'}`}
          >
            Departments
          </Link>
          <Link
            href="/partnerships"
            className={`px-2.5 py-1.5 text-sm font-medium rounded ${isActive('/partnerships') ? 'bg-[#C45D16] text-white' : 'hover:bg-gray-50'}`}
          >
            Partnerships
          </Link>
        </nav>

        <div className="hidden md:flex items-center gap-4" style={{ fontFamily: 'Roboto, sans-serif' }}>
          <Link href="/contact" className="px-8 py-3.5 border border-[#E6731F] text-[#E6731F] rounded text-sm font-semibold shadow-sm">
            Contact Faculty Admin
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

      {/* Mobile panel - full screen overlay */}
      <div
        className={`fixed inset-0 bg-white transform transition-transform duration-300 z-40 ${
          open ? 'translate-x-0' : '-translate-x-full'
        } md:hidden`}
      >
        <div className="h-full flex flex-col" style={{ fontFamily: 'Roboto, sans-serif' }}>
          {/* Header with close button */}
          <div className="flex items-center justify-between p-6 border-b border-[#9BBBE5]">
            <div className="flex items-center gap-2.5">
              <img
                src="https://api.builder.io/api/v1/image/assets/TEMP/8daa62c44e137d724c296a6b2aaf25f3123e1f0a?width=97"
                alt="NUESA LASU Logo"
                className="w-10 h-10"
              />
              <span className="text-[#5B933C] font-medium">NUESA LASU</span>
            </div>
            <button onClick={() => setOpen(false)} aria-label="Close menu" className="p-2 hover:bg-gray-50 rounded transition">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                <path d="M18 6L6 18M6 6l12 12" stroke="#212121" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>

          {/* Navigation items */}
          <nav className="flex-1 flex flex-col gap-0 p-6 overflow-y-auto">
            <Link href="/" onClick={() => setOpen(false)} className="font-medium text-lg py-3 px-4 hover:bg-gray-50 rounded text-[#212121] hover:text-[#5B933C] transition">
              Home
            </Link>
            <Link href="/about" onClick={() => setOpen(false)} className="font-medium text-lg py-3 px-4 hover:bg-gray-50 rounded text-[#212121] hover:text-[#5B933C] transition">
              About
            </Link>
            <Link href="/events" onClick={() => setOpen(false)} className="font-medium text-lg py-3 px-4 hover:bg-gray-50 rounded text-[#212121] hover:text-[#5B933C] transition">
              Events
            </Link>
            <Link href="/departments" onClick={() => setOpen(false)} className="font-medium text-lg py-3 px-4 hover:bg-gray-50 rounded text-[#212121] hover:text-[#5B933C] transition">
              Departments
            </Link>
            <Link href="/partnerships" onClick={() => setOpen(false)} className="font-medium text-lg py-3 px-4 hover:bg-gray-50 rounded text-[#212121] hover:text-[#5B933C] transition">
              Partnerships
            </Link>
          </nav>

          {/* Contact button at bottom */}
          <div className="border-t border-[#9BBBE5] p-6">
            <Link href="/contact" onClick={() => setOpen(false)} className="block px-4 py-3 border border-[#E6731F] text-[#E6731F] rounded text-center text-lg font-semibold hover:bg-orange-50 transition">
              Contact Faculty Admin
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
