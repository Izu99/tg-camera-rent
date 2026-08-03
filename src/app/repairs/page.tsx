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
import { repairs } from "@/lib/data";
import { formatCurrency, formatDate } from "@/lib/format";
import { productName } from "@/lib/lookup";

export default function RepairsPage() {
  const sorted = [...repairs].sort((a, b) => (a.givenDate < b.givenDate ? 1 : -1));

  return (
    <div className="flex flex-col gap-4 pb-6">
      <PageHeader
        title="Repairs"
        description={`${repairs.length} equipment repair records`}
        actions={
          <Button size="sm">
            <Plus className="size-4" />
            Send for Repair
          </Button>
        }
      />

      <div className="px-4 md:px-6">
        <Card className="py-0">
          <CardContent className="px-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Equipment</TableHead>
                  <TableHead className="hidden sm:table-cell">Issue</TableHead>
                  <TableHead className="hidden md:table-cell">Repair shop</TableHead>
                  <TableHead>Given date</TableHead>
                  <TableHead className="hidden lg:table-cell">Expected</TableHead>
                  <TableHead className="text-right">Cost</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sorted.map((r) => (
                  <TableRow key={r.id}>
                    <TableCell>
                      <div className="font-medium">{productName(r.productId)}</div>
                      <div className="text-xs text-muted-foreground">{r.serialNumber}</div>
                    </TableCell>
                    <TableCell className="hidden text-muted-foreground sm:table-cell">
                      {r.issue}
                    </TableCell>
                    <TableCell className="hidden text-muted-foreground md:table-cell">
                      {r.repairShop}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {formatDate(r.givenDate)}
                    </TableCell>
                    <TableCell className="hidden text-muted-foreground lg:table-cell">
                      {formatDate(r.expectedDate)}
                    </TableCell>
                    <TableCell className="text-right tabular-nums font-medium">
                      {r.cost ? formatCurrency(r.cost) : "—"}
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={r.status} />
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
