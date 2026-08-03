"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MoreHorizontal } from "lucide-react";
import { navGroups, navItems, isActive } from "@/components/nav-items";
import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";

const primaryItems = navItems.filter((item) => item.mobilePrimary);

export function MobileBottomNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const moreActive =
    !primaryItems.some((i) => isActive(pathname, i.href)) && pathname !== "/";

  return (
    <>
      <nav
        className="fixed inset-x-0 bottom-0 z-50 flex h-14 items-stretch border-t border-sidebar-border bg-sidebar pb-[env(safe-area-inset-bottom)] md:hidden"
        aria-label="Primary"
      >
        {primaryItems.map((item) => {
          const active = isActive(pathname, item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={active ? "page" : undefined}
              className="relative flex flex-1 flex-col items-center justify-center gap-1"
            >
              {active && (
                <span className="absolute inset-x-5 top-0 h-0.5 rounded-full bg-sidebar-primary" />
              )}
              <item.icon
                className={cn(
                  "size-[1.125rem] transition-colors",
                  active ? "text-sidebar-primary" : "text-sidebar-foreground/50"
                )}
                strokeWidth={active ? 2.25 : 1.9}
              />
              <span
                className={cn(
                  "text-[0.625rem] font-medium transition-colors",
                  active ? "text-sidebar-primary" : "text-sidebar-foreground/50"
                )}
              >
                {item.title}
              </span>
            </Link>
          );
        })}

        <button
          type="button"
          onClick={() => setOpen(true)}
          className="relative flex flex-1 flex-col items-center justify-center gap-1"
        >
          {moreActive && (
            <span className="absolute inset-x-5 top-0 h-0.5 rounded-full bg-sidebar-primary" />
          )}
          <MoreHorizontal
            className={cn(
              "size-[1.125rem]",
              moreActive ? "text-sidebar-primary" : "text-sidebar-foreground/50"
            )}
          />
          <span
            className={cn(
              "text-[0.625rem] font-medium",
              moreActive ? "text-sidebar-primary" : "text-sidebar-foreground/50"
            )}
          >
            More
          </span>
        </button>
      </nav>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="bottom" className="rounded-t-xl pb-[env(safe-area-inset-bottom)] md:hidden">
          <SheetHeader className="pb-1">
            <SheetTitle className="text-sm">All sections</SheetTitle>
          </SheetHeader>
          <div className="max-h-[65vh] overflow-y-auto px-4 pb-5">
            {navGroups.map((group) => (
              <div key={group.label} className="mb-4 last:mb-0">
                <p className="label-micro mb-2">{group.label}</p>
                <div className="grid grid-cols-2 gap-2">
                  {group.items.map((item) => {
                    const active = isActive(pathname, item.href);
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setOpen(false)}
                        className={cn(
                          "flex items-center gap-2.5 rounded-md border px-3 py-2.5 text-[0.8125rem] font-medium transition-colors",
                          active
                            ? "border-primary/30 bg-primary/8 text-primary"
                            : "border-border text-foreground/80 active:bg-accent"
                        )}
                      >
                        <item.icon className="size-4 shrink-0" strokeWidth={1.9} />
                        <span className="truncate">{item.title}</span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
