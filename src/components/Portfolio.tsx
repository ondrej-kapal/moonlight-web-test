import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const Portfolio = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // Mock portfolio data - v reálné aplikaci by se načetla z API
  const portfolioItems = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=500&h=500&fit=crop',
      category: 'portrait',
      title: 'Realistický portrét',
      description: 'Detailní černobílý portrét'
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1590246814694-57c2a8046c3d?w=500&h=500&fit=crop',
      category: 'geometric',
      title: 'Geometrický vzor',
      description: 'Moderní geometrické tetování'
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1567427018341-1cad2501d3ad?w=500&h=500&fit=crop',
      category: 'blackwork',
      title: 'Černobílá kompozice',
      description: 'Silné kontrasty a čisté linky'
    },
    {
      id: 4,
      image: 'https://images.unsplash.com/photo-1611501275019-9b5cda994c82?w=500&h=500&fit=crop',
      category: 'portrait',
      title: 'Portrét zvířete',
      description: 'Realistické zobrazení'
    },
    {
      id: 5,
      image: 'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=500&h=500&fit=crop',
      category: 'geometric',
      title: 'Mandala design',
      description: 'Komplexní geometrický vzor'
    },
    {
      id: 6,
      image: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=500&h=500&fit=crop',
      category: 'blackwork',
      title: 'Ornamentální tetování',
      description: 'Tradiční černé vzory'
    }
  ];

  const categories = [
    { id: 'all', name: 'Všechny' },
    { id: 'portrait', name: 'Portréty' },
    { id: 'geometric', name: 'Geometrické' },
    { id: 'blackwork', name: 'Černobílé' }
  ];

  const filteredItems = selectedCategory === 'all' 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === selectedCategory);

  const openLightbox = (image: string, index: number) => {
    setLightboxImage(image);
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxImage(null);
  };

  const navigateLightbox = (direction: 'prev' | 'next') => {
    const newIndex = direction === 'next' 
      ? (lightboxIndex + 1) % filteredItems.length
      : (lightboxIndex - 1 + filteredItems.length) % filteredItems.length;
    
    setLightboxIndex(newIndex);
    setLightboxImage(filteredItems[newIndex].image);
  };

  return (
    <section id="portfolio" className="section-spacing section-padding">
      <div className="max-w-6xl mx-auto">
        <h2 className="section-title text-center gradient-text mb-8">
          Portfolio
        </h2>
        
        <p className="text-center text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
          Prohlédněte si výběr z mých nejnovějších prací. Každé tetování je originál 
          vytvořený na míru konkrétnímu klientovi.
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

        {/* Portfolio grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, index) => (
            <Card 
              key={item.id} 
              className="group cursor-pointer overflow-hidden card-hover"
              onClick={() => openLightbox(item.image, index)}
            >
              <div className="relative aspect-square overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-tattoo-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-white font-bold mb-1">{item.title}</h3>
                    <p className="text-white/80 text-sm">{item.description}</p>
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
                alt="Portfolio detail"
                className="max-w-full max-h-full object-contain"
              />
              
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

export default Portfolio;