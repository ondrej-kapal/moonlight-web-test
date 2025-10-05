import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

const HEADER_HEIGHT = 64; // h-16

// 1) Menu items
const MENU: { id: string; label: string }[] = [
  { id: "about", label: "O mně" },
  { id: "styles", label: "Proces" },         // Proces -> Styles
  { id: "portfolio", label: "Portfolio" },
  { id: "articles", label: "Články" },
  // { id: "studio", label: "Studio" },      // deprecated
  { id: "designs", label: "Volné návrhy" },
  { id: "contact", label: "Kontakt & rezervace" },
  { id: "reservations", label: "Rezervace" }, 
];

// 2) Alias menu-id -> real DOM id
const DOM_ID_MAP: Record<string, string> = {
  reservations: "contact", // Rezervace scrolluje na sekci contact
};
const toDomId = (menuId: string) => DOM_ID_MAP[menuId] ?? menuId;

export default function Navbar() {
  const [active, setActive] = useState<string>("home");
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // zvýraznění: projdeme sekce odspodu, a jakmile jsme nad jejich topem, bereme ji jako aktivní
      const y = window.scrollY + HEADER_HEIGHT + 24; // malý buffer
      let found: string | null = null;

      for (let i = MENU.length - 1; i >= 0; i--) {
        const menuId = MENU[i].id;
        const domId = toDomId(menuId);
        const el = document.getElementById(domId);
        if (el && el.offsetTop <= y) {
          found = menuId;
          break;
        }
      }

      // Priorita: když jsme v #contact a máme v menu i "reservations", zvýrazníme "Rezervace"
      if (found === "contact" && MENU.some(m => m.id === "reservations")) {
        setActive("reservations");
      } else if (found) {
        setActive(found);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // plynulý scroll + kompenzace sticky headeru
  const scrollToSection = (menuId: string) => {
    const domId = toDomId(menuId);
    const el = document.getElementById(domId);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - HEADER_HEIGHT - 8;
    window.scrollTo({ top, behavior: "smooth" });
  };

  return (
    <header
      className={[
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b",
        isScrolled
          ? "bg-background/80 backdrop-blur border-border shadow-lg"
          : "bg-transparent border-transparent",
      ].join(" ")}
      style={{ height: HEADER_HEIGHT }}
    >
      <div className="max-w-6xl mx-auto px-4 h-full">
        <div className="h-full flex items-center justify-between gap-4">
          {/* Logo vlevo */}
          <button
            onClick={() => scrollToSection("home")}
            className="inline-flex items-center gap-2 group"
            aria-label="Na úvod"
          >
            <img
              src="/brand/logo-moonlight.png"
              alt="Moonlight"
              className="h-8 w-auto transition-transform duration-300 group-hover:scale-[1.03]"
              fetchPriority="high"
            />
          </button>

          {/* Menu (desktop) */}
          <nav className="hidden lg:flex items-center gap-8">
            {MENU.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={[
                  "text-sm font-medium transition-colors duration-300",
                  "hover:text-tattoo-red",
                  active === item.id ? "text-tattoo-red" : "text-foreground/80",
                ].join(" ")}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Akce vpravo */}
          <div className="flex items-center gap-2">
            {/* Můžeš chtít, aby CTA bylo vizuálně stejné jako „Rezervace“ v menu */}
            <Button
              variant="hero"
              size="sm"
              onClick={() => scrollToSection("reservations")}
              className="hidden md:flex"
            >
              Rezervovat
            </Button>

            {/* E-mail */}
            <a
              href="mailto:info@moonlight.example" /* ← uprav */
              className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-foreground text-background hover:opacity-90 transition"
              aria-label="Napsat e-mail"
            >
              <img src="/brand/icon-mail.png" alt="" className="w-5 h-5" />
            </a>

            {/* Instagram */}
            <a
              href="https://instagram.com/your_profile" /* ← uprav */
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-foreground text-background hover:opacity-90 transition"
              aria-label="Instagram"
            >
              <img src="/brand/icon-instagram.png" alt="" className="w-5 h-5" />
            </a>

            {/* Mobile burger (logiku přidáme později) */}
            <Button variant="ghost" size="icon" className="lg:hidden">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
