import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Styles from '@/components/Styles';
import Portfolio from '@/components/Portfolio';
import Contact from '@/components/Contact';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Hero />
      <About />
      <Styles />
      <Portfolio />
      <Contact />
    </div>
  );
};

export default Index;