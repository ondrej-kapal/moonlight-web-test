import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navigation from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Styles from "@/components/Styles";
import Portfolio from "@/components/Portfolio";
import Articles from "@/components/Articles";
import Studio from "@/components/Studio";
import FreeDesigns from "@/components/FreeDesigns";
import Contact from "@/components/Contact";

const Index = () => {
  const location = useLocation();

  useEffect(() => {
    if (!location.hash) return; // žádný hash -> nic nedělám

    const id = decodeURIComponent(location.hash.slice(1)); // "#articles" -> "articles"

    // Počkej, až se stránka vyrenderuje (sekce jsou v DOM), a pak scroll
    requestAnimationFrame(() => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  }, [location.hash]);

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
