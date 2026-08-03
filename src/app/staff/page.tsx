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
import { staff } from "@/lib/data";
import { formatDate, initials } from "@/lib/format";
import { branchName } from "@/lib/lookup";
import { cn } from "@/lib/utils";

const ROLE_STYLES: Record<string, string> = {
  Admin: "bg-primary/10 text-primary ring-primary/20",
  Manager: "bg-info/10 text-info ring-info/20",
  Staff: "bg-muted text-muted-foreground ring-border",
};

export default function StaffPage() {
  const active = staff.filter((s) => s.status === "Active").length;

  return (
    <>
      <PageHeader
        title="Staff"
        description={`${active} active of ${staff.length} across all branches`}
        actions={
          <Button size="sm" className="h-8">
            <Plus className="size-3.5" />
            Add staff
          </Button>
        }
      />

      <div className="p-3 md:p-4">
        <Panel bleed>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Role</TableHead>
                <TableHead className="hidden sm:table-cell">Branch</TableHead>
                <TableHead className="hidden md:table-cell">Contact</TableHead>
                <TableHead className="hidden lg:table-cell">Joined</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {staff.map((s) => (
                <TableRow key={s.id}>
                  <TableCell>
                    <div className="flex items-center gap-2.5">
                      <span className="flex size-7 shrink-0 items-center justify-center rounded-md bg-muted text-[0.625rem] font-semibold text-muted-foreground">
                        {initials(s.name)}
                      </span>
                      <span className="font-medium">{s.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span
                      className={cn(
                        "rounded px-1.5 py-0.5 text-[0.6875rem] font-medium ring-1 ring-inset",
                        ROLE_STYLES[s.role]
                      )}
                    >
                      {s.role}
                    </span>
                  </TableCell>
                  <TableCell className="hidden text-muted-foreground sm:table-cell">
                    {branchName(s.branchId)}
                  </TableCell>
                  <TableCell className="hidden text-muted-foreground md:table-cell">
                    <div className="text-[0.8125rem]">{s.email}</div>
                    <div className="text-xs">{s.phone}</div>
                  </TableCell>
                  <TableCell className="hidden text-muted-foreground lg:table-cell">
                    {formatDate(s.joinedDate)}
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={s.status} />
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
