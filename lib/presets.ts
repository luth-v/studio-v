import { NanoBananaPrompt } from "./types";

export interface Preset {
  id: string;
  name: string;
  description: string;
  environment: Partial<NanoBananaPrompt["environment"]>;
  camera_optics: Partial<NanoBananaPrompt["camera_optics"]>;
  generation_keywords: Partial<NanoBananaPrompt["generation_keywords"]>;
}

export const PRESETS: Preset[] = [
  {
    id: "dark-mode-neon",
    name: "Dark Mode Neon",
    description:
      "Cinematic dark room with dramatic lighting and reflective highlights",
    environment: {
      lighting:
        "Cinematic dark-room lighting setup: strong directional key light + powerful on-axis flash dedicated ONLY to reflective trims, subtle cool rim light outlining the silhouette, low ambient fill to maintain depth. Dramatic but clean, no harsh or scary shadows.",
      objects: [
        "White marble wall with soft grey veins (low-key visibility)",
        "Grey velvet curved sofa fading into shadow",
        "Sheer curtains barely catching rim light",
      ],
      setting:
        "Luxury editorial living room at night, high-end fashion campaign mood",
    },
    camera_optics: {
      lens: "50mm prime f/2.8",
      flaws: [
        "Cinematic contrast roll-off",
        "Controlled highlight bloom on reflective elements",
        "Deep shadow separation without crushing blacks",
      ],
    },
    generation_keywords: {
      positive:
        "Cinematic fashion campaign, editorial product photography, dramatic lighting, ultra-bright reflective glow, controlled bloom, luxury modest wear, dark cinematic mood, marble interior, high contrast color grading, professional lookbook, 8k detail",
      negative:
        "Natural casual lighting, daylight look, flat exposure, amateur photography, reflective ribbon, shiny waistband tie, hands visible, creepy face lighting, red eyes, warm orange cast, cluttered background",
    },
  },
  {
    id: "soft-pastel-studio",
    name: "Soft Pastel Studio",
    description: "Bright, airy studio with soft diffused lighting",
    environment: {
      lighting:
        "Soft diffused studio lighting with large softboxes, minimal shadows, even exposure across the frame. Clean and commercial.",
      objects: [
        "Seamless white backdrop",
        "Subtle gradient shadows on floor",
        "Clean minimalist props",
      ],
      setting: "Professional photography studio, e-commerce catalog aesthetic",
    },
    camera_optics: {
      lens: "85mm prime f/4",
      flaws: [
        "Slight vignetting at corners",
        "Gentle skin smoothing from soft focus",
        "Clean highlight rolloff",
      ],
    },
    generation_keywords: {
      positive:
        "Clean product photography, bright studio lighting, soft shadows, commercial catalog, professional e-commerce, crisp details, neutral tones, minimalist aesthetic, high-key lighting",
      negative:
        "Harsh shadows, dramatic lighting, dark mood, cinematic grading, colored gels, busy background, lifestyle setting",
    },
  },
  {
    id: "outdoor-nature",
    name: "Outdoor Nature",
    description: "Natural outdoor setting with golden hour lighting",
    environment: {
      lighting:
        "Golden hour natural sunlight, warm rim light from behind, soft fill from reflected sky. Organic and lifestyle-oriented.",
      objects: [
        "Lush green foliage in soft focus background",
        "Natural wooden elements",
        "Textured stone or earth surfaces",
      ],
      setting:
        "Outdoor lifestyle photoshoot, nature and wellness brand aesthetic",
    },
    camera_optics: {
      lens: "35mm prime f/2",
      flaws: [
        "Natural lens flare from sun",
        "Soft bokeh in background foliage",
        "Slight chromatic aberration on edges",
      ],
    },
    generation_keywords: {
      positive:
        "Natural lighting, golden hour, outdoor lifestyle, organic textures, warm tones, nature photography, bokeh background, authentic mood, wellness brand, environmental portrait",
      negative:
        "Studio lighting, artificial look, dark mood, indoor setting, harsh flash, cold tones, sterile environment",
    },
  },
  {
    id: "minimalist-white",
    name: "Minimalist White",
    description: "Ultra-clean white-on-white aesthetic",
    environment: {
      lighting:
        "Even, diffused lighting from all angles, virtually shadowless, high-key exposure. Ultra-clean commercial look.",
      objects: [
        "Pure white infinity backdrop",
        "White geometric props (optional)",
        "Subtle floor reflection",
      ],
      setting: "High-end minimalist catalog, tech product aesthetic",
    },
    camera_optics: {
      lens: "70mm prime f/5.6",
      flaws: [
        "Perfect sharpness across frame",
        "Subtle highlight clipping for ethereal feel",
        "Minimal optical distortion",
      ],
    },
    generation_keywords: {
      positive:
        "Minimalist photography, white background, clean aesthetic, high-key lighting, product focus, sharp details, tech catalog, premium feel, floating product effect",
      negative:
        "Shadows, colored background, lifestyle context, busy composition, textured surfaces, warm tones, dramatic lighting",
    },
  },
];

export function getPresetById(id: string): Preset | undefined {
  return PRESETS.find((preset) => preset.id === id);
}
