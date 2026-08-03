"use client";

import { usePathname } from "next/navigation";
import { Aperture, Bell, Search } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { COMPANY_NAME, CURRENT_DATE } from "@/lib/data";
import { sectionTitle } from "@/components/nav-items";
import { formatDate } from "@/lib/format";

export function SiteHeader() {
  const pathname = usePathname();
  const title = sectionTitle(pathname);

  return (
    <header className="sticky top-0 z-40 flex h-12 shrink-0 items-center gap-2 border-b border-border bg-background/90 px-3 backdrop-blur supports-[backdrop-filter]:bg-background/75 md:px-4">
      <SidebarTrigger className="-ml-1 hidden size-7 md:flex" />
      <Separator orientation="vertical" className="mr-1 hidden h-4 md:block" />

      <div className="flex items-center gap-2 md:hidden">
        <div className="flex size-6 items-center justify-center rounded bg-primary text-primary-foreground">
          <Aperture className="size-3.5" strokeWidth={2.25} />
        </div>
        <span className="text-sm font-semibold tracking-tight">{COMPANY_NAME}</span>
      </div>

      <nav className="hidden items-center gap-1.5 text-[0.8125rem] md:flex" aria-label="Breadcrumb">
        <span className="text-muted-foreground">Ops</span>
        <span className="text-muted-foreground/40">/</span>
        <span className="font-medium">{title}</span>
      </nav>

      <div className="ml-auto flex items-center gap-1.5">
        <span className="hidden text-xs text-muted-foreground lg:block">
          {formatDate(CURRENT_DATE)}
        </span>
        <Separator orientation="vertical" className="mx-1 hidden h-4 lg:block" />

        <button
          type="button"
          aria-label="Search"
          className="hidden h-7 items-center gap-2 rounded-md border border-border bg-muted/50 px-2 text-xs text-muted-foreground transition-colors hover:bg-muted sm:flex"
        >
          <Search className="size-3.5" />
          <span>Search</span>
          <kbd className="rounded border border-border bg-background px-1 font-mono text-[0.625rem]">
            ⌘K
          </kbd>
        </button>

        <button
          type="button"
          aria-label="Notifications"
          className="relative flex size-7 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
        >
          <Bell className="size-4" />
          <span className="absolute right-1 top-1 size-1.5 rounded-full bg-danger ring-2 ring-background" />
        </button>

        <Avatar className="size-7">
          <AvatarFallback className="bg-primary/10 text-[0.625rem] font-semibold text-primary">
            TG
          </AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
