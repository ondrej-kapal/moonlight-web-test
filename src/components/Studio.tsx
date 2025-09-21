import { Card } from '@/components/ui/card';

const Studio = () => {
  const studioFeatures = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      title: "Sterilní prostředí",
      description: "Nejvyšší standardy hygieny a sterilizace všech nástrojů"
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: "Moderní vybavení",
      description: "Nejnovější tattoo stroje a profesionální vybavení"
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
      title: "Komfortní prostředí",
      description: "Relaxační atmosféra pro vaše pohodlí během tetování"
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      title: "Soukromí",
      description: "Diskrétní prostředí pro vaše tetování"
    }
  ];

  const openingHours = [
    { day: "Pondělí", hours: "10:00 - 20:00" },
    { day: "Úterý", hours: "10:00 - 20:00" },
    { day: "Středa", hours: "10:00 - 20:00" },
    { day: "Čtvrtek", hours: "10:00 - 20:00" },
    { day: "Pátek", hours: "10:00 - 20:00" },
    { day: "Sobota", hours: "10:00 - 18:00" },
    { day: "Neděle", hours: "Zavřeno" }
  ];

  return (
    <section id="studio" className="section-spacing section-padding bg-tattoo-grey/30">
      <div className="max-w-6xl mx-auto">
        <h2 className="section-title text-center gradient-text mb-8">
          Studio
        </h2>
        
        <p className="text-center text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
          Navštivte naše moderní studio v centru Prahy. Nabízíme profesionální prostředí 
          s nejvyššími standardy hygieny a komfortu.
        </p>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Mapa */}
          <div className="order-2 lg:order-1">
            <Card className="p-2 h-[400px] overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2560.0986340834536!2d14.4158624156605!3d50.07551927942434!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x470b94eb1d999bbb%3A0x2eade4dd7bb52e41!2sPraha%202%2C%20Czechia!5e0!3m2!1sen!2s!4v1647095849127!5m2!1sen!2s"
                width="100%"
                height="100%"
                style={{ border: 0, borderRadius: '0.5rem' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Umístění tattoo studia"
              ></iframe>
            </Card>
          </div>

          {/* Informace o studiu */}
          <div className="order-1 lg:order-2 space-y-6">
            <Card className="p-6">
              <h3 className="text-2xl font-bold gradient-text-gold mb-4">
                Adresa studia
              </h3>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <svg className="w-5 h-5 text-tattoo-red mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  </svg>
                  <div>
                    <p className="font-medium">Novákových 123</p>
                    <p className="text-muted-foreground">120 00 Praha 2, Vinohrady</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <svg className="w-5 h-5 text-tattoo-red mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 0V6a2 2 0 012-2h2a2 2 0 012 2v1m-6 0h6m-6 0l.01 3.22M18 16l-2-3h-4l-2 3v5a2 2 0 002 2h4a2 2 0 002-2v-5z" />
                  </svg>
                  <div>
                    <p className="font-medium">Doprava</p>
                    <p className="text-muted-foreground">Metro A - Náměstí Míru (5 min pěšky)</p>
                    <p className="text-muted-foreground">Tram 4, 6, 10, 16, 22 - Náměstí Míru</p>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-xl font-bold gradient-text mb-4">
                Otevírací doba
              </h3>
              <div className="space-y-2">
                {openingHours.map((item, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="text-muted-foreground">{item.day}</span>
                    <span className={`font-medium ${item.hours === 'Zavřeno' ? 'text-muted-foreground' : 'text-foreground'}`}>
                      {item.hours}
                    </span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>

        {/* Studio vlastnosti */}
        <div>
          <h3 className="text-3xl font-bold gradient-text-gold mb-8 text-center">
            Proč zvolit naše studio
          </h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {studioFeatures.map((feature, index) => (
              <Card key={index} className="p-6 text-center card-hover">
                <div className="w-16 h-16 bg-gradient-to-br from-tattoo-red to-tattoo-red-dark rounded-full flex items-center justify-center mx-auto mb-4 text-white">
                  {feature.icon}
                </div>
                <h4 className="text-lg font-bold mb-3">{feature.title}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Studio;