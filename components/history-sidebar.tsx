"use client";

import { useStore } from "@/lib/store";
import { Clock, FileJson } from "lucide-react";

export function HistorySidebar() {
  const { history, loadFromHistory } = useStore();

  if (history.length === 0) {
    return (
      <div className="w-full h-full flex flex-col">
        <div className="p-4 border-b border-border">
          <span className="label">History</span>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
          <Clock className="w-8 h-8 text-muted mb-3" />
          <p className="text-sm text-muted">No history yet</p>
          <p className="text-xs text-muted/60 mt-1">
            Generated prompts will appear here
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col">
      <div className="p-4 border-b border-border">
        <span className="label">History ({history.length})</span>
      </div>
      <div className="flex-1 overflow-auto">
        {history.map((item) => (
          <button
            key={item.id}
            onClick={() => loadFromHistory(item)}
            className="w-full p-3 border-b border-border hover:bg-card transition-colors text-left"
          >
            <div className="flex items-start gap-3">
              {item.thumbnail_url ? (
                <img
                  src={item.thumbnail_url}
                  alt=""
                  className="w-10 h-10 rounded object-cover flex-shrink-0"
                />
              ) : (
                <div className="w-10 h-10 rounded bg-card flex items-center justify-center flex-shrink-0">
                  <FileJson className="w-4 h-4 text-muted" />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium truncate capitalize">
                  {item.vibe.replace(/-/g, " ")}
                </p>
                <p className="text-[10px] text-muted mt-0.5">
                  {new Date(item.created_at).toLocaleTimeString()}
                </p>
                <p className="text-[10px] text-muted/60 mt-0.5">
                  {item.provider}
                </p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
