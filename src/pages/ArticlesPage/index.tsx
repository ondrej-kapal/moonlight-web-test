import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type Item = {
  slug: string;
  title: string;
  date?: string | null;
  excerpt?: string;
  cover?: string | null;
  readTime?: string;
};

function formatDateCz(iso?: string | null) {
  if (!iso) return null;
  const d = new Date(iso);
  if (isNaN(d.getTime())) return null;
  return d.toLocaleDateString("cs-CZ", { day: "2-digit", month: "2-digit", year: "numeric" });
}

export default function ArticlesPage() {
  const [items, setItems] = useState<Item[] | null>(null); // null=loading

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/content/articles/index.json", { cache: "no-cache" });
        if (!res.ok) {
          if (!cancelled) setItems([]);
          return;
        }
        const data: Item[] = await res.json();
        if (!cancelled) setItems(data);
      } catch {
        if (!cancelled) setItems([]);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  return (
    <>
      <Navbar />
      <main className="max-w-6xl mx-auto px-4 py-10">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 gradient-text-gold">
          Všechny články
        </h1>

        {/* Loading skeleton */}
        {items === null && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-64 bg-muted rounded" />
            ))}
          </div>
        )}

        {/* Empty state */}
        {items && items.length === 0 && (
          <div className="text-muted-foreground">Zatím tu nejsou žádné články.</div>
        )}

        {/* Grid článků */}
        {items && items.length > 0 && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((a) => (
              <Card key={a.slug} className="overflow-hidden group">
                <Link to={`/articles/${a.slug}`}>
                  {a.cover ? (
                    <img
                      src={a.cover}
                      alt={a.title}
                      className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-48 bg-muted" />
                  )}
                </Link>
                <div className="p-5">
                  <div className="text-xs text-muted-foreground mb-2">
                    {formatDateCz(a.date) ?? ""}
                    {a.readTime ? ` • ${a.readTime}` : ""}
                  </div>
                  <h2 className="text-lg font-semibold mb-2 line-clamp-2">
                    <Link to={`/articles/${a.slug}`} className="hover:underline">
                      {a.title}
                    </Link>
                  </h2>
                  {a.excerpt ? (
                    <p className="text-sm text-muted-foreground line-clamp-3">{a.excerpt}</p>
                  ) : null}

                  <div className="mt-4">
                    <Button asChild variant="minimal" className="p-0 h-auto font-medium">
                      <Link to={`/articles/${a.slug}`}>Číst více →</Link>
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </main>
    </>
  );
}
