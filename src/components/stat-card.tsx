import type { LucideIcon } from "lucide-react";
import { ArrowDown, ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";

type Tone = "default" | "success" | "warning" | "danger";

const VALUE_TONE: Record<Tone, string> = {
  default: "text-foreground",
  success: "text-success",
  warning: "text-warning",
  danger: "text-danger",
};

export function StatCard({
  label,
  value,
  icon: Icon,
  hint,
  trend,
  trendLabel,
  tone = "default",
}: {
  label: string;
  value: string;
  icon: LucideIcon;
  hint?: string;
  trend?: number;
  trendLabel?: string;
  tone?: Tone;
}) {
  const up = (trend ?? 0) >= 0;

  return (
    <div className="rounded-lg border border-border bg-card px-3.5 py-3">
      <div className="flex items-center gap-1.5">
        <Icon className="size-3.5 shrink-0 text-muted-foreground/70" strokeWidth={2} />
        <span className="label-micro truncate">{label}</span>
      </div>

      <p
        className={cn(
          "mt-2 text-[1.625rem] font-semibold leading-none tracking-tight",
          VALUE_TONE[tone]
        )}
      >
        {value}
      </p>

      {(trend !== undefined || hint) && (
        <div className="mt-2 flex items-center gap-1.5 text-xs">
          {trend !== undefined && (
            <span
              className={cn(
                "inline-flex items-center gap-0.5 font-medium tabular",
                up ? "text-success" : "text-danger"
              )}
            >
              {up ? <ArrowUp className="size-3" /> : <ArrowDown className="size-3" />}
              {Math.abs(trend)}%
            </span>
          )}
          {(trendLabel || hint) && (
            <span className="truncate text-muted-foreground">{trendLabel ?? hint}</span>
          )}
        </div>
      )}
    </div>
  );
}
