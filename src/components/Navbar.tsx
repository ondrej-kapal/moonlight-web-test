import { useNavigate, useLocation } from "react-router-dom";
import { useCallback } from "react";

const SECTIONS = [
  { id: "about", label: "O mně" },
  { id: "styles", label: "Styly & proces" },
  { id: "portfolio", label: "Portfolio" },
  { id: "articlescare", label: "Články & péče" },
  { id: "studio", label: "Studio" },
  { id: "designs", label: "Volné návrhy" },
  { id: "contact", label: "Kontakt & rezervace" },
];

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const scrollTo = useCallback(
    (id: string) => {
      const doScroll = () => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      };

      if (location.pathname !== "/") {
        // jsme mimo home → vrať se na home a potom plynule scrollni
        navigate("/", { replace: false });
        // malý delay, aby se DOM s home sekcemi vykreslil
        setTimeout(doScroll, 50);
      } else {
        doScroll();
      }
    },
    [location.pathname, navigate]
  );

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b">
      <nav className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-4 overflow-x-auto">
        <a
          href="/"
          className="font-semibold whitespace-nowrap mr-2"
          onClick={(e) => {
            e.preventDefault();
            navigate("/");
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          Moonlight
        </a>
        <ul className="flex items-center gap-3 text-sm">
          {SECTIONS.map((s) => (
            <li key={s.id}>
              <button
                className="px-3 py-1 rounded hover:bg-gray-100"
                onClick={() => scrollTo(s.id)}
              >
                {s.label}
              </button>
            </li>
          ))}
          <li className="ml-2">
            <a
              href="/articles"
              onClick={(e) => {
                e.preventDefault();
                navigate("/articles");
              }}
              className="px-3 py-1 rounded hover:bg-gray-100"
            >
              Články
            </a>
          </li>
          <li>
            <a
              href="/admin"
              onClick={(e) => {
                e.preventDefault();
                navigate("/admin");
              }}
              className="px-3 py-1 rounded hover:bg-gray-100"
            >
              Admin
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
