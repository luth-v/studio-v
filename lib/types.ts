export interface NanoBananaPrompt {
  meta: {
    target_tool: string;
    image_dna: {
      type: string;
      orientation_lock: string;
      sensor_emulation: string;
    };
    aspect_ratio: string;
  };
  spatial_orientation_engine: {
    subject_facing: string;
  };
  camera_optics: {
    lens: string;
    flaws: string[];
  };
  environment: {
    lighting: string;
    objects: string[];
    setting: string;
    sample: string;
  };
  subject: {
    pose: string;
    clothing: string;
    identity: string;
    sample_clothing: string;
  };
  generation_keywords: {
    positive: string;
    negative: string;
  };
}

export interface HistoryItem {
  id: string;
  json_content: NanoBananaPrompt;
  vibe: string;
  provider: string;
  thumbnail_url: string | null;
  created_at: string;
}

export type LLMProvider = "gemini-3-flash" | "gpt-5.2-flash";

export interface AppState {
  // Images
  images: File[];
  imagePreviewUrls: string[];

  // JSON
  generatedJson: NanoBananaPrompt | null;
  jsonString: string;

  // Settings
  selectedProvider: LLMProvider;
  selectedVibe: string;

  // History
  history: HistoryItem[];

  // UI State
  isAnalyzing: boolean;
  error: string | null;

  // Actions
  setImages: (files: File[]) => void;
  setGeneratedJson: (json: NanoBananaPrompt) => void;
  setJsonString: (json: string) => void;
  setSelectedProvider: (provider: LLMProvider) => void;
  setSelectedVibe: (vibe: string) => void;
  setIsAnalyzing: (analyzing: boolean) => void;
  setError: (error: string | null) => void;
  addToHistory: (item: HistoryItem) => void;
  loadFromHistory: (item: HistoryItem) => void;
  clearImages: () => void;
}
