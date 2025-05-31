import type { BotResponse } from "@/types/chat";

const BOT_RESPONSES: Record<string, string[]> = {
  greeting: [
    "Hallo! Ich helfe gerne bei Fragen zu AquaMagica.",
    "Hi! Wie kann ich dir heute helfen?",
    "Willkommen! Was möchtest du über AquaMagica wissen?",
  ],
  preise: [
    "Informationen zu unseren Preisen findest du auf unserer Preise-Seite. Dort siehst du alle aktuellen Tarife und Angebote.",
    "Unsere Preise variieren je nach Saison und Angebot. Schau gerne auf der Preise-Seite vorbei für Details.",
  ],
  oeffnungszeiten: [
    "Unsere aktuellen Öffnungszeiten findest du auf der Kontakt-Seite.",
    "Die Öffnungszeiten können saisonal variieren. Alle Infos gibt es auf unserer Kontakt-Seite.",
  ],
  attraktionen: [
    "Wir haben viele spannende Attraktionen! Schau dir unsere Attraktionen-Seite an für alle Details.",
    "Von Rutschen bis zum Wellenbecken - auf der Attraktionen-Seite findest du alles über unser Angebot.",
  ],
  gastronomie: [
    "In unserem AquaBistro und der Piraten-Kantine gibt es leckere Speisen und Getränke.",
    "Für das leibliche Wohl ist gesorgt! Wir haben verschiedene gastronomische Angebote vor Ort.",
  ],
  kontakt: [
    "Du kannst uns über die Kontakt-Seite erreichen. Dort findest du alle Kontaktdaten.",
    "Für weitere Fragen nutze gerne unsere Kontakt-Seite oder ruf uns direkt an.",
  ],
  default: [
    "Das kann ich leider nicht beantworten. Bitte kontaktiere unser Team direkt über die Kontakt-Seite.",
    "Dafür wende dich am besten direkt an unser Team. Die Kontaktdaten findest du auf unserer Kontakt-Seite.",
    "Das ist eine spezielle Frage - unser Team hilft dir gerne weiter. Nutze die Kontakt-Seite für direkte Anfragen.",
  ],
};

function detectIntent(message: string): string {
  const lowerMessage = message.toLowerCase();

  if (
    lowerMessage.includes("hallo") ||
    lowerMessage.includes("hi") ||
    lowerMessage.includes("hey")
  ) {
    return "greeting";
  }
  if (
    lowerMessage.includes("preis") ||
    lowerMessage.includes("kosten") ||
    lowerMessage.includes("tarif")
  ) {
    return "preise";
  }
  if (
    lowerMessage.includes("öffnungszeit") ||
    lowerMessage.includes("geöffnet") ||
    lowerMessage.includes("uhrzeit")
  ) {
    return "oeffnungszeiten";
  }
  if (
    lowerMessage.includes("attraktion") ||
    lowerMessage.includes("rutsche") ||
    lowerMessage.includes("becken")
  ) {
    return "attraktionen";
  }
  if (
    lowerMessage.includes("essen") ||
    lowerMessage.includes("trinken") ||
    lowerMessage.includes("restaurant") ||
    lowerMessage.includes("bistro")
  ) {
    return "gastronomie";
  }
  if (
    lowerMessage.includes("kontakt") ||
    lowerMessage.includes("telefon") ||
    lowerMessage.includes("anruf")
  ) {
    return "kontakt";
  }

  return "default";
}

function getRandomResponse(responses: string[]): string {
  return responses[Math.floor(Math.random() * responses.length)];
}

export async function getBotResponse(userMessage: string): Promise<BotResponse> {
  // Log user message to console as requested
  console.log("User message:", userMessage);

  // Simulate thinking delay
  const delay = Math.random() * 1500 + 500; // 500ms to 2000ms

  return new Promise((resolve) => {
    setTimeout(() => {
      const intent = detectIntent(userMessage);
      const responses = BOT_RESPONSES[intent];
      const content = getRandomResponse(responses);

      resolve({
        content,
        delay,
      });
    }, delay);
  });
}

// Initial welcome message
export const WELCOME_MESSAGE = "Hallo, wie kann ich dir helfen?";
