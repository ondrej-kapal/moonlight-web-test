import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const Articles = () => {
  // Mock články data
  const articles = [
    {
      id: 1,
      title: "Péče o čerstvé tetování",
      excerpt: "Jak správně pečovat o tetování v prvních týdnech po vytvoření...",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=250&fit=crop",
      date: "15. 11. 2024",
      readTime: "5 min čtení"
    },
    {
      id: 2,
      title: "Jak si vybrat správný motiv",
      excerpt: "Tipy a rady pro výběr tetování, které budete milovat celý život...",
      image: "https://images.unsplash.com/photo-1590246814694-57c2a8046c3d?w=400&h=250&fit=crop",
      date: "10. 11. 2024",
      readTime: "7 min čtení"
    },
    {
      id: 3,
      title: "Příprava na první tetování",
      excerpt: "Co očekávat a jak se připravit na svou první návštěvu tattoo studia...",
      image: "https://images.unsplash.com/photo-1611501275019-9b5cda994c82?w=400&h=250&fit=crop",
      date: "5. 11. 2024",
      readTime: "4 min čtení"
    },
    {
      id: 4,
      title: "Historie tetování v kultuře",
      excerpt: "Odkud tetování pochází a jak se vyvíjelo v různých kulturách...",
      image: "https://images.unsplash.com/photo-1567427018341-1cad2501d3ad?w=400&h=250&fit=crop",
      date: "1. 11. 2024",
      readTime: "8 min čtení"
    },
    {
      id: 5,
      title: "Mytologie a symboly v tetování",
      excerpt: "Nejoblíbenější symboly a jejich významy v umění tetování...",
      image: "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=400&h=250&fit=crop",
      date: "28. 10. 2024",
      readTime: "6 min čtení"
    }
  ];

  return (
    <section id="articles" className="section-spacing section-padding">
      <div className="max-w-6xl mx-auto">
        <h2 className="section-title text-center gradient-text mb-8">
          Články & Péče
        </h2>
        
        <p className="text-center text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
          Užitečné rady, tipy pro péči o tetování a zajímavosti ze světa tattoo umění.
        </p>

        {/* Horizontální scroll články */}
        <div className="mb-12">
          <div className="flex gap-6 overflow-x-auto pb-6 scroll-smooth">
            {articles.map((article) => (
              <Card key={article.id} className="flex-shrink-0 w-80 card-hover cursor-pointer group">
                <div className="relative overflow-hidden rounded-t-lg">
                  <img 
                    src={article.image} 
                    alt={article.title}
                    className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-tattoo-red text-white px-3 py-1 rounded-full text-xs font-medium">
                      {article.readTime}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="text-sm text-muted-foreground mb-2">{article.date}</div>
                  <h3 className="text-xl font-bold mb-3 gradient-text-gold line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
                    {article.excerpt}
                  </p>
                  
                  <Button variant="minimal" className="mt-4 p-0 h-auto font-medium">
                    Číst více →
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA tlačítko */}
        <div className="text-center">
          <Button variant="hero" size="lg">
            Všechny články
          </Button>
        </div>

        {/* Péče o tetování info */}
        <div className="mt-16">
          <h3 className="text-3xl font-bold gradient-text-gold mb-8 text-center">
            Péče o tetování
          </h3>
          
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="p-6 text-center card-hover">
              <div className="w-16 h-16 bg-gradient-to-br from-tattoo-red to-tattoo-red-dark rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h4 className="text-lg font-bold mb-3">První týden</h4>
              <p className="text-sm text-muted-foreground">
                Pravidelné mytí, aplikace masti a ochrana před sluncem
              </p>
            </Card>

            <Card className="p-6 text-center card-hover">
              <div className="w-16 h-16 bg-gradient-to-br from-tattoo-gold to-tattoo-gold-dark rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-tattoo-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h4 className="text-lg font-bold mb-3">Hojení</h4>
              <p className="text-sm text-muted-foreground">
                2-4 týdny důkladné péče pro perfektní výsledek
              </p>
            </Card>

            <Card className="p-6 text-center card-hover">
              <div className="w-16 h-16 bg-gradient-to-br from-secondary to-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h4 className="text-lg font-bold mb-3">Dlouhodobá péče</h4>
              <p className="text-sm text-muted-foreground">
                Hydratace a ochrana před UV zářením pro zachování barev
              </p>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Articles;