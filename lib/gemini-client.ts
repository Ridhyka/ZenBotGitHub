import { z } from "zod";

/**
 * Creates a standardized Gemini API client to ensure consistent model usage
 * throughout the application.
 */
export default class GeminiClient {
  private apiKey: string;
  private _modelName: string;
  private baseUrl: string;
  private availableModels: string[] = [];

  constructor(apiKey: string, modelName = "gemini-1.5-flash") {
    this.apiKey = apiKey;
    this._modelName = modelName;
    this.baseUrl = "https://generativelanguage.googleapis.com/v1beta";
  }
  
  // Getter and setter for modelName
  get modelName(): string {
    return this._modelName;
  }
  
  set modelName(value: string) {
    this._modelName = value;
  }

  /**
   * List available models to diagnose API issues and store them for later use
   */
  async listModels() {
    const endpoint = `${this.baseUrl}/models?key=${this.apiKey}`;
    
    try {
      const response = await fetch(endpoint, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error("Gemini API error listing models:", response.status, errorData);
        throw new Error(errorData.error?.message || `API error: ${response.status}`);
      }
  
      const data = await response.json();
      console.log("Available models:", data);
      
      // Store model names for validation
      this.availableModels = data.models.map((model: any) => model.name.replace('models/', ''));
      
      return data;
    } catch (error) {
      console.error("Error listing Gemini models:", error);
      throw error;
    }
  }

  /**
   * Check if a model is available
   */
  isModelAvailable(modelName: string): boolean {
    return this.availableModels.includes(modelName) || this.availableModels.includes(`models/${modelName}`);
  }

  /**
   * Generate content using the Gemini API
   */
  async generateContent(messages: any[], options = {}) {
    const endpoint = `${this.baseUrl}/models/${this._modelName}:generateContent?key=${this.apiKey}`;
    
    console.log(`Using Gemini model: ${this._modelName}`);
    console.log(`Using Gemini API endpoint: ${endpoint.replace(this.apiKey, "API_KEY_HIDDEN")}`);

    const defaultConfig = {
      temperature: 0.7,
      topK: 40,
      topP: 0.95,
      maxOutputTokens: 1024,
    };

    const defaultSafetySettings = [
      {
        category: "HARM_CATEGORY_HARASSMENT",
        threshold: "BLOCK_MEDIUM_AND_ABOVE",
      },
      {
        category: "HARM_CATEGORY_HATE_SPEECH",
        threshold: "BLOCK_MEDIUM_AND_ABOVE",
      },
      {
        category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
        threshold: "BLOCK_MEDIUM_AND_ABOVE",
      },
      {
        category: "HARM_CATEGORY_DANGEROUS_CONTENT",
        threshold: "BLOCK_MEDIUM_AND_ABOVE",
      },
    ];

    const requestBody = {
      contents: messages,
      generationConfig: {
        ...defaultConfig,
        ...options,
      },
      safetySettings: defaultSafetySettings,
    };

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });
  
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error("Gemini API error:", response.status, errorData);
        throw new Error(errorData.error?.message || `API error: ${response.status}`);
      }
  
      return await response.json();
    } catch (error) {
      console.error(`Error with model ${this._modelName}:`, error);
      throw error;
    }
  }
}