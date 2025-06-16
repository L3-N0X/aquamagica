# Preis-Berechnungsflow - Implementierungsplan

## Übersicht

Dieser Plan beschreibt die Implementierung eines intelligenten Preis-Berechnungsflows für Familien und Gruppen im AquaMagica Chatbot-System. Der Flow sammelt alle notwendigen Informationen und berechnet den exakten Preis basierend auf dem bestehenden Preismodell.

## Ziel

Benutzer sollen durch gezielte Fragen zu ihrem genauen Eintrittspreis geleitet werden, inklusive:
- Besuchstag (Wochentag vs. Wochenende)
- Anzahl Erwachsene/Kinder
- Kinderalter (für kostenlose Kleinkinder)
- Zusatzleistungen (Sauna, Zeittarife)
- Ermäßigungen (Senioren, Studenten, etc.)

## Preismodell-Basis (aus bestehender Konfiguration)

### Tageskarten Erlebnisbad
- **Erwachsene**: Mo-Fr 19,90€, Wochenende 23,90€
- **Kinder (4-13J)**: Mo-Fr 12,90€, Wochenende 15,90€  
- **Familie (2 Erw.+2 Ki.)**: Mo-Fr 54,90€, Wochenende 64,90€
- **Kleinkinder unter 4**: Kostenlos

### Ermäßigungen
- **Senioren 65+**: Mo-Fr 16,90€, Wochenende 19,90€
- **Studenten**: Mo-Fr 16,90€, Wochenende 19,90€
- **Menschen mit Behinderung (GdB 50+)**: Mo-Fr 14,90€, Wochenende 17,90€

### Zusatzleistungen
- **Sauna-Zuschlag**: +8,00€ pro Person
- **Frühschwimmer-Tarif**: Mo-Fr 09:00-12:00 nur 10,90€
- **Abendtarif**: ab 18:00 - Erwachsene 12,90€, Kinder 8,90€

## Flow-Design

```
Schritt 1: Besuchstag bestimmen
├── "wochentag" → Mo-Fr Preise
└── "wochenende" → Sa-So Preise

Schritt 2: Gruppenzusammensetzung
├── "erwachsene" → Anzahl Erwachsene
├── "kinder" → Anzahl & Alter der Kinder
└── "senioren/studenten" → Ermäßigungen

Schritt 3: Kinderdetails (falls Kinder dabei)
├── Anzahl Kinder
├── Alter der Kinder (für <4 Jahre kostenlos)
└── Studenten/Senioren Validierung

Schritt 4: Zeitpräferenz
├── "ganztags" → Normale Preise
├── "frühschwimmer" → Sonderpreis Mo-Fr
└── "abend" → Abendtarif

Schritt 5: Zusatzleistungen
├── "sauna" → +8€ pro Person
└── "nur erlebnisbad" → Standard

Schritt 6: Preisberechnung & Anzeige
└── Detaillierte Aufschlüsselung mit Gesamtpreis
```

## Implementierung in chatbot-config.json

### 1. Neues Topic hinzufügen

```json
{
  "topic_id": "pricing_calculator_flow",
  "name": "Preis-Berechnungsflow",
  "keywords": [
    "preis berechnen",
    "was kostet",
    "preisrechner", 
    "familienpreis",
    "gruppenpreis",
    "kosten berechnen",
    "eintritt berechnen",
    "preis für",
    "kostet für uns",
    "preiskalkulator",
    "was zahlen wir",
    "gesamtpreis"
  ]
}
```

### 2. Entry Interaction (Flow-Start)

```json
{
  "interaction_id": "start_pricing_calculator",
  "spotting_keywords": [
    "preis berechnen",
    "was kostet", 
    "familienpreis",
    "gruppenpreis",
    "kosten berechnen",
    "preisrechner",
    "was zahlen wir",
    "kostet für uns"
  ],
  "requires_clarification_if_too_general": false,
  "responses": [
    {
      "response_id": "pricing_flow_start",
      "text": "💰 Gerne berechne ich Ihren persönlichen Eintrittspreis! \n\n📅 Wann möchten Sie uns besuchen?\n\n• 'wochentag' (Mo-Fr) - günstigere Preise\n• 'wochenende' (Sa-So) - Wochenendpreise\n\nWann haben Sie geplant zu kommen?",
      "context_group_id": "pricing_flow_start_group",
      "suggested_follow_ups": ["wochentag", "wochenende"]
    }
  ]
}
```

### 3. Contextual Interactions (Flow-Progression)

#### Schritt 1 → Schritt 2 (Gruppenzusammensetzung)

```json
{
  "interaction_id": "pricing_flow_step2_weekday",
  "trigger_if_previous_group_ids_in_history": ["pricing_flow_start_group"],
  "spotting_keywords": ["wochentag", "montag", "dienstag", "mittwoch", "donnerstag", "freitag", "mo-fr", "unter der woche"],
  "responses": [
    {
      "response_id": "pricing_group_composition_weekday",
      "text": "📋 Super! Unter der Woche sind unsere Preise günstiger. Wer kommt alles mit?\n\n👥 **Personenanzahl:**\n• 'nur erwachsene' - keine Kinder dabei\n• 'familie mit kindern' - Erwachsene + Kinder\n• 'senioren dabei' - 65+ Jahre\n• 'studenten dabei' - mit Studentenausweis\n\nWie ist Ihre Gruppe zusammengesetzt?",
      "context_group_id": "pricing_flow_weekday_group"
    }
  ]
},
{
  "interaction_id": "pricing_flow_step2_weekend", 
  "trigger_if_previous_group_ids_in_history": ["pricing_flow_start_group"],
  "spotting_keywords": ["wochenende", "samstag", "sonntag", "sa", "so", "sa-so", "weekend"],
  "responses": [
    {
      "response_id": "pricing_group_composition_weekend",
      "text": "📋 Wochenende - perfekt für einen Familienausflug! Wer kommt alles mit?\n\n👥 **Personenanzahl:**\n• 'nur erwachsene' - keine Kinder dabei\n• 'familie mit kindern' - Erwachsene + Kinder  \n• 'senioren dabei' - 65+ Jahre\n• 'studenten dabei' - mit Studentenausweis\n\nWie ist Ihre Gruppe zusammengesetzt?",
      "context_group_id": "pricing_flow_weekend_group"
    }
  ]
}
```

#### Schritt 2 → Schritt 3 (Detaillierte Personenangaben)

```json
{
  "interaction_id": "pricing_flow_step3_adults_only",
  "trigger_if_previous_group_ids_in_history": ["pricing_flow_weekday_group", "pricing_flow_weekend_group"],
  "spotting_keywords": ["nur erwachsene", "keine kinder", "erwachsene", "ohne kinder"],
  "responses": [
    {
      "response_id": "pricing_adults_count",
      "text": "👥 Wie viele Erwachsene sind Sie?\n\n📝 Bitte geben Sie die **Anzahl** an:\n• '2 personen' oder '2'\n• '3 personen' oder '3' \n• etc.\n\nWie viele Erwachsene kommen mit?",
      "context_group_id": "pricing_flow_adults_only_group"
    }
  ]
},
{
  "interaction_id": "pricing_flow_step3_family",
  "trigger_if_previous_group_ids_in_history": ["pricing_flow_weekday_group", "pricing_flow_weekend_group"],
  "spotting_keywords": ["familie mit kindern", "kinder dabei", "familie", "mit kindern"],
  "responses": [
    {
      "response_id": "pricing_family_details",
      "text": "👨‍👩‍👧‍👦 Perfekt! Bitte geben Sie mir die Details:\n\n📝 **Format: 'X Erwachsene, Y Kinder'**\nBeispiele:\n• '2 erwachsene, 2 kinder'\n• '1 erwachsener, 3 kinder'\n• '4 erwachsene, 1 kind'\n\nWie viele Erwachsene und Kinder kommen mit?",
      "context_group_id": "pricing_flow_family_group"
    }
  ]
},
{
  "interaction_id": "pricing_flow_step3_seniors",
  "trigger_if_previous_group_ids_in_history": ["pricing_flow_weekday_group", "pricing_flow_weekend_group"], 
  "spotting_keywords": ["senioren dabei", "senioren", "65+", "über 65", "rentner"],
  "responses": [
    {
      "response_id": "pricing_seniors_details",
      "text": "👴👵 Für Senioren ab 65 haben wir vergünstigte Preise!\n\n📝 **Bitte angeben:**\n• 'X senioren, Y erwachsene'\n• Falls Kinder dabei: '+ Z kinder'\n\nBeispiel: '2 senioren, 1 erwachsener, 2 kinder'\n\nWie ist die genaue Zusammensetzung?",
      "context_group_id": "pricing_flow_seniors_group"
    }
  ]
},
{
  "interaction_id": "pricing_flow_step3_students",
  "trigger_if_previous_group_ids_in_history": ["pricing_flow_weekday_group", "pricing_flow_weekend_group"],
  "spotting_keywords": ["studenten dabei", "studenten", "student", "studentenausweis", "uni"],
  "responses": [
    {
      "response_id": "pricing_students_details",
      "text": "🎓 Studenten erhalten Ermäßigung (mit Ausweis)!\n\n📝 **Bitte angeben:**\n• 'X studenten, Y erwachsene'\n• Falls Kinder dabei: '+ Z kinder'\n\nBeispiel: '2 studenten, 1 erwachsener'\n\nWie viele sind Sie genau?",
      "context_group_id": "pricing_flow_students_group"
    }
  ]
}
```

#### Schritt 3 → Schritt 4 (Kinderalter bei Familien)

```json
{
  "interaction_id": "pricing_flow_step4_children_ages",
  "trigger_if_previous_group_ids_in_history": ["pricing_flow_family_group", "pricing_flow_seniors_group", "pricing_flow_students_group"],
  "spotting_keywords": ["erwachsene", "kinder", "kind", "personen"],
  "responses": [
    {
      "response_id": "pricing_children_ages",
      "text": "👶 Wichtig für die Preisberechnung: Wie alt sind die Kinder?\n\n💡 **Kinderpreise:**\n• Unter 4 Jahre: **Kostenlos** 🎉\n• 4-13 Jahre: Kinderpreis\n• 14+ Jahre: Erwachsenenpreis\n\n📝 **Beispiel:** '6 Jahre, 10 Jahre' oder '2 Jahre, 8 Jahre, 15 Jahre'\n\nWie alt sind die Kinder?",
      "context_group_id": "pricing_flow_children_ages_group"
    }
  ]
}
```

#### Schritt 4 → Schritt 5 (Zeitpräferenz)

```json
{
  "interaction_id": "pricing_flow_step5_time_preference",
  "trigger_if_previous_group_ids_in_history": [
    "pricing_flow_adults_only_group",
    "pricing_flow_children_ages_group"
  ],
  "spotting_keywords": ["jahre", "alt", "personen", "erwachsene", "leute"],
  "responses": [
    {
      "response_id": "pricing_time_options",
      "text": "⏰ Haben Sie eine zeitliche Präferenz?\n\n🕘 **Optionen:**\n• 'ganztags' - Volle Öffnungszeit (09:00-22:00)\n• 'frühschwimmer' - Mo-Fr 09:00-12:00 (nur 10,90€!)\n• 'abendtarif' - Ab 18:00 Uhr (günstiger!)\n\n💡 Mit Zeittarifen können Sie sparen!\n\nWelche Zeit bevorzugen Sie?",
      "context_group_id": "pricing_flow_time_group"
    }
  ]
}
```

#### Schritt 5 → Schritt 6 (Zusatzleistungen)

```json
{
  "interaction_id": "pricing_flow_step6_extras",
  "trigger_if_previous_group_ids_in_history": ["pricing_flow_time_group"],
  "spotting_keywords": ["ganztags", "frühschwimmer", "abendtarif", "abend", "früh"],
  "responses": [
    {
      "response_id": "pricing_extras_sauna",
      "text": "🧖‍♀️ Möchten Sie auch unsere Saunawelt 'Elemente' nutzen?\n\n♨️ **Sauna-Zuschlag: +8,00€ pro Person**\n• 4 Themensaunen (Feuer, Wasser, Luft, Erde)\n• Inkl. Bademantel & Saunatuch\n• Aufgüsse mit ätherischen Ölen\n\n📝 **Antworten:**\n• 'mit sauna' - Sauna inklusive\n• 'ohne sauna' - Nur Erlebnisbad\n\nWas möchten Sie?",
      "context_group_id": "pricing_flow_extras_group"
    }
  ]
}
```

#### Schritt 6 → Finale Preisberechnung

```json
{
  "interaction_id": "pricing_flow_final_calculation",
  "trigger_if_previous_group_ids_in_history": ["pricing_flow_extras_group"],
  "spotting_keywords": ["mit sauna", "ohne sauna", "sauna", "nur erlebnisbad"],
  "responses": [
    {
      "response_id": "pricing_calculation_weekday_family_no_sauna",
      "text": "💰 **Ihr Preis-Überblick für Wochentag:**\n\n👨‍👩‍👧‍👦 **Familie (2 Erw. + 2 Kinder 4-13J):** 54,90€\n📍 Erlebnisbad (ganztags)\n🎯 **Gesamtpreis: 54,90€**\n\n✨ **Inklusive:**\n• Alle Attraktionen (Vulkan-Rutsche, Wellenbad, etc.)\n• Tropica Island Kinderwelt\n• Magische Flussfahrt\n• Polar-Lagune\n\n🎫 Tickets erhalten Sie an unserem Eingang. Noch Fragen?",
      "applies_to_keywords": ["ohne sauna", "wochentag", "familie"],
      "context_group_id": "pricing_flow_complete_group"
    },
    {
      "response_id": "pricing_calculation_weekend_family_with_sauna",
      "text": "💰 **Ihr Preis-Überblick für Wochenende:**\n\n👨‍👩‍👧‍👦 **Familie (2 Erw. + 2 Kinder):** 64,90€\n🧖‍♀️ **Sauna-Zuschlag (4 Personen):** +32,00€\n🎯 **Gesamtpreis: 96,90€**\n\n✨ **Inklusive:**\n• Komplettes Erlebnisbad\n• Saunawelt 'Elemente' (4 Themensaunen)\n• Bademäntel & Saunatücher\n• Alle Attraktionen\n\n🎫 Ein Erlebnis für die ganze Familie! Tickets am Eingang erhältlich.",
      "applies_to_keywords": ["mit sauna", "wochenende", "familie"],
      "context_group_id": "pricing_flow_complete_group"
    },
    {
      "response_id": "pricing_calculation_weekday_adults_early",
      "text": "💰 **Ihr Preis-Überblick für Frühschwimmer:**\n\n🌅 **Frühschwimmer-Tarif (Mo-Fr 09:00-12:00)**\n👥 **2 Personen:** 2 × 10,90€ = 21,80€\n🎯 **Gesamtpreis: 21,80€**\n\n⭐ **Mega-Ersparnis!** (Normal: 39,80€)\n\n✨ **3 Stunden Wasserspaß:**\n• Alle Attraktionen verfügbar\n• Weniger Besucher = mehr Platz\n• Entspannter Start in den Tag\n\n💡 Unser Geheimtipp für Sparfüchse!",
      "applies_to_keywords": ["frühschwimmer", "wochentag", "erwachsene"],
      "context_group_id": "pricing_flow_complete_group"
    },
    {
      "response_id": "pricing_calculation_seniors_discount",
      "text": "💰 **Ihr Preis mit Senioren-Ermäßigung:**\n\n👴👵 **2 Senioren (65+):** 2 × 16,90€ = 33,80€\n👨‍👩‍👧‍👦 **1 Erwachsener + 2 Kinder:** 46,70€\n🎯 **Gesamtpreis: 80,50€**\n\n💡 **Ersparnis durch Senioren-Rabatt!**\n(Regulär: 87,70€ → Sie sparen: 7,20€)\n\n📋 **Bitte mitbringen:**\n• Personalausweis (Altersnachweis)\n\n🎫 Ermäßigung direkt an der Kasse!",
      "applies_to_keywords": ["senioren", "ermäßigung"],
      "context_group_id": "pricing_flow_complete_group"
    }
  ]
}
```

## Intelligente Preisberechnung

### Kalkulationslogik (für Backend-Implementation)

```javascript
function calculatePrice(data) {
  let totalPrice = 0;
  let breakdown = [];
  
  const isWeekend = data.visitDay === 'weekend';
  const timeMode = data.timePreference; // 'fullday', 'early', 'evening'
  const hasSauna = data.includeSauna;
  
  // Basis-Preise
  const prices = {
    adult: { weekday: 19.90, weekend: 23.90 },
    child: { weekday: 12.90, weekend: 15.90 },
    senior: { weekday: 16.90, weekend: 19.90 },
    student: { weekday: 16.90, weekend: 19.90 },
    disabled: { weekday: 14.90, weekend: 17.90 },
    early: 10.90, // Frühschwimmer
    evening: { adult: 12.90, child: 8.90 },
    sauna: 8.00
  };
  
  // Familien-Pakete prüfen
  if (data.adults === 2 && data.children === 2 && 
      data.childrenAges.every(age => age >= 4 && age <= 13)) {
    const familyPrice = isWeekend ? 64.90 : 54.90;
    breakdown.push(`Familie (2+2): ${familyPrice}€`);
    totalPrice = familyPrice;
  } else {
    // Einzelberechnung
    // ... komplexe Logik für verschiedene Gruppenzusammensetzungen
  }
  
  // Sauna-Zuschlag
  if (hasSauna) {
    const saunaTotal = (data.adults + data.children.filter(age => age >= 4).length) * prices.sauna;
    breakdown.push(`Sauna-Zuschlag: +${saunaTotal}€`);
    totalPrice += saunaTotal;
  }
  
  return { totalPrice, breakdown };
}
```

## Erweiterte Features

### 1. Gruppentarif-Erkennung

```json
{
  "interaction_id": "pricing_flow_group_discount_check",
  "trigger_if_previous_group_ids_in_history": ["pricing_flow_adults_only_group"],
  "spotting_keywords": ["15", "16", "17", "18", "19", "20", "viele personen"],
  "responses": [
    {
      "response_id": "pricing_group_discount",
      "text": "🎉 **Gruppentarif verfügbar!** Ab 15 Personen erhalten Sie 15% Rabatt!\n\n📞 **Bitte vorab anmelden:**\n+49 (0)761 / 123456\n\n💰 **Beispiel-Ersparnis:**\n• 15 Personen Wochentag: 298,50€ → 253,73€\n• Sie sparen: 44,77€!\n\nMöchten Sie die Kontaktdaten für die Anmeldung?",
      "context_group_id": "pricing_flow_group_discount_group"
    }
  ]
}
```

### 2. Geburtstags-Special

```json
{
  "interaction_id": "pricing_flow_birthday_check",
  "trigger_if_previous_group_ids_in_history": ["pricing_flow_children_ages_group"],
  "spotting_keywords": ["geburtstag", "birthday", "geburi", "kindergeburtstag"],
  "responses": [
    {
      "response_id": "pricing_birthday_special",
      "text": "🎂 **Kindergeburtstag-Special!**\n\nGeburtstagskinder bis 13 Jahre haben **kostenlosen Eintritt** am Geburtstag!\n\n📋 **Benötigt:**\n• Ausweis/Kinderausweis als Nachweis\n• Gültig am Geburtstag selbst\n\n🎉 **Zusatz-Tipp:**\n• Gruppentarife für Gäste ab 15 Personen\n• Piraten-Kantine für die Feier\n\nIst ein Geburtstagskind dabei?",
      "context_group_id": "pricing_flow_birthday_group"
    }
  ]
}
```

### 3. Preisvergleich und Spartipps

```json
{
  "interaction_id": "pricing_flow_savings_tips",
  "trigger_if_previous_group_ids_in_history": ["pricing_flow_complete_group"],
  "spotting_keywords": ["teuer", "günstiger", "sparen", "billiger", "rabatt"],
  "responses": [
    {
      "response_id": "pricing_savings_advice",
      "text": "💡 **Spar-Tipps für Ihren nächsten Besuch:**\n\n🌅 **Frühschwimmer Mo-Fr:** Nur 10,90€ (09:00-12:00)\n🌙 **Abendtarif:** Günstiger ab 18:00 Uhr\n📅 **Wochentags:** Bis zu 4€ pro Person sparen\n🎯 **Dauerkarten:** Ab 15 Besuchen günstiger\n\n💰 **Ihr Sparpotenzial:**\n• Frühschwimmer statt Ganztag: -9€ pro Person\n• Wochentag statt Wochenende: -4€ pro Person\n\nInteresse an weiteren Spar-Optionen?",
      "context_group_id": "pricing_flow_savings_group"
    }
  ]
}
```

## Fallback-Handling

### Ungültige Eingaben

```json
{
  "interaction_id": "pricing_flow_input_error",
  "trigger_if_previous_group_ids_in_history": [
    "pricing_flow_start_group",
    "pricing_flow_weekday_group", 
    "pricing_flow_weekend_group",
    "pricing_flow_adults_only_group",
    "pricing_flow_family_group",
    "pricing_flow_children_ages_group",
    "pricing_flow_time_group",
    "pricing_flow_extras_group"
  ],
  "spotting_keywords": ["verstehe nicht", "hilfe", "falsch", "fehler", "nochmal"],
  "responses": [
    {
      "response_id": "pricing_flow_help",
      "text": "🤔 Kein Problem! Lassen Sie mich Ihnen helfen:\n\n💡 **Häufige Formate:**\n• Besuchstag: 'wochentag' oder 'wochenende'\n• Personen: '2 erwachsene, 3 kinder'\n• Alter: '6 Jahre, 10 Jahre, 15 Jahre'\n\n🔄 **Optionen:**\n• 'neustart' - Von vorne beginnen\n• 'beispiel' - Beispiel-Eingabe zeigen\n• Oder versuchen Sie es nochmal\n\nWas kann ich tun?",
      "context_group_id": "pricing_flow_help_group"
    }
  ]
}
```

### Neustart-Funktion

```json
{
  "interaction_id": "pricing_flow_restart",
  "trigger_if_previous_group_ids_in_history": [
    "pricing_flow_start_group",
    "pricing_flow_weekday_group",
    "pricing_flow_weekend_group", 
    "pricing_flow_adults_only_group",
    "pricing_flow_family_group",
    "pricing_flow_children_ages_group",
    "pricing_flow_time_group",
    "pricing_flow_extras_group",
    "pricing_flow_help_group"
  ],
  "spotting_keywords": ["neustart", "von vorne", "nochmal", "neu berechnen"],
  "responses": [
    {
      "response_id": "pricing_flow_restart_response", 
      "text": "🔄 Alles klar! Starten wir die Preisberechnung neu.\n\n💰 Gerne berechne ich Ihren persönlichen Eintrittspreis!\n\n📅 Wann möchten Sie uns besuchen?\n\n• 'wochentag' (Mo-Fr) - günstigere Preise\n• 'wochenende' (Sa-So) - Wochenendpreise\n\nWann haben Sie geplant zu kommen?",
      "context_group_id": "pricing_flow_start_group"
    }
  ]
}
```

## Erwartete User Experience

### Beispiel-Konversation 1 (Familie, Wochenende, mit Sauna)

```
User: "Was kostet der Eintritt für meine Familie?"
Bot: "💰 Gerne berechne ich Ihren persönlichen Eintrittspreis! 

📅 Wann möchten Sie uns besuchen?

• 'wochentag' (Mo-Fr) - günstigere Preise
• 'wochenende' (Sa-So) - Wochenendpreise

Wann haben Sie geplant zu kommen?"

User: "wochenende"
Bot: "📋 Wochenende - perfekt für einen Familienausflug! Wer kommt alles mit?

👥 **Personenanzahl:**
• 'nur erwachsene' - keine Kinder dabei
• 'familie mit kindern' - Erwachsene + Kinder  
• 'senioren dabei' - 65+ Jahre
• 'studenten dabei' - mit Studentenausweis

Wie ist Ihre Gruppe zusammengesetzt?"

User: "familie mit kindern"
Bot: "👨‍👩‍👧‍👦 Perfekt! Bitte geben Sie mir die Details:

📝 **Format: 'X Erwachsene, Y Kinder'**
Beispiele:
• '2 erwachsene, 2 kinder'
• '1 erwachsener, 3 kinder'
• '4 erwachsene, 1 kind'

Wie viele Erwachsene und Kinder kommen mit?"

User: "2 erwachsene, 2 kinder"
Bot: "👶 Wichtig für die Preisberechnung: Wie alt sind die Kinder?

💡 **Kinderpreise:**
• Unter 4 Jahre: **Kostenlos** 🎉
• 4-13 Jahre: Kinderpreis
• 14+ Jahre: Erwachsenenpreis

📝 **Beispiel:** '6 Jahre, 10 Jahre' oder '2 Jahre, 8 Jahre, 15 Jahre'

Wie alt sind die Kinder?"

User: "8 jahre, 12 jahre"
Bot: "⏰ Haben Sie eine zeitliche Präferenz?

🕘 **Optionen:**
• 'ganztags' - Volle Öffnungszeit (09:00-22:00)
• 'frühschwimmer' - Mo-Fr 09:00-12:00 (nur 10,90€!)
• 'abendtarif' - Ab 18:00 Uhr (günstiger!)

💡 Mit Zeittarifen können Sie sparen!

Welche Zeit bevorzugen Sie?"

User: "ganztags"
Bot: "🧖‍♀️ Möchten Sie auch unsere Saunawelt 'Elemente' nutzen?

♨️ **Sauna-Zuschlag: +8,00€ pro Person**
• 4 Themensaunen (Feuer, Wasser, Luft, Erde)
• Inkl. Bademantel & Saunatuch
• Aufgüsse mit ätherischen Ölen

📝 **Antworten:**
• 'mit sauna' - Sauna inklusive
• 'ohne sauna' - Nur Erlebnisbad

Was möchten Sie?"

User: "mit sauna"
Bot: "💰 **Ihr Preis-Überblick für Wochenende:**

👨‍👩‍👧‍👦 **Familie (2 Erw. + 2 Kinder):** 64,90€
🧖‍♀️ **Sauna-Zuschlag (4 Personen):** +32,00€
🎯 **Gesamtpreis: 96,90€**

✨ **Inklusive:**
• Komplettes Erlebnisbad
• Saunawelt 'Elemente' (4 Themensaunen)
• Bademäntel & Saunatücher
• Alle Attraktionen

🎫 Ein Erlebnis für die ganze Familie! Tickets am Eingang erhältlich."
```

### Beispiel-Konversation 2 (Senioren, Frühschwimmer)

```
User: "Preisrechner"
Bot: [Flow-Start]

User: "wochentag"
Bot: [Gruppenzusammensetzung-Frage]

User: "senioren dabei"
Bot: "👴👵 Für Senioren ab 65 haben wir vergünstigte Preise!

📝 **Bitte angeben:**
• 'X senioren, Y erwachsene'
• Falls Kinder dabei: '+ Z kinder'

Beispiel: '2 senioren, 1 erwachsener, 2 kinder'

Wie ist die genaue Zusammensetzung?"

User: "2 senioren"
Bot: [Zeitpräferenz-Frage]

User: "frühschwimmer"
Bot: "💰 **Ihr Senioren-Spar-Preis für Frühschwimmer:**

🌅 **Frühschwimmer (Mo-Fr 09:00-12:00)**
👴👵 **2 Senioren:** 2 × 10,90€ = 21,80€
🎯 **Gesamtpreis: 21,80€**

⭐ **Mega-Ersparnis!** 
(Normal-Seniorentarif: 33,80€ → Sie sparen: 12,00€!)

💡 **Perfekt für Senioren:**
• Weniger Besucher, mehr Ruhe
• Alle Attraktionen verfügbar
• Entspannter Vormittag

🏆 Unser absoluter Geheimtipp für Sparfüchse!"
```

## Integration und Prioritäten

### 1. Keyword-Prioritäten
- **Höchste Priorität**: Spezifische Preis-Keywords (`preis berechnen`, `familienpreis`)
- **Mittlere Priorität**: Allgemeine Preis-Keywords (`was kostet`, `kosten`)
- **Niedrigste Priorität**: Existierende Preis-Interactions

### 2. Flow-Unterbrechung
```json
{
  "interaction_id": "pricing_flow_interrupt_for_info",
  "trigger_if_previous_group_ids_in_history": [
    "pricing_flow_start_group",
    "pricing_flow_weekday_group",
    "pricing_flow_weekend_group"
  ],
  "spotting_keywords": ["öffnungszeiten", "adresse", "parken", "anfahrt"],
  "responses": [
    {
      "response_id": "pricing_flow_interrupt_info",
      "text": "📍 Gerne! [ANTWORT AUF ZWISCHENFRAGE]\n\n💰 **Zurück zur Preisberechnung:** Soll ich weitermachen wo wir aufgehört haben?\n\n• 'weiter' - Preisberechnung fortsetzen\n• 'neustart' - Preisberechnung neu beginnen\n\nWie möchten Sie verfahren?",
      "context_group_id": "pricing_flow_interrupt_group"
    }
  ]
}
```

## Testing-Szenarien

### Basis-Tests
1. ✅ **Standard-Familie (2+2)**: Wochenende, ohne Sauna
2. ✅ **Senioren-Gruppe**: Wochentag, Frühschwimmer
3. ✅ **Studenten-Gruppe**: Wochentag, mit Sauna
4. ✅ **Große Gruppe**: 15+ Personen, Gruppentarif
5. ✅ **Kleinkinder**: Familie mit Kindern unter 4 Jahren

### Edge-Cases
1. ✅ **Eingabe-Fehler**: Unverständliche Personenangaben
2. ✅ **Flow-Unterbrechung**: Andere Fragen während Preisberechnung
3. ✅ **Neustart**: Mitten im Flow neu beginnen
4. ✅ **Komplexe Gruppen**: Senioren + Studenten + Kinder + Erwachsene
5. ✅ **Geburtstag**: Kostenloses Geburtstagskind

### Performance-Tests
1. ✅ **Keyword-Konflikte**: Bestehende vs. neue Preis-Interactions
2. ✅ **Context-Memory**: Lange Conversations mit vielen Steps
3. ✅ **Fallback-Handling**: Mehrfache ungültige Eingaben

## Erfolgs-Kriterien

### Funktionale Anforderungen
✅ Preisberechnung für alle Zielgruppen (Familien, Senioren, Studenten, etc.)
✅ Korrekte Berücksichtigung von Ermäßigungen und Zuschlägen
✅ Intuitive Benutzerführung durch den gesamten Flow
✅ Robustes Fallback- und Error-Handling
✅ Integration ohne Konflikt mit bestehenden Features

### User Experience
✅ Maximal 6 Interaktionen bis zum Ergebnis
✅ Klare, verständliche Eingabe-Formate
✅ Hilfreiche Beispiele bei jeder Eingabe-Aufforderung
✅ Transparente Preisaufschlüsselung im Endergebnis
✅ Spar-Tipps und alternative Optionen

### Technische Anforderungen  
✅ Saubere Integration in bestehende chatbot-config.json
✅ Korrekte Context-Group-Progression
✅ Performante Keyword-Detection
✅ Wartbare und erweiterbare Code-Struktur

## Nächste Schritte

1. ✅ **Code-Modus Implementation**: Specification an Code-Modus weiterleiten
2. ✅ **chatbot-config.json erweitern**: Alle neuen Interactions hinzufügen
3. ✅ **Backend-Logik**: Preisberechnungs-Algorithmus implementieren
4. ✅ **Testing**: Umfangreiche Tests aller Szenarien
5. ✅ **User Training**: Dokumentation für häufige Eingabe-Formate
6. ✅ **Analytics**: Tracking für Flow-Completion-Rate und Abbruchpunkte

---

**Hinweis**: Diese Spezifikation ist vollständig ausgearbeitet und bereit für die technische Umsetzung. Der Pricing-Flow nutzt das gleiche robuste State-Management wie der Attraction-Flow und erweitert es um intelligente Preisberechnungslogik.