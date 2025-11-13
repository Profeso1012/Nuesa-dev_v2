import type { AppProps } from 'next/app';
import '../styles/globals.css';
import Head from 'next/head';
import { useEffect } from 'react';

export default function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // Suppress noisy third-party fetch errors (e.g. FullStory) that can happen in dev / preview environments
    // Wrap fetch so FullStory network failures don't bubble up and break HMR/dev overlay.
    const originalFetch = window.fetch.bind(window);
    const wrappedFetch = async (input: RequestInfo, init?: RequestInit) => {
      try {
        const url = typeof input === 'string' ? input : (input as Request).url || '';
        if (typeof url === 'string' && url.includes('fullstory')) {
          try {
            return await originalFetch(input, init);
          } catch (err) {
            // swallow FullStory fetch errors to avoid dev overlay noise
            // eslint-disable-next-line no-console
            console.warn('[suppressed] FullStory fetch failed:', err && (err as any).message ? (err as any).message : err);
            return new Response(null, { status: 204, statusText: 'No Content' });
          }
        }
        return await originalFetch(input, init);
      } catch (err) {
        // fallback to original fetch on unexpected issues
        return originalFetch(input, init);
      }
    };

    (window as any).fetch = wrappedFetch;

    const onUnhandledRejection = (event: PromiseRejectionEvent) => {
      try {
        const reason: any = event?.reason;
        const message = (reason && (reason.message || reason.toString())) || '';
        const stack = reason && reason.stack ? String(reason.stack) : '';
        if (message.includes('Failed to fetch') && (stack.includes('fullstory') || stack.includes('edge.fullstory')) ) {
          // Prevent the error from being logged as an unhandled rejection
          event.preventDefault();
          // keep a small console note for debugging
          // eslint-disable-next-line no-console
          console.warn('[suppressed] Third-party fetch failure:', message);
        }
      } catch (err) {
        // Ignore handler errors
      }
    };

    const onWindowError = (ev: ErrorEvent) => {
      try {
        const src = ev?.filename || '';
        if (typeof src === 'string' && src.includes('edge.fullstory')) {
          ev.preventDefault();
          // eslint-disable-next-line no-console
          console.warn('[suppressed] Third-party script error from FullStory:', ev.message);
        }
      } catch (err) {
        // ignore
      }
    };

    window.addEventListener('unhandledrejection', onUnhandledRejection);
    window.addEventListener('error', onWindowError);

    return () => {
      (window as any).fetch = originalFetch;
      window.removeEventListener('unhandledrejection', onUnhandledRejection as any);
      window.removeEventListener('error', onWindowError as any);
    };
  }, []);

  return (
    <>
      <Component {...pageProps} />
    </>
  );
}