"use client";

import { PageHeader } from "@/components/page-header";
import { ImageIcon, Grid3X3, List, Filter } from "lucide-react";
import { useState } from "react";

export default function MediaPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  return (
    <>
      <PageHeader
        title="Media Gallery"
        description="All original and generated images"
        actions={
          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === "grid"
                  ? "bg-foreground text-background"
                  : "text-muted hover:text-foreground hover:bg-border/50"
              }`}
            >
              <Grid3X3 size={18} />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === "list"
                  ? "bg-foreground text-background"
                  : "text-muted hover:text-foreground hover:bg-border/50"
              }`}
            >
              <List size={18} />
            </button>
          </div>
        }
      />

      <div className="flex-1 p-6">
        {/* Filters */}
        <div className="flex items-center gap-4 mb-6">
          <select className="select">
            <option value="">All Types</option>
            <option value="original">Original</option>
            <option value="generated">Generated</option>
          </select>
          <select className="select">
            <option value="">All Products</option>
          </select>
          <button className="btn btn-secondary">
            <Filter size={16} />
            More Filters
          </button>
        </div>

        {/* Empty State */}
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-16 h-16 rounded-2xl bg-border/50 flex items-center justify-center mb-4">
            <ImageIcon size={32} className="text-muted" />
          </div>
          <h3 className="text-lg font-medium mb-2">No media yet</h3>
          <p className="text-muted text-sm max-w-sm mb-6">
            Images will appear here as you process products through the
            pipeline.
          </p>
          <button className="btn btn-primary">Go to Pipeline</button>
        </div>
      </div>
    </>
  );
}
