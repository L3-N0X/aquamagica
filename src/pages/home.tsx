import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { HighlightCard } from "@/components/highlight-card";
import { EventCard } from "@/components/event-card";
import { GastronomyCard } from "@/components/gastronomy-card";

export function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="mb-16">
        <div className="relative h-[500px] w-full mb-8 overflow-hidden rounded-lg">
          <img
            src="https://images.unsplash.com/photo-1505236858219-8359eb29e329?q=80&w=2062&auto=format&fit=crop"
            alt="Ein beeindruckendes Bild des AquaMagica Erlebnisbads mit verschiedenen Wasserbereichen und Attraktionen"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-8">
            <h1 className="text-5xl font-bold text-white mb-4">
              Willkommen im
              <span className="text-primary font-logo"> AQUAMAGICA</span>
            </h1>
            <p className="text-white text-xl max-w-3xl">
              Die Wasserwelt der Sinne - ein modernes Erlebnisbad am Rande des Schwarzwalds
            </p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          <p className="text-lg mb-6">
            Erlebe Erholung, Abenteuer und unvergessliche Momente in einem der modernsten
            Erlebnisbäder Deutschlands. Eingebettet am Rande des Schwarzwalds, nahe Freiburg im
            Breisgau, erwartet dich auf über 25.000 m² eine faszinierende Kombination aus Wasser,
            Licht, Klang und Natur. Tauche ein in eine Welt, die alle Sinne verzaubert!
          </p>

          <div className="flex flex-wrap gap-4 mb-8">
            <Button size="lg" asChild>
              <Link to="/prices">Tickets & Preise</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/attractions">Alle Attraktionen entdecken</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Highlights Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Unsere spektakulären Highlights</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <HighlightCard
            title="Magische Flussfahrt"
            description="Ein sanftes Abenteuer für die ganze Familie"
            content="Entspanne auf einer 300 m langen Lazy-River-Anlage, umgeben von faszinierenden Lichteffekten, sanftem Nebel und beruhigenden Klangwelten aus verschiedenen Kontinenten."
            image="https://images.unsplash.com/photo-1560703650-ef3e0f254ae0?q=80&w=1470&auto=format&fit=crop"
            imageAlt="Die magische Flussfahrt mit Lichteffekten und sanftem Nebel"
          />

          <HighlightCard
            title='Vulkan-Rutsche "Inferno"'
            description="Spüre den Nervenkitzel!"
            content="Erlebe Deutschlands einzige 4-fach-Tunnelrutsche! Mit Licht- und simulierten Hitzeeffekten bei einer rasanten Abfahrt mit bis zu 45 km/h."
            image="https://images.unsplash.com/photo-1477894387642-00a731c51e3b?q=80&w=1471&auto=format&fit=crop"
            imageAlt="Die Vulkan-Rutsche Inferno mit spektakulären Lichteffekten"
          />

          <HighlightCard
            title='Kinderwelt "Tropica Island"'
            description="Ein Paradies für unsere kleinen Gäste!"
            content="Mit einem aufregenden Piratenschiff, lustigen Mini-Rutschen, interaktiven Wasserspielen und sprechenden Tieren, die für leuchtende Kinderaugen sorgen."
            image="https://images.unsplash.com/photo-1471922694854-ff1b63b20054?q=80&w=1472&auto=format&fit=crop"
            imageAlt="Die Kinderwelt Tropica Island mit Wasserspielen und Piratenschiff"
          />

          <HighlightCard
            title="Polar-Lagune"
            description="Eiskalt erwischt!"
            content="Unser Außenbecken mit Schneeinsel (saisonal), beeindruckenden Polarlichter-Projektionen und einem knuffigen, echten Eisbären-Roboter, der sich bewegt und brummt."
            image="https://images.unsplash.com/photo-1557253479-c77810c0a26a?q=80&w=1470&auto=format&fit=crop"
            imageAlt="Die Polar-Lagune mit Polarlichter-Projektionen und Eisbären-Roboter"
          />

          <HighlightCard
            title='Wellenbad "Atlantica"'
            description="Stürze dich in die Fluten!"
            content="Alle 30 Minuten erlebst du hier bis zu 3 Meter hohe Wellen, begleitet von authentischem Meeresrauschen und fröhlichen Delfingeräuschen. Manchmal überraschen wir dich sogar mit einem tropischen Sturm-Modus!"
            image="https://images.unsplash.com/photo-1596178060810-72c633ce3383?q=80&w=1470&auto=format&fit=crop"
            imageAlt="Das Wellenbad Atlantica mit hohen Wellen"
          />

          <HighlightCard
            title='Saunawelt "Elemente"'
            description="Balsam für Körper und Seele"
            content="Vier einzigartige Themen-Saunen – Feuer, Wasser, Luft und Erde – laden mit wechselnden Aufgüssen, echten Kräutern, ätherischen Ölen und beruhigender Meditationsmusik zum Verweilen ein."
            image="https://images.unsplash.com/photo-1584592740039-cddf0671f3d4?q=80&w=1528&auto=format&fit=crop"
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
      <section className="mb-16 p-8 rounded-lg">
        <h2 className="text-3xl font-bold mb-8 text-center">Specials & Events</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <EventCard
            title="Nachtschwimmen mit Lichtershow"
            description="Jeden Freitag von 20:00 – 24:00 Uhr"
            content="Verwandelt sich das AquaMagica in ein Lichtermeer mit Unterwasser-Lasern und Live-DJ-Musik."
            image="https://images.unsplash.com/photo-1536849460588-696219a9e98d?q=80&w=1471&auto=format&fit=crop"
            imageAlt="Nachtschwimmen mit spektakulärer Lichtershow"
          />

          <EventCard
            title="Aqua-Yoga"
            description="Sonntags von 9:30 – 10:15 Uhr"
            content="Starte entspannt in den Sonntag! Wir bieten Aqua-Yoga-Kurse im Erlebnisbecken an. (Anmeldung empfohlen, kleine Zusatzgebühr)"
            image="https://images.unsplash.com/photo-1588286840104-8457e3526d3b?q=80&w=1470&auto=format&fit=crop"
            imageAlt="Aqua-Yoga im Erlebnisbecken"
          />
        </div>
      </section>

      {/* Gastronomie Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center">
          Gastronomie – Für jeden Geschmack das Richtige
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <GastronomyCard
            title="AquaBistro"
            content='Genieße mediterrane und vegane Köstlichkeiten mit direktem Blick auf das Wellenbad "Atlantica". Unsere Spezialität: Die erfrischende Wassermelonen-Basilikum-Bowl.'
            image="https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1374&auto=format&fit=crop"
            imageAlt="Das AquaBistro mit mediterranen und veganen Köstlichkeiten"
          />

          <GastronomyCard
            title="Piraten-Kantine"
            content="Speziell für unsere kleinen Abenteurer! Hier gibt es Mini-Burger, Meerjungfrauen-Slush und knusprige Goldmünzen-Kekse."
            image="https://images.unsplash.com/photo-1565299585323-38d6b0865b47?q=80&w=1380&auto=format&fit=crop"
            imageAlt="Die Piraten-Kantine mit kinderfreundlichen Speisen"
          />

          <GastronomyCard
            title='Sauna-Lounge "AufgussBar"'
            content="Stärke dich nach dem Schwitzen mit gesunden Smoothies, erlesenen Teesorten und herzhaften Snacks."
            image="https://images.unsplash.com/photo-1610508500445-a4592435e27e?q=80&w=1374&auto=format&fit=crop"
            imageAlt="Die Sauna-Lounge mit gesunden Snacks und Getränken"
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center mb-16">
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
    </>
  );
}
