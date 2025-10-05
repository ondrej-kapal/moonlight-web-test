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
      {/* Prázdný obsah, vše odstraněno dle požadavku */}
    </section>
  );
};

export default Hero;