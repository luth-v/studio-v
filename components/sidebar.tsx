"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Package,
  Workflow,
  ImageIcon,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useState } from "react";

const navItems = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/sellers", label: "Sellers", icon: Users },
  { href: "/products", label: "Products", icon: Package },
  { href: "/pipeline", label: "Pipeline", icon: Workflow },
  { href: "/media", label: "Media Gallery", icon: ImageIcon },
];

export function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={`
        ${collapsed ? "w-16" : "w-56"} 
        h-screen border-r border-border bg-card 
        flex flex-col transition-all duration-200 ease-in-out
        shrink-0
      `}
    >
      {/* Logo */}
      <div className="h-14 flex items-center px-4 border-b border-border">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-foreground flex items-center justify-center shrink-0">
            <span className="text-background text-sm font-bold">V</span>
          </div>
          {!collapsed && (
            <span className="text-base font-semibold tracking-tight">
              Studio-V
            </span>
          )}
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 px-2 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive =
            item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`
                flex items-center gap-3 px-3 py-2.5 rounded-lg
                transition-all duration-150 group
                ${
                  isActive
                    ? "bg-foreground text-background"
                    : "text-muted hover:text-foreground hover:bg-border/50"
                }
              `}
              title={collapsed ? item.label : undefined}
            >
              <item.icon
                size={20}
                className={`shrink-0 ${isActive ? "" : "group-hover:scale-110 transition-transform"}`}
              />
              {!collapsed && (
                <span className="text-sm font-medium">{item.label}</span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Collapse Toggle */}
      <div className="p-2 border-t border-border">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg
                     text-muted hover:text-foreground hover:bg-border/50
                     transition-all duration-150"
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          {!collapsed && <span className="text-xs">Collapse</span>}
        </button>
      </div>
    </aside>
  );
}
