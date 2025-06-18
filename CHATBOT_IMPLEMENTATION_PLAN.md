# AquaMagica Word Spotting Chatbot - Implementation Plan

## Overview

This document provides a detailed implementation plan for a simple, JSON-configurable word-spotting chatbot for the AquaMagica website. The system supports both simple keyword responses and complex multi-step conversation flows.

## Architecture

### System Components

```mermaid
graph TD
    A[Frontend Chat UI] --> B[Chat API Client]
    B --> C[/api/chat endpoint]
    C --> D[Word Spotting Engine]
    D --> E[Config Manager]
    E --> F[chatbot-config.json]
    D --> G[Flow State Parser]
    G --> H[Chat History]
    D --> I[Response Generator]
    I --> J[Chat API Response]
    J --> A
```

### Core Principles

1. **Stateless Backend**: All conversation state is derived from chat history
2. **JSON Configuration**: All responses and flows defined in `chatbot-config.json`
3. **Simple Word Spotting**: Basic keyword matching for instant responses
4. **Flow-Based Conversations**: Multi-step interactions with state management
5. **No Code Changes**: New flows and responses added via JSON only

## JSON Configuration Structure

### File: `chatbot-config.json`

```json
{
  "version": "1.0.0",
  "defaultResponses": {
    "greeting": [
      "Hallo! Wie kann ich dir bei AquaMagica helfen?",
      "Hi! Schön, dass du da bist. Was möchtest du wissen?",
      "Willkommen bei AquaMagica! Wie kann ich dir behilflich sein?",
      "Hey! Lass mich dir bei deinen Fragen helfen."
    ],
    "unknown": [
      "Entschuldigung, das habe ich nicht verstanden. Kannst du deine Frage anders formulieren?",
      "Das verstehe ich leider nicht. Könntest du es nochmal versuchen?",
      "Hmm, da bin ich überfragt. Kannst du mir das anders erklären?",
      "Tut mir leid, damit kann ich dir nicht helfen. Probier es anders."
    ],
    "flowInterrupted": [
      "Du befindest dich gerade in einem Gespräch. Beende dieses zuerst oder sage 'abbrechen'.",
      "Wir sind noch mitten in einem Gespräch. Sag 'abbrechen' um neu zu starten.",
      "Lass uns erst unser aktuelles Thema beenden. Sage 'abbrechen' zum Stoppen."
    ],
    "flowCancelled": [
      "Gespräch beendet. Wie kann ich dir sonst helfen?",
      "Ok, Gespräch abgebrochen. Was möchtest du sonst wissen?",
      "Kein Problem! Womit kann ich dir stattdessen helfen?",
      "Alles klar. Was gibt es denn sonst für Fragen?"
    ]
  },
  "simpleKeywords": {
    "hallo": ["greeting"],
    "hi": ["greeting"],
    "hilfe": "Ich kann dir bei Fragen zu Preisen, Attraktionen, Öffnungszeiten und Einrichtungen helfen.",
    "öffnungszeiten": "Wir haben täglich von 9:00 bis 22:00 Uhr geöffnet.",
    "adresse": "AquaMagica, Musterstraße 123, 12345 Musterstadt",
    "telefon": "Telefon: +49 123 456789",
    "abbrechen": "flow_cancel",
    "stopp": "flow_cancel",
    "ende": "flow_cancel"
  },
  "flows": {
    "empfehlen": {
      "startKeywords": ["empfehlen", "empfehlung", "attraktion", "aktivität"],
      "name": "Attraktions-Empfehlung",
      "states": {
        "start": {
          "message": "Gerne helfe ich dir bei der Auswahl! Magst du eher ruhige oder aufregende Attraktionen?",
          "expectedKeywords": {
            "ruhig": "calm_activities",
            "aufregend": "exciting_activities",
            "entspannung": "calm_activities",
            "entspannen": "calm_activities",
            "action": "exciting_activities",
            "abenteuer": "exciting_activities"
          },
          "fallback": "Bitte antworte mit 'ruhig' oder 'aufregend'."
        },
        "calm_activities": {
          "message": "Perfekt! Bevorzugst du Wasser oder trockene Entspannung?",
          "expectedKeywords": {
            "wasser": "calm_water",
            "trocken": "calm_dry",
            "pool": "calm_water",
            "schwimmen": "calm_water",
            "sauna": "calm_dry",
            "wellness": "calm_dry"
          },
          "fallback": "Bitte wähle 'Wasser' oder 'trocken'."
        },
        "exciting_activities": {
          "message": "Super! Magst du hohe Rutschen oder lieber Wasserspiele?",
          "expectedKeywords": {
            "rutschen": "slides",
            "wasserspiele": "water_games",
            "hoch": "slides",
            "rutsche": "slides",
            "spiele": "water_games",
            "kinder": "water_games"
          },
          "fallback": "Bitte wähle 'Rutschen' oder 'Wasserspiele'."
        },
        "calm_water": {
          "message": "Ich empfehle dir das Strömungsbecken oder das warme Außenbecken. Beide sind perfekt zum Entspannen! 🏊‍♀️",
          "isEnd": true
        },
        "calm_dry": {
          "message": "Die Sauna-Lounge oder unser Aqua-Yoga sind ideal für dich! 🧘‍♀️",
          "isEnd": true
        },
        "slides": {
          "message": "Die große Halfpipe-Rutsche und die Krokodilrutsche werden dir gefallen! 🛝",
          "isEnd": true
        },
        "water_games": {
          "message": "Der Kinderbereich mit Kletterturm und Wasserfällen ist perfekt für Wasserspiele! 🌊",
          "isEnd": true
        }
      }
    },
    "preise": {
      "startKeywords": ["preis", "kosten", "tarif", "eintritt", "ticket"],
      "name": "Preis-Information",
      "states": {
        "start": {
          "message": "Für welche Preise interessierst du dich? Wochenende, Frühschwimmer oder reguläre Preise?",
          "expectedKeywords": {
            "wochenende": "weekend_prices",
            "frühschwimmer": "early_prices",
            "früh": "early_prices",
            "morgen": "early_prices",
            "regulär": "regular_prices",
            "normal": "regular_prices",
            "woche": "regular_prices"
          },
          "fallback": "Bitte wähle 'Wochenende', 'Frühschwimmer' oder 'regulär'."
        },
        "weekend_prices": {
          "message": "🎫 **Wochenend-Tarife:**\n• Erwachsene: 16€\n• Kinder (4-14): 12€\n• Familienkarte: 45€\n\nGültig Sa-So und Feiertage.",
          "isEnd": true
        },
        "early_prices": {
          "message": "🌅 **Frühschwimmer-Tarife (6:00-9:00):**\n• Erwachsene: 8€\n• Kinder: 5€\n\nPerfekt für den ruhigen Start in den Tag!",
          "isEnd": true
        },
        "regular_prices": {
          "message": "💰 **Reguläre Tarife (Mo-Fr):**\n• Erwachsene: 12€\n• Kinder (4-14): 8€\n• Familienkarte: 35€\n\nBeste Preise unter der Woche!",
          "isEnd": true
        }
      }
    }
  }
}
```

## Backend Implementation

### File: `services/chat-api-service.ts`

```typescript
import type { ChatApiResponse, ChatHistoryItem, BotResponse } from "../types/chat";
import { readFile } from "fs/promises";
import { join } from "path";

interface BotConfig {
  version: string;
  defaultResponses: Record<string, string[]>;
  simpleKeywords: Record<string, string | string[]>;
  flows: Record<string, FlowDefinition>;
}

interface FlowDefinition {
  startKeywords: string[];
  name: string;
  states: Record<string, FlowStateConfig>;
}

interface FlowStateConfig {
  message: string;
  expectedKeywords?: Record<string, string>;
  fallback?: string;
  isEnd?: boolean;
}

interface FlowState {
  flowId: string;
  currentState: string;
  startedAt: Date;
}

class WordSpottingBot {
  private config: BotConfig | null = null;
  private configPath = join(process.cwd(), "chatbot-config.json");

  /**
   * Load configuration from JSON file
   */
  private async loadConfig(): Promise<BotConfig> {
    if (!this.config) {
      try {
        const configData = await readFile(this.configPath, "utf-8");
        this.config = JSON.parse(configData);
      } catch (error) {
        console.error("Failed to load chatbot config:", error);
        // Fallback configuration
        this.config = {
          version: "1.0.0",
          defaultResponses: {
            greeting: ["Hallo! Wie kann ich dir helfen?"],
            unknown: ["Das habe ich nicht verstanden."],
            flowInterrupted: ["Du befindest dich gerade in einem Gespräch."],
            flowCancelled: ["Gespräch beendet."]
          },
          simpleKeywords: {},
          flows: {}
        };
      }
    }
    return this.config;
  }

  /**
   * Main entry point for processing user messages
   */
  async processMessage(message: string, chatHistory: ChatHistoryItem[]): Promise<ChatApiResponse> {
    try {
      await this.loadConfig();
      
      const userMessage = message.trim().toLowerCase();
      
      // 1. Check for flow cancellation
      if (this.isFlowCancellation(userMessage)) {
        return this.handleFlowCancellation();
      }
      
      // 2. Check for active flow
      const currentFlow = this.extractCurrentFlow(chatHistory);
      if (currentFlow) {
        return await this.continueFlow(currentFlow, userMessage);
      }
      
      // 3. Check for new flow triggers
      const newFlowId = this.detectNewFlow(userMessage);
      if (newFlowId) {
        return this.startFlow(newFlowId);
      }
      
      // 4. Handle simple keywords
      return this.handleSimpleKeywords(userMessage);
      
    } catch (error) {
      console.error("Error processing message:", error);
      return {
        success: false,
        error: {
          code: "PROCESSING_ERROR",
          message: "Failed to process your message"
        }
      };
    }
  }

  /**
   * Extract current flow state from chat history
   */
  private extractCurrentFlow(chatHistory: ChatHistoryItem[]): FlowState | null {
    // Look for flow markers in recent bot messages (reverse order)
    for (let i = chatHistory.length - 1; i >= 0; i--) {
      const item = chatHistory[i];
      if (item.type === "bot") {
        const flowMatch = item.content.match(/\[FLOW_(START|CONTINUE):([^:]+):([^\]]+)\]/);
        if (flowMatch) {
          const [, action, flowId, state] = flowMatch;
          return {
            flowId,
            currentState: state,
            startedAt: item.timestamp
          };
        }
        
        // Check for flow end marker
        if (item.content.includes("[FLOW_END]")) {
          return null;
        }
      }
    }
    return null;
  }

  /**
   * Check if message is a flow cancellation command
   */
  private isFlowCancellation(message: string): boolean {
    const cancelKeywords = ["abbrechen", "stopp", "ende", "cancel", "quit"];
    return cancelKeywords.some(keyword => message.includes(keyword));
  }

  /**
   * Handle flow cancellation
   */
  private handleFlowCancellation(): ChatApiResponse {
    const responses = this.config!.defaultResponses.flowCancelled;
    const message = Array.isArray(responses)
      ? responses[Math.floor(Math.random() * responses.length)]
      : responses;
    
    return {
      success: true,
      response: {
        content: `${message}\n\n[FLOW_END]`,
        delay: 500
      }
    };
  }

  /**
   * Detect if message should start a new flow
   */
  private detectNewFlow(message: string): string | null {
    for (const [flowId, flow] of Object.entries(this.config!.flows)) {
      for (const keyword of flow.startKeywords) {
        if (message.includes(keyword.toLowerCase())) {
          return flowId;
        }
      }
    }
    return null;
  }

  /**
   * Start a new conversation flow
   */
  private startFlow(flowId: string): ChatApiResponse {
    const flow = this.config!.flows[flowId];
    if (!flow || !flow.states.start) {
      return this.getDefaultResponse("unknown");
    }

    const startState = flow.states.start;
    return {
      success: true,
      response: {
        content: `${startState.message}\n\n[FLOW_START:${flowId}:start]`,
        delay: 1000
      }
    };
  }

  /**
   * Continue an existing flow
   */
  private async continueFlow(flowState: FlowState, message: string): Promise<ChatApiResponse> {
    const flow = this.config!.flows[flowState.flowId];
    if (!flow) {
      return this.getDefaultResponse("unknown");
    }

    const currentStateConfig = flow.states[flowState.currentState];
    if (!currentStateConfig) {
      return this.getDefaultResponse("unknown");
    }

    // Check for expected keywords
    if (currentStateConfig.expectedKeywords) {
      const matchedKeyword = this.findMatchingKeyword(message, currentStateConfig.expectedKeywords);
      
      if (matchedKeyword) {
        const nextStateId = currentStateConfig.expectedKeywords[matchedKeyword];
        const nextState = flow.states[nextStateId];
        
        if (!nextState) {
          return this.getDefaultResponse("unknown");
        }

        if (nextState.isEnd) {
          return {
            success: true,
            response: {
              content: `${nextState.message}\n\n[FLOW_END]`,
              delay: 1000
            }
          };
        } else {
          return {
            success: true,
            response: {
              content: `${nextState.message}\n\n[FLOW_CONTINUE:${flowState.flowId}:${nextStateId}]`,
              delay: 1000
            }
          };
        }
      }
    }

    // No keyword match - show fallback
    const fallbackMessage = currentStateConfig.fallback || this.config!.defaultResponses.unknown;
    return {
      success: true,
      response: {
        content: `${fallbackMessage}\n\n[FLOW_CONTINUE:${flowState.flowId}:${flowState.currentState}]`,
        delay: 500
      }
    };
  }

  /**
   * Find matching keyword in expected keywords
   */
  private findMatchingKeyword(message: string, expectedKeywords: Record<string, string>): string | null {
    for (const keyword of Object.keys(expectedKeywords)) {
      if (message.includes(keyword.toLowerCase())) {
        return keyword;
      }
    }
    return null;
  }

  /**
   * Handle simple keyword responses
   */
  private handleSimpleKeywords(message: string): ChatApiResponse {
    for (const [keyword, response] of Object.entries(this.config!.simpleKeywords)) {
      if (message.includes(keyword.toLowerCase())) {
        if (Array.isArray(response)) {
          // Reference to default response
          return this.getDefaultResponse(response[0]);
        } else if (response === "flow_cancel") {
          return this.handleFlowCancellation();
        } else {
          return {
            success: true,
            response: {
              content: response,
              delay: 500
            }
          };
        }
      }
    }

    // No match found - return default unknown response
    return this.getDefaultResponse("unknown");
  }

  /**
   * Get a default response by key with random selection
   */
  private getDefaultResponse(key: string): ChatApiResponse {
    const responses = this.config!.defaultResponses[key] || this.config!.defaultResponses.unknown;
    const message = Array.isArray(responses)
      ? responses[Math.floor(Math.random() * responses.length)]
      : responses;
    
    return {
      success: true,
      response: {
        content: message,
        delay: 500
      }
    };
  }
}

// Export singleton instance
export const chatApiService = new WordSpottingBot();
```

## Enhanced Type Definitions

### File: `types/chat.ts` (additions)

```typescript
// Add to existing types:

export interface BotConfig {
  version: string;
  defaultResponses: Record<string, string[]>;
  simpleKeywords: Record<string, string | string[]>;
  flows: Record<string, FlowDefinition>;
}

export interface FlowDefinition {
  startKeywords: string[];
  name: string;
  states: Record<string, FlowStateConfig>;
}

export interface FlowStateConfig {
  message: string;
  expectedKeywords?: Record<string, string>;
  fallback?: string;
  isEnd?: boolean;
}

export interface FlowState {
  flowId: string;
  currentState: string;
  startedAt: Date;
}
```

## Flow State Management

### State Tracking Mechanism

The system uses hidden markers in bot responses to track conversation state:

1. **Flow Start**: `[FLOW_START:flowId:stateName]`
2. **Flow Continue**: `[FLOW_CONTINUE:flowId:stateName]`
3. **Flow End**: `[FLOW_END]`

These markers are:

- Hidden from users (filtered out in frontend)
- Parsed by backend to determine current flow state
- Used to maintain stateless backend architecture

### State Extraction Algorithm

```typescript
// Pseudocode for state extraction
function extractCurrentFlow(chatHistory) {
  // Iterate through history in reverse order
  for (message of chatHistory.reverse()) {
    if (message.type === "bot") {
      // Look for flow markers
      if (contains "FLOW_START" or "FLOW_CONTINUE") {
        return parseFlowState(message);
      }
      if (contains "FLOW_END") {
        return null; // No active flow
      }
    }
  }
  return null; // No flow found
}
```

## Frontend Integration

### Message Filtering

Frontend should filter flow markers from displayed messages:

```typescript
// In chat components
function cleanBotMessage(content: string): string {
  return content.replace(/\[FLOW_[^\]]+\]/g, '').trim();
}
```

### History Management

Chat history sent to backend should include:

- All user messages
- All bot messages (with flow markers)
- Proper timestamps
- Message ordering

## Implementation Steps

### Phase 1: Core Backend

1. ✅ **Design JSON configuration structure**
2. ⏳ **Implement WordSpottingBot class**
3. ⏳ **Add configuration loading logic**
4. ⏳ **Implement simple keyword matching**
5. ⏳ **Add flow detection and management**

### Phase 2: Integration

1. ⏳ **Update server.ts chat endpoint**
2. ⏳ **Create initial chatbot-config.json**

### Phase 3: Frontend Updates

1. ⏳ **Add message filtering for flow markers**
2. ⏳ **Ensure proper history management**

### Phase 4: Configuration

1. ⏳ **Add example flows (attractions, prices)**
2. ⏳ **Add comprehensive keyword coverage**

## Configuration Management

### Adding New Flows

1. Define flow in `chatbot-config.json`
2. Add start keywords
3. Design conversation states
4. Set expected keywords for each state
5. Define end states
6. Test conversation paths

### Adding Simple Responses

1. Add keyword-response pairs to `simpleKeywords`
2. Use arrays for default response references
3. Test keyword recognition

### Best Practices

- Use lowercase keywords for consistency
- Provide clear fallback messages
- Keep flows short (3-5 steps max)
- Test all conversation paths
- Use descriptive state names

## Conclusion

This implementation provides a flexible, maintainable chatbot system that can be fully configured through JSON without code changes. The stateless backend architecture ensures scalability while the flow-based conversation system enables complex user interactions.

The system is designed to be simple enough for a school project while being robust enough for real-world use.
