import { Card } from '@/components/ui/card';

const processSteps = [
  {
    step: '1',
    title: 'Konzultace',
    description: 'Prodiskutujeme vaše představy, styl a umístění tetování.'
  },
  {
    step: '2',
    title: 'Návrh',
    description: 'Vytvořím jedinečný návrh přesně podle vašich požadavků.'
  },
  {
    step: '3',
    title: 'Schválení',
    description: 'Návrh upravíme dokud nebudete s výsledkem 100% spokojeni.'
  },
  {
    step: '4',
    title: 'Tetování',
    description: 'Profesionální provedení v sterilním prostředí s nejvyšší péčí.'
  }
];

const Styles = () => {
  return (
    <section id="styles" className="section-spacing section-padding">
      <div className="max-w-6xl mx-auto">
        {/* Blue frame around the whole section on large screens */}
          <div className="grid lg:grid-cols-2 gap-12 items-start">

          {/* Left: large framed image */}
          <div className="flex justify-start">
              <img
                src="/brand/tattoo-machine.jpg"
                alt="Tattoo machine on a table"
                className="w-full h-auto object-cover block"
              />
          </div>

          {/* Right: Proces */}
          <div>
            <h2 className="text-4xl lg:text-5xl font-semibold text-[color:var(--ml-accent)] mb-6">Proces</h2>
            <p className="text-lg text-foreground/90 mb-8">
              Každý návrh tvořím na míru, ať už jde o nápis, portrét, nebo originální abstraktní vzor.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 lg:gap-12">
              {processSteps.map((s, idx) => (
                <div key={idx} className="flex items-start gap-6">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[color:var(--ml-accent)] text-white flex items-center justify-center font-bold text-xl">
                    {s.step}
                  </div>
                  <div>
                    <div className="text-xl font-semibold text-[color:var(--ml-accent)] mb-2 italic">{s.title}</div>
                    <div className="text-base text-foreground/90 leading-relaxed">{s.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          </div>
      </div>
    </section>
  );
};

export default Styles;