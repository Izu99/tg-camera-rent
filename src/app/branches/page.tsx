import { MapPin, Phone, UserRound, Plus } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { StatusBadge } from "@/components/status-badge";
import { Button } from "@/components/ui/button";
import { branches, staff } from "@/lib/data";

export default function BranchesPage() {
  return (
    <>
      <PageHeader
        title="Branches"
        description={`${branches.length} locations island-wide`}
        actions={
          <Button size="sm" className="h-8">
            <Plus className="size-3.5" />
            Add branch
          </Button>
        }
      />

      <div className="grid grid-cols-1 gap-3 p-3 sm:grid-cols-2 xl:grid-cols-3 md:p-4">
        {branches.map((b) => {
          const team = staff.filter((s) => s.branchId === b.id);
          return (
            <article
              key={b.id}
              className="flex flex-col rounded-lg border border-border bg-card"
            >
              <header className="flex items-start justify-between gap-2 border-b border-border p-3.5">
                <div className="min-w-0">
                  <h3 className="truncate text-sm font-semibold">{b.name}</h3>
                  <p className="mt-0.5 text-xs text-muted-foreground">{b.city}</p>
                </div>
                <StatusBadge status={b.status} />
              </header>

              <dl className="flex flex-col gap-2 p-3.5 text-[0.8125rem]">
                <div className="flex items-start gap-2 text-muted-foreground">
                  <MapPin className="mt-0.5 size-3.5 shrink-0" strokeWidth={1.9} />
                  <dd>{b.address}</dd>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Phone className="size-3.5 shrink-0" strokeWidth={1.9} />
                  <dd className="tabular">{b.phone}</dd>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <UserRound className="size-3.5 shrink-0" strokeWidth={1.9} />
                  <dd>
                    {b.manager} <span className="text-muted-foreground/60">· Manager</span>
                  </dd>
                </div>
              </dl>

              <footer className="mt-auto flex items-center justify-between border-t border-border px-3.5 py-2.5">
                <span className="label-micro">Team</span>
                <span className="tabular text-xs font-medium">
                  {team.length} {team.length === 1 ? "member" : "members"}
                </span>
              </footer>
            </article>
          );
        })}
      </div>
    </>
  );
}
