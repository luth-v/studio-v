import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import OpenAI from "openai";
import { buildAnalysisPrompt } from "@/lib/system-prompt";
import { getPresetById, PRESETS } from "@/lib/presets";
import { NanoBananaPrompt } from "@/lib/types";

// Initialize clients
const genAI = process.env.GOOGLE_API_KEY
  ? new GoogleGenerativeAI(process.env.GOOGLE_API_KEY)
  : null;

const openai = process.env.OPENAI_API_KEY
  ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  : null;

async function analyzeWithGemini(
  images: { data: string; mimeType: string }[],
  prompt: string,
): Promise<NanoBananaPrompt> {
  if (!genAI) {
    throw new Error("Gemini API key not configured");
  }

  const model = genAI.getGenerativeModel({ model: "gemini-3-flash-preview" });

  const imageParts = images.map((img) => ({
    inlineData: {
      data: img.data,
      mimeType: img.mimeType,
    },
  }));

  const result = await model.generateContent([prompt, ...imageParts]);
  const response = result.response;
  const text = response.text();

  // Parse JSON from response
  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    throw new Error("Failed to extract JSON from response");
  }

  return JSON.parse(jsonMatch[0]);
}

async function analyzeWithOpenAI(
  images: { data: string; mimeType: string }[],
  prompt: string,
): Promise<NanoBananaPrompt> {
  if (!openai) {
    throw new Error("OpenAI API key not configured");
  }

  const imageContent = images.map((img) => ({
    type: "image_url" as const,
    image_url: {
      url: `data:${img.mimeType};base64,${img.data}`,
    },
  }));

  const response = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      {
        role: "user",
        content: [{ type: "text", text: prompt }, ...imageContent],
      },
    ],
    max_tokens: 4096,
  });

  const text = response.choices[0]?.message?.content || "";

  // Parse JSON from response
  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    throw new Error("Failed to extract JSON from response");
  }

  return JSON.parse(jsonMatch[0]);
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const vibe = formData.get("vibe") as string;
    const provider = formData.get("provider") as string;
    const presetDescription = formData.get("presetDescription") as string;

    // Collect all images
    const images: { data: string; mimeType: string }[] = [];

    for (let i = 0; ; i++) {
      const image = formData.get(`image${i}`) as File | null;
      if (!image) break;

      const bytes = await image.arrayBuffer();
      const base64 = Buffer.from(bytes).toString("base64");
      images.push({
        data: base64,
        mimeType: image.type,
      });
    }

    if (images.length === 0) {
      return NextResponse.json(
        { message: "No images provided" },
        { status: 400 },
      );
    }

    // Build the analysis prompt
    const preset = getPresetById(vibe) || PRESETS[0];
    const prompt = buildAnalysisPrompt(
      preset.name,
      presetDescription || preset.description,
    );

    // Call the appropriate provider
    let json: NanoBananaPrompt;

    if (provider === "gemini-3-flash" || provider.includes("gemini")) {
      json = await analyzeWithGemini(images, prompt);
    } else if (provider === "gpt-5.2-flash" || provider.includes("gpt")) {
      json = await analyzeWithOpenAI(images, prompt);
    } else {
      // Default to Gemini
      json = await analyzeWithGemini(images, prompt);
    }

    // Apply preset overrides if available
    if (preset) {
      if (preset.environment && json.environment) {
        json.environment = { ...json.environment, ...preset.environment };
      }
      if (preset.camera_optics && json.camera_optics) {
        json.camera_optics = { ...json.camera_optics, ...preset.camera_optics };
      }
      if (preset.generation_keywords && json.generation_keywords) {
        json.generation_keywords = {
          ...json.generation_keywords,
          ...preset.generation_keywords,
        };
      }
    }

    return NextResponse.json({ json });
  } catch (error) {
    console.error("Analysis error:", error);
    return NextResponse.json(
      { message: error instanceof Error ? error.message : "Analysis failed" },
      { status: 500 },
    );
  }
}
