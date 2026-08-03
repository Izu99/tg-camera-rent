import { Building2, MapPin, Phone, User, Plus } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { StatusBadge } from "@/components/status-badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { branches, staff } from "@/lib/data";

export default function BranchesPage() {
  return (
    <div className="flex flex-col gap-4 pb-6">
      <PageHeader
        title="Branches"
        description={`${branches.length} active branch locations`}
        actions={
          <Button size="sm">
            <Plus className="size-4" />
            Add Branch
          </Button>
        }
      />

      <div className="grid grid-cols-1 gap-3 px-4 sm:grid-cols-2 lg:grid-cols-3 md:px-6">
        {branches.map((b) => {
          const staffCount = staff.filter((s) => s.branchId === b.id).length;
          return (
            <Card key={b.id} className="gap-3 py-4">
              <CardContent className="flex flex-col gap-3 px-4">
                <div className="flex items-start justify-between">
                  <div className="flex size-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Building2 className="size-5" />
                  </div>
                  <StatusBadge status={b.status} />
                </div>
                <div>
                  <p className="font-medium leading-tight">{b.name}</p>
                  <p className="text-xs text-muted-foreground">{b.city}</p>
                </div>
                <div className="space-y-1.5 text-sm text-muted-foreground">
                  <div className="flex items-start gap-2">
                    <MapPin className="mt-0.5 size-3.5 shrink-0" />
                    <span>{b.address}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="size-3.5 shrink-0" />
                    <span>{b.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <User className="size-3.5 shrink-0" />
                    <span>{b.manager} · Manager</span>
                  </div>
                </div>
                <div className="border-t border-border pt-3 text-xs text-muted-foreground">
                  {staffCount} staff assigned
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
