"use client";

import { PageHeader } from "@/components/page-header";
import { Workflow, ArrowRight, ImageIcon, Sparkles, Check } from "lucide-react";
import Link from "next/link";

const steps = [
  { id: 1, label: "Select Product", icon: Package, done: false },
  { id: 2, label: "Upload Images", icon: ImageIcon, done: false },
  { id: 3, label: "AI Analysis", icon: Sparkles, done: false },
  { id: 4, label: "Generate", icon: Workflow, done: false },
  { id: 5, label: "Review & Save", icon: Check, done: false },
];

import { Package } from "lucide-react";

export default function PipelinePage() {
  return (
    <>
      <PageHeader
        title="Pipeline"
        description="Transform product photos into AI-generated images"
      />

      <div className="flex-1 p-6">
        {/* Pipeline Steps Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-center gap-2">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div
                  className={`
                    flex items-center gap-2 px-4 py-2 rounded-full
                    ${step.done ? "bg-foreground text-background" : "bg-border/50 text-muted"}
                  `}
                >
                  <step.icon size={16} />
                  <span className="text-sm font-medium hidden sm:inline">
                    {step.label}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <ArrowRight size={16} className="mx-2 text-muted" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Empty State - Start Pipeline */}
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-border to-border/30 flex items-center justify-center mb-6">
            <Workflow size={40} className="text-muted" />
          </div>
          <h3 className="text-xl font-medium mb-3">Start the Image Pipeline</h3>
          <p className="text-muted text-sm max-w-md mb-8">
            Select a product, upload images, let AI analyze and generate
            professional marketing photos.
          </p>

          <div className="flex gap-3">
            <button className="btn btn-primary">
              <Package size={16} />
              Select Product
            </button>
            <Link href="/pipeline/quick-start" className="btn btn-secondary">
              Quick Start (No Product)
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
