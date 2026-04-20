import { useEffect, useRef, useState } from 'react';

export default function SceneHero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const media = window.matchMedia('(max-width: 768px)');
    const update = () => setIsMobile(media.matches);
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Handle autoplay failure silently
      });
    }
  }, []);

  if (isMobile) {
    return (
      <div className="relative mx-auto flex h-[72vh] max-w-5xl items-end justify-center overflow-hidden rounded-[2rem] border border-white/10 bg-black/70 p-6 shadow-card">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.08),_transparent_28%),linear-gradient(180deg,_rgba(139,0,0,0.25),transparent_70%)]" />
        <div className="relative z-10 max-w-xl text-center">
          <p className="text-sm uppercase tracking-[0.35em] text-gold/75">Immersive mobile flavor</p>
          <h2 className="mt-4 text-3xl font-semibold">A cinematic dining journey in every scroll.</h2>
          <p className="mt-4 text-sm leading-7 text-white/70">
            Tap through our menu, book catering, and experience premium Indian cuisine built for modern diners.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-[100vh] w-full overflow-hidden">
      {/* Video Background */}
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        poster="https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?auto=format&fit=crop&w=1200&q=80"
      >
        <source
          src="/videos/Firefly Ultra realistic cinematic slow-motion video of chicken biryani preparation, 4K resolution, 6.mp4"
          type="video/mp4"
        />
        {/* Fallback for browsers that don't support video */}
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?auto=format&fit=crop&w=1200&q=80')] bg-cover bg-center" />
      </video>

      {/* Overlay gradients for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-black/60" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

      {/* Content overlay */}
      <div className="relative z-10 flex h-full items-center justify-center px-6">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-sm uppercase tracking-[0.35em] text-gold/75">Premium Indian cuisine</p>
          <h2 className="mt-4 text-4xl font-semibold leading-tight sm:text-6xl text-white">
            Authentic Taste. Timeless Tradition.
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-white/80 sm:text-lg">
            Experience the art of Indian cooking through our cinematic culinary journey. From aromatic spices to exquisite presentations.
          </p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <a
              href="https://flavors-of-india-columbia-2.cloveronline.com/menu/all"
              className="inline-flex items-center justify-center rounded-full bg-gold px-8 py-3 text-sm font-semibold text-black shadow-glow transition hover:scale-[1.02]"
            >
              Store Order Pickup
            </a>

            <a href="#menu" className="text-sm text-white/70 transition hover:text-gold">
              Explore Menu
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
