import { PageHeader, Panel } from "@/components/page-header";
import { StatusBadge } from "@/components/status-badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { returns } from "@/lib/data";
import { formatCurrency, formatDate } from "@/lib/format";
import { customerName, productName } from "@/lib/lookup";

export default function ReturnsPage() {
  const rows = [...returns].sort((a, b) => (a.returnDate < b.returnDate ? 1 : -1));
  const charges = returns.reduce((s, r) => s + r.totalDue, 0);

  return (
    <>
      <PageHeader
        title="Returns"
        description={`${returns.length} processed · ${formatCurrency(charges)} recovered in damage and late fees`}
      />

      <div className="p-3 md:p-4">
        <Panel bleed>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead className="hidden sm:table-cell">Equipment</TableHead>
                <TableHead>Returned</TableHead>
                <TableHead>Condition</TableHead>
                <TableHead className="hidden text-right md:table-cell">Late fee</TableHead>
                <TableHead className="hidden text-right md:table-cell">Damage</TableHead>
                <TableHead className="text-right">Charged</TableHead>
                <TableHead className="hidden lg:table-cell">Checked by</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((r) => (
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
                  <TableCell className="tabular hidden text-right text-muted-foreground md:table-cell">
                    {r.lateFee ? formatCurrency(r.lateFee) : "—"}
                  </TableCell>
                  <TableCell className="tabular hidden text-right text-muted-foreground md:table-cell">
                    {r.damageCost ? formatCurrency(r.damageCost) : "—"}
                  </TableCell>
                  <TableCell className="tabular text-right font-medium">
                    {r.totalDue ? (
                      <span className="text-danger">{formatCurrency(r.totalDue)}</span>
                    ) : (
                      <span className="text-muted-foreground">—</span>
                    )}
                  </TableCell>
                  <TableCell className="hidden text-muted-foreground lg:table-cell">
                    {r.staffName}
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
