"use client"
import { Sidebar, SidebarProvider } from "@/components/ui/sidebar";
import React from "react";

export function AppSidebar() {
  const [open, setOpen] = React.useState(false);

  return (
    <SidebarProvider open={open} onOpenChange={setOpen}>
      <Sidebar />
    </SidebarProvider>
  );
}
