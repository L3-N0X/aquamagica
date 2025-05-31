import { join } from "path";
import type { ChatBotConfig } from "@/types/chat";

/**
 * Load the chatbot configuration from chatbot-config.json
 */
export async function loadChatBotConfig(): Promise<ChatBotConfig | null> {
  try {
    const configPath = join(process.cwd(), "chatbot-config.json");
    const configFile = Bun.file(configPath);

    if (!(await configFile.exists())) {
      throw new Error(`Config file not found at: ${configPath}`);
    }

    const configData = await configFile.json();

    if (!validateChatBotConfig(configData)) {
      throw new Error("Invalid chatbot configuration structure");
    }

    console.log("✅ ChatBot config loaded successfully");
    console.log(
      `📊 Loaded ${configData.topics.length} topics with ${getTotalInteractions(
        configData
      )} interactions`
    );

    return configData as ChatBotConfig;
  } catch (error) {
    console.error("❌ Failed to load chatbot config:", error);
    return null;
  }
}

/**
 * Validate that the loaded config matches our expected structure
 */
export function validateChatBotConfig(config: unknown): config is ChatBotConfig {
  if (!config || typeof config !== "object") {
    console.error("Config is not an object");
    return false;
  }

  const configObj = config as Record<string, unknown>;

  // Check for required top-level properties
  if (!configObj.bot_config || typeof configObj.bot_config !== "object") {
    console.error("Missing or invalid bot_config");
    return false;
  }

  if (!Array.isArray(configObj.topics)) {
    console.error("Missing or invalid topics array");
    return false;
  }

  const botConfig = configObj.bot_config as Record<string, unknown>;

  // Validate bot_config structure
  if (!Array.isArray(botConfig.greeting_messages)) {
    console.error("Missing greeting_messages");
    return false;
  }

  if (!Array.isArray(botConfig.clarification_prompts)) {
    console.error("Missing clarification_prompts");
    return false;
  }

  if (!botConfig.fallback_settings || typeof botConfig.fallback_settings !== "object") {
    console.error("Missing fallback_settings");
    return false;
  }

  if (!botConfig.context_memory || typeof botConfig.context_memory !== "object") {
    console.error("Missing context_memory");
    return false;
  }

  // Validate topics structure
  for (const topic of configObj.topics as unknown[]) {
    if (!topic || typeof topic !== "object") {
      console.error("Invalid topic structure");
      return false;
    }

    const topicObj = topic as Record<string, unknown>;
    if (!topicObj.topic_id || !topicObj.name || !Array.isArray(topicObj.keywords)) {
      console.error("Topic missing required fields");
      return false;
    }
  }

  return true;
}

/**
 * Get total number of interactions across all topics for logging
 */
function getTotalInteractions(config: ChatBotConfig): number {
  let total = 0;
  for (const topic of config.topics) {
    total += topic.entry_interactions?.length || 0;
    total += topic.contextual_interactions?.length || 0;
  }
  return total;
}

/**
 * Get topic by ID
 */
export function getTopicById(config: ChatBotConfig, topicId: string) {
  return config.topics.find((topic) => topic.topic_id === topicId);
}

/**
 * Get all keywords across all topics
 */
export function getAllKeywords(config: ChatBotConfig): string[] {
  const keywords = new Set<string>();

  for (const topic of config.topics) {
    // Add general topic keywords
    topic.keywords.forEach((keyword) => keywords.add(keyword.toLowerCase()));

    // Add specific interaction keywords
    topic.entry_interactions?.forEach((interaction) => {
      interaction.spotting_keywords.forEach((keyword) => keywords.add(keyword.toLowerCase()));
    });

    topic.contextual_interactions?.forEach((interaction) => {
      interaction.spotting_keywords.forEach((keyword) => keywords.add(keyword.toLowerCase()));
    });
  }

  return Array.from(keywords);
}
