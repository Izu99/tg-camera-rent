"use client";

import { useMemo, useState } from "react";
import { Plus } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { StatusBadge } from "@/components/status-badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { rentals } from "@/lib/data";
import { formatCurrency, formatDate } from "@/lib/format";
import { branchName, customerName, productName } from "@/lib/lookup";
import type { RentalStatus } from "@/lib/types";

const tabs: { label: string; value: "All" | RentalStatus }[] = [
  { label: "All", value: "All" },
  { label: "Active", value: "Active" },
  { label: "Overdue", value: "Overdue" },
  { label: "Returned", value: "Returned" },
];

export default function RentalsPage() {
  const [filter, setFilter] = useState<"All" | RentalStatus>("All");

  const filtered = useMemo(
    () => rentals.filter((r) => filter === "All" || r.status === filter),
    [filter]
  );

  const sorted = [...filtered].sort((a, b) =>
    a.expectedReturnDate < b.expectedReturnDate ? -1 : 1
  );

  return (
    <div className="flex flex-col gap-4 pb-6">
      <PageHeader
        title="Rentals"
        description={`${rentals.length} equipment issues currently tracked`}
        actions={
          <Button size="sm">
            <Plus className="size-4" />
            New Rental
          </Button>
        }
      />

      <div className="px-4 md:px-6">
        <Tabs value={filter} onValueChange={(v) => setFilter(v as typeof filter)}>
          <TabsList>
            {tabs.map((t) => (
              <TabsTrigger key={t.value} value={t.value}>
                {t.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      <div className="px-4 md:px-6">
        <Card className="py-0">
          <CardContent className="px-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Customer</TableHead>
                  <TableHead className="hidden md:table-cell">Branch</TableHead>
                  <TableHead>Equipment</TableHead>
                  <TableHead className="hidden sm:table-cell">Issued</TableHead>
                  <TableHead>Due back</TableHead>
                  <TableHead className="hidden lg:table-cell">Staff</TableHead>
                  <TableHead className="text-right">Value</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sorted.map((r) => (
                  <TableRow key={r.id}>
                    <TableCell>
                      <div className="font-medium">{customerName(r.customerId)}</div>
                      <div className="text-xs text-muted-foreground">{r.id.toUpperCase()}</div>
                    </TableCell>
                    <TableCell className="hidden text-muted-foreground md:table-cell">
                      {branchName(r.branchId)}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {productName(r.items[0].productId)}
                      {r.items.length > 1 ? ` +${r.items.length - 1}` : ""}
                    </TableCell>
                    <TableCell className="hidden text-muted-foreground sm:table-cell">
                      {formatDate(r.issueDate)}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {formatDate(r.expectedReturnDate)}
                    </TableCell>
                    <TableCell className="hidden text-muted-foreground lg:table-cell">
                      {r.staffName}
                    </TableCell>
                    <TableCell className="text-right tabular-nums font-medium">
                      {formatCurrency(r.totalValue)}
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={r.status} />
                    </TableCell>
                  </TableRow>
                ))}
                {sorted.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={8} className="py-10 text-center text-muted-foreground">
                      No rentals in this filter.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
