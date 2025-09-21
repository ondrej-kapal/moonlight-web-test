import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Styles from '@/components/Styles';
import Portfolio from '@/components/Portfolio';
import Articles from '@/components/Articles';
import Studio from '@/components/Studio';
import FreeDesigns from '@/components/FreeDesigns';
import Contact from '@/components/Contact';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Hero />
      <About />
      <Styles />
      <Portfolio />
      <Articles />
      <Studio />
      <FreeDesigns />
      <Contact />
    </div>
  );
};

export default Index;