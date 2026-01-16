"use client";

import { PageHeader } from "@/components/page-header";
import { Plus, Search, Package, Filter } from "lucide-react";

export default function ProductsPage() {
  return (
    <>
      <PageHeader
        title="Products"
        description="Manage products and their variants"
        actions={
          <button className="btn btn-primary">
            <Plus size={16} />
            Add Product
          </button>
        }
      />

      <div className="flex-1 p-6">
        {/* Filters Bar */}
        <div className="flex items-center gap-4 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted"
            />
            <input
              type="text"
              placeholder="Search products..."
              className="input w-full pl-10"
            />
          </div>
          <select className="select">
            <option value="">All Sellers</option>
          </select>
          <select className="select">
            <option value="">All Status</option>
            <option value="pending">Pending</option>
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        {/* Empty State */}
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-16 h-16 rounded-2xl bg-border/50 flex items-center justify-center mb-4">
            <Package size={32} className="text-muted" />
          </div>
          <h3 className="text-lg font-medium mb-2">No products yet</h3>
          <p className="text-muted text-sm max-w-sm mb-6">
            Products will appear here once you add them. Start by creating a
            seller first.
          </p>
          <button className="btn btn-secondary">
            <Filter size={16} />
            View Sellers
          </button>
        </div>
      </div>
    </>
  );
}
