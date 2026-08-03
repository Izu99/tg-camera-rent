import { cn } from "@/lib/utils";

type Tone = "success" | "info" | "warning" | "danger" | "neutral";

/** Every status in the app maps to one of four semantic tones.
 *  The tones themselves are defined once, in globals.css. */
const TONE_BY_STATUS: Record<string, Tone> = {
  // settled / healthy
  Available: "success",
  Paid: "success",
  Completed: "success",
  Excellent: "success",
  Accepted: "success",
  Active: "success",
  Returned: "success",
  // in flight
  Confirmed: "info",
  Rented: "info",
  Good: "info",
  "In Progress": "info",
  Sent: "info",
  // needs attention
  Pending: "warning",
  Reserved: "warning",
  Partial: "warning",
  Fair: "warning",
  // problem
  Overdue: "danger",
  Unpaid: "danger",
  Cancelled: "danger",
  "Needs Repair": "danger",
  "In Repair": "danger",
  Expired: "danger",
  Blacklisted: "danger",
  // dormant
  Draft: "neutral",
  Inactive: "neutral",
};

const TONE_STYLES: Record<Tone, { wrap: string; dot: string }> = {
  success: { wrap: "text-success ring-success/25 bg-success/8", dot: "bg-success" },
  info: { wrap: "text-info ring-info/25 bg-info/8", dot: "bg-info" },
  warning: { wrap: "text-warning ring-warning/25 bg-warning/8", dot: "bg-warning" },
  danger: { wrap: "text-danger ring-danger/25 bg-danger/8", dot: "bg-danger" },
  neutral: {
    wrap: "text-muted-foreground ring-border bg-muted",
    dot: "bg-muted-foreground/60",
  },
};

export function StatusBadge({
  status,
  className,
}: {
  status: string;
  className?: string;
}) {
  const tone = TONE_BY_STATUS[status] ?? "neutral";
  const styles = TONE_STYLES[tone];

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 whitespace-nowrap rounded px-1.5 py-0.5",
        "text-[0.6875rem] font-medium ring-1 ring-inset",
        styles.wrap,
        className
      )}
    >
      <span className={cn("size-1.5 rounded-full", styles.dot)} aria-hidden />
      {status}
    </span>
  );
}
