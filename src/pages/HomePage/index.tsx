import Navbar from "@/components/Navbar";
import About from "@/sections/About";
import StylesProcess from "@/sections/StylesProcess";
import Portfolio from "@/sections/Portfolio";
import ArticlesCare from "@/sections/ArticlesCare";
import Studio from "@/sections/Studio";
import Designs from "@/sections/Designs";
import ContactBooking from "@/sections/ContactBooking";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <About />
        <StylesProcess />
        <Portfolio />
        <ArticlesCare />
        <Studio />
        <Designs />
        <ContactBooking />
      </main>
    </>
  );
}
