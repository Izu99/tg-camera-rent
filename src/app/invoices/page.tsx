import { FileText, Wallet, AlertCircle } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { StatusBadge } from "@/components/status-badge";
import { StatCard } from "@/components/stat-card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { invoices } from "@/lib/data";
import { formatCurrency, formatDate } from "@/lib/format";
import { customerName } from "@/lib/lookup";

export default function InvoicesPage() {
  const sorted = [...invoices].sort((a, b) => (a.date < b.date ? 1 : -1));
  const totalInvoiced = invoices.reduce((sum, i) => sum + i.totalAmount, 0);
  const totalCollected = invoices.reduce((sum, i) => sum + i.paidAmount, 0);
  const outstanding = invoices.reduce((sum, i) => sum + i.balanceAmount, 0);

  return (
    <div className="flex flex-col gap-4 pb-6">
      <PageHeader title="Invoices" description={`${invoices.length} invoices issued`} />

      <div className="grid grid-cols-1 gap-3 px-4 sm:grid-cols-3 md:px-6">
        <StatCard label="Total Invoiced" value={formatCurrency(totalInvoiced)} icon={FileText} />
        <StatCard label="Total Collected" value={formatCurrency(totalCollected)} icon={Wallet} />
        <StatCard
          label="Outstanding Balance"
          value={formatCurrency(outstanding)}
          icon={AlertCircle}
          iconClassName="bg-amber-500/10 text-amber-600 dark:text-amber-400"
        />
      </div>

      <div className="px-4 md:px-6">
        <Card className="py-0">
          <CardContent className="px-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Invoice</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead className="hidden sm:table-cell">Date</TableHead>
                  <TableHead className="hidden md:table-cell">Method</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                  <TableHead className="hidden text-right lg:table-cell">Balance</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sorted.map((i) => (
                  <TableRow key={i.id}>
                    <TableCell className="font-medium">{i.invoiceNumber}</TableCell>
                    <TableCell>{customerName(i.customerId)}</TableCell>
                    <TableCell className="hidden text-muted-foreground sm:table-cell">
                      {formatDate(i.date)}
                    </TableCell>
                    <TableCell className="hidden text-muted-foreground md:table-cell">
                      {i.paymentMethod}
                    </TableCell>
                    <TableCell className="text-right tabular-nums font-medium">
                      {formatCurrency(i.totalAmount)}
                    </TableCell>
                    <TableCell className="hidden text-right tabular-nums text-muted-foreground lg:table-cell">
                      {i.balanceAmount ? formatCurrency(i.balanceAmount) : "—"}
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={i.paymentStatus} />
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
