import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Phone, Mail, Globe, Building, FileText, Scale } from "lucide-react";

export function ImpressumPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold">Impressum & Kontakt</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Hier finden Sie alle gesetzlich vorgeschriebenen Informationen über den Betreiber dieser
            Website sowie Ihre Kontaktmöglichkeiten.
          </p>
        </div>

        {/* Main Impressum Card */}
        <Card className="mb-6 py-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building className="h-5 w-5" />
              Impressum
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Angaben gemäß § 5 Digitale-Dienste-Gesetz (DDG)
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Betreiber */}
            <div>
              <h3 className="font-semibold text-lg mb-2">Betreiber der Website</h3>
              <p className="text-lg font-medium">AquaMagica Freiburg GmbH</p>
            </div>

            <Separator />

            {/* Anschrift */}
            <div>
              <h3 className="font-semibold text-lg mb-2">Anschrift</h3>
              <div className="space-y-1">
                <p>Bäderstraße 12</p>
                <p>79100 Freiburg im Breisgau</p>
                <p>Deutschland</p>
              </div>
            </div>

            <Separator />

            {/* Vertreten durch */}
            <div>
              <h3 className="font-semibold text-lg mb-2">Vertreten durch</h3>
              <p>Frau Dr. Helena Sommer (Geschäftsführerin)</p>
            </div>
          </CardContent>
        </Card>

        {/* Kontakt Card */}
        <Card className="mb-6 py-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Phone className="h-5 w-5" />
              Kontakt
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-primary" />
                <div>
                  <p className="font-medium">Telefon</p>
                  <p className="font-mono text-sm">+49 (0)761 / 123456</p>
                  <p className="text-xs text-muted-foreground">Mo-Fr 09:00 - 17:00 Uhr</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-primary" />
                <div>
                  <p className="font-medium">E-Mail</p>
                  <p className="font-mono text-sm">info@aquamagica.de</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Globe className="h-4 w-4 text-primary" />
                <div>
                  <p className="font-medium">Website</p>
                  <p className="font-mono text-sm">www.aquamagica.de</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Rechtliche Informationen */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Registereintrag */}
          <Card className="mb-4 py-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Registereintrag
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div>
                <p className="font-medium">Registergericht</p>
                <p className="text-sm">Amtsgericht Freiburg</p>
              </div>
              <div>
                <p className="font-medium">Registernummer</p>
                <p className="font-mono text-sm">HRB 789123</p>
              </div>
            </CardContent>
          </Card>

          {/* USt-ID */}
          <Card className="mb-4 py-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Scale className="h-5 w-5" />
                Umsatzsteuer-ID
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div>
                <p className="font-medium">USt-IdNr. gemäß § 27 a UStG</p>
                <p className="font-mono text-sm">DE345678912</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Weitere rechtliche Informationen */}
        <div className="space-y-6">
          {/* Aufsichtsbehörde */}
          <Card className="mb-6 py-6">
            <CardHeader>
              <CardTitle>Zuständige Aufsichtsbehörde</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-3">
                Da es sich bei unserer Einrichtung um einen genehmigungspflichtigen Betrieb handelt,
                unterstehen wir der Aufsicht durch:
              </p>
              <div className="space-y-1">
                <p>Gewerbeamt der Stadt Freiburg</p>
                <p>Fehrenbachallee 12</p>
                <p>79106 Freiburg im Breisgau</p>
              </div>
            </CardContent>
          </Card>

          {/* Redaktioneller Inhalt */}
          <Card className="mb-6 py-6">
            <CardHeader>
              <CardTitle>Verantwortlich für den redaktionellen Inhalt</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-3">
                Verantwortlich für journalistisch-redaktionelle Inhalte im Sinne von § 18 Abs. 2
                MStV:
              </p>
              <div className="space-y-1">
                <p>Herr Jonas Berg</p>
                <p>c/o AquaMagica Freiburg GmbH</p>
                <p>Bäderstraße 12</p>
                <p>79100 Freiburg im Breisgau</p>
              </div>
            </CardContent>
          </Card>

          {/* EU-Streitschlichtung */}
          <Card className="mb-6 py-6">
            <CardHeader>
              <CardTitle>EU-Streitschlichtung</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-3">
                Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS)
                bereit:
              </p>
              <a
                href="https://ec.europa.eu/consumers/odr"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline font-mono text-sm"
              >
                https://ec.europa.eu/consumers/odr
              </a>
              <p className="mt-3 text-sm text-muted-foreground">
                Unsere E-Mail-Adresse finden Sie oben im Impressum.
              </p>
            </CardContent>
          </Card>

          {/* Verbraucherstreitbeilegung */}
          <Card className="mb-6 py-6">
            <CardHeader>
              <CardTitle>Verbraucherstreitbeilegung / Universalschlichtungsstelle</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer
                Verbraucherschlichtungsstelle teilzunehmen.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
