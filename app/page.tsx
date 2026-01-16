"use client";

import { UploadZone } from "@/components/upload-zone";
import { JsonEditor } from "@/components/json-editor";
import { HistorySidebar } from "@/components/history-sidebar";
import { ControlPanel } from "@/components/control-panel";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-foreground flex items-center justify-center">
            <span className="text-background text-sm font-bold">V</span>
          </div>
          <h1 className="text-lg font-semibold">Studio-V</h1>
        </div>
        <p className="text-sm text-muted hidden sm:block">
          Transform product photos into AI prompts
        </p>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* History Sidebar */}
        <aside className="w-64 border-r border-border hidden lg:block">
          <HistorySidebar />
        </aside>

        {/* Main Editor Area */}
        <main className="flex-1 flex flex-col overflow-hidden">
          {/* Control Panel */}
          <ControlPanel />

          {/* Split View */}
          <div className="flex-1 flex overflow-hidden">
            {/* Left: Upload Zone */}
            <div className="w-1/2 border-r border-border p-4 overflow-auto">
              <UploadZone />
            </div>

            {/* Right: JSON Editor */}
            <div className="w-1/2 flex flex-col overflow-hidden">
              <JsonEditor />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
