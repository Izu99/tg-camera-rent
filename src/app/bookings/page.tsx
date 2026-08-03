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
import { bookings } from "@/lib/data";
import { formatCurrency, formatDate } from "@/lib/format";
import { branchName, customerName, productName } from "@/lib/lookup";
import type { BookingStatus } from "@/lib/types";

const filters: ("All" | BookingStatus)[] = ["All", "Pending", "Confirmed", "Cancelled"];

export default function BookingsPage() {
  const [filter, setFilter] = useState<"All" | BookingStatus>("All");

  const rows = useMemo(
    () =>
      bookings
        .filter((b) => filter === "All" || b.status === filter)
        .sort((a, b) => (a.rentalStart < b.rentalStart ? -1 : 1)),
    [filter]
  );

  const pipeline = bookings
    .filter((b) => b.status !== "Cancelled")
    .reduce((sum, b) => sum + b.totalAmount, 0);

  return (
    <>
      <PageHeader
        title="Bookings"
        description={`${bookings.length} reservations · ${formatCurrency(pipeline)} in pipeline`}
        actions={
          <Button size="sm" className="h-8">
            <Plus className="size-3.5" />
            New booking
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
                <TableHead className="hidden sm:table-cell">Equipment</TableHead>
                <TableHead>Rental dates</TableHead>
                <TableHead className="hidden text-right lg:table-cell">Advance</TableHead>
                <TableHead className="text-right">Total</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((b) => (
                <TableRow key={b.id}>
                  <TableCell>
                    <div className="font-medium">{customerName(b.customerId)}</div>
                    <div className="text-xs text-muted-foreground">
                      {b.id.toUpperCase()} · booked {formatDate(b.bookingDate)}
                    </div>
                  </TableCell>
                  <TableCell className="hidden text-muted-foreground md:table-cell">
                    {branchName(b.branchId)}
                  </TableCell>
                  <TableCell className="hidden text-muted-foreground sm:table-cell">
                    {productName(b.items[0].productId)}
                    {b.items.length > 1 ? ` +${b.items.length - 1}` : ""}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {formatDate(b.rentalStart)} – {formatDate(b.rentalEnd)}
                  </TableCell>
                  <TableCell className="tabular hidden text-right text-muted-foreground lg:table-cell">
                    {formatCurrency(b.advancePayment)}
                  </TableCell>
                  <TableCell className="tabular text-right font-medium">
                    {formatCurrency(b.totalAmount)}
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={b.status} />
                  </TableCell>
                </TableRow>
              ))}
              {rows.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} className="py-12 text-center text-muted-foreground">
                    No bookings with this status.
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
