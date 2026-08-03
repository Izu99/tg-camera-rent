import { PageHeader } from "@/components/page-header";
import { StatusBadge } from "@/components/status-badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { returns } from "@/lib/data";
import { formatCurrency, formatDate } from "@/lib/format";
import { customerName, productName } from "@/lib/lookup";

export default function ReturnsPage() {
  const sorted = [...returns].sort((a, b) => (a.returnDate < b.returnDate ? 1 : -1));
  const totalCharges = returns.reduce((sum, r) => sum + r.totalDue, 0);

  return (
    <div className="flex flex-col gap-4 pb-6">
      <PageHeader
        title="Returns"
        description={`${returns.length} completed returns · ${formatCurrency(totalCharges)} in damage/late charges`}
      />

      <div className="px-4 md:px-6">
        <Card className="py-0">
          <CardContent className="px-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Customer</TableHead>
                  <TableHead className="hidden sm:table-cell">Equipment</TableHead>
                  <TableHead>Return date</TableHead>
                  <TableHead>Condition</TableHead>
                  <TableHead className="hidden md:table-cell">Late fee</TableHead>
                  <TableHead className="hidden md:table-cell">Damage cost</TableHead>
                  <TableHead className="text-right">Total due</TableHead>
                  <TableHead className="hidden lg:table-cell">Staff</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sorted.map((r) => (
                  <TableRow key={r.id}>
                    <TableCell>
                      <div className="font-medium">{customerName(r.customerId)}</div>
                      <div className="text-xs text-muted-foreground">{r.id.toUpperCase()}</div>
                    </TableCell>
                    <TableCell className="hidden text-muted-foreground sm:table-cell">
                      {productName(r.productId)}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {formatDate(r.returnDate)}
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={r.condition} />
                    </TableCell>
                    <TableCell className="hidden tabular-nums text-muted-foreground md:table-cell">
                      {r.lateFee ? formatCurrency(r.lateFee) : "—"}
                    </TableCell>
                    <TableCell className="hidden tabular-nums text-muted-foreground md:table-cell">
                      {r.damageCost ? formatCurrency(r.damageCost) : "—"}
                    </TableCell>
                    <TableCell className="text-right tabular-nums font-medium">
                      {r.totalDue ? formatCurrency(r.totalDue) : "—"}
                    </TableCell>
                    <TableCell className="hidden text-muted-foreground lg:table-cell">
                      {r.staffName}
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
