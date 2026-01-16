"use client";

import { useCallback } from "react";
import { useStore } from "@/lib/store";
import { Upload, X, Image as ImageIcon } from "lucide-react";

export function UploadZone() {
  const { images, imagePreviewUrls, setImages, clearImages } = useStore();

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();

      const files = Array.from(e.dataTransfer.files).filter((file) =>
        file.type.startsWith("image/"),
      );

      if (files.length > 0) {
        setImages([...images, ...files]);
      }
    },
    [images, setImages],
  );

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = Array.from(e.target.files || []).filter((file) =>
        file.type.startsWith("image/"),
      );

      if (files.length > 0) {
        setImages([...images, ...files]);
      }
    },
    [images, setImages],
  );

  const removeImage = useCallback(
    (index: number) => {
      const newImages = images.filter((_, i) => i !== index);
      setImages(newImages);
    },
    [images, setImages],
  );

  if (imagePreviewUrls.length > 0) {
    return (
      <div className="w-full h-full flex flex-col">
        <div className="flex items-center justify-between p-4 border-b border-border">
          <span className="label">
            {images.length} image{images.length > 1 ? "s" : ""} uploaded
          </span>
          <button
            onClick={clearImages}
            className="text-muted hover:text-foreground transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="flex-1 overflow-auto p-4">
          <div className="grid grid-cols-2 gap-3">
            {imagePreviewUrls.map((url, index) => (
              <div key={url} className="relative group aspect-square">
                <img
                  src={url}
                  alt={`Upload ${index + 1}`}
                  className="w-full h-full object-cover rounded-lg"
                />
                <button
                  onClick={() => removeImage(index)}
                  className="absolute top-2 right-2 p-1 bg-background/80 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="w-3 h-3" />
                </button>
                {index === 0 && (
                  <span className="absolute bottom-2 left-2 text-[10px] px-2 py-0.5 bg-foreground text-background rounded-full">
                    Primary
                  </span>
                )}
              </div>
            ))}

            {/* Add more images button */}
            <label className="aspect-square border border-dashed border-border rounded-lg flex items-center justify-center cursor-pointer hover:border-foreground transition-colors">
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleFileInput}
                className="hidden"
              />
              <Upload className="w-6 h-6 text-muted" />
            </label>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      className="w-full h-full flex flex-col items-center justify-center p-8 border-2 border-dashed border-border rounded-lg hover:border-foreground/50 transition-colors cursor-pointer"
    >
      <label className="flex flex-col items-center cursor-pointer">
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileInput}
          className="hidden"
        />
        <div className="w-16 h-16 rounded-full bg-card flex items-center justify-center mb-4">
          <ImageIcon className="w-8 h-8 text-muted" />
        </div>
        <p className="text-lg font-medium mb-2">
          Drop your product photos here
        </p>
        <p className="text-sm text-muted text-center">
          or click to browse • Supports multiple images for Remix
        </p>
      </label>
    </div>
  );
}
