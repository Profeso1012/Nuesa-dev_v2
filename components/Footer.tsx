export default function Footer() {
  return (
    <footer className="w-full bg-[#793D14] text-white mt-12">
      <div className="max-w-7xl mx-auto px-6 md:px-24 py-10">
        <div className="flex flex-col md:flex-row gap-8 justify-between">
          <div className="md:w-1/3">
            <div className="flex items-center gap-3 mb-4">
              <img src="https://api.builder.io/api/v1/image/assets/TEMP/f63c9f0843d1fa4c98224886a4f06161bc5ab51f?width=97" alt="NUESA LASU" className="w-12 h-12" />
              <div className="font-semibold">NUESA LASU</div>
            </div>
            <p className="text-sm">The Nigerian Universities Engineering Students Association (NUESA) LASU Chapter is dedicated to promoting academic excellence, professional development, and innovation among engineering students.</p>
          </div>

          <div className="md:w-1/5">
            <h4 className="font-semibold mb-3">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>Home</li>
              <li>About</li>
              <li>Events</li>
              <li>Departments</li>
              <li>E-library</li>
            </ul>
          </div>

          <div className="md:w-1/4">
            <h4 className="font-semibold mb-3">Contact Us</h4>
            <div className="text-sm">nuesalasu@gmail.com</div>
            <div className="text-sm mt-2">Phone: +234 708 626 3849</div>
            <div className="text-sm mt-2">Address: Lagos State University, Epe</div>
          </div>

          <div className="md:w-1/6">
            <h4 className="font-semibold mb-3">Follow Us</h4>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white/10 rounded flex items-center justify-center">T</div>
              <div className="w-8 h-8 bg-white/10 rounded flex items-center justify-center">I</div>
              <div className="w-8 h-8 bg-white/10 rounded flex items-center justify-center">X</div>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-white/20 pt-6 text-center text-sm">© 2025 NUESA LASU. All rights reserved.</div>
      </div>
    </footer>
  );
}