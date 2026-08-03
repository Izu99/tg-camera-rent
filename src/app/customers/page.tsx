"use client";

import { useMemo, useState } from "react";
import { Plus, Search, Star, ShieldCheck, ShieldAlert } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { StatusBadge } from "@/components/status-badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { customers } from "@/lib/data";
import { formatCurrency, formatDate, initials } from "@/lib/format";

export default function CustomersPage() {
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return customers.filter(
      (c) =>
        !q ||
        c.fullName.toLowerCase().includes(q) ||
        c.city.toLowerCase().includes(q) ||
        c.phone.includes(q)
    );
  }, [search]);

  const sorted = [...filtered].sort((a, b) => b.totalSpent - a.totalSpent);

  return (
    <div className="flex flex-col gap-4 pb-6">
      <PageHeader
        title="Customers"
        description={`${customers.length} registered customers`}
        actions={
          <Button size="sm">
            <Plus className="size-4" />
            Add Customer
          </Button>
        }
      />

      <div className="px-4 md:px-6">
        <div className="relative max-w-sm">
          <Search className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search by name, city or phone..."
            className="pl-8"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="px-4 md:px-6">
        <Card className="py-0">
          <CardContent className="px-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Customer</TableHead>
                  <TableHead className="hidden md:table-cell">Contact</TableHead>
                  <TableHead className="hidden sm:table-cell">City</TableHead>
                  <TableHead>Rentals</TableHead>
                  <TableHead className="text-right">Total spent</TableHead>
                  <TableHead className="hidden lg:table-cell">Rating</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sorted.map((c) => (
                  <TableRow key={c.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="size-8">
                          <AvatarFallback className="bg-primary/10 text-xs text-primary">
                            {initials(c.fullName)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="min-w-0">
                          <div className="flex items-center gap-1.5 font-medium">
                            {c.fullName}
                            {c.documentsVerified ? (
                              <ShieldCheck className="size-3.5 text-emerald-600 dark:text-emerald-400" />
                            ) : (
                              <ShieldAlert className="size-3.5 text-amber-600 dark:text-amber-400" />
                            )}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Since {formatDate(c.registeredDate)}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="hidden text-muted-foreground md:table-cell">
                      <div>{c.phone}</div>
                      <div className="text-xs">{c.email}</div>
                    </TableCell>
                    <TableCell className="hidden text-muted-foreground sm:table-cell">
                      {c.city}
                    </TableCell>
                    <TableCell className="tabular-nums">{c.totalRentals}</TableCell>
                    <TableCell className="text-right tabular-nums font-medium">
                      {formatCurrency(c.totalSpent)}
                    </TableCell>
                    <TableCell className="hidden lg:table-cell">
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Star className="size-3.5 fill-amber-400 text-amber-400" />
                        {c.rating.toFixed(1)}
                      </div>
                    </TableCell>
                    <TableCell>
                      {c.blacklisted ? (
                        <StatusBadge status="Blacklisted" />
                      ) : (
                        <StatusBadge status="Active" />
                      )}
                    </TableCell>
                  </TableRow>
                ))}
                {sorted.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={7} className="py-10 text-center text-muted-foreground">
                      No customers found.
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
