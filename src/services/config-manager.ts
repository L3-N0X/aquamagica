import type {
  ChatBotConfig,
  Topic,
  EntryInteraction,
  ContextualInteraction,
  InteractionResponse,
} from "@/types/chat";
import { loadChatBotConfig, getTopicById, getAllKeywords } from "@/utils/config-loader";
import { KeywordDetector } from "./keyword-detector";

/**
 * Represents a topic match with confidence score
 */
export interface TopicMatch {
  topic_id: string;
  name: string;
  confidence: number;
  matchedKeywords: string[];
  matchSource: "direct" | "contextual" | "page_context";
}

/**
 * Represents an interaction match
 */
export interface InteractionMatch {
  interaction: EntryInteraction | ContextualInteraction;
  topic: Topic;
  confidence: number;
  matchedKeywords: string[];
  interactionType: "entry" | "contextual";
}

/**
 * Central configuration manager that handles loading, indexing,
 * and providing access to chatbot configuration and AI logic
 */
export class ConfigManager {
  private config: ChatBotConfig | null = null;
  private keywordDetector: KeywordDetector | null = null;
  private interactionIndex = new Map<
    string,
    {
      interaction: EntryInteraction | ContextualInteraction;
      topic: Topic;
      type: "entry" | "contextual";
    }
  >();
  private isInitialized = false;

  /**
   * Initialize the configuration manager
   */
  async initialize(): Promise<boolean> {
    try {
      console.log("🔧 Initializing ConfigManager...");

      // Load configuration
      this.config = await loadChatBotConfig();
      if (!this.config) {
        throw new Error("Failed to load chatbot configuration");
      }

      // Initialize keyword detector
      this.keywordDetector = new KeywordDetector(this.config);

      // Build interaction index
      this.buildInteractionIndex();

      this.isInitialized = true;
      console.log("✅ ConfigManager initialized successfully");
      return true;
    } catch (error) {
      console.error("❌ Failed to initialize ConfigManager:", error);
      this.isInitialized = false;
      return false;
    }
  }

  /**
   * Check if the manager is properly initialized
   */
  isReady(): boolean {
    return this.isInitialized && this.config !== null && this.keywordDetector !== null;
  }

  /**
   * Get the loaded configuration
   */
  getConfig(): ChatBotConfig {
    if (!this.config) {
      throw new Error("ConfigManager not initialized");
    }
    return this.config;
  }

  /**
   * Get the keyword detector instance
   */
  getKeywordDetector(): KeywordDetector {
    if (!this.keywordDetector) {
      throw new Error("ConfigManager not initialized");
    }
    return this.keywordDetector;
  }

  /**
   * Build an index of all interactions for fast lookup
   */
  private buildInteractionIndex(): void {
    if (!this.config) return;

    this.interactionIndex.clear();

    for (const topic of this.config.topics) {
      // Index entry interactions
      if (topic.entry_interactions) {
        for (const interaction of topic.entry_interactions) {
          this.interactionIndex.set(interaction.interaction_id, {
            interaction,
            topic,
            type: "entry",
          });
        }
      }

      // Index contextual interactions
      if (topic.contextual_interactions) {
        for (const interaction of topic.contextual_interactions) {
          this.interactionIndex.set(interaction.interaction_id, {
            interaction,
            topic,
            type: "contextual",
          });
        }
      }
    }

    console.log(`📋 Indexed ${this.interactionIndex.size} interactions`);
  }

  /**
   * Get interaction by ID
   */
  getInteractionById(interactionId: string):
    | {
        interaction: EntryInteraction | ContextualInteraction;
        topic: Topic;
        type: "entry" | "contextual";
      }
    | undefined {
    return this.interactionIndex.get(interactionId);
  }

  /**
   * Get topic by ID
   */
  getTopicById(topicId: string): Topic | undefined {
    if (!this.config) return undefined;
    return getTopicById(this.config, topicId);
  }

  /**
   * Get a random greeting message
   */
  getRandomGreeting(): { id: string; text: string } {
    if (!this.config) {
      throw new Error("ConfigManager not initialized");
    }

    const greetings = this.config.bot_config.greeting_messages;
    const randomIndex = Math.floor(Math.random() * greetings.length);
    return greetings[randomIndex];
  }

  /**
   * Get a clarification prompt
   */
  getClarificationPrompt(detectedTopic?: string): { id: string; text: string } {
    if (!this.config) {
      throw new Error("ConfigManager not initialized");
    }

    const prompts = this.config.bot_config.clarification_prompts;

    // Try to find a prompt with placeholder for detected topic
    if (detectedTopic) {
      const topicPrompt = prompts.find((p) => p.text.includes("[detected_topic_placeholder]"));
      if (topicPrompt) {
        return {
          id: topicPrompt.id,
          text: topicPrompt.text.replace("[detected_topic_placeholder]", detectedTopic),
        };
      }
    }

    // Fall back to random general prompt
    const randomIndex = Math.floor(Math.random() * prompts.length);
    return prompts[randomIndex];
  }

  /**
   * Get global command by matching keywords
   */
  getGlobalCommand(message: string): { command_id: string; response: string } | null {
    if (!this.config) return null;

    const normalizedMessage = message.toLowerCase();

    for (const command of this.config.bot_config.global_commands) {
      for (const keyword of command.keywords) {
        if (normalizedMessage.includes(keyword.toLowerCase())) {
          return {
            command_id: command.command_id,
            response: command.response,
          };
        }
      }
    }

    return null;
  }

  /**
   * Get fallback message based on strategy and context
   */
  getFallbackMessage(
    recentTopicIds: string[] = [],
    fallbackCount: number = 0,
    escalationLevel: number = 0
  ): { id: string; text: string } {
    if (!this.config) {
      throw new Error("ConfigManager not initialized");
    }

    const fallbackSettings = this.config.bot_config.fallback_settings;

    // Check if we should escalate
    if (
      fallbackCount >= fallbackSettings.max_fallback_repetitions_before_escalation ||
      escalationLevel > 0
    ) {
      const escalationMessages = fallbackSettings.messages.filter(
        (m) => m.type === "escalation_offer"
      );
      if (escalationMessages.length > 0) {
        // Select random escalation message for variety
        const randomIndex = Math.floor(Math.random() * escalationMessages.length);
        return {
          id: escalationMessages[randomIndex].id,
          text: escalationMessages[randomIndex].text,
        };
      }
    }

    // Try contextual fallback first if strategy allows
    if (fallbackSettings.strategy === "contextual_then_general" && recentTopicIds.length > 0) {
      const contextualFallback = this.findContextualFallback(recentTopicIds);
      if (contextualFallback) {
        return contextualFallback;
      }
    }

    // Use general fallback
    const generalFallbacks = fallbackSettings.messages.filter((m) => m.type === "general");
    if (generalFallbacks.length > 0) {
      const randomIndex = Math.floor(Math.random() * generalFallbacks.length);
      const fallback = generalFallbacks[randomIndex];
      return { id: fallback.id, text: fallback.text };
    }

    // Ultimate fallback
    return {
      id: "ultimate_fallback",
      text: "Es tut mir leid, ich konnte Ihre Frage nicht verstehen. Können Sie sie anders formulieren?",
    };
  }

  /**
   * Find a contextual fallback message
   */
  private findContextualFallback(recentTopicIds: string[]): { id: string; text: string } | null {
    if (!this.config) return null;

    const fallbackSettings = this.config.bot_config.fallback_settings;
    const contextualFallbacks = fallbackSettings.messages.filter((m) => m.type === "contextual");

    for (const fallback of contextualFallbacks) {
      if (fallback.relevant_topic_id_hint) {
        const hasRelevantTopic = fallback.relevant_topic_id_hint.some((topicId) =>
          recentTopicIds.includes(topicId)
        );
        if (hasRelevantTopic) {
          return { id: fallback.id, text: fallback.text };
        }
      }
    }

    return null;
  }

  /**
   * Get context memory settings
   */
  getContextMemorySettings(): { history_length: number; active_topic_decay: number } {
    if (!this.config) {
      throw new Error("ConfigManager not initialized");
    }
    return this.config.bot_config.context_memory;
  }

  /**
   * Get topics that might be relevant for a given page
   */
  getPageContextTopics(currentPage: string): string[] {
    // Map page URLs to relevant topic IDs
    const pageContextMap: Record<string, string[]> = {
      "/preise": ["pricing_info"],
      "/prices": ["pricing_info"],
      "/attraktionen": ["attractions_info"],
      "/attractions": ["attractions_info"],
      "/kontakt": ["contact_directions"],
      "/contact": ["contact_directions"],
      "/gastronomie": ["gastronomy_info"],
      "/gastronomy": ["gastronomy_info"],
      "/events": ["events_specials"],
      "/veranstaltungen": ["events_specials"],
      "/": ["about_sustainability"], // Home page - about info
      "/home": ["about_sustainability"],
    };

    return pageContextMap[currentPage] || [];
  }

  /**
   * Get all available topics
   */
  getAllTopics(): Topic[] {
    if (!this.config) {
      throw new Error("ConfigManager not initialized");
    }
    return this.config.topics;
  }

  /**
   * Get system statistics for debugging
   */
  getSystemStats(): Record<string, unknown> {
    if (!this.config) {
      return { error: "Not initialized" };
    }

    const totalInteractions = this.config.topics.reduce((total, topic) => {
      return (
        total +
        (topic.entry_interactions?.length || 0) +
        (topic.contextual_interactions?.length || 0)
      );
    }, 0);

    const totalKeywords = getAllKeywords(this.config).length;

    return {
      isInitialized: this.isInitialized,
      totalTopics: this.config.topics.length,
      totalInteractions,
      totalUniqueKeywords: totalKeywords,
      indexedInteractions: this.interactionIndex.size,
      greetingMessages: this.config.bot_config.greeting_messages.length,
      clarificationPrompts: this.config.bot_config.clarification_prompts.length,
      fallbackMessages: this.config.bot_config.fallback_settings.messages.length,
      globalCommands: this.config.bot_config.global_commands.length,
      contextMemoryLength: this.config.bot_config.context_memory.history_length,
      topicDecay: this.config.bot_config.context_memory.active_topic_decay,
    };
  }

  /**
   * Validate that an interaction exists and return its details
   */
  validateInteractionExists(interactionId: string): boolean {
    return this.interactionIndex.has(interactionId);
  }

  /**
   * Get response by ID from any interaction
   */
  getResponseById(responseId: string): {
    response: InteractionResponse;
    interaction: EntryInteraction | ContextualInteraction;
    topic: Topic;
  } | null {
    for (const [, { interaction, topic }] of this.interactionIndex) {
      for (const response of interaction.responses) {
        if (response.response_id === responseId) {
          return { response, interaction, topic };
        }
      }
    }
    return null;
  }
}

// Export a singleton instance
export const configManager = new ConfigManager();
