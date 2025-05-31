import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export function AboutPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-12 pt-6 px-4 md:px-8">
      {/* Hero Section */}
      <section className="text-center space-y-6">
        <h1 className="text-4xl md:text-5xl font-bold">
          Über <span className="text-primary font-logo">AQUAMAGICA</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">Wo Wasser zur Magie wird</p>
        <div className="relative w-full h-64 md:h-80 rounded-lg overflow-hidden">
          <img
            src="/assets/empty-big-pool.jpg"
            alt="Moderne Wassererlebniswelt mit spektakulären Lichteffekten und Pools"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div className="absolute bottom-6 left-6 text-white text-left">
            <p className="text-lg font-semibold">25.000 m² Wassererlebnis</p>
            <p className="text-sm opacity-90">Am Rande des Schwarzwalds</p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="grid md:grid-cols-2 gap-8 items-center">
        <div className="space-y-6">
          <h2 className="text-3xl font-bold">Unsere Entstehung</h2>
          <div className="space-y-4 text-muted-foreground">
            <p>
              AquaMagica – Die Wasserwelt der Sinne – öffnete seine Pforten im Jahr 2019 mit einer
              klaren Vision: Ein Wassererlebnis zu schaffen, das seinesgleichen sucht und Besucher
              aller Generationen verzaubert.
            </p>
            <p>
              Gelegen in der malerischen Umgebung von Freiburg im Breisgau, direkt am Tor zum
              Schwarzwald, erstreckt sich unsere Anlage über beeindruckende 25.000 m² im Innen- und
              Außenbereich.
            </p>
          </div>
        </div>
        <div className="relative h-64 md:h-80 rounded-lg overflow-hidden">
          <img
            src="/assets/rutschbecken-ende.jpg"
            alt="Historische Aufnahme der Eröffnung von AquaMagica im Jahr 2019"
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      {/* Team Section */}
      <section className="text-center space-y-6">
        <h2 className="text-3xl font-bold">Wer wir sind</h2>
        <Card className="max-w-4xl mx-auto">
          <CardContent className="">
            <p className="text-muted-foreground leading-relaxed">
              Hinter AquaMagica steht ein Team von{" "}
              <strong>85 engagierten Mitarbeiterinnen und Mitarbeitern</strong>. Von den
              Bademeistern über das Servicepersonal bis hin zum Technikteam – jeder Einzelne trägt
              mit Herzblut und Leidenschaft dazu bei, Ihnen Sicherheit, Wohlbefinden und
              unvergessliche Momente zu garantieren. Wir sind stolz darauf, ein wichtiger regionaler
              Arbeitgeber und ein beliebtes Ausflugsziel zu sein.
            </p>
          </CardContent>
        </Card>
      </section>

      {/* Philosophy Section */}
      <section className="space-y-8">
        <h2 className="text-3xl font-bold text-center">Unsere Philosophie</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="h-full">
            <CardHeader>
              <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mb-4">
                <span className="text-2xl">🌊</span>
              </div>
              <CardTitle className="text-lg">Erlebnisse für alle Sinne</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Wir glauben, dass wahre Entspannung und Freude entstehen, wenn alle Sinne
                angesprochen werden. Daher kombinieren wir Wasserattraktionen mit einzigartigen
                Licht-, Klang- und Duftelementen.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="h-full">
            <CardHeader>
              <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center mb-4">
                <span className="text-2xl">🌱</span>
              </div>
              <CardTitle className="text-lg">Nachhaltigkeit im Herzen</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Der Schutz unserer Umwelt ist uns ein zentrales Anliegen. AquaMagica wird
                CO₂-neutral betrieben durch Solarstrom, effiziente Wärmerückgewinnung und regionale
                Wasseraufbereitung.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="h-full">
            <CardHeader>
              <div className="w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center mb-4">
                <span className="text-2xl">👨‍👩‍👧‍👦</span>
              </div>
              <CardTitle className="text-lg">Inklusion & Familienfreundlichkeit</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                AquaMagica ist ein Ort für alle. Wir legen großen Wert auf barrierefreien Zugang in
                allen Bereichen und bieten spezielle Attraktionen und Tarife für Familien.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="h-full">
            <CardHeader>
              <div className="w-12 h-12 rounded-full bg-orange-100 dark:bg-orange-900 flex items-center justify-center mb-4">
                <span className="text-2xl">🚀</span>
              </div>
              <CardTitle className="text-lg">Innovation</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Mit unserem digitalen Armband-System bieten wir höchsten Komfort: Es dient als
                Schlüssel für den Spind, als Zahlungsmittel und als Speicher für Ihre schönsten
                Fotomomente bei uns.
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Sustainability Details */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold text-center">CO₂-neutral betrieben</h2>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="text-2xl">♻️</span>
              Unser Beitrag zum Umweltschutz
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center space-y-2">
                <div className="w-16 h-16 rounded-full bg-yellow-100 dark:bg-yellow-900 flex items-center justify-center mx-auto">
                  <span className="text-2xl">☀️</span>
                </div>
                <h3 className="font-semibold">Solarstrom</h3>
                <p className="text-sm text-muted-foreground">
                  Nutzung von Solarstrom von unseren Dächern
                </p>
              </div>
              <div className="text-center space-y-2">
                <div className="w-16 h-16 rounded-full bg-red-100 dark:bg-red-900 flex items-center justify-center mx-auto">
                  <span className="text-2xl">🔥</span>
                </div>
                <h3 className="font-semibold">Wärmerückgewinnung</h3>
                <p className="text-sm text-muted-foreground">
                  Effiziente Wärmerückgewinnungssysteme
                </p>
              </div>
              <div className="text-center space-y-2">
                <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mx-auto">
                  <span className="text-2xl">💧</span>
                </div>
                <h3 className="font-semibold">Wasseraufbereitung</h3>
                <p className="text-sm text-muted-foreground">
                  Regionales Wasseraufbereitungskonzept
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Location & Facts */}
      <section className="grid md:grid-cols-2 gap-8 items-center">
        <div className="relative h-64 md:h-80 rounded-lg overflow-hidden">
          <img
            src="/assets/freiburg.jpg"
            alt="Malerische Landschaft des Schwarzwalds um Freiburg im Breisgau"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="space-y-6">
          <h2 className="text-3xl font-bold">Unser Standort</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mt-1">
                <span className="text-sm">📍</span>
              </div>
              <div>
                <h3 className="font-semibold">Freiburg im Breisgau</h3>
                <p className="text-muted-foreground">Am Rande des Schwarzwalds gelegen</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mt-1">
                <span className="text-sm">🏢</span>
              </div>
              <div>
                <h3 className="font-semibold">25.000 m²</h3>
                <p className="text-muted-foreground">Innen- und Außenbereich</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mt-1">
                <span className="text-sm">👥</span>
              </div>
              <div>
                <h3 className="font-semibold">85 Mitarbeiter</h3>
                <p className="text-muted-foreground">Engagiertes Team für Ihr Wohlbefinden</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Separator />

      {/* Closing Message */}
      <section className="text-center space-y-6 py-8">
        <h2 className="text-2xl font-bold">Willkommen im AquaMagica!</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Wir freuen uns darauf, Sie im AquaMagica begrüßen zu dürfen und Ihnen eine magische
          Auszeit vom Alltag zu bereiten!
        </p>
        <div className="relative w-full max-w-4xl mx-auto h-48 rounded-lg overflow-hidden">
          <img
            src="/assets/sauna.jpg"
            alt="Besucher genießen magische Momente im AquaMagica Wassererlebnispark"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/80 to-transparent" />
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-white text-xl font-semibold">
              Ihre magische Auszeit wartet auf Sie!
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
