'use client';
import { useState } from 'react';
import { toast } from 'sonner';

export default function StayInTheLoop() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async () => {
    if (!email) return;
    setLoading(true);
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        toast.success("You're subscribed. Thanks!");
        setEmail('');
      } else {
        const data = await res.json();
        if (data.error === 'Already subscribed') {
          toast.info('This email is already subscribed.');
        } else {
          toast.error('Something went wrong. Try again.');
        }
      }
    } catch {
      toast.error('Something went wrong. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="w-full bg-[#793D14] text-white">
      <div className="max-w-7xl mx-auto px-6 md:px-24 py-12 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="text-2xl md:text-3xl font-medium">Stay in the Loop with NUESA LASU</h3>
          <p className="mt-2 text-sm md:text-base">Subscribe to our newsletter for the latest updates on upcoming events.</p>
        </div>

        <div className="flex flex-col w-full md:w-auto gap-2">
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <input
              aria-label="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSubscribe()}
              className="px-3 py-2 rounded text-black w-full sm:w-64"
              disabled={loading}
            />
            <button
              onClick={handleSubscribe}
              disabled={loading}
              className="bg-[#E6731F] px-4 py-2 rounded text-white whitespace-nowrap w-full sm:w-auto disabled:opacity-60"
            >
              {loading ? 'Subscribing...' : 'Subscribe Now'}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
