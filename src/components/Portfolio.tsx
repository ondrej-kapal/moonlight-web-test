import { useEffect, useState } from 'react';

type PortfolioImage = {
  src: string;
  alt?: string;
};

const Portfolio = () => {
  const [items, setItems] = useState<PortfolioImage[]>([]);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    // Try to load portfolio content managed by Decap (static JSON in /public/content/portfolio/index.json on production)
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch('/content/portfolio/index.json', { cache: 'no-cache' });
        if (!res.ok) return; // manifest not present yet -> don't change items
        const data = await res.json();
        if (cancelled) return;
        if (Array.isArray(data.images)) {
          const filtered = data.images.filter((it: any) => it && it.src).slice(0, 8);
          setItems(filtered);
        }
      } catch {
        // manifest isn't available or request failed — leave items as-is
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);
  const navigate = (dir: 'prev' | 'next') => {
    if (lightboxIndex === null) return;
    const len = items.length;
    const next = dir === 'next' ? (lightboxIndex + 1) % len : (lightboxIndex - 1 + len) % len;
    setLightboxIndex(next);
  };

  // How many items we render in the grid (matches earlier slicing)
  const shownCount = Math.min(4, items.length);
  // When there are no portfolio items, don't render the section (same UX as Articles)
  if (items.length === 0) return null;

  return (
    <section id="portfolio" className="relative bg-background text-foreground">
      <div className="max-w-6xl mx-auto px-4 py-20">
          <div className="text-4xl lg:text-5xl font-semibold text-[color:var(--ml-accent)] mb-6">Portfolio</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {items.slice(0,4).map((item, idx) => (
            <div key={idx} className="relative bg-[color:var(--ml-dark)] p-2 z-10">
              <div
                className="w-full aspect-square overflow-hidden cursor-pointer"
                onClick={() => openLightbox(idx)}
              >
                <img
                  src={item.src}
                  alt={item.alt || `Portfolio ${idx + 1}`}
                  className="w-full h-full object-cover block"
                />
              </div>

              {/* Render splash inside the last card so it reliably overlays that card */}
              {idx === shownCount - 1 && (
                <img
                  src="/brand/splash.png"
                  alt="splash"
                  className="pointer-events-none hidden md:block absolute right-[-48px] bottom-[-70px] w-56 opacity-95 z-50 transform rotate-6 scale-[1.2]"
                />
              )}
            </div>
          ))}
          </div>

        {/* Lightbox */}
        {lightboxIndex !== null && items[lightboxIndex] && (
          <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
            <div className="relative max-w-4xl max-h-full">
              <img src={items[lightboxIndex].src} alt={items[lightboxIndex].alt || 'detail'} className="max-w-full max-h-[80vh] object-contain" />

              <button onClick={closeLightbox} className="absolute top-4 right-4 text-white bg-black/50 rounded-full p-2">
                ✕
              </button>

              <button onClick={() => navigate('prev')} className="absolute left-4 top-1/2 -translate-y-1/2 text-white bg-black/50 rounded-full p-3">‹</button>
              <button onClick={() => navigate('next')} className="absolute right-4 top-1/2 -translate-y-1/2 text-white bg-black/50 rounded-full p-3">›</button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Portfolio;