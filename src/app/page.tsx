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
  BoxesIcon,
} from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { StatCard } from "@/components/stat-card";
import { StatusBadge } from "@/components/status-badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
  customers,
  products,
  revenueHistory,
  categoryRevenue,
  rentals,
} from "@/lib/data";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const revenueChartConfig = {
  revenue: { label: "Revenue", color: "var(--chart-1)" },
} satisfies ChartConfig;

const categoryChartConfig = {
  revenue: { label: "Revenue", color: "var(--chart-1)" },
} satisfies ChartConfig;

function customerName(id: string) {
  return customers.find((c) => c.id === id)?.fullName ?? "Unknown";
}

function productName(id: string) {
  return products.find((p) => p.id === id)?.name ?? "Unknown";
}

export default function DashboardPage() {
  const todayRevenue = revenueHistory[revenueHistory.length - 1].revenue;
  const yesterdayRevenue = revenueHistory[revenueHistory.length - 2].revenue;
  const revenueTrend = Math.round(
    ((todayRevenue - yesterdayRevenue) / yesterdayRevenue) * 100
  );

  const activeRentals = rentals.filter((r) => r.status === "Active").length;
  const overdueRentals = rentals.filter((r) => r.status === "Overdue");
  const totalEquipment = products.reduce((sum, p) => sum + p.quantity, 0);
  const availableEquipment = products.reduce((sum, p) => sum + p.availableQuantity, 0);
  const pendingBookings = bookings.filter((b) => b.status === "Pending").length;

  const recentBookings = [...bookings]
    .sort((a, b) => (a.bookingDate < b.bookingDate ? 1 : -1))
    .slice(0, 5);

  const dueSoon = [...rentals]
    .sort((a, b) => (a.expectedReturnDate < b.expectedReturnDate ? -1 : 1))
    .slice(0, 5);

  const lowStock = products
    .filter((p) => p.availableQuantity / p.quantity <= 0.34)
    .sort((a, b) => a.availableQuantity / a.quantity - b.availableQuantity / b.quantity)
    .slice(0, 5);

  const sortedCategoryRevenue = [...categoryRevenue].sort((a, b) => b.revenue - a.revenue);

  const chartRevenueHistory = revenueHistory.map((d) => ({
    ...d,
    label: formatDate(d.date).replace(/ \d{4}$/, ""),
  }));

  return (
    <div className="flex flex-col gap-6 pb-6">
      <PageHeader
        title="Dashboard"
        description="Welcome back — here's what's happening across all branches today."
        actions={
          <>
            <Button asChild size="sm" variant="outline">
              <Link href="/bookings">
                <Plus className="size-4" />
                New Booking
              </Link>
            </Button>
            <Button asChild size="sm">
              <Link href="/rentals">
                <Plus className="size-4" />
                New Rental
              </Link>
            </Button>
          </>
        }
      />

      <div className="grid grid-cols-2 gap-3 px-4 md:grid-cols-4 md:px-6">
        <StatCard
          label="Today's Revenue"
          value={formatCurrency(todayRevenue)}
          icon={Wallet}
          trend={revenueTrend}
          trendLabel="vs yesterday"
        />
        <StatCard
          label="Active Rentals"
          value={String(activeRentals + overdueRentals.length)}
          icon={Handshake}
        />
        <StatCard
          label="Overdue Returns"
          value={String(overdueRentals.length)}
          icon={AlertTriangle}
          iconClassName="bg-red-500/10 text-red-600 dark:text-red-400"
        />
        <StatCard
          label="Available Equipment"
          value={`${availableEquipment} / ${totalEquipment}`}
          icon={Package}
        />
      </div>

      <div className="grid grid-cols-1 gap-3 px-4 lg:grid-cols-3 md:px-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Revenue trend</CardTitle>
            <CardDescription>Daily revenue for the last 14 days</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={revenueChartConfig} className="aspect-auto h-64 w-full">
              <AreaChart data={chartRevenueHistory} margin={{ left: 4, right: 12, top: 8 }}>
                <defs>
                  <linearGradient id="fillRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--color-revenue)" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="var(--color-revenue)" stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <CartesianGrid vertical={false} strokeDasharray="0" stroke="var(--border)" />
                <XAxis
                  dataKey="label"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  interval="preserveStartEnd"
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  width={44}
                  tickFormatter={(v) => `${Math.round(v / 1000)}K`}
                />
                <ChartTooltip
                  cursor={{ stroke: "var(--border)" }}
                  content={
                    <ChartTooltipContent
                      formatter={(value) => formatCurrency(Number(value))}
                    />
                  }
                />
                <Area
                  dataKey="revenue"
                  type="monotone"
                  fill="url(#fillRevenue)"
                  stroke="var(--color-revenue)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Revenue by category</CardTitle>
            <CardDescription>Last 30 days</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={categoryChartConfig} className="aspect-auto h-64 w-full">
              <BarChart
                data={sortedCategoryRevenue}
                layout="vertical"
                margin={{ left: 0, right: 24 }}
                barCategoryGap={10}
              >
                <XAxis type="number" hide />
                <YAxis
                  dataKey="category"
                  type="category"
                  tickLine={false}
                  axisLine={false}
                  width={92}
                  tick={{ fontSize: 11 }}
                />
                <ChartTooltip
                  cursor={{ fill: "var(--muted)" }}
                  content={<ChartTooltipContent formatter={(value) => formatCurrency(Number(value))} />}
                />
                <Bar dataKey="revenue" fill="var(--color-revenue)" radius={[0, 4, 4, 0]} maxBarSize={16}>
                  <LabelList
                    dataKey="revenue"
                    position="right"
                    className="fill-muted-foreground"
                    fontSize={10}
                    formatter={(value) => `${Math.round(Number(value) / 1000)}K`}
                  />
                </Bar>
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-3 px-4 lg:grid-cols-3 md:px-6">
        <Card className="lg:col-span-2">
          <CardHeader className="flex-row items-center justify-between">
            <div>
              <CardTitle>Recent bookings</CardTitle>
              <CardDescription>Latest reservations across branches</CardDescription>
            </div>
            <Button asChild variant="ghost" size="sm">
              <Link href="/bookings">
                View all <ArrowRight className="size-3.5" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent className="px-0">
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
                    <TableCell className="font-medium">{customerName(b.customerId)}</TableCell>
                    <TableCell className="hidden text-muted-foreground sm:table-cell">
                      {formatDate(b.rentalStart)} – {formatDate(b.rentalEnd)}
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={b.status} />
                    </TableCell>
                    <TableCell className="text-right tabular-nums">
                      {formatCurrency(b.totalAmount)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Due back soon</CardTitle>
            <CardDescription>{pendingBookings} bookings awaiting confirmation</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            {dueSoon.map((r) => (
              <div key={r.id} className="flex items-center gap-3">
                <Avatar className="size-8">
                  <AvatarFallback className="bg-primary/10 text-xs text-primary">
                    {initials(customerName(r.customerId))}
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">{customerName(r.customerId)}</p>
                  <p className="truncate text-xs text-muted-foreground">
                    {productName(r.items[0].productId)}
                    {r.items.length > 1 ? ` +${r.items.length - 1} more` : ""}
                  </p>
                </div>
                <StatusBadge status={r.status} />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="px-4 md:px-6">
        <Card>
          <CardHeader className="flex-row items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <BoxesIcon className="size-4 text-amber-600 dark:text-amber-400" />
                Low stock alerts
              </CardTitle>
              <CardDescription>Equipment running low on available units</CardDescription>
            </div>
            <Button asChild variant="ghost" size="sm">
              <Link href="/inventory">
                View inventory <ArrowRight className="size-3.5" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {lowStock.map((p) => (
              <div
                key={p.id}
                className="flex items-center justify-between rounded-lg border border-border p-3"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">{p.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {p.availableQuantity} of {p.quantity} available
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
