import { Card } from '@/components/ui/card';

const Styles = () => {
  const styles = [
    {
      name: "Realistické portréty",
      description: "Detailní a věrné portréty lidí a zvířat s důrazem na preciznost a emoce.",
      features: ["Fotorealistická kvalita", "Jemné stínování", "Expresivní detaily"]
    },
    {
      name: "Geometrické vzory",
      description: "Moderní geometrické kompozice kombinující přesnost a uměleckou kreativitu.",
      features: ["Čisté linky", "Symetrické vzory", "Minimalistický přístup"]
    },
    {
      name: "Černobílé kompozice",
      description: "Klasické černobílé tetování s důrazem na kontrast a kompozici.",
      features: ["Silné kontrasty", "Detailní práce", "Časeless design"]
    }
  ];

  const processSteps = [
    {
      step: "01",
      title: "Konzultace",
      description: "Prodiskutujeme vaše představy, styl a umístění tetování."
    },
    {
      step: "02", 
      title: "Návrh",
      description: "Vytvořím jedinečný návrh přesně podle vašich požadavků."
    },
    {
      step: "03",
      title: "Schválení",
      description: "Návrh upravíme dokud nebudete s výsledkem 100% spokojeni."
    },
    {
      step: "04",
      title: "Tetování",
      description: "Profesionální provedení v sterilním prostředí s nejvyšší péčí."
    }
  ];

  return (
    <section id="styles" className="section-spacing section-padding bg-tattoo-grey/30">
      <div className="max-w-6xl mx-auto">
        <h2 className="section-title text-center gradient-text mb-16">
          Styly & Proces
        </h2>

        {/* Styles */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold gradient-text-gold mb-8 text-center">
            Moje specializace
          </h3>
          
          <div className="grid md:grid-cols-3 gap-6">
            {styles.map((style, index) => (
              <Card key={index} className="p-6 card-hover h-full">
                <h4 className="text-xl font-bold gradient-text mb-4">{style.name}</h4>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {style.description}
                </p>
                <ul className="space-y-2">
                  {style.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-sm">
                      <div className="w-2 h-2 bg-tattoo-red rounded-full mr-3"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </div>

        {/* Process */}
        <div>
          <h3 className="text-3xl font-bold gradient-text-gold mb-8 text-center">
            Jak probíhá proces
          </h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {processSteps.map((item, index) => (
              <Card key={index} className="p-6 card-hover text-center relative">
                <div className="text-4xl font-bold gradient-text mb-4">{item.step}</div>
                <h4 className="text-lg font-bold mb-3">{item.title}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
                
                {/* Connector line */}
                {index < processSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-px bg-gradient-to-r from-tattoo-red to-transparent"></div>
                )}
              </Card>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <p className="text-lg text-muted-foreground mb-6">
            Nejste si jisti, který styl je pro vás ten pravý?
          </p>
          <Card className="p-8 max-w-md mx-auto">
            <h4 className="text-xl font-bold gradient-text mb-4">Konzultace zdarma</h4>
            <p className="text-sm text-muted-foreground mb-6">
              Domluvte si nezávaznou konzultaci a společně najdeme perfektní řešení.
            </p>
            <button className="w-full bg-gradient-to-r from-tattoo-red to-tattoo-red-dark text-white py-3 px-6 rounded-lg hover:shadow-lg hover:shadow-tattoo-red/50 transition-all duration-300">
              Domluvit konzultaci
            </button>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Styles;