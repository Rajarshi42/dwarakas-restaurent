import { useEffect, useRef } from 'react';

export default function SceneHero() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    videoRef.current?.play().catch(() => {});
  }, []);

  return (
    <div className="relative h-[100svh] min-h-[560px] w-full overflow-hidden">
      {/* Video */}
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
      >
        <source
          src="videos/Firefly Ultra realistic cinematic slow-motion video of chicken biryani preparation, 4K resolution, 6.mp4"
          type="video/mp4"
        />
      </video>

      {/* Overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/70" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-transparent" />

      {/* Content */}
      <div className="relative z-10 flex h-full items-center justify-center px-4 sm:px-6">
        <div className="mx-auto w-full max-w-4xl text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-gold drop-shadow-[0_1px_6px_rgba(0,0,0,0.9)] sm:text-sm sm:tracking-[0.35em]">
            Premium Indian cuisine
          </p>
          <h2 className="mt-3 text-3xl font-semibold leading-tight text-white sm:mt-4 sm:text-5xl lg:text-6xl">
            Authentic Taste.<br className="hidden sm:block" /> Timeless Tradition.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-white/80 sm:mt-6 sm:max-w-2xl sm:text-base sm:leading-8 lg:text-lg">
            Experience the art of Indian cooking through our cinematic culinary journey. From aromatic spices to exquisite presentations.
          </p>
          <div className="mt-8 flex flex-col items-center gap-3 sm:mt-10 sm:flex-row sm:justify-center sm:gap-4">
            <a
              href="https://flavors-of-india-columbia-2.cloveronline.com/menu/all"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full max-w-[260px] items-center justify-center rounded-full border border-gold px-8 py-3 text-sm font-semibold text-gold transition hover:bg-gold/10 hover:scale-[1.02] sm:w-auto"
            >
              Store Order Pickup
            </a>
            <a href="#menu" className="text-sm text-white/70 transition hover:text-gold">
              Explore Menu →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
