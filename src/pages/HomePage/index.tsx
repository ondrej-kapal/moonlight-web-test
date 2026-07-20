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
import VersionBadge from "@/components/VersionBadge";

const Index = () => {
  const location = useLocation();

  useEffect(() => {
    if (!location.hash) return;

    const id = decodeURIComponent(location.hash.slice(1)); // "#articles" -> "articles"

    // Repeatedly try to find the element (render timing after navigation)
    let tries = 0;
    const maxTries = 20; // ~1s at a 50ms interval
    const interval = setInterval(() => {
      const el = document.getElementById(id);
      tries++;

      if (el) {
        // with a sticky navbar it's good to give the section className="scroll-mt-24"
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        clearInterval(interval);
      } else if (tries >= maxTries) {
        clearInterval(interval);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [location.key, location.hash]); // location.key makes sure the effect also runs on page change

  return (
    <div className="min-h-screen bg-background">
  <Navigation />
  <Hero />
  <About />
  <Styles />
  <Portfolio />
  <Articles />
  {/* <Studio /> */}
      <FreeDesigns />
      <Contact />
      <VersionBadge />
    </div>
  );
};

export default Index;
