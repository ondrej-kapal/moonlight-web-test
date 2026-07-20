import { Button } from '@/components/ui/button';

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
      {/* Empty content, everything removed as requested */}
    </section>
  );
};

export default Hero;