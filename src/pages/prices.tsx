import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Clock, Users, Sparkles, Ticket, Gift, Crown } from "lucide-react";

export function PricesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Preise & Angebote im AquaMagica</h1>
        <p className="text-xl text-muted-foreground mb-6">Ihr Ticket ins Vergnügen!</p>
        <div className="text-lg mb-8 max-w-3xl mx-auto">
          Finden Sie den passenden Tarif für Ihren unvergesslichen Tag in der Wasserwelt der Sinne.
          Wir empfehlen, Tickets online zu buchen, um Wartezeiten zu vermeiden und von unserem
          <Badge variant="secondary" className="mx-2">
            10% Online-Rabatt
          </Badge>
          zu profitieren!
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
            <Ticket className="mr-2 h-5 w-5" />
            Online Tickets buchen & Sparen
          </Button>
          <Button size="lg" variant="outline">
            <Gift className="mr-2 h-5 w-5" />
            Gutschein kaufen
          </Button>
        </div>
      </div>

      <Tabs defaultValue="day-tickets" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="day-tickets">Tageskarten</TabsTrigger>
          <TabsTrigger value="time-tickets">Zeittarife</TabsTrigger>
          <TabsTrigger value="sauna">Sauna</TabsTrigger>
          <TabsTrigger value="season-passes">Dauerkarten</TabsTrigger>
        </TabsList>

        {/* Day Tickets */}
        <TabsContent value="day-tickets" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-6 w-6 text-muted-foreground" />
                Tageskarten (Erlebnisbad)
              </CardTitle>
              <CardDescription>
                Gültig für den gesamten Innen- und Außenbereich (ohne Sauna)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[200px]">Kategorie</TableHead>
                      <TableHead>Mo – Fr</TableHead>
                      <TableHead>Wochenende & Feiertage</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Erwachsene</TableCell>
                      <TableCell className="text-lg font-semibold">19,90 €</TableCell>
                      <TableCell className="text-lg font-semibold">23,90 €</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Kinder (4 – 13 J.)</TableCell>
                      <TableCell className="text-lg font-semibold">12,90 €</TableCell>
                      <TableCell className="text-lg font-semibold">15,90 €</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Kleinkinder (&lt; 4 J.)</TableCell>
                      <TableCell className="text-lg font-semibold">kostenlos</TableCell>
                      <TableCell className="text-lg font-semibold">kostenlos</TableCell>
                    </TableRow>
                    <TableRow className="bg-muted/50">
                      <TableCell className="font-medium">
                        Familie (2 Erw. + 2 Ki.)
                        <Badge variant="secondary" className="ml-2">
                          Familienangebot
                        </Badge>
                      </TableCell>
                      <TableCell className="text-lg font-semibold">54,90 €</TableCell>
                      <TableCell className="text-lg font-semibold">64,90 €</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Senioren (ab 65 J.)</TableCell>
                      <TableCell className="text-lg font-semibold">16,90 €</TableCell>
                      <TableCell className="text-lg font-semibold">19,90 €</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Studierende (mit Ausweis)</TableCell>
                      <TableCell className="text-lg font-semibold">16,90 €</TableCell>
                      <TableCell className="text-lg font-semibold">19,90 €</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">
                        Menschen mit Behinderung (ab GdB 50)
                      </TableCell>
                      <TableCell className="text-lg font-semibold">14,90 €</TableCell>
                      <TableCell className="text-lg font-semibold">17,90 €</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">
                        Begleitperson (bei Merkzeichen B)
                      </TableCell>
                      <TableCell className="text-lg font-semibold">kostenlos</TableCell>
                      <TableCell className="text-lg font-semibold">kostenlos</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Time-based Tickets */}
        <TabsContent value="time-tickets" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-6 w-6 text-muted-foreground" />
                  Abendtarif
                </CardTitle>
                <CardDescription>Täglich ab 18:00 Uhr</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Erwachsene:</span>
                    <span className="text-xl font-bold">12,90 €</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Kinder (4 – 13 J.):</span>
                    <span className="text-xl font-bold">8,90 €</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-6 w-6 text-muted-foreground" />
                  Frühschwimmer-Tarif
                </CardTitle>
                <CardDescription>Mo – Fr, 09:00 – 12:00 Uhr (außer Feiertage)</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Einheitspreis:</span>
                    <span className="text-xl font-bold">10,90 €</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Gültigkeit: 3 Stunden</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Sauna */}
        <TabsContent value="sauna" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">🧖‍♀️ Saunawelt „Elemente"</CardTitle>
              <CardDescription>
                Genießen Sie unsere vier Themensaunen. Inklusive Leih-Bademantel & einem Saunatuch
                für den Tag.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold text-lg">Zusatz zum Erlebnisbad-Tarif</h4>
                  <div className="flex justify-between items-center p-4 bg-muted/50 rounded-lg">
                    <span className="font-medium">Pro Person:</span>
                    <span className="text-2xl font-bold">+ 8,00 €</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold text-lg">Reine Saunanutzung</h4>
                  <div className="flex justify-between items-center p-4 bg-muted/50 rounded-lg">
                    <span className="font-medium">Tageskarte:</span>
                    <span className="text-2xl font-bold">24,90 €</span>
                  </div>
                </div>
              </div>

              <Separator className="my-6" />

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="border-2 border-muted">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl mb-2">🔥</div>
                    <h5 className="font-semibold">Feuer-Sauna</h5>
                    <p className="text-sm text-muted-foreground">Finnische Sauna, 90°C</p>
                  </CardContent>
                </Card>

                <Card className="border-2 border-muted">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl mb-2">💧</div>
                    <h5 className="font-semibold">Wasser-Sauna</h5>
                    <p className="text-sm text-muted-foreground">Dampfbad, 45°C</p>
                  </CardContent>
                </Card>

                <Card className="border-2 border-muted">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl mb-2">💨</div>
                    <h5 className="font-semibold">Luft-Sauna</h5>
                    <p className="text-sm text-muted-foreground">Bio-Sauna, 60°C</p>
                  </CardContent>
                </Card>

                <Card className="border-2 border-muted">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl mb-2">🌍</div>
                    <h5 className="font-semibold">Erde-Sauna</h5>
                    <p className="text-sm text-muted-foreground">Außenbereich, 80°C</p>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Season Passes */}
        <TabsContent value="season-passes" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Crown className="h-6 w-6 text-muted-foreground" />
                Dauerkarten (Gültigkeit 12 Monate)
              </CardTitle>
              <CardDescription>
                Unbegrenzter Eintritt ins Erlebnisbad. Die Saunanutzung kann optional hinzugebucht
                werden.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[200px]">Kategorie</TableHead>
                      <TableHead>Erlebnisbad Pur</TableHead>
                      <TableHead>Erlebnisbad + Sauna</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Einzelkarte Erwachsene</TableCell>
                      <TableCell className="text-lg font-semibold">299,00 €</TableCell>
                      <TableCell className="text-lg font-semibold">399,00 €</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Einzelkarte Kind (4-13J)</TableCell>
                      <TableCell className="text-lg font-semibold">199,00 €</TableCell>
                      <TableCell className="text-muted-foreground">Nicht verfügbar</TableCell>
                    </TableRow>
                    <TableRow className="bg-muted/50">
                      <TableCell className="font-medium">
                        Familienkarte (2 Erw. + bis zu 3 eigene Ki.)
                        <Badge variant="secondary" className="ml-2">
                          Beste Wahl
                        </Badge>
                      </TableCell>
                      <TableCell className="text-lg font-semibold">649,00 €</TableCell>
                      <TableCell className="text-lg font-semibold">849,00 €</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Additional Offers */}
      <div className="mt-12">
        <h2 className="text-3xl font-bold text-center mb-8">Weitere Angebote</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="border-2 border-muted">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-6 w-6" />
                Gruppentarife
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Ab 15 zahlenden Personen gewähren wir 15% Rabatt auf die regulären
                Tageskartenpreise.
              </p>
              <Badge variant="outline" className="w-full justify-center p-2">
                Telefonische Anmeldung erforderlich
              </Badge>
            </CardContent>
          </Card>

          <Card className="border-2 border-muted">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">🎂 Geburtstagskinder</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Freier Eintritt ins Erlebnisbad am Tag ihres Geburtstags (bis 13 Jahre).
              </p>
              <Badge variant="outline" className="w-full justify-center p-2">
                Ausweisvorlage erforderlich
              </Badge>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Footer Note */}
      <div className="mt-12 p-6 bg-muted rounded-lg text-center">
        <p className="text-sm text-muted-foreground">
          <strong>Hinweis:</strong> Alle Preise inkl. MwSt. Änderungen und Irrtümer vorbehalten.
        </p>
      </div>
    </div>
  );
}
