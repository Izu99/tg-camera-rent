"use client";

import Link from "next/link";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  XAxis,
  YAxis,
} from "recharts";
import {
  Wallet,
  Handshake,
  AlertTriangle,
  Package,
  Plus,
  ArrowRight,
  TriangleAlert,
} from "lucide-react";
import { PageHeader, Panel } from "@/components/page-header";
import { StatCard } from "@/components/stat-card";
import { StatusBadge } from "@/components/status-badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { formatCurrency, formatDate, initials } from "@/lib/format";
import {
  bookings,
  products,
  revenueHistory,
  categoryRevenue,
  rentals,
} from "@/lib/data";
import { customerName, productName } from "@/lib/lookup";

const chartConfig = {
  revenue: { label: "Revenue", color: "var(--chart-1)" },
} satisfies ChartConfig;

export default function DashboardPage() {
  const today = revenueHistory[revenueHistory.length - 1].revenue;
  const yesterday = revenueHistory[revenueHistory.length - 2].revenue;
  const revenueTrend = Math.round(((today - yesterday) / yesterday) * 100);

  const active = rentals.filter((r) => r.status === "Active").length;
  const overdue = rentals.filter((r) => r.status === "Overdue");
  const totalUnits = products.reduce((s, p) => s + p.quantity, 0);
  const availableUnits = products.reduce((s, p) => s + p.availableQuantity, 0);
  const pendingBookings = bookings.filter((b) => b.status === "Pending").length;
  const utilisation = Math.round(((totalUnits - availableUnits) / totalUnits) * 100);

  const recentBookings = [...bookings]
    .sort((a, b) => (a.bookingDate < b.bookingDate ? 1 : -1))
    .slice(0, 6);

  const dueSoon = [...rentals]
    .sort((a, b) => (a.expectedReturnDate < b.expectedReturnDate ? -1 : 1))
    .slice(0, 5);

  const lowStock = products
    .filter((p) => p.availableQuantity / p.quantity <= 0.34)
    .sort((a, b) => a.availableQuantity / a.quantity - b.availableQuantity / b.quantity)
    .slice(0, 4);

  const byCategory = [...categoryRevenue].sort((a, b) => b.revenue - a.revenue);

  const trend = revenueHistory.map((d) => ({
    ...d,
    label: formatDate(d.date).replace(/ \d{4}$/, ""),
  }));

  return (
    <>
      <PageHeader
        title="Operations overview"
        description="Live position across all three branches"
        actions={
          <>
            <Button asChild size="sm" variant="outline" className="h-8">
              <Link href="/bookings">
                <Plus className="size-3.5" />
                Booking
              </Link>
            </Button>
            <Button asChild size="sm" className="h-8">
              <Link href="/rentals">
                <Plus className="size-3.5" />
                Issue rental
              </Link>
            </Button>
          </>
        }
      />

      <div className="flex flex-col gap-3 p-3 md:p-4">
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          <StatCard
            label="Revenue today"
            value={formatCurrency(today)}
            icon={Wallet}
            trend={revenueTrend}
            trendLabel="vs yesterday"
          />
          <StatCard
            label="Rentals out"
            value={String(active + overdue.length)}
            icon={Handshake}
            hint={`${pendingBookings} bookings to confirm`}
          />
          <StatCard
            label="Overdue returns"
            value={String(overdue.length)}
            icon={AlertTriangle}
            tone={overdue.length ? "danger" : "default"}
            hint="Needs follow-up today"
          />
          <StatCard
            label="Units available"
            value={`${availableUnits} / ${totalUnits}`}
            icon={Package}
            hint={`${utilisation}% of fleet on hire`}
          />
        </div>

        <div className="grid grid-cols-1 gap-3 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <Panel title="Revenue trend" description="Daily takings, last 14 days">
              <ChartContainer config={chartConfig} className="aspect-auto h-56 w-full">
                <AreaChart data={trend} margin={{ left: 0, right: 8, top: 6, bottom: 0 }}>
                  <defs>
                    <linearGradient id="revFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--color-revenue)" stopOpacity={0.14} />
                      <stop offset="100%" stopColor="var(--color-revenue)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid vertical={false} stroke="var(--border)" />
                  <XAxis
                    dataKey="label"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={10}
                    minTickGap={24}
                    tick={{ fontSize: 11 }}
                  />
                  <YAxis
                    tickLine={false}
                    axisLine={false}
                    tickMargin={6}
                    width={38}
                    tick={{ fontSize: 11 }}
                    tickFormatter={(v) => `${Math.round(Number(v) / 1000)}K`}
                  />
                  <ChartTooltip
                    cursor={{ stroke: "var(--border)", strokeWidth: 1 }}
                    content={
                      <ChartTooltipContent
                        formatter={(value) => formatCurrency(Number(value))}
                      />
                    }
                  />
                  <Area
                    dataKey="revenue"
                    type="monotone"
                    fill="url(#revFill)"
                    stroke="var(--color-revenue)"
                    strokeWidth={2}
                    activeDot={{ r: 4, strokeWidth: 2, stroke: "var(--card)" }}
                  />
                </AreaChart>
              </ChartContainer>
            </Panel>
          </div>

          <div className="lg:col-span-2">
            <Panel title="Revenue by category" description="Last 30 days">
              <ChartContainer config={chartConfig} className="aspect-auto h-56 w-full">
                <BarChart
                  data={byCategory}
                  layout="vertical"
                  margin={{ left: 0, right: 34, top: 2, bottom: 2 }}
                >
                  <XAxis type="number" hide />
                  <YAxis
                    dataKey="category"
                    type="category"
                    tickLine={false}
                    axisLine={false}
                    width={86}
                    tick={{ fontSize: 11 }}
                  />
                  <ChartTooltip
                    cursor={{ fill: "var(--muted)" }}
                    content={
                      <ChartTooltipContent
                        formatter={(value) => formatCurrency(Number(value))}
                      />
                    }
                  />
                  <Bar
                    dataKey="revenue"
                    fill="var(--color-revenue)"
                    radius={[0, 3, 3, 0]}
                    maxBarSize={13}
                  >
                    <LabelList
                      dataKey="revenue"
                      position="right"
                      className="fill-muted-foreground"
                      fontSize={10}
                      formatter={(v) => `${Math.round(Number(v) / 1000)}K`}
                    />
                  </Bar>
                </BarChart>
              </ChartContainer>
            </Panel>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <Panel
              title="Recent bookings"
              description="Latest reservations across branches"
              bleed
              actions={
                <Button asChild variant="ghost" size="sm" className="h-7 text-xs">
                  <Link href="/bookings">
                    View all <ArrowRight className="size-3" />
                  </Link>
                </Button>
              }
            >
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Customer</TableHead>
                    <TableHead className="hidden sm:table-cell">Rental dates</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentBookings.map((b) => (
                    <TableRow key={b.id}>
                      <TableCell className="font-medium">
                        {customerName(b.customerId)}
                      </TableCell>
                      <TableCell className="hidden text-xs text-muted-foreground sm:table-cell">
                        {formatDate(b.rentalStart)} – {formatDate(b.rentalEnd)}
                      </TableCell>
                      <TableCell>
                        <StatusBadge status={b.status} />
                      </TableCell>
                      <TableCell className="tabular text-right font-medium">
                        {formatCurrency(b.totalAmount)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Panel>
          </div>

          <div className="flex flex-col gap-3 lg:col-span-2">
            <Panel title="Due back" description="Earliest expected returns first">
              <ul className="flex flex-col divide-y divide-border">
                {dueSoon.map((r) => (
                  <li key={r.id} className="flex items-center gap-2.5 py-2 first:pt-0 last:pb-0">
                    <span className="flex size-7 shrink-0 items-center justify-center rounded-md bg-muted text-[0.625rem] font-semibold text-muted-foreground">
                      {initials(customerName(r.customerId))}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-[0.8125rem] font-medium leading-tight">
                        {customerName(r.customerId)}
                      </p>
                      <p className="truncate text-xs text-muted-foreground">
                        {productName(r.items[0].productId)}
                        {r.items.length > 1 ? ` +${r.items.length - 1}` : ""} ·{" "}
                        {formatDate(r.expectedReturnDate)}
                      </p>
                    </div>
                    <StatusBadge status={r.status} />
                  </li>
                ))}
              </ul>
            </Panel>

            <Panel
              title="Low stock"
              description="Running short on available units"
              actions={
                <TriangleAlert className="size-3.5 text-warning" aria-hidden />
              }
            >
              <ul className="flex flex-col divide-y divide-border">
                {lowStock.map((p) => (
                  <li
                    key={p.id}
                    className="flex items-center justify-between gap-3 py-2 first:pt-0 last:pb-0"
                  >
                    <span className="min-w-0 truncate text-[0.8125rem]">{p.name}</span>
                    <span className="tabular shrink-0 text-xs font-medium text-muted-foreground">
                      {p.availableQuantity}/{p.quantity}
                    </span>
                  </li>
                ))}
              </ul>
            </Panel>
          </div>
        </div>
      </div>
    </>
  );
}
