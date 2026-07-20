import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

type Design = {
  id: string | number;
  image: string;
  title: string;
  category: string;
  size: string;
  placement: string;
};

// Raw manifest entry — the CMS may emit several field spellings
type RawDesign = {
  id?: string | number;
  slug?: string;
  src?: string;
  url?: string;
  image?: string;
  path?: string;
  data?: { image?: string };
  title?: string;
  name?: string;
  alt?: string;
  category?: string;
  tags?: string[];
  size?: string;
  placement?: string;
  meta?: { size?: string; placement?: string };
};

const FreeDesigns = () => {
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // Default mock free-designs data (fallback)
  const defaultMock: Design[] = [];

  const [remoteDesigns, setRemoteDesigns] = useState<Design[] | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch('/content/designs/index.json', { cache: 'no-cache' });
        if (!res.ok) {
          // no remote manifest yet
          setRemoteDesigns([]);
          return;
        }

        const data = await res.json();
        if (cancelled) return;

        // Support several possible shapes from CMS: images, items, designs
        const raw = Array.isArray(data.images)
          ? data.images
          : Array.isArray(data.items)
          ? data.items
          : Array.isArray(data.designs)
          ? data.designs
          : [];

        const mapped = (raw as RawDesign[])
          .map((it, idx) => {
            // try common fields
            const src = it.src || it.url || it.image || it.path || it.data?.image || '';
            if (!src) return null;
            return {
              id: it.id ?? it.slug ?? idx,
              image: src,
              title: it.title || it.name || it.alt || '',
              category: it.category || (Array.isArray(it.tags) && it.tags[0]) || 'other',
              size: it.size || it.meta?.size || '',
              placement: it.placement || it.meta?.placement || ''
            };
          })
          .filter((d): d is Design => Boolean(d));

        setRemoteDesigns(mapped);
      } catch (err) {
        // ignore and keep fallback
        setRemoteDesigns([]);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

 // Decide which dataset to use: remote (CMS) or the fallback mock
  const sourceDesigns = remoteDesigns && remoteDesigns.length > 0 ? remoteDesigns : defaultMock;

  // Use designs directly (no filtering). If none, don't render the section.
  const designs = sourceDesigns;
  if (!designs || designs.length === 0) return null;

  const openLightbox = (image: string, index: number) => {
    setLightboxImage(image);
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxImage(null);
  };

  const navigateLightbox = (direction: 'prev' | 'next') => {
const newIndex = direction === 'next'
      ? (lightboxIndex + 1) % designs.length
      : (lightboxIndex - 1 + designs.length) % designs.length;

    setLightboxIndex(newIndex);
    setLightboxImage(designs[newIndex].image);

  };

  return (
    <section id="designs" className="section-spacing section-padding">
      <div className="max-w-6xl mx-auto">
        <div className="text-4xl lg:text-5xl font-semibold text-[color:var(--ml-accent)] mb-6">
          Volné Návrhy
        </div>

        {/* Designs grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
          {designs.map((design, index) => (
            <Card 
              key={design.id} 
              className="group cursor-pointer overflow-hidden card-hover"
              onClick={() => openLightbox(design.image, index)}
            >
              <div className="relative aspect-square overflow-hidden">
                <img 
                  src={design.image} 
                  alt={design.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-tattoo-black/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-white font-bold text-sm mb-1">{design.title}</h3>
                    <p className="text-white/80 text-xs mb-1">{design.size}</p>
                    <p className="text-white/70 text-xs">{design.placement}</p>
                  </div>
                </div>
                
                {/* Hover overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                    </svg>
                  </div>
                </div>

                {/* Quick action button */}
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Button 
                    variant="hero" 
                    size="sm" 
                    className="text-xs"
                    onClick={(e) => {
                      e.stopPropagation();
                      // Scroll to contact section
                      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    Rezervovat
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Lightbox */}
        {lightboxImage && (
          <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4">
            <div className="relative max-w-4xl max-h-full">
              <img 
                src={lightboxImage} 
                alt="Design detail"
                className="max-w-full max-h-full object-contain"
              />
              
              {/* Design info overlay */}
              <div className="absolute bottom-4 left-4 right-4 bg-black/80 backdrop-blur-sm rounded-lg p-4 text-white">
                 <h3 className="font-bold mb-2">{designs[lightboxIndex]?.title}</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-white/70">Velikost: </span>
                    {designs[lightboxIndex]?.size}
                  </div>
                  <div>
                    <span className="text-white/70">Umístění: </span>
                    {designs[lightboxIndex]?.placement}
                  </div>
                </div>
                <Button 
                  variant="hero" 
                  size="sm" 
                  className="mt-3"
                  onClick={() => {
                    closeLightbox();
                    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  Rezervovat
                </Button>
              </div>
              
              {/* Close button */}
              <button 
                onClick={closeLightbox}
                className="absolute top-4 right-4 text-white bg-black/50 rounded-full p-2 hover:bg-black/70 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Navigation */}
              <button 
                onClick={() => navigateLightbox('prev')}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white bg-black/50 rounded-full p-3 hover:bg-black/70 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              <button 
                onClick={() => navigateLightbox('next')}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white bg-black/50 rounded-full p-3 hover:bg-black/70 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default FreeDesigns;