"use client";

import { useState, useCallback } from "react";
import { useStore } from "@/lib/store";
import { PRESETS, getPresetById } from "@/lib/presets";
import { LLMProvider } from "@/lib/types";
import { Sparkles, Copy, Check, Loader2, ChevronDown } from "lucide-react";

const PROVIDERS: { id: LLMProvider; name: string }[] = [
  { id: "gemini-3-flash", name: "Gemini 3 Flash" },
  { id: "gpt-5.2-flash", name: "GPT-5.2 Flash" },
];

export function ControlPanel() {
  const {
    images,
    jsonString,
    selectedProvider,
    selectedVibe,
    isAnalyzing,
    setSelectedProvider,
    setSelectedVibe,
    setGeneratedJson,
    setIsAnalyzing,
    setError,
    addToHistory,
    imagePreviewUrls,
  } = useStore();

  const [copied, setCopied] = useState(false);

  const handleAnalyze = useCallback(async () => {
    if (images.length === 0) {
      setError("Please upload at least one image");
      return;
    }

    setIsAnalyzing(true);
    setError(null);

    try {
      const formData = new FormData();
      images.forEach((image, index) => {
        formData.append(`image${index}`, image);
      });
      formData.append("vibe", selectedVibe);
      formData.append("provider", selectedProvider);

      const preset = getPresetById(selectedVibe);
      if (preset) {
        formData.append("presetDescription", preset.description);
      }

      const response = await fetch("/api/analyze", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Analysis failed");
      }

      const result = await response.json();
      setGeneratedJson(result.json);

      // Add to history
      addToHistory({
        id: crypto.randomUUID(),
        json_content: result.json,
        vibe: selectedVibe,
        provider: selectedProvider,
        thumbnail_url: imagePreviewUrls[0] || null,
        created_at: new Date().toISOString(),
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsAnalyzing(false);
    }
  }, [
    images,
    selectedVibe,
    selectedProvider,
    imagePreviewUrls,
    setIsAnalyzing,
    setError,
    setGeneratedJson,
    addToHistory,
  ]);

  const handleCopy = useCallback(async () => {
    if (!jsonString) return;

    try {
      await navigator.clipboard.writeText(jsonString);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setError("Failed to copy to clipboard");
    }
  }, [jsonString, setError]);

  return (
    <div className="flex flex-col gap-4 p-4 border-b border-border">
      {/* Provider & Vibe Selectors */}
      <div className="flex gap-3">
        <div className="flex-1">
          <label className="label block mb-2">Provider</label>
          <div className="relative">
            <select
              value={selectedProvider}
              onChange={(e) =>
                setSelectedProvider(e.target.value as LLMProvider)
              }
              className="select w-full"
            >
              {PROVIDERS.map((provider) => (
                <option key={provider.id} value={provider.id}>
                  {provider.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex-1">
          <label className="label block mb-2">Vibe</label>
          <div className="relative">
            <select
              value={selectedVibe}
              onChange={(e) => setSelectedVibe(e.target.value)}
              className="select w-full"
            >
              {PRESETS.map((preset) => (
                <option key={preset.id} value={preset.id}>
                  {preset.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Vibe Description */}
      {selectedVibe && (
        <p className="text-xs text-muted">
          {getPresetById(selectedVibe)?.description}
        </p>
      )}

      {/* Action Buttons */}
      <div className="flex gap-3">
        <button
          onClick={handleAnalyze}
          disabled={isAnalyzing || images.length === 0}
          className="btn btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isAnalyzing ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Analyzing...
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              Analyze with AI
            </>
          )}
        </button>

        <button
          onClick={handleCopy}
          disabled={!jsonString}
          className="btn btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4" />
              Copied!
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" />
              Copy JSON
            </>
          )}
        </button>
      </div>
    </div>
  );
}
