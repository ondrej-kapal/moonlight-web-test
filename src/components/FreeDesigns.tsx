import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const FreeDesigns = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // Mock volné návrhy data
  const freeDesigns = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1611501275019-9b5cda994c82?w=500&h=500&fit=crop',
      category: 'animal',
      title: 'Vlk v geometric stylu',
      size: 'Střední (10-15 cm)',
      placement: 'Předloktí, lýtko'
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1590246814694-57c2a8046c3d?w=500&h=500&fit=crop',
      category: 'geometric',
      title: 'Mandala květina',
      size: 'Velké (15-20 cm)',
      placement: 'Záda, rameno'
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1567427018341-1cad2501d3ad?w=500&h=500&fit=crop',
      category: 'traditional',
      title: 'Traditional růže',
      size: 'Malé (5-10 cm)',
      placement: 'Kdekoli'
    },
    {
      id: 4,
      image: 'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=500&h=500&fit=crop',
      category: 'geometric',
      title: 'Geometrický ornament',
      size: 'Střední (10-15 cm)',
      placement: 'Zápěstí, kotník'
    },
    {
      id: 5,
      image: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=500&h=500&fit=crop',
      category: 'nature',
      title: 'Horské panorama',
      size: 'Velké (15-25 cm)',
      placement: 'Předloktí, lýtko'
    },
    {
      id: 6,
      image: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=500&h=500&fit=crop',
      category: 'animal',
      title: 'Minimální kočka',
      size: 'Malé (5-8 cm)',
      placement: 'Zápěstí, kotník'
    },
    {
      id: 7,
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500&h=500&fit=crop',
      category: 'traditional',
      title: 'Kotvička s lanem',
      size: 'Střední (8-12 cm)',
      placement: 'Předloktí, rameno'
    },
    {
      id: 8,
      image: 'https://images.unsplash.com/photo-1611501275019-9b5cda994c82?w=500&h=500&fit=crop',
      category: 'nature',
      title: 'Strom života',
      size: 'Velké (15-20 cm)',
      placement: 'Záda, stehno'
    }
  ];

  const categories = [
    { id: 'all', name: 'Všechny' },
    { id: 'geometric', name: 'Geometrické' },
    { id: 'animal', name: 'Zvířata' },
    { id: 'nature', name: 'Příroda' },
    { id: 'traditional', name: 'Traditional' }
  ];

  const filteredDesigns = selectedCategory === 'all' 
    ? freeDesigns 
    : freeDesigns.filter(design => design.category === selectedCategory);

  const openLightbox = (image: string, index: number) => {
    setLightboxImage(image);
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxImage(null);
  };

  const navigateLightbox = (direction: 'prev' | 'next') => {
    const newIndex = direction === 'next' 
      ? (lightboxIndex + 1) % filteredDesigns.length
      : (lightboxIndex - 1 + filteredDesigns.length) % filteredDesigns.length;
    
    setLightboxIndex(newIndex);
    setLightboxImage(filteredDesigns[newIndex].image);
  };

  return (
    <section id="designs" className="section-spacing section-padding">
      <div className="max-w-6xl mx-auto">
        <h2 className="section-title text-center gradient-text mb-8">
          Volné Návrhy
        </h2>
        
        <p className="text-center text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
          Hotové návrhy připravené k tetování. Tyto designy můžete použít ihned, 
          nebo je můžeme upravit podle vašich představ.
        </p>

        {/* Category filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "hero" : "minimal"}
              onClick={() => setSelectedCategory(category.id)}
              className="px-6"
            >
              {category.name}
            </Button>
          ))}
        </div>

        {/* Designs grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
          {filteredDesigns.map((design, index) => (
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

        {/* Info cards */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="p-6 text-center card-hover">
            <div className="w-16 h-16 bg-gradient-to-br from-tattoo-red to-tattoo-red-dark rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold mb-3">Rychlá realizace</h3>
            <p className="text-sm text-muted-foreground">
              Volné návrhy můžeme tetovat již za 1-2 týdny podle velikosti
            </p>
          </Card>

          <Card className="p-6 text-center card-hover">
            <div className="w-16 h-16 bg-gradient-to-br from-tattoo-gold to-tattoo-gold-dark rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-tattoo-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
              </svg>
            </div>
            <h3 className="text-lg font-bold mb-3">Úpravy možné</h3>
            <p className="text-sm text-muted-foreground">
              Každý návrh můžeme upravit podle vašich představ a požadavků
            </p>
          </Card>

          <Card className="p-6 text-center card-hover">
            <div className="w-16 h-16 bg-gradient-to-br from-secondary to-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold mb-3">Ověřená kvalita</h3>
            <p className="text-sm text-muted-foreground">
              Všechny návrhy jsou otestované a optimalizované pro tetování
            </p>
          </Card>
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
                <h3 className="font-bold mb-2">{filteredDesigns[lightboxIndex]?.title}</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-white/70">Velikost: </span>
                    {filteredDesigns[lightboxIndex]?.size}
                  </div>
                  <div>
                    <span className="text-white/70">Umístění: </span>
                    {filteredDesigns[lightboxIndex]?.placement}
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
                  Rezervovat tento návrh
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