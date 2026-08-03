"use client";

import { usePathname } from "next/navigation";
import { Bell, Camera, Search } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { COMPANY_NAME } from "@/lib/data";
import { navItems } from "@/components/nav-items";

function useSectionTitle() {
  const pathname = usePathname();
  if (pathname === "/") return "Dashboard";
  const match = [...navItems]
    .filter((item) => item.href !== "/")
    .sort((a, b) => b.href.length - a.href.length)
    .find((item) => pathname.startsWith(item.href));
  return match?.title ?? "Dashboard";
}

export function SiteHeader() {
  const title = useSectionTitle();
  return (
    <header className="sticky top-0 z-40 flex h-14 shrink-0 items-center gap-2 border-b border-border bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/80 md:px-6">
      <SidebarTrigger className="hidden md:flex -ml-1" />
      <Separator orientation="vertical" className="mr-1 hidden h-4 md:block" />

      <div className="flex items-center gap-2 md:hidden">
        <div className="flex size-7 items-center justify-center rounded-md bg-primary text-primary-foreground">
          <Camera className="size-4" />
        </div>
        <span className="font-semibold">{COMPANY_NAME}</span>
      </div>

      <h1 className="hidden text-base font-semibold md:block">{title}</h1>

      <div className="ml-auto flex items-center gap-2">
        <div className="relative hidden sm:block">
          <Search className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search customers, equipment, invoices..."
            className="h-9 w-56 pl-8 lg:w-72"
          />
        </div>
        <button
          type="button"
          className="relative flex size-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
        >
          <Bell className="size-5" />
          <Badge className="absolute -right-0.5 -top-0.5 flex size-4 items-center justify-center rounded-full bg-primary p-0 text-[10px] text-primary-foreground">
            3
          </Badge>
        </button>
        <Avatar className="size-8">
          <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">
            TG
          </AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
