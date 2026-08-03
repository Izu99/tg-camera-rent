import { cn } from "@/lib/utils";

const STATUS_STYLES: Record<string, string> = {
  // positive / success
  Available: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400",
  Paid: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400",
  Completed: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400",
  Excellent: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400",
  Accepted: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400",
  Active: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400",
  Returned: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400",
  // info / in progress
  Confirmed: "bg-sky-500/15 text-sky-700 dark:text-sky-400",
  Rented: "bg-sky-500/15 text-sky-700 dark:text-sky-400",
  Good: "bg-sky-500/15 text-sky-700 dark:text-sky-400",
  "In Progress": "bg-sky-500/15 text-sky-700 dark:text-sky-400",
  Sent: "bg-sky-500/15 text-sky-700 dark:text-sky-400",
  // warning
  Pending: "bg-amber-500/15 text-amber-700 dark:text-amber-400",
  Reserved: "bg-amber-500/15 text-amber-700 dark:text-amber-400",
  Partial: "bg-amber-500/15 text-amber-700 dark:text-amber-400",
  Fair: "bg-amber-500/15 text-amber-700 dark:text-amber-400",
  // negative
  Overdue: "bg-red-500/15 text-red-700 dark:text-red-400",
  Unpaid: "bg-red-500/15 text-red-700 dark:text-red-400",
  Cancelled: "bg-red-500/15 text-red-700 dark:text-red-400",
  "Needs Repair": "bg-red-500/15 text-red-700 dark:text-red-400",
  "In Repair": "bg-red-500/15 text-red-700 dark:text-red-400",
  Expired: "bg-red-500/15 text-red-700 dark:text-red-400",
  Blacklisted: "bg-red-500/15 text-red-700 dark:text-red-400",
  // neutral
  Draft: "bg-muted text-muted-foreground",
  Inactive: "bg-muted text-muted-foreground",
};

export function StatusBadge({ status, className }: { status: string; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium whitespace-nowrap",
        STATUS_STYLES[status] ?? "bg-muted text-muted-foreground",
        className
      )}
    >
      {status}
    </span>
  );
}
