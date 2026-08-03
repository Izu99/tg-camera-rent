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
import { bookings } from "@/lib/data";
import { formatCurrency, formatDate } from "@/lib/format";
import { branchName, customerName, productName } from "@/lib/lookup";
import type { BookingStatus } from "@/lib/types";

const tabs: { label: string; value: "All" | BookingStatus }[] = [
  { label: "All", value: "All" },
  { label: "Pending", value: "Pending" },
  { label: "Confirmed", value: "Confirmed" },
  { label: "Cancelled", value: "Cancelled" },
];

export default function BookingsPage() {
  const [filter, setFilter] = useState<"All" | BookingStatus>("All");

  const filtered = useMemo(
    () => bookings.filter((b) => filter === "All" || b.status === filter),
    [filter]
  );

  const sorted = [...filtered].sort((a, b) => (a.rentalStart < b.rentalStart ? -1 : 1));

  return (
    <div className="flex flex-col gap-4 pb-6">
      <PageHeader
        title="Bookings"
        description={`${bookings.length} total bookings`}
        actions={
          <Button size="sm">
            <Plus className="size-4" />
            New Booking
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
                  <TableHead className="hidden sm:table-cell">Equipment</TableHead>
                  <TableHead>Rental dates</TableHead>
                  <TableHead className="hidden lg:table-cell">Advance</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sorted.map((b) => (
                  <TableRow key={b.id}>
                    <TableCell>
                      <div className="font-medium">{customerName(b.customerId)}</div>
                      <div className="text-xs text-muted-foreground">
                        {b.id.toUpperCase()} · Booked {formatDate(b.bookingDate)}
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
                    <TableCell className="hidden tabular-nums text-muted-foreground lg:table-cell">
                      {formatCurrency(b.advancePayment)}
                    </TableCell>
                    <TableCell className="text-right tabular-nums font-medium">
                      {formatCurrency(b.totalAmount)}
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={b.status} />
                    </TableCell>
                  </TableRow>
                ))}
                {sorted.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={7} className="py-10 text-center text-muted-foreground">
                      No bookings in this filter.
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
