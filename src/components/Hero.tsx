import { Button } from '@/components/ui/button';
import heroImage from '@/assets/hero-tattoo.jpg';

const Hero = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img 
          src={heroImage} 
          alt="Tattoo studio atmosphere" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-tattoo-black/70 via-tattoo-black/60 to-tattoo-black/80"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center section-padding">
        <div className="max-w-4xl mx-auto">
          <h1 className="hero-title gradient-text mb-6">
            Moonlight
            <br />
            <span className="gradient-text-gold">Tattoo</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-foreground/90 mb-8 font-light max-w-2xl mx-auto leading-relaxed">
            Vytvářím jedinečná tetování s precizností, kreativitou a respektem k vašemu příběhu
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              variant="hero" 
              size="xl"
              onClick={() => scrollToSection('portfolio')}
              className="min-w-[200px]"
            >
              Prohlédnout Portfolio
            </Button>
            
            <Button 
              variant="gold" 
              size="xl"
              onClick={() => scrollToSection('contact')}
              className="min-w-[200px]"
            >
              Rezervovat Termín
            </Button>
          </div>

          <div className="mt-12 text-center">
            <p className="text-sm text-foreground/60 mb-4">Již od roku 2015</p>
            <div className="flex justify-center items-center space-x-8">
              <div className="text-center">
                <div className="text-2xl font-bold gradient-text">500+</div>
                <div className="text-sm text-foreground/60">Spokojených klientů</div>
              </div>
              <div className="w-px h-12 bg-border"></div>
              <div className="text-center">
                <div className="text-2xl font-bold gradient-text-gold">8+</div>
                <div className="text-sm text-foreground/60">Let zkušeností</div>
              </div>
              <div className="w-px h-12 bg-border"></div>
              <div className="text-center">
                <div className="text-2xl font-bold gradient-text">100%</div>
                <div className="text-sm text-foreground/60">Sterilní prostředí</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <button 
          onClick={() => scrollToSection('about')}
          className="text-foreground/60 hover:text-tattoo-gold transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </button>
      </div>
    </section>
  );
};

export default Hero;