import { Plus } from "lucide-react";
import { PageHeader } from "@/components/page-header";
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
import { Card, CardContent } from "@/components/ui/card";
import { quotations } from "@/lib/data";
import { formatCurrency, formatDate } from "@/lib/format";
import { customerName } from "@/lib/lookup";

export default function QuotationsPage() {
  const sorted = [...quotations].sort((a, b) => (a.date < b.date ? 1 : -1));

  return (
    <div className="flex flex-col gap-4 pb-6">
      <PageHeader
        title="Quotations"
        description={`${quotations.length} quotations created`}
        actions={
          <Button size="sm">
            <Plus className="size-4" />
            New Quotation
          </Button>
        }
      />

      <div className="px-4 md:px-6">
        <Card className="py-0">
          <CardContent className="px-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Quotation</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead className="hidden sm:table-cell">Date</TableHead>
                  <TableHead className="hidden md:table-cell">Valid until</TableHead>
                  <TableHead className="hidden lg:table-cell">Items</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sorted.map((q) => (
                  <TableRow key={q.id}>
                    <TableCell className="font-medium">{q.quotationNumber}</TableCell>
                    <TableCell>{customerName(q.customerId)}</TableCell>
                    <TableCell className="hidden text-muted-foreground sm:table-cell">
                      {formatDate(q.date)}
                    </TableCell>
                    <TableCell className="hidden text-muted-foreground md:table-cell">
                      {formatDate(q.validUntil)}
                    </TableCell>
                    <TableCell className="hidden text-muted-foreground lg:table-cell">
                      {q.items.length} item{q.items.length > 1 ? "s" : ""}
                    </TableCell>
                    <TableCell className="text-right tabular-nums font-medium">
                      {formatCurrency(q.totalAmount)}
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={q.status} />
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
