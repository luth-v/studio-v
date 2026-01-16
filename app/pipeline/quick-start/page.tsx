"use client";

import { UploadZone } from "@/components/upload-zone";
import { JsonEditor } from "@/components/json-editor";
import { HistorySidebar } from "@/components/history-sidebar";
import { ControlPanel } from "@/components/control-panel";
import { PageHeader } from "@/components/page-header";

export default function QuickStartPage() {
  return (
    <>
      <PageHeader
        title="Quick Start"
        description="Transform product photos into AI prompts (no product required)"
      />

      <div className="flex-1 flex overflow-hidden">
        {/* History Sidebar */}
        <aside className="w-64 border-r border-border hidden lg:block">
          <HistorySidebar />
        </aside>

        {/* Main Editor Area */}
        <div className="flex-1 flex flex-col overflow-hidden">
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
        </div>
      </div>
    </>
  );
}
