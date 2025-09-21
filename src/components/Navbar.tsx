import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

const Navigation = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);

  const menuItems = [
    { id: 'about', label: 'O mně' },
    { id: 'styles', label: 'Styly & proces' },
    { id: 'portfolio', label: 'Portfolio' },
    { id: 'articles', label: 'Články & péče' },
    { id: 'studio', label: 'Studio' },
    { id: 'designs', label: 'Volné návrhy' },
    { id: 'contact', label: 'Kontakt & rezervace' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      // Update active section based on scroll position
      const sections = menuItems.map(item => document.getElementById(item.id));
      const scrollPosition = window.scrollY + 100;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(menuItems[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-tattoo-black/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
    }`}>
      <div className="section-padding py-4">
        <div className="flex items-center justify-between">
          <div 
            className="text-2xl font-bold cursor-pointer gradient-text-gold"
            onClick={() => scrollToSection('home')}
          >
            TATTOO STUDIO
          </div>
          
          <div className="hidden lg:flex items-center space-x-8">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`text-sm font-medium transition-colors duration-300 hover:text-tattoo-red ${
                  activeSection === item.id ? 'text-tattoo-red' : 'text-foreground/80'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <Button 
            variant="hero" 
            size="sm"
            onClick={() => scrollToSection('contact')}
            className="hidden md:flex"
          >
            Rezervovat
          </Button>

          {/* Mobile menu button */}
          <Button variant="ghost" size="icon" className="lg:hidden">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;