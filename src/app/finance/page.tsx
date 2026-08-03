import { TrendingUp, TrendingDown, Scale } from "lucide-react";
import { PageHeader, Panel } from "@/components/page-header";
import { StatCard } from "@/components/stat-card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { financeEntries } from "@/lib/data";
import { formatCurrency, formatDate } from "@/lib/format";
import { cn } from "@/lib/utils";

export default function FinancePage() {
  const rows = [...financeEntries].sort((a, b) => (a.date < b.date ? 1 : -1));
  const income = financeEntries
    .filter((e) => e.type === "Income")
    .reduce((s, e) => s + e.amount, 0);
  const expense = financeEntries
    .filter((e) => e.type === "Expense")
    .reduce((s, e) => s + e.amount, 0);
  const net = income - expense;

  return (
    <>
      <PageHeader
        title="Finance"
        description="Income, expenses and payment activity"
      />

      <div className="flex flex-col gap-3 p-3 md:p-4">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <StatCard
            label="Income"
            value={formatCurrency(income)}
            icon={TrendingUp}
            tone="success"
            hint={`${financeEntries.filter((e) => e.type === "Income").length} entries`}
          />
          <StatCard
            label="Expenses"
            value={formatCurrency(expense)}
            icon={TrendingDown}
            tone="danger"
            hint={`${financeEntries.filter((e) => e.type === "Expense").length} entries`}
          />
          <StatCard
            label="Net position"
            value={formatCurrency(net)}
            icon={Scale}
            tone={net >= 0 ? "success" : "danger"}
            hint={net >= 0 ? "In surplus" : "In deficit"}
          />
        </div>

        <Panel bleed>
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
              {rows.map((e) => (
                <TableRow key={e.id}>
                  <TableCell className="font-medium">{e.description}</TableCell>
                  <TableCell className="hidden sm:table-cell">
                    <span className="rounded border border-border px-1.5 py-0.5 text-[0.6875rem] text-muted-foreground">
                      {e.category}
                    </span>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{formatDate(e.date)}</TableCell>
                  <TableCell className="hidden text-muted-foreground md:table-cell">
                    {e.method}
                  </TableCell>
                  <TableCell
                    className={cn(
                      "tabular text-right font-medium",
                      e.type === "Income" ? "text-success" : "text-danger"
                    )}
                  >
                    {e.type === "Income" ? "+" : "−"}
                    {formatCurrency(e.amount)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Panel>
      </div>
    </>
  );
}
