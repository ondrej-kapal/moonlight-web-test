import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type RenderArticle = {
  id: string;
  slug?: string;
  title: string;
  excerpt?: string;
  image?: string | null;
  date?: string | null; // zobrazované datum (např. 15. 11. 2024)
  readTime?: string;
};

function formatDateCz(iso?: string | null) {
  if (!iso) return null;
  const d = new Date(iso);
  if (isNaN(d.getTime())) return null;
  return d.toLocaleDateString("cs-CZ", { day: "2-digit", month: "2-digit", year: "numeric" });
}

export default function Articles() {
  const [articles, setArticles] = useState<RenderArticle[]>([]);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const res = await fetch("/content/articles/index.json", { cache: "no-cache" });
        if (!res.ok) return; // manifest zatím není → nerenderujeme nic
        const items: Array<{
          slug: string;
          title: string;
          date?: string | null;
          excerpt?: string;
          cover?: string | null;
          readTime?: string;
        }> = await res.json();

        const top = items.map<RenderArticle>((it, idx) => ({
          id: it.slug ?? String(idx),
          slug: it.slug,
          title: it.title ?? it.slug ?? "Bez názvu",
          excerpt: it.excerpt ?? "",
          image: it.cover ?? null,
          date: formatDateCz(it.date),
          readTime: it.readTime,
        }));

        if (!cancelled) setArticles(top);
      } catch {
        // manifest není / chyba -> nerenderujeme nic
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  // Když nejsou články, nerenderuj nic (žádný prázdný box, žádné texty)
  if (articles.length === 0) return null;

  return (
    <section id="articles" className="section-spacing section-padding">
      <div className="max-w-6xl mx-auto">
        {/* pouze horizontální list článků, bez titulků/CTA/„péče“ bloků */}
        <div className="flex gap-6 overflow-x-auto pb-6 scroll-smooth">
          {articles.map((article) => (
            <Card key={article.id} className="flex-shrink-0 w-80 card-hover cursor-pointer group">
              <div className="relative overflow-hidden rounded-t-lg">
                {article.image ? (
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-48 bg-muted/50" />
                )}

                {article.readTime ? (
                  <div className="absolute top-4 left-4">
                    <span className="bg-tattoo-red text-white px-3 py-1 rounded-full text-xs font-medium">
                      {article.readTime}
                    </span>
                  </div>
                ) : null}
              </div>

              <div className="p-6">
                <div className="text-sm text-muted-foreground mb-2">{article.date ?? ""}</div>
                <h3 className="text-xl font-bold mb-3 gradient-text-gold line-clamp-2">
                  {article.title}
                </h3>
                {article.excerpt ? (
                  <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
                    {article.excerpt}
                  </p>
                ) : null}

                {/* necháme tu jen nenápadné CTA pro budoucí detail; můžeš klidně odstranit */}
                <Button variant="minimal" className="mt-4 p-0 h-auto font-medium">
                  Číst více →
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
