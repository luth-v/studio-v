"use client";

import { PageHeader } from "@/components/page-header";
import { Plus, Search, Users } from "lucide-react";

export default function SellersPage() {
  return (
    <>
      <PageHeader
        title="Sellers"
        description="Manage your clients and brands"
        actions={
          <button className="btn btn-primary">
            <Plus size={16} />
            Add Seller
          </button>
        }
      />

      <div className="flex-1 p-6">
        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted"
            />
            <input
              type="text"
              placeholder="Search sellers..."
              className="input w-full pl-10"
            />
          </div>
        </div>

        {/* Empty State */}
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-16 h-16 rounded-2xl bg-border/50 flex items-center justify-center mb-4">
            <Users size={32} className="text-muted" />
          </div>
          <h3 className="text-lg font-medium mb-2">No sellers yet</h3>
          <p className="text-muted text-sm max-w-sm mb-6">
            Add your first seller to start managing products and running the
            image pipeline.
          </p>
          <button className="btn btn-primary">
            <Plus size={16} />
            Add Your First Seller
          </button>
        </div>
      </div>
    </>
  );
}
