import { create } from "zustand";
import { AppState, NanoBananaPrompt, LLMProvider, HistoryItem } from "./types";

export const useStore = create<AppState>((set, get) => ({
  // Images
  images: [],
  imagePreviewUrls: [],

  // JSON
  generatedJson: null,
  jsonString: "",

  // Settings
  selectedProvider: "gemini-3-flash",
  selectedVibe: "dark-mode-neon",

  // History
  history: [],

  // UI State
  isAnalyzing: false,
  error: null,

  // Actions
  setImages: (files: File[]) => {
    // Revoke old URLs
    get().imagePreviewUrls.forEach((url) => URL.revokeObjectURL(url));

    // Create new preview URLs
    const urls = files.map((file) => URL.createObjectURL(file));
    set({ images: files, imagePreviewUrls: urls });
  },

  setGeneratedJson: (json: NanoBananaPrompt) => {
    set({
      generatedJson: json,
      jsonString: JSON.stringify(json, null, 2),
    });
  },

  setJsonString: (jsonString: string) => {
    set({ jsonString });
    // Try to parse and update generatedJson
    try {
      const parsed = JSON.parse(jsonString);
      set({ generatedJson: parsed, error: null });
    } catch {
      // Invalid JSON, don't update generatedJson
    }
  },

  setSelectedProvider: (provider: LLMProvider) => {
    set({ selectedProvider: provider });
  },

  setSelectedVibe: (vibe: string) => {
    set({ selectedVibe: vibe });
  },

  setIsAnalyzing: (analyzing: boolean) => {
    set({ isAnalyzing: analyzing });
  },

  setError: (error: string | null) => {
    set({ error });
  },

  addToHistory: (item: HistoryItem) => {
    set((state) => ({
      history: [item, ...state.history].slice(0, 10), // Keep last 10
    }));
  },

  loadFromHistory: (item: HistoryItem) => {
    set({
      generatedJson: item.json_content,
      jsonString: JSON.stringify(item.json_content, null, 2),
      selectedVibe: item.vibe,
      selectedProvider: item.provider as LLMProvider,
    });
  },

  clearImages: () => {
    get().imagePreviewUrls.forEach((url) => URL.revokeObjectURL(url));
    set({ images: [], imagePreviewUrls: [] });
  },
}));
