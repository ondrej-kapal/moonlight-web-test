import { useEffect, useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Navbar from "@/components/Navbar";

type ArticleMeta = {
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

export default function ArticleDetail() {
  const { slug: slugParam, id: idParam } = useParams<{ slug?: string; id?: string }>();
  const slug = slugParam ?? idParam ?? "";

  const [meta, setMeta] = useState<ArticleMeta | null>(null);
  const [md, setMd] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);

  // přemapování relativních cest obrázků v MD na /content/articles/<slug>/...
  const resolveImg = useMemo(() => {
    return (src?: string) => {
      if (!src) return src;
      if (/^https?:\/\//i.test(src)) return src;
      const clean = src.replace(/^.\//, "");
      return `/content/articles/${slug}/${clean}`;
    };
  }, [slug]);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        // 1) metadata z manifestu
        const resMeta = await fetch("/content/articles/index.json", { cache: "no-cache" });
        if (resMeta.ok) {
          const items: ArticleMeta[] = await resMeta.json();
          const found = items.find((a) => a.slug === slug) || null;
          if (!cancelled) setMeta(found);
        }

        // 2) markdown obsahu
        const resMd = await fetch(`/content/articles/${slug}/index.md`, { cache: "no-cache" });
        if (!resMd.ok) throw new Error("Článek nenalezen.");
        const text = await resMd.text();

        // odstraň YAML front-matter (--- ... --- na začátku) – metadata bereme z manifestu
        const cleaned = text.startsWith("---")
          ? text.slice(text.indexOf("---", 3) + 3).replace(/^\s*/, "")
          : text;

        if (!cancelled) setMd(cleaned);
      } catch (e: any) {
        if (!cancelled) setErr(e?.message || "Nepodařilo se načíst článek.");
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [slug]);

  // ERROR stav – žádný link nahoře, jen tlačítko dole
  if (err) {
    return (
      <>
        <Navbar />
        <div className="max-w-3xl mx-auto px-4 py-16">
          <h1 className="text-2xl font-semibold mb-2">Článek nenalezen</h1>
          <p className="text-muted-foreground">{err}</p>

          <div className="mt-10 flex justify-center">
            <Button asChild variant="hero">
              <Link to="/#articles">← Zpět na úvod</Link>
            </Button>
          </div>
        </div>
      </>
    );
  }

  // LOADING stav – žádný link nahoře, tlačítko dole
  if (!md) {
    return (
      <>
        <Navbar />
        <div className="max-w-3xl mx-auto px-4 py-16">
          <div className="animate-pulse space-y-4">
            <div className="h-8 w-64 bg-muted rounded" />
            <div className="h-4 w-40 bg-muted/70 rounded" />
            <div className="h-64 w-full bg-muted rounded" />
          </div>

          <div className="mt-10 flex justify-center">
            <Button asChild variant="hero">
              <Link to="/#articles">← Zpět na úvod</Link>
            </Button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <article className="max-w-3xl mx-auto px-4 py-10">
        {/* Hlavní titulek + meta */}
        <h1 className="text-3xl md:text-4xl font-bold mb-2 gradient-text-gold">
          {meta?.title ?? slug}
        </h1>
        <div className="text-sm text-muted-foreground mb-6">
          {formatDateCz(meta?.date) ?? ""}
          {meta?.readTime ? ` • ${meta.readTime}` : ""}
        </div>

        {/* Cover (pokud je) */}
        {meta?.cover ? (
          <img
            src={meta.cover}
            alt={meta.title ?? ""}
            className="w-full rounded-lg mb-8"
            loading="lazy"
          />
        ) : null}

        {/* Markdown obsah */}
        <div className="prose max-w-none">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              img: ({ node, src, ...props }) => (
                <img
                  src={resolveImg(typeof src === "string" ? src : undefined)}
                  className="rounded-lg"
                  loading="lazy"
                  {...props}
                />
              ),
              a: ({ node, ...props }) => (
                <a {...props} className="text-blue-600 hover:underline" />
              ),
              h2: ({ node, ...props }) => (
                <h2 {...props} className="text-2xl font-semibold mt-8 mb-3" />
              ),
            }}
          >
            {md}
          </ReactMarkdown>
        </div>

        {/* Spodní CTA „Zpět na úvod“ */}
        <hr className="my-8 border-muted" />
        <div className="mt-6 flex justify-center">
          <Button asChild variant="hero">
            <Link to="/#articles">← Zpět na úvod</Link>
          </Button>
        </div>
      </article>
    </>
  );
}

