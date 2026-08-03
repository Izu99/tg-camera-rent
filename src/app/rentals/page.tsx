"use client";

import { useMemo, useState } from "react";
import { Plus } from "lucide-react";
import { PageHeader, Panel } from "@/components/page-header";
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
import { rentals } from "@/lib/data";
import { formatCurrency, formatDate } from "@/lib/format";
import { branchName, customerName, productName } from "@/lib/lookup";
import type { RentalStatus } from "@/lib/types";

const filters: ("All" | RentalStatus)[] = ["All", "Active", "Overdue", "Returned"];

export default function RentalsPage() {
  const [filter, setFilter] = useState<"All" | RentalStatus>("All");

  const rows = useMemo(
    () =>
      rentals
        .filter((r) => filter === "All" || r.status === filter)
        .sort((a, b) => (a.expectedReturnDate < b.expectedReturnDate ? -1 : 1)),
    [filter]
  );

  const onHire = rentals.reduce((sum, r) => sum + r.totalValue, 0);

  return (
    <>
      <PageHeader
        title="Rentals"
        description={`${rentals.length} open issues · ${formatCurrency(onHire)} of kit on hire`}
        actions={
          <Button size="sm" className="h-8">
            <Plus className="size-3.5" />
            Issue rental
          </Button>
        }
      />

      <div className="flex flex-col gap-3 p-3 md:p-4">
        <Tabs value={filter} onValueChange={(v) => setFilter(v as typeof filter)}>
          <TabsList className="h-8">
            {filters.map((f) => (
              <TabsTrigger key={f} value={f} className="text-xs">
                {f}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        <Panel bleed>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead className="hidden md:table-cell">Branch</TableHead>
                <TableHead>Equipment</TableHead>
                <TableHead className="hidden sm:table-cell">Issued</TableHead>
                <TableHead>Due back</TableHead>
                <TableHead className="hidden lg:table-cell">Issued by</TableHead>
                <TableHead className="text-right">Value</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((r) => (
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
                  <TableCell
                    className={
                      r.status === "Overdue"
                        ? "font-medium text-danger"
                        : "text-muted-foreground"
                    }
                  >
                    {formatDate(r.expectedReturnDate)}
                  </TableCell>
                  <TableCell className="hidden text-muted-foreground lg:table-cell">
                    {r.staffName}
                  </TableCell>
                  <TableCell className="tabular text-right font-medium">
                    {formatCurrency(r.totalValue)}
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={r.status} />
                  </TableCell>
                </TableRow>
              ))}
              {rows.length === 0 && (
                <TableRow>
                  <TableCell colSpan={8} className="py-12 text-center text-muted-foreground">
                    No rentals with this status.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Panel>
      </div>
    </>
  );
}
