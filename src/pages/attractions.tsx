import { AttractionCard } from "@/components/attraction-card";
import { SpecialEventCard } from "@/components/special-event-card";
import { Button } from "@/components/ui/button";
import { Map, Ticket } from "lucide-react";
import { Link } from "react-router";

export function AttractionsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
          <span className="text-primary font-logo">AQUAMAGICA </span> Attraktionen
        </h1>
        <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
          Tauche ein in eine Welt voller Abenteuer und Entspannung! Im AquaMagica erwartet dich eine
          unvergleichliche Vielfalt an Wassererlebnissen, die jeden Besuch zu einem einzigartigen
          Abenteuer machen.
        </p>
      </div>

      {/* Action & Thrill Section */}
      <section className="mb-16">
        <div className="flex items-center gap-3 mb-8">
          <h2 className="text-3xl font-bold text-foreground">
            Für Action-Liebhaber & Nervenkitzel-Suchende
          </h2>
        </div>
        <div className="space-y-8">
          <AttractionCard
            title="Vulkan-Rutsche 'Inferno'"
            description="Spüre die Hitze! Deutschlands einzige 4-fach-Tunnelrutsche entführt dich in eine Welt aus Feuer und Lava. Rausche durch vier verschlungene Röhren, begleitet von spektakulären Lichteffekten und simulierten Hitzeimpulsen."
            adrenalinLevel="Hoch!"
            speed="Bis zu 45 km/h"
            specialFeatures={[
              "Deutschlands einzige 4-fach-Tunnelrutsche",
              "Spektakuläre Lichteffekte",
              "Simulierte Hitzeimpulse",
              "Einzigartige Thematisierung",
              "Intensive Sinneseindrücke",
            ]}
            imageUrl="/assets/big-halfpipe-slide-green.jpg"
            imageAlt="Spektakuläre Wasserrutsche mit roten Lichteffekten in einem dunklen Tunnel, die das feurige Inferno-Erlebnis der Vulkan-Rutsche darstellt"
            category="action"
          />

          <AttractionCard
            title="Wellenbad 'Atlantica'"
            description="Stürze dich in die Fluten unseres gigantischen Wellenbads! Alle 30 Minuten erlebst du hier bis zu 3 Meter hohe, kraftvolle Wellen, untermalt von authentischem Meeresrauschen und den fröhlichen Rufen von Delfinen."
            adrenalinLevel="Mittel bis Hoch (je nach Wellengang)"
            specialFeatures={[
              "Bis zu 3 Meter hohe Wellen",
              "Alle 30 Minuten Wellengang",
              "Authentisches Meeresrauschen",
              "Delfingeräusche",
              "Tropischer Sturm-Modus (unregelmäßig)",
            ]}
            imageUrl="/assets/wellenbecken.jpg"
            imageAlt="Großes Wellenbad mit hohen blauen Wellen und vielen Badegästen, die das aufregende Atlantica Wellenbad-Erlebnis genießen"
            category="action"
          />
        </div>
      </section>

      {/* Family & Kids Section */}
      <section className="mb-16">
        <div className="flex items-center gap-3 mb-8">
          <h2 className="text-3xl font-bold text-foreground">Für Familien & Kleine Entdecker</h2>
        </div>
        <div className="space-y-8">
          <AttractionCard
            title="Kinderwelt 'Tropica Island'"
            description="Ein farbenfrohes Wasserparadies für unsere jüngsten Gäste! Auf Tropica Island wartet ein großes Piratenschiff zum Entern, zahlreiche Mini-Rutschen für den ersten Nervenkitzel, interaktive Wasserspiele und lustige, sprechende Tierfiguren."
            adrenalinLevel="Niedrig (Spaßfaktor: Hoch!)"
            specialFeatures={[
              "Großes Piratenschiff zum Entern",
              "Zahlreiche Mini-Rutschen",
              "Interaktive Wasserspiele",
              "Sprechende Tierfiguren",
              "Sichere, flache Wasserbereiche",
              "Fantasievolle Gestaltung",
            ]}
            imageUrl="/assets/kids-area-climbing.jpg"
            imageAlt="Buntes Kinder-Wasserparadies mit einem großen Piratenschiff, Mini-Rutschen und fröhlichen Kindern beim Spielen im flachen Wasser"
            category="family"
          />

          <AttractionCard
            title="Magische Flussfahrt"
            description="Lass dich treiben! Unsere 300 Meter lange Lazy-River-Anlage schlängelt sich gemütlich durch eine zauberhafte Landschaft. Entspanne auf deinem Schwimmreifen, während du von faszinierenden Lichteffekten, sanftem Nebel und beruhigenden Klangwelten begleitet wirst."
            adrenalinLevel="Sehr niedrig (Entspannungsfaktor: Hoch!)"
            specialFeatures={[
              "300 Meter lange Lazy-River-Anlage",
              "Faszinierende Lichteffekte",
              "Sanfte Nebeleffekte",
              "Beruhigende Klangwelten verschiedener Kontinente",
              "Erlebnis für alle Sinne",
              "Für jedes Alter geeignet",
            ]}
            imageUrl="/assets/stroemungsbecken-photo.jpg"
            imageAlt="Entspannender Lazy River mit Menschen auf Schwimmreifen, umgeben von tropischer Vegetation und sanften Lichteffekten"
            category="family"
          />
        </div>
      </section>

      {/* Relaxation Section */}
      <section className="mb-16">
        <div className="flex items-center gap-3 mb-8">
          <h2 className="text-3xl font-bold text-foreground">
            Für Erholungssuchende & Einzigartige Momente
          </h2>
        </div>
        <div className="space-y-8">
          <AttractionCard
            title="Polar-Lagune"
            subtitle="Außenbecken"
            description="Eiskalt erwischt! Wage dich in unser einzigartiges Außenbecken mit erfrischenden Temperaturen. Bestaune die saisonale Schneeinsel, die magischen Polarlichter-Projektionen an der Decke und unseren knuffigen Eisbären-Roboter Frosti."
            adrenalinLevel="Mittel (je nach Kälteempfinden und Mut!)"
            specialFeatures={[
              "Erfrischende Außenbecken-Temperaturen",
              "Saisonale Schneeinsel",
              "Magische Polarlichter-Projektionen",
              "Eisbären-Roboter Frosti (bewegt sich und brummt)",
              "Einzigartiges arktisches Flair",
              "Überdachter Bereich vorhanden",
            ]}
            imageUrl="/assets/outside-swimmer-pool.jpg"
            imageAlt="Mystisches Außenbecken mit eisigen blauen Tönen, Schneeinsel und magischen Polarlichter-Projektionen an der Decke"
            category="relaxation"
          />

          <AttractionCard
            title="Saunawelt 'Elemente'"
            subtitle="Zutritt gegen Aufpreis oder mit Sauna-Ticket"
            description="Finde deine innere Balance in unserer exklusiven Saunawelt, die den vier Elementen gewidmet ist. Jede Sauna bietet ein einzigartiges Erlebnis mit wechselnden Aufgüssen, natürlichen Kräutern und ätherischen Ölen."
            adrenalinLevel="Sehr niedrig (Entspannungsfaktor: Maximal!)"
            specialFeatures={[
              "Feuer-Sauna (Finnische Sauna, 90°C)",
              "Wasser-Sauna (Dampfbad, 45°C, hohe Luftfeuchtigkeit)",
              "Luft-Sauna (Bio-Sauna, 60°C, mit Farblichttherapie)",
              "Erde-Sauna (Rustikale Erdsauna im Außenbereich, 80°C)",
              "Wechselnde Aufgüsse mit natürlichen Kräutern",
              "Meditationsmusik und ätherische Öle",
              "Zugang zur Sauna-Lounge AufgussBar",
            ]}
            imageUrl="/assets/sauna.jpg"
            imageAlt="Luxuriöse Saunawelt mit warmem Holzambiente, dampfenden Saunakabinen und entspannender Atmosphäre der vier Elemente"
            category="relaxation"
          />
        </div>
      </section>

      {/* Special Events Section */}
      <section className="mb-16">
        <div className="flex items-center gap-3 mb-8">
          <h2 className="text-3xl font-bold text-foreground">Specials & Regelmäßige Events</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          <SpecialEventCard
            title="Nachtschwimmen mit Lichtershow"
            schedule="Jeden Freitag von 20:00 – 24:00 Uhr"
            description="Erlebe das Wellenbad Atlantica, die Magische Flussfahrt und ausgewählte Rutschen in einem faszinierenden Lichtermeer aus Unterwasser-Lasern, begleitet von einem Live-DJ."
            imageUrl="/assets/dj-outside-swimming-pool.jpg"
            imageAlt="Spektakuläre nächtliche Lichtershow im Schwimmbad mit bunten Unterwasser-Lasern und DJ-Musik"
          />

          <SpecialEventCard
            title="Aqua-Yoga"
            schedule="Jeden Sonntag von 9:30 – 10:15 Uhr"
            description="Starte vitalisierend in den Tag mit sanften Yoga-Übungen im Wasser im Erlebnisbecken. Ein entspannender Start in den Sonntag! (Anmeldung empfohlen, kleine Zusatzgebühr)"
            imageUrl="/assets/aqua-yoga.jpg"
            imageAlt="Entspannte Aqua-Yoga-Gruppe bei sanften Übungen im warmen Wasser des Erlebnisbeckens am Sonntagmorgen"
          />
        </div>
      </section>

      {/* Call to Action */}
      <section className="text-center bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 rounded-lg p-8">
        <h2 className="text-2xl font-bold mb-4 text-foreground">
          Bereit für unvergessliche Wasserabenteuer?
        </h2>
        <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
          Jede unserer Attraktionen wurde mit Liebe zum Detail gestaltet, um dir ein Höchstmaß an
          Spaß, Entspannung und magischen Momenten zu bieten. Entdecke deinen Lieblingsplatz im
          AquaMagica!
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700" asChild>
            <Link to="/prices">
              <Ticket className="mr-2" />
              Zu den Preisen & Tickets
            </Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link to="/about">
              <Map className="mr-2" />
              Anfahrt & Kontakt
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
