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
              Vášeň pro umění tetování
            </h3>
            
            <div className="space-y-4 text-lg leading-relaxed text-foreground/90">
              <p>
                Jmenuji se [Jméno] a tetování je moje vášeň již více než 8 let. 
                Specializuji se na realistické portréty, geometrické vzory a černobílé composice, 
                které vyprávějí jedinečné příběhy každého klienta.
              </p>
              
              <p>
                Moje cesta začala na umělecké škole, kde jsem si osvojil základy kresby a malby. 
                Postupně jsem se věnoval tetování a neustále zdokonaluju své dovednosti 
                účastí na workshopech a konvencích po celé Evropě.
              </p>
              
              <p>
                Každé tetování je pro mě výzvou a příležitostí vytvořit něco naprosto jedinečného. 
                Věřím, že dobrá komunikace s klientem je základem pro vytvoření dokonalého tetování, 
                které bude nosit celý život s hrdostí.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-8">
              <Card className="p-4 card-hover">
                <div className="text-center">
                  <div className="text-2xl font-bold gradient-text mb-2">500+</div>
                  <div className="text-sm text-muted-foreground">Dokončených tetování</div>
                </div>
              </Card>
              
              <Card className="p-4 card-hover">
                <div className="text-center">
                  <div className="text-2xl font-bold gradient-text-gold mb-2">8+</div>
                  <div className="text-sm text-muted-foreground">Let zkušeností</div>
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