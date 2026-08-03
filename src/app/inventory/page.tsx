"use client";

import { useMemo, useState } from "react";
import { Plus, Search } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { StatusBadge } from "@/components/status-badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { categories, products } from "@/lib/data";
import { formatCurrency } from "@/lib/format";
import { EquipmentImage } from "@/components/equipment-image";
import { cn } from "@/lib/utils";

export default function InventoryPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");

  const rows = useMemo(() => {
    const q = search.trim().toLowerCase();
    return products.filter((p) => {
      const inCategory = category === "all" || p.categoryId === category;
      const matches =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.model.toLowerCase().includes(q);
      return inCategory && matches;
    });
  }, [search, category]);

  const onHire = products.reduce((s, p) => s + (p.quantity - p.availableQuantity), 0);

  return (
    <>
      <PageHeader
        title="Inventory"
        description={`${products.length} lines across ${categories.length} categories · ${onHire} units on hire`}
        actions={
          <Button size="sm" className="h-8">
            <Plus className="size-3.5" />
            Add equipment
          </Button>
        }
      />

      <div className="flex flex-col gap-3 p-3 md:p-4">
        <div className="flex flex-col gap-2 sm:flex-row">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search by name, brand or model…"
              className="h-8 pl-8 text-sm"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="h-8 w-full text-sm sm:w-48">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All categories</SelectItem>
              {categories.map((c) => (
                <SelectItem key={c.id} value={c.id}>
                  {c.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {rows.map((p) => {
            const pct = Math.round((p.availableQuantity / p.quantity) * 100);
            const none = p.availableQuantity === 0;
            return (
              <article
                key={p.id}
                className="group flex flex-col overflow-hidden rounded-lg border border-border bg-card transition-colors hover:border-primary/30"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted">
                  <EquipmentImage
                    src={p.image}
                    alt={p.name}
                    icon={p.icon}
                    className="transition-transform duration-300 group-hover:scale-[1.03]"
                  />
                  <div className="absolute right-2 top-2">
                    <StatusBadge status={p.status} className="bg-card/90 backdrop-blur" />
                  </div>
                </div>

                <div className="flex flex-1 flex-col gap-3 p-3">
                  <div className="min-w-0">
                    <h3 className="truncate text-[0.8125rem] font-medium leading-tight">
                      {p.name}
                    </h3>
                    <p className="mt-0.5 truncate text-xs text-muted-foreground">
                      {p.brand} · {p.year} · {p.condition}
                    </p>
                  </div>

                  <div className="flex items-end justify-between gap-2">
                    <div>
                      <p className="label-micro">Daily rate</p>
                      <p className="tabular text-base font-semibold leading-tight">
                        {formatCurrency(p.dailyRate)}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="label-micro">Deposit</p>
                      <p className="tabular text-xs text-muted-foreground">
                        {formatCurrency(p.depositAmount)}
                      </p>
                    </div>
                  </div>

                  <div className="mt-auto space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">
                        {p.availableQuantity} of {p.quantity} available
                      </span>
                      <span
                        className={cn(
                          "tabular font-medium",
                          none
                            ? "text-danger"
                            : pct <= 34
                              ? "text-warning"
                              : "text-muted-foreground"
                        )}
                      >
                        {pct}%
                      </span>
                    </div>
                    <div className="h-1 overflow-hidden rounded-full bg-muted">
                      <div
                        className={cn(
                          "h-full rounded-full",
                          none ? "bg-danger" : pct <= 34 ? "bg-warning" : "bg-primary"
                        )}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                </div>
              </article>
            );
          })}

          {rows.length === 0 && (
            <p className="col-span-full rounded-lg border border-dashed border-border py-14 text-center text-sm text-muted-foreground">
              No equipment matches that search.
            </p>
          )}
        </div>

        <p className="text-xs text-muted-foreground">
          Equipment photographs courtesy of Wikimedia Commons contributors, reused under
          CC&nbsp;BY / CC&nbsp;BY-SA licences.
        </p>
      </div>
    </>
  );
}
