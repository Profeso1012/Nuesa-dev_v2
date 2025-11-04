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
    router.push('/');
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
              Welcome back
            </h2>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.9799 1.54602L18.8029 2.11302C20.0093 2.94603 21.0543 3.99135 21.8869 5.19802L22.4539 6.02102L20.8079 7.15602L20.2399 6.33202C19.5453 5.3261 18.6738 4.45464 17.6679 3.76002L16.8439 3.19202L17.9799 1.54602ZM11.4559 6.87802C11.3826 6.80854 11.285 6.77041 11.184 6.77173C11.083 6.77305 10.9865 6.81372 10.915 6.88509C10.8435 6.95646 10.8026 7.05291 10.8011 7.15392C10.7996 7.25493 10.8376 7.35255 10.9069 7.42602L16.1439 12.663L14.7299 14.077L8.1269 7.47302C8.09085 7.43697 8.04806 7.40838 8.00096 7.38887C7.95386 7.36936 7.90338 7.35932 7.8524 7.35932C7.80142 7.35932 7.75094 7.36936 7.70384 7.38887C7.65674 7.40838 7.61395 7.43697 7.5779 7.47302C7.54185 7.50907 7.51326 7.55186 7.49375 7.59896C7.47424 7.64606 7.4642 7.69654 7.4642 7.74752C7.4642 7.7985 7.47424 7.84898 7.49375 7.89608C7.51326 7.94318 7.54185 7.98597 7.5779 8.02202L14.1819 14.625L12.7679 16.039L7.5309 10.803C7.49564 10.764 7.4528 10.7325 7.40499 10.7105C7.35718 10.6885 7.3054 10.6765 7.2528 10.6751C7.2002 10.6738 7.14787 10.6832 7.099 10.7027C7.05014 10.7222 7.00575 10.7515 6.96854 10.7887C6.93133 10.8259 6.90208 10.8703 6.88257 10.9191C6.86305 10.968 6.85368 11.0203 6.85502 11.0729C6.85637 11.1255 6.8684 11.1773 6.89038 11.2251C6.91236 11.2729 6.94384 11.3158 6.9829 11.351L12.2189 16.587L10.8049 18.002L7.6529 14.85C7.57934 14.7844 7.48347 14.7494 7.38495 14.7522C7.28642 14.755 7.1927 14.7954 7.123 14.8651C7.05331 14.9348 7.01291 15.0285 7.0101 15.1271C7.0073 15.2256 7.04228 15.3215 7.1079 15.395L11.4279 19.715C11.9098 20.197 12.482 20.5793 13.1117 20.8402C13.7414 21.101 14.4163 21.2353 15.0979 21.2353C15.7795 21.2353 16.4544 21.101 17.0841 20.8402C17.7138 20.5793 18.286 20.197 18.7679 19.715L19.6119 18.871C20.4226 18.0601 20.942 17.0036 21.0889 15.8664C21.2358 14.7292 21.002 13.5753 20.4239 12.585L18.1969 8.77302C18.1786 8.74384 18.1505 8.72208 18.1177 8.7116C18.0848 8.70113 18.0493 8.7026 18.0175 8.71578C17.9856 8.72895 17.9595 8.75296 17.9436 8.78357C17.9278 8.81418 17.9233 8.84941 17.9309 8.88302L18.5999 11.379C18.6469 11.5531 18.646 11.7366 18.5972 11.9102C18.5484 12.0837 18.4537 12.2409 18.3229 12.365C18.1339 12.5451 17.882 12.6441 17.6209 12.6409C17.3599 12.6378 17.1105 12.5326 16.9259 12.348L11.4559 6.87802ZM5.9879 13.185L5.5679 12.765C5.3208 12.5179 5.13097 12.2195 5.0118 11.8909C4.89263 11.5624 4.84703 11.2117 4.87822 10.8636C4.9094 10.5155 5.01661 10.1785 5.19229 9.87634C5.36796 9.57421 5.6078 9.31432 5.8949 9.11502C5.57386 8.65515 5.42493 8.09696 5.47421 7.53828C5.52349 6.97961 5.76783 6.4561 6.1644 6.05953C6.56098 5.66295 7.08449 5.41861 7.64316 5.36933C8.20183 5.32006 8.76003 5.46899 9.2199 5.79002C9.2999 5.67469 9.39123 5.56569 9.4939 5.46302C9.94195 5.01602 10.549 4.76499 11.1819 4.76499C11.8148 4.76499 12.4218 5.01602 12.8699 5.46302L15.9479 8.54102C16.011 8.10025 16.2097 7.69005 16.5165 7.36731C16.8233 7.04457 17.2228 6.8253 17.6598 6.7399C18.0968 6.6545 18.5496 6.70721 18.9553 6.89072C19.361 7.07423 19.6995 7.37944 19.9239 7.76402L22.1509 11.576C22.9521 12.9481 23.2763 14.5469 23.0728 16.1227C22.8692 17.6985 22.1495 19.1625 21.0259 20.286L20.1819 21.13C18.8335 22.4783 17.0048 23.2358 15.0979 23.2358C13.191 23.2358 11.3623 22.4783 10.0139 21.13L5.6939 16.81C5.44919 16.5654 5.2606 16.2706 5.14119 15.9459C5.02179 15.6212 4.97443 15.2744 5.00239 14.9295C5.03036 14.5847 5.13299 14.25 5.30316 13.9488C5.47333 13.6476 5.70698 13.387 5.9879 13.185ZM3.1919 16.845L3.7599 17.668C4.45481 18.674 5.32662 19.5455 6.3329 20.24L7.1559 20.808L6.0209 22.454L5.1979 21.887C3.99123 21.0544 2.94591 20.0094 2.1129 18.803L1.5459 17.979L3.1919 16.845Z" fill="#212121"/>
            </svg>
          </div>
          
          <p 
            className="text-[#5B933C] text-center font-bold mb-15" 
            style={{ fontSize: '1.375rem', lineHeight: '1.75rem', marginBottom: '3.75rem' }}
          >
            Enter your details below
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
              <div className="text-right mt-2 pr-5">
                <span className="text-[#E6731F] text-sm font-bold cursor-pointer">Forgot password?</span>
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

            <div className="text-center text-sm pt-6">
              <span style={{ color: 'rgba(196,93,22,0.6)', fontWeight: 700, fontSize: '0.75rem' }}>
                Don't have an account?{' '}
              </span>
              <a href="/register" className="text-[#E6731F] font-bold" style={{ fontSize: '0.875rem' }}>
                Create Account
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
