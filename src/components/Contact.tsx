import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const CONTACT_EMAIL = 'moonlightbooking@seznam.cz';
const INSTAGRAM_URL = 'https://www.instagram.com/_m00nlight_tatts/';
const INSTAGRAM_HANDLE = '@_m00nlight_tatts';

const tattooTypeLabels: Record<string, string> = {
  individual: 'Individuální návrh',
  gallery: 'Volný návrh z galerie',
  consultation: 'Konzultace',
};

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    tattooType: 'individual',
  });

  // Bez backendu: formulář otevře e-mailového klienta s předvyplněnou zprávou
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const typeLabel = tattooTypeLabels[formData.tattooType] ?? formData.tattooType;
    const subject = `Rezervace / dotaz – ${typeLabel}`;
    const body = [
      `Jméno: ${formData.name}`,
      formData.phone ? `Telefon: ${formData.phone}` : null,
      formData.email ? `E-mail: ${formData.email}` : null,
      `Zájem o: ${typeLabel}`,
      '',
      formData.message,
    ]
      .filter((line) => line !== null)
      .join('\n');

    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const bookingSteps = [
    'Napiš mi přes formulář, e-mail nebo Instagram – popiš motiv, umístění a přibližnou velikost.',
    'Ozvu se ti zpátky a domluvíme konzultaci – ta je vždy zdarma a nezávazná.',
    'Připravím návrh na míru a společně ho doladíme, dokud nebude přesně podle tvé představy.',
    'Domluvíme termín a jde se tetovat.',
  ];

  return (
    <section id="contact" className="section-spacing section-padding scroll-mt-24">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl lg:text-5xl font-semibold text-[color:var(--ml-accent)] mb-6">
          Kontakt & Rezervace
        </h2>

        <p className="text-lg text-foreground/90 mb-12 max-w-2xl">
          Máš zájem o tetování, nebo se chceš jen na něco zeptat? Napiš mi.
          Ráda s tebou proberu tvoji představu a společně najdeme návrh, který ti sedne.
        </p>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card className="p-8">
            <h3 className="text-2xl font-semibold text-[color:var(--ml-accent)] mb-6">
              Napiš mi
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
                    placeholder="Tvoje jméno"
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
                    placeholder="+420 777 000 000"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">E-mail *</label>
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full"
                  placeholder="tvuj@email.cz"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Co tě zajímá</label>
                <select
                  name="tattooType"
                  value={formData.tattooType}
                  onChange={handleChange}
                  className="w-full bg-input border border-border rounded-lg px-3 py-2 text-foreground"
                >
                  <option value="individual">Individuální návrh</option>
                  <option value="gallery">Volný návrh z galerie</option>
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
                  placeholder="Popiš svou představu – motiv, umístění, velikost…"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-[color:var(--ml-accent)] text-white font-semibold hover:bg-[color:var(--ml-accent)] hover:opacity-90"
              >
                Odeslat zprávu
              </Button>

              <p className="text-xs text-muted-foreground">
                Odesláním se otevře tvůj e-mail s předvyplněnou zprávou na {CONTACT_EMAIL}.
              </p>
            </form>
          </Card>

          {/* Contact info + booking flow */}
          <div className="space-y-6">
            <Card className="p-8">
              <h3 className="text-2xl font-semibold text-[color:var(--ml-accent)] mb-6">
                Kde mě najdeš
              </h3>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="text-[color:var(--ml-accent)] mt-1">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <rect x="3" y="3" width="18" height="18" rx="5" strokeWidth={2} />
                      <circle cx="12" cy="12" r="4" strokeWidth={2} />
                      <circle cx="17.2" cy="6.8" r="1.2" fill="currentColor" stroke="none" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Instagram</h4>
                    <a
                      href={INSTAGRAM_URL}
                      target="_blank"
                      rel="noreferrer"
                      className="text-muted-foreground hover:text-[color:var(--ml-accent)] transition-colors"
                    >
                      {INSTAGRAM_HANDLE}
                    </a>
                    <p className="text-sm text-muted-foreground/80 mt-1">
                      Nejrychlejší cesta – napiš mi klidně rovnou do DM.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="text-[color:var(--ml-accent)] mt-1">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">E-mail</h4>
                    <a
                      href={`mailto:${CONTACT_EMAIL}`}
                      className="text-muted-foreground hover:text-[color:var(--ml-accent)] transition-colors"
                    >
                      {CONTACT_EMAIL}
                    </a>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-8">
              <h3 className="text-xl font-semibold text-[color:var(--ml-accent)] mb-4">
                Jak rezervace probíhá
              </h3>

              <div className="space-y-4 text-sm text-muted-foreground">
                {bookingSteps.map((step, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[color:var(--ml-accent)] text-white flex items-center justify-center text-xs font-bold mt-0.5">
                      {index + 1}
                    </div>
                    <p className="leading-relaxed">{step}</p>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
