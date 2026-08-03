"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { navItems } from "@/components/nav-items";
import { cn } from "@/lib/utils";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { COMPANY_NAME } from "@/lib/data";

const primaryItems = navItems.filter((item) => item.mobilePrimary);
const moreItems = navItems.filter((item) => !item.mobilePrimary);

export function MobileBottomNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isMoreActive = moreItems.some((item) =>
    item.href === "/" ? pathname === "/" : pathname.startsWith(item.href)
  );

  return (
    <>
      <nav
        className="fixed inset-x-0 bottom-0 z-50 flex h-16 items-stretch border-t border-border bg-sidebar pb-[env(safe-area-inset-bottom)] md:hidden"
        aria-label="Primary"
      >
        {primaryItems.map((item) => {
          const active =
            item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-1 flex-col items-center justify-center gap-0.5 text-[11px] font-medium transition-colors",
                active
                  ? "text-sidebar-primary"
                  : "text-sidebar-foreground/55 active:text-sidebar-foreground"
              )}
            >
              <item.icon className={cn("size-5", active && "text-sidebar-primary")} />
              {item.title}
            </Link>
          );
        })}
        <button
          type="button"
          onClick={() => setOpen(true)}
          className={cn(
            "flex flex-1 flex-col items-center justify-center gap-0.5 text-[11px] font-medium transition-colors",
            isMoreActive
              ? "text-sidebar-primary"
              : "text-sidebar-foreground/55 active:text-sidebar-foreground"
          )}
        >
          <Menu className={cn("size-5", isMoreActive && "text-sidebar-primary")} />
          More
        </button>
      </nav>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="bottom" className="rounded-t-2xl md:hidden">
          <SheetHeader>
            <SheetTitle>{COMPANY_NAME}</SheetTitle>
          </SheetHeader>
          <div className="grid grid-cols-4 gap-3 px-4 pb-6">
            {moreItems.map((item) => {
              const active =
                item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "flex flex-col items-center justify-center gap-1.5 rounded-lg border p-3 text-xs font-medium transition-colors",
                    active
                      ? "border-primary/40 bg-accent text-accent-foreground"
                      : "border-border text-muted-foreground active:bg-accent"
                  )}
                >
                  <item.icon className="size-5" />
                  <span className="text-center leading-tight">{item.title}</span>
                </Link>
              );
            })}
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
