import { FileText, Wallet, AlertCircle } from "lucide-react";
import { PageHeader, Panel } from "@/components/page-header";
import { StatCard } from "@/components/stat-card";
import { StatusBadge } from "@/components/status-badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { invoices } from "@/lib/data";
import { formatCurrency, formatDate } from "@/lib/format";
import { customerName } from "@/lib/lookup";

export default function InvoicesPage() {
  const rows = [...invoices].sort((a, b) => (a.date < b.date ? 1 : -1));
  const invoiced = invoices.reduce((s, i) => s + i.totalAmount, 0);
  const collected = invoices.reduce((s, i) => s + i.paidAmount, 0);
  const outstanding = invoices.reduce((s, i) => s + i.balanceAmount, 0);
  const unpaidCount = invoices.filter((i) => i.paymentStatus !== "Paid").length;

  return (
    <>
      <PageHeader title="Invoices" description={`${invoices.length} invoices issued`} />

      <div className="flex flex-col gap-3 p-3 md:p-4">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <StatCard
            label="Invoiced"
            value={formatCurrency(invoiced)}
            icon={FileText}
            hint={`${invoices.length} documents`}
          />
          <StatCard
            label="Collected"
            value={formatCurrency(collected)}
            icon={Wallet}
            tone="success"
            hint={`${Math.round((collected / invoiced) * 100)}% of billed`}
          />
          <StatCard
            label="Outstanding"
            value={formatCurrency(outstanding)}
            icon={AlertCircle}
            tone={outstanding > 0 ? "warning" : "default"}
            hint={`${unpaidCount} awaiting settlement`}
          />
        </div>

        <Panel bleed>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead className="hidden sm:table-cell">Issued</TableHead>
                <TableHead className="hidden md:table-cell">Method</TableHead>
                <TableHead className="text-right">Total</TableHead>
                <TableHead className="hidden text-right lg:table-cell">Balance</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((i) => (
                <TableRow key={i.id}>
                  <TableCell className="font-mono text-xs font-medium">
                    {i.invoiceNumber}
                  </TableCell>
                  <TableCell className="font-medium">{customerName(i.customerId)}</TableCell>
                  <TableCell className="hidden text-muted-foreground sm:table-cell">
                    {formatDate(i.date)}
                  </TableCell>
                  <TableCell className="hidden text-muted-foreground md:table-cell">
                    {i.paymentMethod}
                  </TableCell>
                  <TableCell className="tabular text-right font-medium">
                    {formatCurrency(i.totalAmount)}
                  </TableCell>
                  <TableCell className="tabular hidden text-right lg:table-cell">
                    {i.balanceAmount ? (
                      <span className="text-danger">{formatCurrency(i.balanceAmount)}</span>
                    ) : (
                      <span className="text-muted-foreground">—</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={i.paymentStatus} />
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
