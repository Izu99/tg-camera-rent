"use client";

import { useState } from "react";
import { Plus, Search } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { categories, products, subcategories } from "@/lib/data";
import { subcategoriesFor, subcategoryName } from "@/lib/data/categories";
import { formatCurrency } from "@/lib/format";
import { EquipmentImage } from "@/components/equipment-image";
import { cn } from "@/lib/utils";

const ALL = "all";

export default function InventoryPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState(ALL);
  const [subcategory, setSubcategory] = useState(ALL);

  const subOptions = category === ALL ? subcategories : subcategoriesFor(category);

  const query = search.trim().toLowerCase();
  const rows = products.filter((p) => {
    if (category !== ALL && p.categoryId !== category) return false;
    if (subcategory !== ALL && p.subcategoryId !== subcategory) return false;
    if (!query) return true;
    return (
      p.name.toLowerCase().includes(query) ||
      p.brand.toLowerCase().includes(query) ||
      p.model.toLowerCase().includes(query) ||
      subcategoryName(p.subcategoryId).toLowerCase().includes(query)
    );
  });

  const onHire = products.reduce((s, p) => s + (p.quantity - p.availableQuantity), 0);

  function pickCategory(next: string) {
    setCategory(next);
    setSubcategory(ALL); // the old subcategory may not belong to the new category
  }

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
              placeholder="Search by name, brand, model or type…"
              className="h-8 pl-8 text-sm"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <Select value={category} onValueChange={pickCategory}>
            <SelectTrigger className="h-8 w-full text-sm sm:w-56">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={ALL}>All categories</SelectItem>
              {categories.map((c) => (
                <SelectItem key={c.id} value={c.id}>
                  {c.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={subcategory} onValueChange={setSubcategory}>
            <SelectTrigger className="h-8 w-full text-sm sm:w-56">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={ALL}>All types</SelectItem>
              {subOptions.map((s) => (
                <SelectItem key={s.id} value={s.id}>
                  {s.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
          {rows.map((p) => {
            const pct = Math.round((p.availableQuantity / p.quantity) * 100);
            const none = p.availableQuantity === 0;
            return (
              <article
                key={p.id}
                className="group flex flex-col overflow-hidden rounded-md border border-border bg-card transition-colors hover:border-primary/40"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted">
                  <EquipmentImage
                    src={p.image}
                    alt={p.name}
                    icon={p.icon}
                    sizes="(max-width: 640px) 50vw, (max-width: 1280px) 25vw, 18vw"
                  />
                  <span
                    className={cn(
                      "absolute left-1.5 top-1.5 size-2 rounded-full ring-2 ring-card",
                      none
                        ? "bg-danger"
                        : p.status === "In Repair"
                          ? "bg-warning"
                          : "bg-success"
                    )}
                    title={p.status}
                  />
                </div>

                <div className="flex flex-1 flex-col gap-1.5 p-2">
                  <div className="min-w-0">
                    <h3
                      className="truncate text-xs font-medium leading-tight"
                      title={p.name}
                    >
                      {p.name}
                    </h3>
                    <p className="truncate text-[0.6875rem] text-muted-foreground">
                      {p.brand} · {p.condition}
                    </p>
                  </div>

                  <p className="tabular text-[0.8125rem] font-semibold leading-none">
                    {formatCurrency(p.dailyRate)}
                    <span className="ml-0.5 text-[0.625rem] font-normal text-muted-foreground">
                      /day
                    </span>
                  </p>

                  <div className="mt-auto flex items-center gap-1.5 pt-0.5">
                    <div className="h-1 flex-1 overflow-hidden rounded-full bg-muted">
                      <div
                        className={cn(
                          "h-full rounded-full",
                          none ? "bg-danger" : pct <= 34 ? "bg-warning" : "bg-primary"
                        )}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <span
                      className={cn(
                        "tabular shrink-0 text-[0.625rem] font-medium",
                        none
                          ? "text-danger"
                          : pct <= 34
                            ? "text-warning"
                            : "text-muted-foreground"
                      )}
                    >
                      {p.availableQuantity}/{p.quantity}
                    </span>
                  </div>
                </div>
              </article>
            );
          })}

          {rows.length === 0 && (
            <p className="col-span-full rounded-md border border-dashed border-border py-14 text-center text-sm text-muted-foreground">
              No equipment in this category yet.
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
