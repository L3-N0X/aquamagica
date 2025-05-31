import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { HighlightCard } from "@/components/highlight-card";
import { EventCard } from "@/components/event-card";
import { GastronomyCard } from "@/components/gastronomy-card";
import { GalleryVertical, Ticket } from "lucide-react";

export function HomePage() {
  return (
    <div className="w-full space-y-8">
      {/* Hero Section */}
      <section className="mb-16">
        <div className="relative h-[40vh] min-h-[200px] md:h-[80vh] md:min-h-[700px] w-full mb-8 overflow-hidden">
          <img
            src="/assets/tropical-islanderlebnisbad-big.jpg"
            alt="Ein beeindruckendes Bild des AquaMagica Erlebnisbads mit verschiedenen Wasserbereichen und Attraktionen"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20">
            <div className="absolute inset-0 flex items-center justify-center p-8 md:p-16">
              <div className="text-center max-w-7xl mx-auto">
                <h1 className="text-2xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white mb-6 leading-tight">
                  Willkommen im
                  <br />
                  <span className="text-primary font-logo text-5xl sm:text-6xl md:text-8xl lg:text-8xl xl:text-9xl drop-shadow-2xl">
                    {" "}
                    AQUAMAGICA
                  </span>
                </h1>
                <p className="text-white text-xl md:text-3xl max-w-4xl font-light tracking-wide drop-shadow-lg">
                  Die spektakuläre Wasserwelt der Sinne
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 md:px-8 text-center flex flex-col items-center">
          <p className="text-lg mb-6">
            Erlebe pure Magie auf über 25.000 m² - wo Wasser, Licht und Klang zu einem
            unvergesslichen Abenteuer verschmelzen!
          </p>

          <div className="flex flex-wrap gap-4 mb-8 justify-center">
            <Button size="lg" asChild>
              <Link to="/prices">
                <Ticket className="mr-2" />
                Tickets & Preise
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/attractions">
                <GalleryVertical className="mr-2" />
                Alle Attraktionen entdecken
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Highlights Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Unsere spektakulären Highlights</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
          <HighlightCard
            title="Magische Flussfahrt"
            description="Ein sanftes Abenteuer für die ganze Familie"
            content="Entspanne auf einer 300 m langen Lazy-River-Anlage, umgeben von faszinierenden Lichteffekten, sanftem Nebel und beruhigenden Klangwelten aus verschiedenen Kontinenten."
            image="/assets/stroemungsbecken-photo.jpg"
            imageAlt="Die magische Flussfahrt mit Lichteffekten und sanftem Nebel"
          />

          <HighlightCard
            title='Vulkan-Rutsche "Inferno"'
            description="Spüre den Nervenkitzel!"
            content="Erlebe Deutschlands einzige 4-fach-Tunnelrutsche! Mit Licht- und simulierten Hitzeeffekten bei einer rasanten Abfahrt mit bis zu 45 km/h."
            image="/assets/big-halfpipe-slide-green.jpg"
            imageAlt="Die Vulkan-Rutsche Inferno mit spektakulären Lichteffekten"
          />

          <HighlightCard
            title='Kinderwelt "Tropica Island"'
            description="Ein Paradies für unsere kleinen Gäste!"
            content="Mit einem aufregenden Piratenschiff, lustigen Mini-Rutschen, interaktiven Wasserspielen und sprechenden Tieren, die für leuchtende Kinderaugen sorgen."
            image="/assets/kids-area-waterfall.jpg"
            imageAlt="Die Kinderwelt Tropica Island mit Wasserspielen und Piratenschiff"
          />

          <HighlightCard
            title="Polar-Lagune"
            description="Eiskalt erwischt!"
            content="Unser Außenbecken mit Schneeinsel (saisonal), beeindruckenden Polarlichter-Projektionen und einem knuffigen, echten Eisbären-Roboter, der sich bewegt und brummt."
            image="/assets/outside-swimmer-pool.jpg"
            imageAlt="Die Polar-Lagune mit Polarlichter-Projektionen und Eisbären-Roboter"
          />

          <HighlightCard
            title='Wellenbad "Atlantica"'
            description="Stürze dich in die Fluten!"
            content="Alle 30 Minuten erlebst du hier bis zu 3 Meter hohe Wellen, begleitet von authentischem Meeresrauschen und fröhlichen Delfingeräuschen. Manchmal überraschen wir dich sogar mit einem tropischen Sturm-Modus!"
            image="/assets/wellenbecken.jpg"
            imageAlt="Das Wellenbad Atlantica mit hohen Wellen"
          />

          <HighlightCard
            title='Saunawelt "Elemente"'
            description="Balsam für Körper und Seele"
            content="Vier einzigartige Themen-Saunen – Feuer, Wasser, Luft und Erde – laden mit wechselnden Aufgüssen, echten Kräutern, ätherischen Ölen und beruhigender Meditationsmusik zum Verweilen ein."
            image="/assets/sauna.jpg"
            imageAlt="Die Saunawelt Elemente mit verschiedenen Themen-Saunen"
          />
        </div>

        <div className="text-center mt-8">
          <Button size="lg" variant="outline" asChild>
            <Link to="/attractions">Alle Attraktionen im Detail</Link>
          </Button>
        </div>
      </section>

      {/* Specials & Events Section */}
      <section className="mb-16 rounded-lg">
        <h2 className="text-3xl font-bold mb-8 text-center">Specials & Events</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-4">
          <EventCard
            title="Nachtschwimmen mit Lichtershow"
            description="Jeden Freitag von 20:00 – 24:00 Uhr"
            content="Verwandelt sich das AquaMagica in ein Lichtermeer mit Unterwasser-Lasern und Live-DJ-Musik."
            image="/assets/dj-outside-swimming-pool.jpg"
            imageAlt="Nachtschwimmen mit spektakulärer Lichtershow"
          />

          <EventCard
            title="Aqua-Yoga"
            description="Sonntags von 9:30 – 10:15 Uhr"
            content="Starte entspannt in den Sonntag! Wir bieten Aqua-Yoga-Kurse im Erlebnisbecken an. (Anmeldung empfohlen, kleine Zusatzgebühr)"
            image="/assets/nichtschwimmer-bereich-im-hallenbad-des-aquaplex.jpg"
            imageAlt="Aqua-Yoga im Erlebnisbecken"
          />
        </div>
      </section>

      {/* Gastronomie Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center">
          Gastronomie – Für jeden Geschmack das Richtige
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4">
          <GastronomyCard
            title="AquaBistro"
            content='Genieße mediterrane und vegane Köstlichkeiten mit direktem Blick auf das Wellenbad "Atlantica". Unsere Spezialität: Die erfrischende Wassermelonen-Basilikum-Bowl.'
            image="/assets/aquabistro.jpg"
            imageAlt="Das AquaBistro mit mediterranen und veganen Köstlichkeiten"
          />

          <GastronomyCard
            title="Piraten-Kantine"
            content="Speziell für unsere kleinen Abenteurer! Hier gibt es Mini-Burger, Meerjungfrauen-Slush und knusprige Goldmünzen-Kekse."
            image="/assets/piraten-kantine.jpg"
            imageAlt="Die Piraten-Kantine mit kinderfreundlichen Speisen"
          />

          <GastronomyCard
            title='Sauna-Lounge "AufgussBar"'
            content="Stärke dich nach dem Schwitzen mit gesunden Smoothies, erlesenen Teesorten und herzhaften Snacks."
            image="/assets/sauna-lounge.jpg"
            imageAlt="Die Sauna-Lounge mit gesunden Snacks und Getränken"
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center mb-16 px-4">
        <div className="max-w-3xl mx-auto bg-primary/10 p-8 rounded-lg">
          <h2 className="text-3xl font-bold mb-4">
            Bereit für ein unvergessliches Wassererlebnis?
          </h2>
          <p className="text-lg mb-6">Buche jetzt deine Tickets online und spare Zeit und Geld!</p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Button size="lg" asChild>
              <Link to="/prices">Tickets buchen</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/contact">Kontakt & Anfahrt</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
