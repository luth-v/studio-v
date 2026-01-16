"use client";

import { PageHeader } from "@/components/page-header";
import {
  Users,
  Package,
  ImageIcon,
  TrendingUp,
  ArrowRight,
  Clock,
  Sparkles,
} from "lucide-react";
import Link from "next/link";

const stats = [
  {
    label: "Total Sellers",
    value: "0",
    change: null,
    icon: Users,
    href: "/sellers",
  },
  {
    label: "Products",
    value: "0",
    change: null,
    icon: Package,
    href: "/products",
  },
  {
    label: "Media Files",
    value: "0",
    change: null,
    icon: ImageIcon,
    href: "/media",
  },
  {
    label: "Generated Today",
    value: "0",
    change: null,
    icon: Sparkles,
    href: "/media",
  },
];

const quickActions = [
  {
    label: "Add New Seller",
    description: "Register a new client or brand",
    href: "/sellers",
    icon: Users,
  },
  {
    label: "Create Product",
    description: "Add a product to process",
    href: "/products",
    icon: Package,
  },
  {
    label: "Start Pipeline",
    description: "Generate AI marketing images",
    href: "/pipeline",
    icon: Sparkles,
  },
];

export default function DashboardPage() {
  return (
    <>
      <PageHeader
        title="Dashboard"
        description="Overview of your digital marketing pipeline"
      />

      <div className="flex-1 p-6 overflow-auto">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat) => (
            <Link
              key={stat.label}
              href={stat.href}
              className="card p-5 hover:border-foreground/30 transition-colors group"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="p-2 rounded-lg bg-border/50 group-hover:bg-border transition-colors">
                  <stat.icon size={20} className="text-muted" />
                </div>
                {stat.change && (
                  <span className="flex items-center gap-1 text-xs text-green-500">
                    <TrendingUp size={12} />
                    {stat.change}
                  </span>
                )}
              </div>
              <div className="text-2xl font-semibold mb-1">{stat.value}</div>
              <div className="text-sm text-muted">{stat.label}</div>
            </Link>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-sm font-medium text-muted uppercase tracking-wide mb-4">
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {quickActions.map((action) => (
              <Link
                key={action.label}
                href={action.href}
                className="card p-5 hover:border-foreground/30 transition-all group flex items-center gap-4"
              >
                <div className="p-3 rounded-xl bg-gradient-to-br from-border to-border/30 group-hover:from-foreground/20 group-hover:to-border transition-all">
                  <action.icon size={24} className="text-foreground" />
                </div>
                <div className="flex-1">
                  <div className="font-medium mb-1 group-hover:text-foreground transition-colors">
                    {action.label}
                  </div>
                  <div className="text-sm text-muted">{action.description}</div>
                </div>
                <ArrowRight
                  size={18}
                  className="text-muted group-hover:text-foreground group-hover:translate-x-1 transition-all"
                />
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div>
          <h2 className="text-sm font-medium text-muted uppercase tracking-wide mb-4">
            Recent Activity
          </h2>
          <div className="card p-8 text-center">
            <div className="w-12 h-12 rounded-full bg-border/50 flex items-center justify-center mx-auto mb-4">
              <Clock size={24} className="text-muted" />
            </div>
            <p className="text-muted text-sm">
              No recent activity. Start by adding a seller or processing some
              images.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
