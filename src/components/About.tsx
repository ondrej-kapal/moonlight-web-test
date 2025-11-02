import { Card } from '@/components/ui/card';
import artistPortrait from '/public/brand/artist-portrait.jpg';

const About = () => {
  return (
    <section id="about" className="relative bg-background">
      {/* Accent divider that visually connects Hero and About */}
      <div className="w-full h-1 bg-[color:var(--ml-accent)]" />

      <div className="max-w-6xl mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left: headings + content */}
          <div className="space-y-6">
            <h2 className="text-3xl lg:text-4xl font-semibold text-[color:var(--ml-accent)]">O mně</h2>
            <div className="space-y-4 text-lg leading-relaxed text-foreground/90 mt-4">
              <p>
                Jmenuji se Dana a tetování je součástí mého života už od střední školy.
                Ve svých 17 letech jsem si za našetřené peníze pořídila první tetovací strojek a od té doby jsem věděla, že tohle je moje cesta.
              </p>
              <p>
                Kreslení mě provází již od dětství, kdy jsem každou volnou chvíli trávila u papíru a prostřednictvím umění si vytvářela svůj vlastní svět.
                V tom reálném jsem se totiž často cítila trochu stranou. Tetování mě fascinovalo odjakživa, a když se k tomu přidaly mé kreslířské dovednosti, všechno do sebe zapadlo.
              </p>
              <p>
                V létě 2023 jsem úspěšně získala certifikace a od února 2024 se tetování stalo nejen mou vášní, ale i profesí. 
                Nejraději pracuji s černobílými motivy, jako jsou zvířata, portréty osob, postavy z her či pohádek a ráda do nich přidávám i barevné akcenty nebo prvky abstrakce.
              </p>
              <p>
                Každý návrh tvořím na míru, ať už jde o nápis, portrét, nebo originální abstraktní vzor. 
                Neustále se učím a zdokonaluji, protože věřím, že tetování je nekonečná cesta růstu, inspirace a tvrdé práce.
                Pro mě je každé tetování víc než jen obrázek na kůži - je to spojení s klientem, důvěra a společný proces tvorby, jehož výsledkem je originální dílo, které nosíš s hrdostí celý život.
              </p>
              <p>
                Každý kousek chci udělat speciální. 
                Všechny návrhy kreslím ručně, nepoužívám AI ani nekopíruji cizí práce.
              </p>
              <p>
                Cítíš, že by to mohl být match? Pak neváhej, rezervuj si termín nebo mi jednoduše napiš. 🙂
              </p>
            </div>

            {/* On larger screens 'Styly' will be displayed to the right under the portrait */}
            {/* Keep small-screen flow (will stack below content) */}
            <div className="mt-8 lg:hidden">
              <div className="text-3xl lg:text-4xl font-semibold text-[color:var(--ml-accent)] mb-4">Styly</div>
                <ul className="space-y-4 text-lg leading-relaxed text-foreground/90 mt-4">
                  <li>realistika</li>
                  <li>blackwork</li>
                  <li>zvířata</li>
                </ul>
            </div>
          </div>

          {/* Right: portrait image and the 'Styly' block under it on larger screens */}
          <div className="flex justify-end">
            <div className="w-full max-w-md flex flex-col items-start">
              <div className="w-full overflow-hidden rounded-2xl shadow-lg">
                <img
                  src={artistPortrait}
                  alt="Artist portrait"
                  className="w-full h-auto object-cover block"
                />
              </div>

              {/* 'Styly' appears under the portrait on large screens and is hidden on small */}
              <div className="hidden lg:block mt-6 w-48">
                <div className="text-3xl lg:text-4xl font-semibold text-[color:var(--ml-accent)] mb-4">Styly</div>
                <ul className="space-y-4 text-lg leading-relaxed text-foreground/90 mt-4 list-disc list-inside space-y-1">
                  <li>realistika</li>
                  <li>blackwork</li>
                  <li>zvířata</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;