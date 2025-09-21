import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    tattooType: 'individual'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Zde by se poslal email nebo API request
    toast({
      title: "Zpráva odeslána!",
      description: "Děkujeme za vaši zprávu. Ozveme se vám do 24 hodin.",
    });

    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      message: '',
      tattooType: 'individual'
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const contactInfo = [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ),
      title: "Telefon",
      value: "+420 123 456 789",
      link: "tel:+420123456789"
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      title: "Email",
      value: "info@tattoostudio.cz",
      link: "mailto:info@tattoostudio.cz"
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      title: "Adresa",
      value: "Novákových 123, Praha 2",
      link: null
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Otevírací doba",
      value: "Po-Pá: 10:00-20:00, So: 10:00-18:00",
      link: null
    }
  ];

  return (
    <section id="contact" className="section-spacing section-padding bg-tattoo-grey/30">
      <div className="max-w-6xl mx-auto">
        <h2 className="section-title text-center gradient-text mb-8">
          Kontakt & Rezervace
        </h2>

        <p className="text-center text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
          Máte zájem o tetování nebo máte dotazy? Neváhejte mě kontaktovat. 
          Rád s vámi prodiskutuji vaše představy a pomohu najít perfektní řešení.
        </p>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card className="p-8">
            <h3 className="text-2xl font-bold gradient-text-gold mb-6">
              Napište mi
            </h3>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Jméno *</label>
                  <Input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full"
                    placeholder="Vaše jméno"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Telefon</label>
                  <Input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full"
                    placeholder="+420 123 456 789"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Email *</label>
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full"
                  placeholder="vas@email.cz"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Typ tetování</label>
                <select
                  name="tattooType"
                  value={formData.tattooType}
                  onChange={handleChange}
                  className="w-full bg-input border border-border rounded-lg px-3 py-2 text-foreground"
                >
                  <option value="individual">Individuální návrh</option>
                  <option value="gallery">Design z galerie</option>
                  <option value="consultation">Konzultace</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Zpráva *</label>
                <Textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full"
                  placeholder="Popište svou představu o tetování, preferované umístění, velikost..."
                />
              </div>

              <Button type="submit" variant="hero" className="w-full">
                Odeslat zprávu
              </Button>
            </form>
          </Card>

          {/* Contact Info */}
          <div className="space-y-6">
            <Card className="p-8">
              <h3 className="text-2xl font-bold gradient-text-gold mb-6">
                Kontaktní informace
              </h3>

              <div className="space-y-6">
                {contactInfo.map((item, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="text-tattoo-red mt-1">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">{item.title}</h4>
                      {item.link ? (
                        <a 
                          href={item.link} 
                          className="text-muted-foreground hover:text-tattoo-red transition-colors"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-muted-foreground">{item.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Booking Info */}
            <Card className="p-8">
              <h3 className="text-xl font-bold gradient-text mb-4">
                Důležité informace
              </h3>
              
              <div className="space-y-4 text-sm text-muted-foreground">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-tattoo-red rounded-full mt-2 flex-shrink-0"></div>
                  <p>Individuální návrhy vyžadují rezervaci min. 2 týdny dopředu</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-tattoo-red rounded-full mt-2 flex-shrink-0"></div>
                  <p>Konzultace je vždy zdarma a nezávazná</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-tattoo-red rounded-full mt-2 flex-shrink-0"></div>
                  <p>Cena tetování se odvíjí od velikosti, složitosti a umístění</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-tattoo-red rounded-full mt-2 flex-shrink-0"></div>
                  <p>Pro rezervaci termínu je nutná záloha 30% z celkové ceny</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;