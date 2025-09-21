import { Card } from '@/components/ui/card';
import artistPortrait from '@/assets/artist-portrait.jpg';

const About = () => {
  return (
    <section id="about" className="section-spacing section-padding">
      <div className="max-w-6xl mx-auto">
        <h2 className="section-title text-center gradient-text mb-16">
          O mně
        </h2>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h3 className="text-3xl font-bold gradient-text-gold mb-6">
              Vlastní svět umění
            </h3>
            
            <div className="space-y-4 text-lg leading-relaxed text-foreground/90">
              <p>
                Jmenuji se Dana a tetování je součástí mého života už od střední školy. 
                Ve svých 17 letech jsem si za našetřené peníze pořídila první tetovací strojek a od té doby jsem věděla, že tohle je moje cesta.
              </p>
              <p>
                Kreslení mě provází od dětství - už od 12 let jsem každou volnou chvíli trávila u papíru a prostřednictvím umění si vytvářela svůj vlastní svět. 
                V tom reálném jsem se totiž často cítila trochu stranou. 
                Tetování mě fascinovalo odjakživa, a když se k tomu přidaly mé kreslířské dovednosti, všechno do sebe zapadlo.
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

            <div className="grid grid-cols-2 gap-4 mt-8">
              <Card className="p-4 card-hover">
                <div className="text-center">
                  <div className="text-2xl font-bold gradient-text mb-2">TEXT</div>
                  <div className="text-sm text-muted-foreground">PLACEHOLDER</div>
                </div>
              </Card>
              
              <Card className="p-4 card-hover">
                <div className="text-center">
                  <div className="text-2xl font-bold gradient-text-gold mb-2">TEXT 2</div>
                  <div className="text-sm text-muted-foreground">PLACEHOLDER</div>
                </div>
              </Card>
            </div>
          </div>

          <div className="relative">
            <div className="relative overflow-hidden rounded-2xl">
              <img 
                src={artistPortrait} 
                alt="Portrét tattoo umělce" 
                className="w-full h-[600px] object-cover card-hover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-tattoo-black/30 to-transparent"></div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-tattoo-red to-tattoo-red-dark rounded-full opacity-20"></div>
            <div className="absolute -bottom-6 -left-6 w-16 h-16 bg-gradient-to-br from-tattoo-gold to-tattoo-gold-dark rounded-full opacity-30"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;