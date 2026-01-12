"use client";

import { useState } from "react";
import { Header, Sidebar } from "@/components/layout";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // TODO: Add admin auth check here using Privy
  // For now, render the layout without auth check

  return (
    <div className="min-h-screen bg-background">
      <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
      <div className="flex">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <main className="flex-1 md:ml-64">
          <div className="container mx-auto py-6 px-4 md:px-6">{children}</div>
        </main>
      </div>
    </div>
  );
}
