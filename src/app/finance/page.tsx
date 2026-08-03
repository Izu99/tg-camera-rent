import { TrendingUp, TrendingDown, Scale } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { StatCard } from "@/components/stat-card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { financeEntries } from "@/lib/data";
import { formatCurrency, formatDate } from "@/lib/format";
import { cn } from "@/lib/utils";

export default function FinancePage() {
  const sorted = [...financeEntries].sort((a, b) => (a.date < b.date ? 1 : -1));
  const income = financeEntries
    .filter((e) => e.type === "Income")
    .reduce((sum, e) => sum + e.amount, 0);
  const expense = financeEntries
    .filter((e) => e.type === "Expense")
    .reduce((sum, e) => sum + e.amount, 0);

  return (
    <div className="flex flex-col gap-4 pb-6">
      <PageHeader title="Finance" description="Income, expenses & payment activity" />

      <div className="grid grid-cols-1 gap-3 px-4 sm:grid-cols-3 md:px-6">
        <StatCard
          label="Total Income"
          value={formatCurrency(income)}
          icon={TrendingUp}
          iconClassName="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
        />
        <StatCard
          label="Total Expenses"
          value={formatCurrency(expense)}
          icon={TrendingDown}
          iconClassName="bg-red-500/10 text-red-600 dark:text-red-400"
        />
        <StatCard label="Net Profit" value={formatCurrency(income - expense)} icon={Scale} />
      </div>

      <div className="px-4 md:px-6">
        <Card className="py-0">
          <CardContent className="px-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Description</TableHead>
                  <TableHead className="hidden sm:table-cell">Category</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="hidden md:table-cell">Method</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sorted.map((e) => (
                  <TableRow key={e.id}>
                    <TableCell className="font-medium">{e.description}</TableCell>
                    <TableCell className="hidden text-muted-foreground sm:table-cell">
                      <Badge variant="outline">{e.category}</Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{formatDate(e.date)}</TableCell>
                    <TableCell className="hidden text-muted-foreground md:table-cell">
                      {e.method}
                    </TableCell>
                    <TableCell
                      className={cn(
                        "text-right tabular-nums font-medium",
                        e.type === "Income"
                          ? "text-emerald-600 dark:text-emerald-400"
                          : "text-red-600 dark:text-red-400"
                      )}
                    >
                      {e.type === "Income" ? "+" : "−"}
                      {formatCurrency(e.amount)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
