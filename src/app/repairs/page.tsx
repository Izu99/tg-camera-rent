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
import { repairs } from "@/lib/data";
import { formatCurrency, formatDate } from "@/lib/format";
import { productName } from "@/lib/lookup";

export default function RepairsPage() {
  const rows = [...repairs].sort((a, b) => (a.givenDate < b.givenDate ? 1 : -1));
  const outstanding = repairs.filter((r) => r.status !== "Completed").length;
  const spend = repairs.reduce((s, r) => s + r.cost, 0);

  return (
    <>
      <PageHeader
        title="Repairs"
        description={`${outstanding} units off the road · ${formatCurrency(spend)} committed`}
        actions={
          <Button size="sm" className="h-8">
            <Plus className="size-3.5" />
            Send for repair
          </Button>
        }
      />

      <div className="p-3 md:p-4">
        <Panel bleed>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Equipment</TableHead>
                <TableHead className="hidden sm:table-cell">Fault</TableHead>
                <TableHead className="hidden md:table-cell">Workshop</TableHead>
                <TableHead>Sent</TableHead>
                <TableHead className="hidden lg:table-cell">Expected</TableHead>
                <TableHead className="text-right">Cost</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((r) => (
                <TableRow key={r.id}>
                  <TableCell>
                    <div className="font-medium">{productName(r.productId)}</div>
                    <div className="font-mono text-xs text-muted-foreground">
                      {r.serialNumber}
                    </div>
                  </TableCell>
                  <TableCell className="hidden max-w-56 truncate text-muted-foreground sm:table-cell">
                    {r.issue}
                  </TableCell>
                  <TableCell className="hidden text-muted-foreground md:table-cell">
                    {r.repairShop}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {formatDate(r.givenDate)}
                  </TableCell>
                  <TableCell className="hidden text-muted-foreground lg:table-cell">
                    {r.returnedDate ? formatDate(r.returnedDate) : formatDate(r.expectedDate)}
                  </TableCell>
                  <TableCell className="tabular text-right font-medium">
                    {r.cost ? formatCurrency(r.cost) : <span className="text-muted-foreground">TBC</span>}
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={r.status} />
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
