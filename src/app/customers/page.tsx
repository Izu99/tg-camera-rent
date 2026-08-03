"use client";

import { useMemo, useState } from "react";
import { Plus, Search, Star, ShieldCheck, ShieldAlert } from "lucide-react";
import { PageHeader, Panel } from "@/components/page-header";
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
import { customers } from "@/lib/data";
import { formatCurrency, formatDate, initials } from "@/lib/format";

export default function CustomersPage() {
  const [search, setSearch] = useState("");

  const rows = useMemo(() => {
    const q = search.trim().toLowerCase();
    return customers
      .filter(
        (c) =>
          !q ||
          c.fullName.toLowerCase().includes(q) ||
          c.city.toLowerCase().includes(q) ||
          c.phone.includes(q)
      )
      .sort((a, b) => b.totalSpent - a.totalSpent);
  }, [search]);

  const lifetime = customers.reduce((s, c) => s + c.totalSpent, 0);

  return (
    <>
      <PageHeader
        title="Customers"
        description={`${customers.length} accounts · ${formatCurrency(lifetime)} lifetime value`}
        actions={
          <Button size="sm" className="h-8">
            <Plus className="size-3.5" />
            Add customer
          </Button>
        }
      />

      <div className="flex flex-col gap-3 p-3 md:p-4">
        <div className="relative max-w-xs">
          <Search className="pointer-events-none absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search name, city or phone…"
            className="h-8 pl-8 text-sm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <Panel bleed>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead className="hidden md:table-cell">Contact</TableHead>
                <TableHead className="hidden sm:table-cell">City</TableHead>
                <TableHead className="text-right">Rentals</TableHead>
                <TableHead className="text-right">Lifetime value</TableHead>
                <TableHead className="hidden lg:table-cell">Rating</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((c) => (
                <TableRow key={c.id}>
                  <TableCell>
                    <div className="flex items-center gap-2.5">
                      <span className="flex size-7 shrink-0 items-center justify-center rounded-md bg-muted text-[0.625rem] font-semibold text-muted-foreground">
                        {initials(c.fullName)}
                      </span>
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5 font-medium">
                          <span className="truncate">{c.fullName}</span>
                          {c.documentsVerified ? (
                            <ShieldCheck
                              className="size-3.5 shrink-0 text-success"
                              aria-label="Documents verified"
                            />
                          ) : (
                            <ShieldAlert
                              className="size-3.5 shrink-0 text-warning"
                              aria-label="Documents pending"
                            />
                          )}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {c.nic} · since {formatDate(c.registeredDate)}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="hidden text-muted-foreground md:table-cell">
                    <div className="text-[0.8125rem]">{c.phone}</div>
                    <div className="text-xs">{c.email}</div>
                  </TableCell>
                  <TableCell className="hidden text-muted-foreground sm:table-cell">
                    {c.city}
                  </TableCell>
                  <TableCell className="tabular text-right">{c.totalRentals}</TableCell>
                  <TableCell className="tabular text-right font-medium">
                    {formatCurrency(c.totalSpent)}
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">
                    <span className="flex items-center gap-1 text-muted-foreground">
                      <Star className="size-3.5 fill-warning text-warning" />
                      <span className="tabular">{c.rating.toFixed(1)}</span>
                    </span>
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={c.blacklisted ? "Blacklisted" : "Active"} />
                  </TableCell>
                </TableRow>
              ))}
              {rows.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} className="py-12 text-center text-muted-foreground">
                    No customers match that search.
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
