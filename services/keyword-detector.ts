import type { ChatBotConfig, Topic } from "../types/chat";

/**
 * Represents a detected keyword with its context and confidence
 */
export interface DetectedKeyword {
  text: string;
  originalText: string;
  confidence: number;
  position: number;
  topicIds: string[];
  interactionIds: string[];
}

/**
 * Information about a keyword mapping
 */
interface KeywordMapping {
  keyword: string;
  topicId: string;
  interactionId?: string;
  interactionType: "entry" | "contextual" | "topic_general";
  weight: number; // How important this keyword is (1.0 = high, 0.5 = medium, 0.1 = low)
}

/**
 * Advanced keyword detection engine optimized for German language
 * Handles compound words, umlauts, and contextual keyword matching
 */
export class KeywordDetector {
  private keywordIndex = new Map<string, KeywordMapping[]>();
  private stemCache = new Map<string, string>();
  private config: ChatBotConfig | null = null;

  constructor(config?: ChatBotConfig) {
    if (config) {
      this.initialize(config);
    }
  }

  /**
   * Initialize the keyword detector with chatbot configuration
   */
  initialize(config: ChatBotConfig): void {
    this.config = config;
    this.buildKeywordIndex();
    console.log(`🔍 Keyword detector initialized with ${this.keywordIndex.size} unique keywords`);
  }

  /**
   * Build an efficient index of all keywords for fast lookup
   */
  private buildKeywordIndex(): void {
    if (!this.config) return;

    this.keywordIndex.clear();

    for (const topic of this.config.topics) {
      // Index general topic keywords
      this.indexTopicKeywords(topic);

      // Index entry interaction keywords
      this.indexEntryInteractionKeywords(topic);

      // Index contextual interaction keywords
      this.indexContextualInteractionKeywords(topic);
    }

    // Index global command keywords
    this.indexGlobalCommandKeywords();
  }

  /**
   * Index general topic keywords
   */
  private indexTopicKeywords(topic: Topic): void {
    for (const keyword of topic.keywords) {
      this.addToIndex(keyword, {
        keyword: keyword.toLowerCase(),
        topicId: topic.topic_id,
        interactionType: "topic_general",
        weight: 0.7, // Medium weight for general topic keywords
      });
    }
  }

  /**
   * Index entry interaction keywords
   */
  private indexEntryInteractionKeywords(topic: Topic): void {
    if (!topic.entry_interactions) return;

    for (const interaction of topic.entry_interactions) {
      for (const keyword of interaction.spotting_keywords) {
        this.addToIndex(keyword, {
          keyword: keyword.toLowerCase(),
          topicId: topic.topic_id,
          interactionId: interaction.interaction_id,
          interactionType: "entry",
          weight: 1.0, // High weight for specific interaction keywords
        });
      }
    }
  }

  /**
   * Index contextual interaction keywords
   */
  private indexContextualInteractionKeywords(topic: Topic): void {
    if (!topic.contextual_interactions) return;

    for (const interaction of topic.contextual_interactions) {
      for (const keyword of interaction.spotting_keywords) {
        this.addToIndex(keyword, {
          keyword: keyword.toLowerCase(),
          topicId: topic.topic_id,
          interactionId: interaction.interaction_id,
          interactionType: "contextual",
          weight: 0.9, // High weight for contextual keywords
        });
      }
    }
  }

  /**
   * Index global command keywords
   */
  private indexGlobalCommandKeywords(): void {
    if (!this.config?.bot_config.global_commands) return;

    for (const command of this.config.bot_config.global_commands) {
      for (const keyword of command.keywords) {
        this.addToIndex(keyword, {
          keyword: keyword.toLowerCase(),
          topicId: "global_command",
          interactionId: command.command_id,
          interactionType: "entry",
          weight: 1.2, // Very high weight for global commands
        });
      }
    }
  }

  /**
   * Add a keyword to the index with all its variations
   */
  private addToIndex(originalKeyword: string, mapping: KeywordMapping): void {
    const variations = this.generateKeywordVariations(originalKeyword);

    for (const variation of variations) {
      const existing = this.keywordIndex.get(variation) || [];
      existing.push(mapping);
      this.keywordIndex.set(variation, existing);
    }
  }

  /**
   * Generate keyword variations for better matching (German-specific)
   */
  private generateKeywordVariations(keyword: string): string[] {
    const variations = new Set<string>();
    const lowerKeyword = keyword.toLowerCase().trim();

    // Original keyword
    variations.add(lowerKeyword);

    // Handle umlauts and special characters
    const normalizedKeyword = this.normalizeGermanText(lowerKeyword);
    if (normalizedKeyword !== lowerKeyword) {
      variations.add(normalizedKeyword);
    }

    // Add stemmed version
    const stemmed = this.stemGermanWord(lowerKeyword);
    if (stemmed !== lowerKeyword) {
      variations.add(stemmed);
    }

    // Handle compound word variations for German
    const compounds = this.generateCompoundVariations(lowerKeyword);
    compounds.forEach((compound) => variations.add(compound));

    // Handle plural/singular variations
    const pluralVariations = this.generatePluralVariations(lowerKeyword);
    pluralVariations.forEach((variation) => variations.add(variation));

    return Array.from(variations);
  }

  /**
   * Normalize German text (handle umlauts, etc.)
   */
  private normalizeGermanText(text: string): string {
    return text
      .replace(/ä/g, "ae")
      .replace(/ö/g, "oe")
      .replace(/ü/g, "ue")
      .replace(/ß/g, "ss")
      .replace(/Ä/g, "Ae")
      .replace(/Ö/g, "Oe")
      .replace(/Ü/g, "Ue");
  }

  /**
   * Simple German word stemming
   */
  private stemGermanWord(word: string): string {
    // Check cache first
    if (this.stemCache.has(word)) {
      return this.stemCache.get(word)!;
    }

    let stemmed = word;

    // Remove common German suffixes
    const suffixes = ["en", "er", "es", "e", "n", "s", "t"];
    for (const suffix of suffixes) {
      if (stemmed.endsWith(suffix) && stemmed.length > suffix.length + 2) {
        stemmed = stemmed.slice(0, -suffix.length);
        break;
      }
    }

    // Cache the result
    this.stemCache.set(word, stemmed);
    return stemmed;
  }

  /**
   * Generate compound word variations (simplified)
   */
  private generateCompoundVariations(keyword: string): string[] {
    const variations: string[] = [];

    // If the keyword contains spaces, also index it without spaces (compound)
    if (keyword.includes(" ")) {
      variations.push(keyword.replace(/\s+/g, ""));
    }

    // If it's a long word, consider it might be a compound and add spaced version
    if (keyword.length > 8 && !keyword.includes(" ")) {
      // This is a simplified approach - a real implementation would use
      // a German compound word dictionary or more sophisticated algorithm
      const possibleSplits = this.findPossibleCompoundSplits(keyword);
      variations.push(...possibleSplits);
    }

    return variations;
  }

  /**
   * Find possible compound word splits (simplified implementation)
   */
  private findPossibleCompoundSplits(word: string): string[] {
    const splits: string[] = [];

    // Common German compound patterns
    const commonPrefixes = ["tag", "zeit", "wasser", "haus", "geld"];
    const commonSuffixes = ["karte", "preis", "zeit", "bad"];

    for (const prefix of commonPrefixes) {
      if (word.startsWith(prefix) && word.length > prefix.length + 3) {
        splits.push(`${prefix} ${word.slice(prefix.length)}`);
      }
    }

    for (const suffix of commonSuffixes) {
      if (word.endsWith(suffix) && word.length > suffix.length + 3) {
        splits.push(`${word.slice(0, -suffix.length)} ${suffix}`);
      }
    }

    return splits;
  }

  /**
   * Generate plural/singular variations
   */
  private generatePluralVariations(word: string): string[] {
    const variations: string[] = [];

    // German plural patterns
    if (word.endsWith("en")) {
      // Remove 'en' for potential singular
      const singular = word.slice(0, -2);
      if (singular.length > 2) {
        variations.push(singular);
      }
    } else if (word.endsWith("e")) {
      // Remove 'e' and add 'en' for potential plural
      const plural = word.slice(0, -1) + "en";
      variations.push(plural);
    } else {
      // Add 'e' for potential plural
      variations.push(word + "e");
      // Add 'en' for potential plural
      variations.push(word + "en");
    }

    return variations;
  }

  /**
   * Detect keywords in a given text message
   */
  detectKeywords(message: string): DetectedKeyword[] {
    if (!this.config) {
      throw new Error("KeywordDetector not initialized with config");
    }

    const detectedKeywords: DetectedKeyword[] = [];
    const normalizedMessage = message.toLowerCase().trim();
    const words = this.tokenizeMessage(normalizedMessage);

    // Check individual words and word combinations
    for (let i = 0; i < words.length; i++) {
      // Single word matching
      this.checkWordMatch(words[i], i, detectedKeywords, message);

      // Two-word combination matching
      if (i < words.length - 1) {
        const twoWord = `${words[i]} ${words[i + 1]}`;
        this.checkPhraseMatch(twoWord, i, detectedKeywords, message);
      }

      // Three-word combination matching
      if (i < words.length - 2) {
        const threeWord = `${words[i]} ${words[i + 1]} ${words[i + 2]}`;
        this.checkPhraseMatch(threeWord, i, detectedKeywords, message);
      }
    }

    // Check for substring matches for compound words
    this.checkSubstringMatches(normalizedMessage, detectedKeywords, message);

    // Sort by confidence and remove duplicates
    return this.deduplicateAndSort(detectedKeywords);
  }

  /**
   * Tokenize message into words (German-aware)
   */
  private tokenizeMessage(message: string): string[] {
    // Split on whitespace and common punctuation, but preserve German words
    return message
      .toLowerCase()
      .split(/[\s.,!?;:()[\]{}"']+/)
      .filter((word) => word.length > 0)
      .map((word) => word.trim());
  }

  /**
   * Check if a single word matches any keyword
   */
  private checkWordMatch(
    word: string,
    position: number,
    detectedKeywords: DetectedKeyword[],
    originalMessage: string
  ): void {
    const mappings = this.keywordIndex.get(word);
    if (mappings) {
      for (const mapping of mappings) {
        detectedKeywords.push({
          text: word,
          originalText: originalMessage,
          confidence: mapping.weight * 0.9, // Slight reduction for single word match
          position,
          topicIds: [mapping.topicId],
          interactionIds: mapping.interactionId ? [mapping.interactionId] : [],
        });
      }
    }
  }

  /**
   * Check if a phrase matches any keyword
   */
  private checkPhraseMatch(
    phrase: string,
    position: number,
    detectedKeywords: DetectedKeyword[],
    originalMessage: string
  ): void {
    const mappings = this.keywordIndex.get(phrase);
    if (mappings) {
      for (const mapping of mappings) {
        detectedKeywords.push({
          text: phrase,
          originalText: originalMessage,
          confidence: mapping.weight * 1.1, // Boost for phrase match
          position,
          topicIds: [mapping.topicId],
          interactionIds: mapping.interactionId ? [mapping.interactionId] : [],
        });
      }
    }
  }

  /**
   * Check for substring matches (useful for compound words)
   */
  private checkSubstringMatches(
    message: string,
    detectedKeywords: DetectedKeyword[],
    originalMessage: string
  ): void {
    for (const [keyword, mappings] of this.keywordIndex.entries()) {
      // Only check compound keywords (length > 6)
      if (keyword.length > 6 && !keyword.includes(" ")) {
        const position = message.indexOf(keyword);
        if (position !== -1) {
          for (const mapping of mappings) {
            detectedKeywords.push({
              text: keyword,
              originalText: originalMessage,
              confidence: mapping.weight * 0.8, // Reduction for substring match
              position,
              topicIds: [mapping.topicId],
              interactionIds: mapping.interactionId ? [mapping.interactionId] : [],
            });
          }
        }
      }
    }
  }

  /**
   * Remove duplicates and sort by confidence
   */
  private deduplicateAndSort(keywords: DetectedKeyword[]): DetectedKeyword[] {
    // Group by text to merge duplicates
    const keywordMap = new Map<string, DetectedKeyword>();

    for (const keyword of keywords) {
      const existing = keywordMap.get(keyword.text);
      if (existing) {
        // Merge: take highest confidence and combine topic/interaction IDs
        existing.confidence = Math.max(existing.confidence, keyword.confidence);
        existing.topicIds = [...new Set([...existing.topicIds, ...keyword.topicIds])];
        existing.interactionIds = [
          ...new Set([...existing.interactionIds, ...keyword.interactionIds]),
        ];
      } else {
        keywordMap.set(keyword.text, { ...keyword });
      }
    }

    // Sort by confidence (highest first)
    return Array.from(keywordMap.values()).sort((a, b) => b.confidence - a.confidence);
  }

  /**
   * Get debug information about keyword detection
   */
  getDetectionDebugInfo(message: string): Record<string, unknown> {
    const keywords = this.detectKeywords(message);
    return {
      originalMessage: message,
      normalizedMessage: message.toLowerCase(),
      tokenizedWords: this.tokenizeMessage(message.toLowerCase()),
      detectedKeywords: keywords,
      totalKeywordsInIndex: this.keywordIndex.size,
      topScoringKeyword: keywords[0] || null,
    };
  }
}
