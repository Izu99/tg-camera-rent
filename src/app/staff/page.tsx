import { Plus } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { StatusBadge } from "@/components/status-badge";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { staff } from "@/lib/data";
import { formatDate, initials } from "@/lib/format";
import { branchName } from "@/lib/lookup";

const roleVariant: Record<string, "default" | "secondary" | "outline"> = {
  Admin: "default",
  Manager: "secondary",
  Staff: "outline",
};

export default function StaffPage() {
  return (
    <div className="flex flex-col gap-4 pb-6">
      <PageHeader
        title="Staff"
        description={`${staff.length} team members across all branches`}
        actions={
          <Button size="sm">
            <Plus className="size-4" />
            Add Staff
          </Button>
        }
      />

      <div className="px-4 md:px-6">
        <Card className="py-0">
          <CardContent className="px-0">
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
                      <div className="flex items-center gap-3">
                        <Avatar className="size-8">
                          <AvatarFallback className="bg-primary/10 text-xs text-primary">
                            {initials(s.name)}
                          </AvatarFallback>
                        </Avatar>
                        <span className="font-medium">{s.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={roleVariant[s.role]}>{s.role}</Badge>
                    </TableCell>
                    <TableCell className="hidden text-muted-foreground sm:table-cell">
                      {branchName(s.branchId)}
                    </TableCell>
                    <TableCell className="hidden text-muted-foreground md:table-cell">
                      <div>{s.email}</div>
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
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
