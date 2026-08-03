import { Plus } from "lucide-react";
import { PageHeader, Panel } from "@/components/page-header";
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
import { quotations } from "@/lib/data";
import { formatCurrency, formatDate } from "@/lib/format";
import { customerName } from "@/lib/lookup";

export default function QuotationsPage() {
  const rows = [...quotations].sort((a, b) => (a.date < b.date ? 1 : -1));
  const open = quotations.filter((q) => q.status === "Sent" || q.status === "Draft");
  const openValue = open.reduce((s, q) => s + q.totalAmount, 0);

  return (
    <>
      <PageHeader
        title="Quotations"
        description={`${quotations.length} issued · ${formatCurrency(openValue)} still open`}
        actions={
          <Button size="sm" className="h-8">
            <Plus className="size-3.5" />
            New quotation
          </Button>
        }
      />

      <div className="p-3 md:p-4">
        <Panel bleed>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Quotation</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead className="hidden sm:table-cell">Issued</TableHead>
                <TableHead className="hidden md:table-cell">Valid until</TableHead>
                <TableHead className="hidden text-right lg:table-cell">Items</TableHead>
                <TableHead className="text-right">Total</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((q) => (
                <TableRow key={q.id}>
                  <TableCell className="font-mono text-xs font-medium">
                    {q.quotationNumber}
                  </TableCell>
                  <TableCell className="font-medium">{customerName(q.customerId)}</TableCell>
                  <TableCell className="hidden text-muted-foreground sm:table-cell">
                    {formatDate(q.date)}
                  </TableCell>
                  <TableCell className="hidden text-muted-foreground md:table-cell">
                    {formatDate(q.validUntil)}
                  </TableCell>
                  <TableCell className="tabular hidden text-right text-muted-foreground lg:table-cell">
                    {q.items.length}
                  </TableCell>
                  <TableCell className="tabular text-right font-medium">
                    {formatCurrency(q.totalAmount)}
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={q.status} />
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
