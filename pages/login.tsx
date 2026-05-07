import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useRouter } from 'next/router';
import Header from '../components/Header';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) {
      alert(error.message);
      return;
    }
    router.push('/admin/dashboard');
  };

  return (
    <div className="relative min-h-screen bg-white overflow-hidden" style={{ fontFamily: 'Roboto, sans-serif' }}>
      <Header />
      
      {/* Background Gear */}
      <img
        src="https://cdn.builder.io/api/v1/image/assets%2Fc0a32adccede4711b4a58b346637d3ad%2Fb7acb3b6669c43dca06bee5fdf1a7738?format=webp&width=800"
        alt="Gear decoration"
        className="absolute right-0 top-[60%] pointer-events-none hidden lg:block"
        style={{
          width: '420.265px',
          height: '714.022px',
          transform: 'rotate(-13.24deg) translateY(-50%)'
        }}
      />

      <div className="relative min-h-[calc(100vh-80px)] flex items-center justify-center py-8 px-4 overflow-visible">
        <div className="w-full max-w-sm lg:max-w-md mx-auto">
          <div className="flex items-center justify-center gap-3 mb-2.5">
            <h2 
              className="text-[#212121] text-center font-bold" 
              style={{ fontSize: '2.25rem', lineHeight: '2.75rem' }}
            >
              Admin Login
            </h2>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.9799 1.54602L18.8029 2.11302C20.0093 2.94603 21.0543 3.99135 21.8869 5.19802L22.4539 6.02102L20.8079 7.15602L20.2399 6.33202C19.5453 5.3261 18.6738 4.45464 17.6679 3.76002L16.8439 3.19202L17.9799 1.54602ZM11.4559 6.87802C11.3826 6.80854 11.285 6.77041 11.184 6.77173C11.083 6.77305 10.9865 6.81372 10.915 6.88509C10.8435 6.95646 10.8026 7.05291 10.8011 7.15392C10.7996 7.25493 10.8376 7.35255 10.9069 7.42602L16.1439 12.663L14.7299 14.077L8.1269 7.47302C8.09085 7.43697 8.04806 7.40838 8.00096 7.38887C7.95386 7.36936 7.90338 7.35932 7.8524 7.35932C7.80142 7.35932 7.75094 7.36936 7.70384 7.38887C7.65674 7.40838 7.61395 7.43697 7.5779 7.47302C7.54185 7.50907 7.51326 7.55186 7.49375 7.59896C7.47424 7.64606 7.4642 7.69654 7.4642 7.74752C7.4642 7.7985 7.47424 7.84898 7.49375 7.89608C7.51326 7.94318 7.54185 7.98597 7.5779 8.02202L14.1819 14.625L12.7679 16.039L7.5309 10.803C7.49564 10.764 7.4528 10.7325 7.40499 10.7105C7.35718 10.6885 7.3054 10.6765 7.2528 10.6751C7.2002 10.6738 7.14787 10.6832 7.099 10.7027C7.05014 10.7222 7.00575 10.7515 6.96854 10.7887C6.93133 10.8259 6.90208 10.8703 6.88257 10.9191C6.86305 10.968 6.85368 11.0203 6.85502 11.0729C6.85637 11.1255 6.8684 11.1773 6.89038 11.2251C6.91236 11.2729 6.94384 11.3158 6.9829 11.351L12.2189 16.587L10.8049 18.002L7.6529 14.85C7.57934 14.7844 7.48347 14.7494 7.38495 14.7522C7.28642 14.755 7.1927 14.7954 7.123 14.8651C7.05331 14.9348 7.01291 15.0285 7.0101 15.1271C7.0073 15.2256 7.04228 15.3215 7.1079 15.395L10.2569 18.544C9.65134 19.1496 9.65134 20.1294 10.2569 20.735C10.8625 21.3406 11.8423 21.3406 12.4479 20.735L20.7349 12.448C21.3405 11.8424 21.3405 10.8626 20.7349 10.257C20.1293 9.65143 19.1495 9.65143 18.5439 10.257L16.5859 12.215L11.4559 6.87802Z" fill="#5B933C"/>
            </svg>
          </div>
          
          <p 
            className="text-[#5B933C] text-center font-bold mb-15" 
            style={{ fontSize: '1.375rem', lineHeight: '1.75rem', marginBottom: '3.75rem' }}
          >
            Enter your credentials
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex flex-col gap-2.5 p-2 px-5 rounded bg-[rgba(196,93,22,0.2)]">
              <label className="text-[#5B933C] font-bold text-xs tracking-wide">Email address*</label>
              <input
                className="bg-transparent text-[#212121] font-semibold outline-none"
                style={{ fontSize: '0.875rem', lineHeight: '1.25rem' }}
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                required
              />
            </div>

            <div>
              <div className="flex flex-col gap-2.5 p-2 px-5 rounded bg-[rgba(196,93,22,0.2)]">
                <label className="text-[#5B933C] font-bold text-xs tracking-wide">Password*</label>
                <div className="flex items-center gap-2.5">
                  <input
                    className="flex-1 bg-transparent text-[#212121] font-semibold outline-none"
                    style={{ fontSize: '0.875rem', lineHeight: '1.25rem' }}
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type={showPassword ? 'text' : 'password'}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="w-6 h-6 relative flex-shrink-0"
                    aria-label="Toggle password visibility"
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <svg width="8" height="8" viewBox="0 0 8 8" fill="none" x="8" y="8">
                        <path d="M2.1416 3.2627C2.05096 3.49097 2 3.73944 2 4C2 5.10457 2.89543 6 4 6C4.26036 6 4.50819 5.94794 4.73633 5.85742L6.21094 7.33203C5.57741 7.75325 4.81781 8 4 8C1.79086 8 0 6.20914 0 4C0 3.1821 0.245685 2.42166 0.666992 1.78809L2.1416 3.2627ZM4 0C6.20914 0 8 1.79086 8 4C8 4.27358 7.97225 4.54069 7.91992 4.79883L3.2002 0.0791016C3.45857 0.0266795 3.72616 0 4 0Z" fill="#212121"/>
                      </svg>
                      <svg width="20" height="14" viewBox="0 0 20 14" fill="none" x="2" y="5">
                        <path d="M5.34473 3.69531C4.06462 4.63256 3.01998 5.76235 2.35449 6.57031C2.25481 6.69133 2.17986 6.78168 2.11816 6.86133C2.0697 6.9239 2.03984 6.96858 2.01953 7C2.03984 7.03142 2.0697 7.0761 2.11816 7.13867C2.17986 7.21832 2.25481 7.30867 2.35449 7.42969C3.03469 8.25551 4.11072 9.41821 5.42969 10.3672C6.75667 11.3219 8.24477 12 9.77051 12C10.8181 12 11.8473 11.6793 12.8193 11.1699L14.2881 12.6387C12.975 13.4171 11.4404 13.9999 9.77051 14C7.66069 14 5.76472 13.0725 4.26172 11.9912C2.75084 10.9042 1.55042 9.59945 0.810547 8.70117C0.514448 8.3417 0.0611908 7.85458 0.00585938 7.14453L0 7L0.00585938 6.85547C0.0611908 6.14542 0.514447 5.6583 0.810547 5.29883C1.49295 4.47032 2.56685 3.29591 3.91504 2.26562L5.34473 3.69531ZM9.77051 0C11.8803 6.83974e-05 13.7763 0.927485 15.2793 2.00879C16.7902 3.09582 17.9906 4.40058 18.7305 5.29883C19.0463 5.68218 19.541 6.2108 19.541 7C19.541 7.7892 19.0463 8.31782 18.7305 8.70117C18.2438 9.29205 17.5554 10.0563 16.7129 10.8213L15.2969 9.40527C16.0769 8.70563 16.7242 7.99097 17.1865 7.42969C17.2862 7.30867 17.3612 7.21832 17.4229 7.13867C17.4711 7.07638 17.5002 7.03138 17.5205 7C17.5002 6.96862 17.4711 6.92362 17.4229 6.86133C17.3612 6.78168 17.2862 6.69133 17.1865 6.57031C16.5064 5.74452 15.4303 4.58182 14.1113 3.63281C12.7844 2.67813 11.2962 2.00007 9.77051 2C9.2197 2 8.67383 2.08922 8.13867 2.24707L6.57715 0.685547C7.56093 0.268762 8.63482 0 9.77051 0Z" fill="#212121"/>
                      </svg>
                      <line x1="5" y1="2" x2="19" y2="18" stroke="#212121" strokeWidth="2"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded bg-[#E6731F] text-white font-semibold shadow-md"
              style={{ fontSize: '0.875rem' }}
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
