import { Phone, MapPin, Car, Bus, Bike } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";

export function ContactPage() {
  return (
    <div className="w-full space-y-12 px-4 md:px-8 max-w-7xl mx-auto pt-8">
      {/* Hero Section */}
      <section>
        <h1 className="text-4xl font-bold mb-4">Hilfe & Kontakt</h1>
        <p className="text-xl text-muted-foreground mb-8">
          Wir sind für Sie da! Hier finden Sie Antworten auf häufig gestellte Fragen und unsere
          Kontaktdaten.
        </p>
        <Separator className="my-6" />
      </section>

      {/* FAQ Section */}
      <section>
        <h2 className="text-3xl font-bold mb-6">Häufig gestellte Fragen (FAQ)</h2>
        <div className="mb-8">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>Gibt es kostenlose Parkplätze?</AccordionTrigger>
              <AccordionContent>
                Ja, direkt am AquaMagica stehen Ihnen über 300 kostenfreie Parkplätze zur Verfügung,
                darunter auch ausgewiesene Behindertenparkplätze und Familienparkplätze.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
              <AccordionTrigger>Darf ich eigene Speisen und Getränke mitbringen?</AccordionTrigger>
              <AccordionContent>
                Das Mitbringen von eigenen Speisen und Getränken in den Bade- und Gastronomiebereich
                ist aus hygienischen Gründen nicht gestattet. Es gibt jedoch ausgewiesene
                Picknickbereiche im Außenbereich (saisonal geöffnet), wo Sie gerne Ihre
                mitgebrachten Snacks verzehren können. Für Babynahrung machen wir selbstverständlich
                eine Ausnahme.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
              <AccordionTrigger>Muss ich Tickets vorab online reservieren?</AccordionTrigger>
              <AccordionContent>
                Eine Online-Reservierung wird dringend empfohlen, besonders an Wochenenden,
                Feiertagen und in den Ferienzeiten, um Wartezeiten zu vermeiden und sich den
                Eintritt zu sichern. Zudem profitieren Sie von einem Online-Rabatt von 10% auf
                Tageskarten.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4">
              <AccordionTrigger>Ist das AquaMagica barrierefrei zugänglich?</AccordionTrigger>
              <AccordionContent>
                Ja, das gesamte Erlebnisbad ist weitestgehend barrierefrei gestaltet und
                rollstuhlgeeignet. Es gibt barrierefreie Umkleiden, Duschen und WCs. Unsere
                Mitarbeiter helfen Ihnen gerne weiter. Bei Fragen zur Zugänglichkeit spezieller
                Attraktionen kontaktieren Sie uns bitte vorab.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5">
              <AccordionTrigger>
                Gibt es einen Verleih für Handtücher oder Bademäntel?
              </AccordionTrigger>
              <AccordionContent>
                Ja, an der Eingangskasse können Sie gegen eine Gebühr Handtücher (4,- € Leihgebühr +
                10,- € Pfand) und Bademäntel (7,- € Leihgebühr + 20,- € Pfand) ausleihen. Bei
                Buchung des Sauna-Zusatzes sind ein Leih-Bademantel und ein Saunatuch bereits
                inklusive.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-6">
              <AccordionTrigger>
                Was passiert, wenn ich mein digitales Armband verliere?
              </AccordionTrigger>
              <AccordionContent>
                Bitte melden Sie einen Verlust umgehend unserem Personal an der Kasse oder dem
                Bademeister. Gegen eine Gebühr von 5,- € erhalten Sie ein Ersatzarmband. Eventuell
                auf dem Armband gebuchte Leistungen können nach Prüfung übertragen werden.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-7">
              <AccordionTrigger>Gibt es WLAN im AquaMagica?</AccordionTrigger>
              <AccordionContent>
                Ja, im gesamten Eingangsbereich und in unseren Gastronomiebereichen steht Ihnen
                kostenfreies WLAN zur Verfügung.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* Contact Information Section */}
      <section>
        <h2 className="text-3xl font-bold mb-6">So erreichen Sie uns</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card className="flex flex-col h-full py-4">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Phone className="h-5 w-5 text-primary" />
                Telefonisch
              </CardTitle>
              <CardDescription>Mo-Fr 09:00-17:00 Uhr</CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <p className="text-3xl font-bold text-primary mb-4">+49 (0)761 / 123456</p>
              <p className="text-sm text-muted-foreground">
                Unser freundliches Service-Team steht Ihnen für alle Fragen rund um Ihren Besuch zur
                Verfügung.
              </p>
              <Button className="mt-4" variant="outline" size="lg">
                <Phone className="mr-2 h-4 w-4" /> Jetzt anrufen
              </Button>
            </CardContent>
          </Card>

          <Card className="flex flex-col h-full py-4">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-primary" />
                Anschrift
              </CardTitle>
              <CardDescription>Besuchen Sie uns</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 pt-2">
              <address className="not-italic mb-4">
                <p className="font-semibold">AquaMagica – Die Wasserwelt der Sinne</p>
                <p>Bäderstraße 12</p>
                <p>79100 Freiburg im Breisgau</p>
                <p>Deutschland</p>
              </address>
              <p className="text-sm text-muted-foreground">
                E-Mail:{" "}
                <a href="mailto:info@aquamagica.de" className="text-primary hover:underline">
                  info@aquamagica.de
                </a>
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Location & Transportation Section */}
      <section>
        <h2 className="text-3xl font-bold mb-6">Anfahrt</h2>
        <Tabs defaultValue="car" className="">
          <TabsList className="mb-4">
            <TabsTrigger value="car" className="flex items-center">
              <Car className="mr-2 h-4 w-4" /> Auto
            </TabsTrigger>
            <TabsTrigger value="public" className="flex items-center">
              <Bus className="mr-2 h-4 w-4" /> ÖPNV
            </TabsTrigger>
            <TabsTrigger value="bike" className="flex items-center">
              <Bike className="mr-2 h-4 w-4" /> Fahrrad
            </TabsTrigger>
          </TabsList>

          <TabsContent value="car" className="p-4 border rounded-md">
            <h3 className="font-medium mb-2">Anfahrt mit dem Auto</h3>
            <p>
              A5 Ausfahrt Freiburg-Mitte, dann B31 Richtung Freiburg-Zentrum, Ausfahrt Bäderstraße.
            </p>
            <h3 className="font-medium mt-3 mb-2">Parken</h3>
            <p>
              Über 300 kostenlose Parkplätze direkt am AquaMagica, inklusive Behindertenparkplätzen
              und Familienparkplätzen.
            </p>
            <p className="mt-2">E-Ladestationen für Elektroautos sind ebenfalls vorhanden.</p>
          </TabsContent>

          <TabsContent value="public" className="p-4 border rounded-md">
            <h3 className="font-medium mb-2">Mit öffentlichen Verkehrsmitteln</h3>
            <p>Tramlinie 5 bis Haltestelle „Bäderstraße", von dort ca. 5 Minuten Fußweg.</p>
          </TabsContent>

          <TabsContent value="bike" className="p-4 border rounded-md">
            <h3 className="font-medium mb-2">Mit dem Fahrrad</h3>
            <p>Fahrradständer direkt am Eingang vorhanden.</p>
          </TabsContent>
        </Tabs>
      </section>

      {/* Opening Hours Section */}
      <section className="mb-8">
        <h2 className="text-3xl font-bold mb-6">Öffnungszeiten</h2>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[200px]">Bereich</TableHead>
                <TableHead>Öffnungszeiten</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">Erlebnisbad</TableCell>
                <TableCell>Täglich 09:00 – 22:00 Uhr</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Saunawelt</TableCell>
                <TableCell>Täglich 10:00 – 22:00 Uhr</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Nachtschwimmen</TableCell>
                <TableCell>Freitags bis 24:00 Uhr</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        <p className="mt-4 text-sm text-muted-foreground">
          Sonderöffnungszeiten an Feiertagen entnehmen Sie bitte unseren aktuellen Hinweisen auf der
          Startseite.
        </p>
      </section>

      {/* Call to Action */}
      <section className="text-center mb-16">
        <div className="max-w-3xl mx-auto bg-primary/10 p-8 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Wir freuen uns auf Ihren Besuch!</h2>
          <p className="mb-6">
            Tauchen Sie ein in die Welt des AquaMagica und erleben Sie unvergessliche Momente.
          </p>
          <Button size="lg" asChild>
            <a href="tel:+4976123456">
              <Phone className="mr-2 h-4 w-4" /> +49 (0)761 / 123456
            </a>
          </Button>
        </div>
      </section>
    </div>
  );
}
