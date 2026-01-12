"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  LayoutDashboard,
  Database,
  Globe,
  ShieldCheck,
  Settings,
  Plus,
  FileText,
  ChevronLeft,
  Rss,
  Users,
  Activity,
} from "lucide-react";

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const navigation = [
  {
    title: "Discover",
    items: [
      {
        title: "Featured Feeds",
        href: "/",
        icon: LayoutDashboard,
      },
      {
        title: "Browse All",
        href: "/feeds",
        icon: Rss,
      },
      {
        title: "Verify Proof",
        href: "/verify",
        icon: ShieldCheck,
      },
    ],
  },
  {
    title: "Admin",
    requiresAuth: true,
    items: [
      {
        title: "Dashboard",
        href: "/admin",
        icon: LayoutDashboard,
      },
      {
        title: "Operators",
        href: "/admin/operators",
        icon: Users,
      },
      {
        title: "Tasks",
        href: "/admin/tasks",
        icon: Activity,
      },
      {
        title: "Data Sources",
        href: "/admin/sources",
        icon: Database,
      },
      {
        title: "New Source",
        href: "/admin/sources/new",
        icon: Plus,
      },
      {
        title: "Settings",
        href: "/admin/settings",
        icon: Settings,
      },
    ],
  },
  {
    title: "Resources",
    items: [
      {
        title: "Documentation",
        href: "/docs",
        icon: FileText,
      },
      {
        title: "API Reference",
        href: "/docs/api",
        icon: Globe,
      },
    ],
  },
];

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-16 z-40 h-[calc(100vh-4rem)] w-64 border-r bg-background transition-transform duration-300 ease-in-out md:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Mobile close button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-2 top-2 md:hidden"
          onClick={onClose}
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>

        <ScrollArea className="h-full py-6 pr-4">
          <div className="space-y-6 px-3">
            {navigation.map((section) => (
              <div key={section.title}>
                <h4 className="mb-2 px-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  {section.title}
                </h4>
                <div className="space-y-1">
                  {section.items.map((item) => {
                    const isActive =
                      pathname === item.href ||
                      (item.href !== "/" && pathname.startsWith(item.href));
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={onClose}
                        className={cn(
                          "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                          isActive
                            ? "bg-primary text-primary-foreground"
                            : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                        )}
                      >
                        <item.icon className="h-4 w-4" />
                        {item.title}
                      </Link>
                    );
                  })}
                </div>
                <Separator className="mt-4" />
              </div>
            ))}
          </div>
        </ScrollArea>
      </aside>
    </>
  );
}
