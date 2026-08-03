"use client";

import { useMemo, useState } from "react";
import { Plus, Search } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { StatusBadge } from "@/components/status-badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { categories, products } from "@/lib/data";
import { formatCurrency } from "@/lib/format";
import { getIcon } from "@/lib/icon-map";

export default function InventoryPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<string>("all");

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchesCategory = category === "all" || p.categoryId === category;
      const matchesSearch =
        !search ||
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.brand.toLowerCase().includes(search.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [search, category]);

  return (
    <div className="flex flex-col gap-4 pb-6">
      <PageHeader
        title="Inventory"
        description={`${products.length} equipment items across ${categories.length} categories`}
        actions={
          <Button size="sm">
            <Plus className="size-4" />
            Add Equipment
          </Button>
        }
      />

      <div className="flex flex-col gap-2 px-4 sm:flex-row md:px-6">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search equipment by name or brand..."
            className="pl-8"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger className="w-full sm:w-52">
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

      <div className="grid grid-cols-1 gap-3 px-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:px-6">
        {filtered.map((p) => {
          const Icon = getIcon(p.icon);
          const pct = Math.round((p.availableQuantity / p.quantity) * 100);
          return (
            <Card key={p.id} className="gap-3 py-4">
              <CardContent className="flex flex-col gap-3 px-4">
                <div className="flex items-start justify-between">
                  <div className="flex size-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Icon className="size-5" />
                  </div>
                  <StatusBadge status={p.status} />
                </div>
                <div>
                  <p className="font-medium leading-tight">{p.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {p.brand} · {p.year} · {p.condition}
                  </p>
                </div>
                <div className="flex items-baseline justify-between">
                  <span className="text-lg font-semibold">{formatCurrency(p.dailyRate)}</span>
                  <span className="text-xs text-muted-foreground">/ day</span>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>
                      {p.availableQuantity} of {p.quantity} available
                    </span>
                    <span>{pct}%</span>
                  </div>
                  <Progress value={pct} className="h-1.5" />
                </div>
              </CardContent>
            </Card>
          );
        })}
        {filtered.length === 0 && (
          <p className="col-span-full py-10 text-center text-sm text-muted-foreground">
            No equipment matches your search.
          </p>
        )}
      </div>
    </div>
  );
}
