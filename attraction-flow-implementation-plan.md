# Attraktions-Empfehlungsflow - Implementierungsplan

## Übersicht

Dieser Plan beschreibt die Implementierung eines interaktiven Gesprächsflows zur Attraktionsempfehlung für das AquaMagica Chatbot-System.

## Ziel

Benutzer sollen durch 4-5 gezielte Fragen zur perfekten Attraktion geleitet werden, basierend auf ihren Präferenzen für Aktivitätstyp, Intensität, Gruppentyp und weitere Wünsche.

## Flow-Design

```
Schritt 1: Aktivitätstyp
├── "entspannung" → Entspannende Aktivitäten
└── "action" → Actionreiche Aktivitäten

Schritt 2: Intensitätslevel
├── Entspannung: "ruhig" vs "gemäßigt entspannend"
└── Action: "aufregend" vs "extrem"

Schritt 3: Gruppentyp
├── "allein" → Einzelperson
├── "familie" → Familie mit Kindern
└── "gruppe" → Freundesgruppe

Schritt 4: Besondere Präferenzen
├── "schnell" → Kurze Aktivitäten
├── "lang" → Längere Erlebnisse
└── "flexibel" → Keine Präferenz

Schritt 5: Finale Empfehlung
└── Personalisierte Empfehlung basierend auf allen Antworten
```

## Implementierung in chatbot-config.json

### 1. Neues Topic hinzufügen

```json
{
  "topic_id": "attraction_recommendation_flow",
  "name": "Attraktions-Empfehlungsflow",
  "keywords": [
    "welche attraktion",
    "attraktion empfehlung",
    "was soll ich",
    "was passt zu mir",
    "attraktion für mich",
    "empfehlung",
    "auswahl hilfe",
    "attraktionsberater",
    "was würden sie empfehlen",
    "hilfe bei auswahl"
  ]
}
```

### 2. Entry Interaction (Flow-Start)

```json
{
  "interaction_id": "start_attraction_recommendation",
  "spotting_keywords": [
    "welche attraktion",
    "was soll ich",
    "empfehlung",
    "was passt zu mir",
    "attraktion für mich",
    "auswahl hilfe",
    "was würden sie empfehlen"
  ],
  "requires_clarification_if_too_general": false,
  "responses": [
    {
      "response_id": "attraction_flow_start",
      "text": "🎯 Perfekt! Ich helfe Ihnen gerne bei der Auswahl der idealen Attraktion! Mögen Sie eher entspannende Aktivitäten oder actionreiche Abenteuer? 🌊⚡\n\nAntworten Sie mit:\n• 'entspannung' für ruhige Erlebnisse\n• 'action' für aufregende Aktivitäten",
      "context_group_id": "attraction_flow_start_group",
      "suggested_follow_ups": ["entspannung", "action"]
    }
  ]
}
```

### 3. Contextual Interactions (Flow-Progression)

#### Schritt 1 → Schritt 2 (Intensitätslevel)

```json
{
  "interaction_id": "attraction_flow_step2_relaxation",
  "trigger_if_previous_group_ids_in_history": ["attraction_flow_start_group"],
  "spotting_keywords": ["entspannung", "ruhig", "entspannend", "relax"],
  "responses": [
    {
      "response_id": "attraction_intensity_relaxation",
      "text": "🧘‍♀️ Entspannung ist eine ausgezeichnete Wahl! Wie entspannend soll es sein?\n\n• 'sehr ruhig' - für pure Entspannung\n• 'gemäßigt' - für sanfte Aktivität mit Entspannung\n\nWas gefällt Ihnen besser?",
      "context_group_id": "attraction_flow_step1_relaxation_group"
    }
  ]
},
{
  "interaction_id": "attraction_flow_step2_action",
  "trigger_if_previous_group_ids_in_history": ["attraction_flow_start_group"],
  "spotting_keywords": ["action", "aufregend", "abenteuer", "nervenkitzel", "adrenali"],
  "responses": [
    {
      "response_id": "attraction_intensity_action",
      "text": "🚀 Action - das ist großartig! Wie viel Nervenkitzel darf es sein?\n\n• 'aufregend' - für spannende Erlebnisse\n• 'extrem' - für maximalen Adrenalinstoß\n\nWas ist Ihr Level?",
      "context_group_id": "attraction_flow_step1_action_group"
    }
  ]
}
```

#### Schritt 2 → Schritt 3 (Gruppentyp)

```json
{
  "interaction_id": "attraction_flow_step3_from_relaxation",
  "trigger_if_previous_group_ids_in_history": ["attraction_flow_step1_relaxation_group"],
  "spotting_keywords": ["sehr ruhig", "ruhig", "gemäßigt", "entspannt"],
  "responses": [
    {
      "response_id": "attraction_group_type_from_relaxation",
      "text": "👥 Verstehe! Sind Sie heute allein unterwegs oder in Begleitung?\n\n• 'allein' - für eine persönliche Auszeit\n• 'familie' - mit Partner/Familie\n• 'gruppe' - mit Freunden\n\nWer ist heute dabei?",
      "context_group_id": "attraction_flow_step2_relaxation_group"
    }
  ]
},
{
  "interaction_id": "attraction_flow_step3_from_action",
  "trigger_if_previous_group_ids_in_history": ["attraction_flow_step1_action_group"],
  "spotting_keywords": ["aufregend", "extrem", "nervenkitzel", "adrenali"],
  "responses": [
    {
      "response_id": "attraction_group_type_from_action",
      "text": "💪 Ausgezeichnet! Sind Sie allein oder mit anderen unterwegs?\n\n• 'allein' - für das persönliche Abenteuer\n• 'familie' - mit Familie/Partner\n• 'gruppe' - mit der Clique\n\nWer ist heute dabei?",
      "context_group_id": "attraction_flow_step2_action_group"
    }
  ]
}
```

#### Schritt 3 → Schritt 4 (Zeitpräferenz)

```json
{
  "interaction_id": "attraction_flow_step4",
  "trigger_if_previous_group_ids_in_history": [
    "attraction_flow_step2_relaxation_group",
    "attraction_flow_step2_action_group"
  ],
  "spotting_keywords": ["allein", "familie", "gruppe", "freunde", "partner"],
  "responses": [
    {
      "response_id": "attraction_time_preference",
      "text": "⏰ Fast geschafft! Eine letzte Frage: Haben Sie zeitliche Präferenzen?\n\n• 'schnell' - für kurze, intensive Erlebnisse\n• 'ausgiebig' - für längere Aktivitäten\n• 'flexibel' - Zeit spielt keine Rolle\n\nWie sieht es mit der Zeit aus?",
      "context_group_id": "attraction_flow_step3_group"
    }
  ]
}
```

#### Schritt 4 → Finale Empfehlung

```json
{
  "interaction_id": "attraction_flow_final_recommendation",
  "trigger_if_previous_group_ids_in_history": ["attraction_flow_step3_group"],
  "spotting_keywords": ["schnell", "ausgiebig", "flexibel", "egal", "keine präferenz"],
  "responses": [
    {
      "response_id": "attraction_recommendation_relaxation_alone",
      "text": "🎯 **Perfekte Empfehlung für Sie:** Die **Magische Flussfahrt**! 🛟\n\n✨ **Warum ideal:**\n• 300m pure Entspannung\n• Faszinierende Lichteffekte & beruhigende Klangwelten\n• Perfekt für eine persönliche Auszeit\n• Flexibel in der Dauer\n\n🌊 Lassen Sie sich treiben und genießen Sie die Ruhe! Möchten Sie noch andere Empfehlungen?",
      "applies_to_keywords": ["entspannung", "allein", "ruhig"],
      "context_group_id": "attraction_flow_complete_group"
    },
    {
      "response_id": "attraction_recommendation_action_alone",
      "text": "🎯 **Perfekte Empfehlung für Sie:** Die **Vulkan-Rutsche 'Inferno'**! 🌋\n\n⚡ **Warum ideal:**\n• Bis zu 45 km/h Geschwindigkeit\n• 4-fach-Tunnelrutsche mit Lichteffekten\n• Purer Adrenalinstoß\n• Schnelles, intensives Erlebnis\n\n🚀 Deutschlands einzige Rutsche dieser Art! Bereit für das Abenteuer?",
      "applies_to_keywords": ["action", "allein", "extrem"],
      "context_group_id": "attraction_flow_complete_group"
    },
    {
      "response_id": "attraction_recommendation_family",
      "text": "🎯 **Perfekte Empfehlung für die Familie:** **Tropica Island & Wellenbad**! 🏴‍☠️🌊\n\n👨‍👩‍👧‍👦 **Warum ideal:**\n• Kinderwelt mit Piratenschiff & Mini-Rutschen\n• Wellenbad mit 3m hohen Wellen für alle\n• Sichere Bereiche für jedes Alter\n• Stundenlanger Familienspaß\n\n🎢 Perfekte Mischung aus Spaß und Sicherheit! Interesse an weiteren Tipps?",
      "applies_to_keywords": ["familie", "kinder"],
      "context_group_id": "attraction_flow_complete_group"
    },
    {
      "response_id": "attraction_recommendation_group",
      "text": "🎯 **Perfekte Empfehlung für die Gruppe:** **Wellenbad 'Atlantica' + Vulkan-Rutsche**! 🌊⚡\n\n👥 **Warum ideal:**\n• Wellenbad für gemeinsamen Spaß\n• Vulkan-Rutsche für Mutproben\n• Polar-Lagune für Abkühlung\n• Verschiedene Intensitäten für jeden\n\n🎉 Perfekt für unvergessliche Gruppenerlebnisse! Noch Fragen zu den Attraktionen?",
      "applies_to_keywords": ["gruppe", "freunde"],
      "context_group_id": "attraction_flow_complete_group"
    }
  ]
}
```

## Fallback-Handling

### Flow-spezifische Fallbacks

```json
{
  "interaction_id": "attraction_flow_fallback",
  "trigger_if_previous_group_ids_in_history": [
    "attraction_flow_start_group",
    "attraction_flow_step1_relaxation_group",
    "attraction_flow_step1_action_group",
    "attraction_flow_step2_relaxation_group",
    "attraction_flow_step2_action_group",
    "attraction_flow_step3_group"
  ],
  "spotting_keywords": ["hilfe", "verstehe nicht", "andere frage", "abbrechen", "neu starten"],
  "responses": [
    {
      "response_id": "attraction_flow_help",
      "text": "🤔 Kein Problem! Lassen Sie mich Ihnen helfen:\n\n• Sagen Sie 'neustart' um von vorne zu beginnen\n• Oder stellen Sie eine andere Frage\n• Ich bin hier um zu helfen!\n\nWas möchten Sie tun?",
      "context_group_id": "attraction_flow_help_group"
    }
  ]
}
```

### Flow-Neustart

```json
{
  "interaction_id": "attraction_flow_restart",
  "trigger_if_previous_group_ids_in_history": [
    "attraction_flow_start_group",
    "attraction_flow_step1_relaxation_group", 
    "attraction_flow_step1_action_group",
    "attraction_flow_step2_relaxation_group",
    "attraction_flow_step2_action_group",
    "attraction_flow_step3_group",
    "attraction_flow_help_group"
  ],
  "spotting_keywords": ["neustart", "von vorne", "nochmal", "neu beginnen"],
  "responses": [
    {
      "response_id": "attraction_flow_restart_response",
      "text": "🔄 Perfekt! Starten wir nochmal von vorne.\n\n🎯 Welche Art von Erlebnis suchen Sie heute?\n\n• 'entspannung' für ruhige Momente\n• 'action' für aufregende Abenteuer\n\nWas darf es sein?",
      "context_group_id": "attraction_flow_start_group"
    }
  ]
}
```

## Erwartete User Experience

### Beispiel-Konversation 1 (Entspannung, allein)

```
User: "Welche Attraktion passt zu mir?"
Bot: "🎯 Perfekt! Ich helfe Ihnen gerne bei der Auswahl der idealen Attraktion! Mögen Sie eher entspannende Aktivitäten oder actionreiche Abenteuer? 🌊⚡

Antworten Sie mit:
• 'entspannung' für ruhige Erlebnisse  
• 'action' für aufregende Aktivitäten"

User: "entspannung"
Bot: "🧘‍♀️ Entspannung ist eine ausgezeichnete Wahl! Wie entspannend soll es sein?

• 'sehr ruhig' - für pure Entspannung
• 'gemäßigt' - für sanfte Aktivität mit Entspannung

Was gefällt Ihnen besser?"

User: "sehr ruhig"
Bot: "👥 Verstehe! Sind Sie heute allein unterwegs oder in Begleitung?

• 'allein' - für eine persönliche Auszeit
• 'familie' - mit Partner/Familie  
• 'gruppe' - mit Freunden

Wer ist heute dabei?"

User: "allein"
Bot: "⏰ Fast geschafft! Eine letzte Frage: Haben Sie zeitliche Präferenzen?

• 'schnell' - für kurze, intensive Erlebnisse
• 'ausgiebig' - für längere Aktivitäten
• 'flexibel' - Zeit spielt keine Rolle

Wie sieht es mit der Zeit aus?"

User: "flexibel"
Bot: "🎯 **Perfekte Empfehlung für Sie:** Die **Magische Flussfahrt**! 🛟

✨ **Warum ideal:**
• 300m pure Entspannung
• Faszinierende Lichteffekte & beruhigende Klangwelten  
• Perfekt für eine persönliche Auszeit
• Flexibel in der Dauer

🌊 Lassen Sie sich treiben und genießen Sie die Ruhe! Möchten Sie noch andere Empfehlungen?"
```

### Beispiel-Konversation 2 (Action, Gruppe)

```
User: "Was würden Sie mir empfehlen?"
Bot: [Flow-Start wie oben]

User: "action"
Bot: "🚀 Action - das ist großartig! Wie viel Nervenkitzel darf es sein?

• 'aufregend' - für spannende Erlebnisse
• 'extrem' - für maximalen Adrenalinstoß

Was ist Ihr Level?"

User: "extrem"
Bot: "💪 Ausgezeichnet! Sind Sie allein oder mit anderen unterwegs?

• 'allein' - für das persönliche Abenteuer
• 'familie' - mit Familie/Partner
• 'gruppe' - mit der Clique

Wer ist heute dabei?"

User: "gruppe"
Bot: [Zeitpräferenz-Frage]

User: "egal"
Bot: "🎯 **Perfekte Empfehlung für die Gruppe:** **Wellenbad 'Atlantica' + Vulkan-Rutsche**! 🌊⚡

👥 **Warum ideal:**
• Wellenbad für gemeinsamen Spaß
• Vulkan-Rutsche für Mutproben  
• Polar-Lagune für Abkühlung
• Verschiedene Intensitäten für jeden

🎉 Perfekt für unvergessliche Gruppenerlebnisse! Noch Fragen zu den Attraktionen?"
```

## Integration in bestehendes System

### 1. Kompatibilität mit vorhandenen Interactions

Der neue Flow nutzt das bestehende Context-System und ergänzt die vorhandenen Attraktions-Informationen, ohne sie zu ersetzen.

### 2. Priorität in der Response-Hierarchie

- Global Commands (höchste Priorität)
- **Attraction Flow Contextual Interactions (neu)**
- Normale Contextual Interactions  
- **Attraction Flow Entry Interactions (neu)**
- Normale Entry Interactions
- Fallbacks (niedrigste Priorität)

### 3. Keyword-Konflikte vermeiden

Die neuen Keywords sind spezifisch genug, um Konflikte mit bestehenden Interactions zu vermeiden:
- Bestehend: "attraktion", "rutsche", "wellenbad" 
- Neu: "welche attraktion", "was passt zu mir", "empfehlung"

## Testing & Validierung

### Test-Szenarien

1. **Happy Path**: Kompletter Flow durchlaufen
2. **Abbruch**: Flow mittendrin verlassen
3. **Neustart**: Flow neu starten
4. **Unverständliche Eingaben**: Fallback-Handling
5. **Keyword-Konflikte**: Normale Interactions weiterhin funktional

### Erfolgs-Kriterien

✅ Flow wird korrekt gestartet bei passenden Keywords  
✅ State-Progression funktioniert durch alle Schritte  
✅ Finale Empfehlungen sind kontextuell passend  
✅ Fallback-Handling funktioniert bei ungültigen Eingaben  
✅ Neustart-Funktion arbeitet korrekt  
✅ Bestehende Funktionalität bleibt unbeeinträchtigt  

## Nächste Schritte

1. **Code-Modus-Implementierung**: Diese Spezifikation an Code-Modus weiterleiten
2. **chatbot-config.json erweitern**: Neue Topic und Interactions hinzufügen  
3. **Testing**: Flows ausgiebig testen
4. **Preis-Flow**: Als nächstes den Pricing-Calculator-Flow implementieren
5. **Optimierung**: Basierend auf User-Feedback verfeinern

---

**Hinweis**: Dieser Plan ist bereit für die Implementierung im Code-Modus. Alle notwendigen JSON-Strukturen und Logik sind spezifiziert.