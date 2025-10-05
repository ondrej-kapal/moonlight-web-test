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
        <video src="/brand/HeroVideo.mov" 
          controls 
          autoPlay 
          loop 
          muted 
          style={{ width: '100%' }} 
        />
        <div className="absolute inset-0 from-tattoo-black/70 via-tattoo-black/60 to-tattoo-black/80"></div>
      </div>
      {/* Prázdný obsah, vše odstraněno dle požadavku */}
    </section>
  );
};

export default Hero;