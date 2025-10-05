import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navigation from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Styles from "@/components/Styles";
import Portfolio from "@/components/Portfolio";
import Articles from "@/components/Articles";
// import Studio from "@/components/Reservations";
import FreeDesigns from "@/components/FreeDesigns";
import Contact from "@/components/Contact";

const Index = () => {
  const location = useLocation();

  useEffect(() => {
    if (!location.hash) return;

    const id = decodeURIComponent(location.hash.slice(1)); // "#articles" -> "articles"

    // Opakovaně zkus najít element (kvůli časování renderu po navigaci)
    let tries = 0;
    const maxTries = 20; // ~1s při 50ms intervalu
    const interval = setInterval(() => {
      const el = document.getElementById(id);
      tries++;

      if (el) {
        // pokud máš sticky navbar, je fajn dát sekci className="scroll-mt-24"
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        clearInterval(interval);
      } else if (tries >= maxTries) {
        clearInterval(interval);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [location.key, location.hash]); // location.key zajistí, že efekt běží i při změně stránky

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
