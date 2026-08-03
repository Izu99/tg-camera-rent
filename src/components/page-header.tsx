import type { ReactNode } from "react";

export function PageHeader({
  title,
  description,
  actions,
}: {
  title: string;
  description?: string;
  actions?: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-3 border-b border-border bg-card px-4 py-3.5 sm:flex-row sm:items-center sm:justify-between md:px-6">
      <div className="min-w-0">
        <h2 className="text-[0.9375rem] font-semibold tracking-tight">{title}</h2>
        {description && (
          <p className="mt-0.5 text-xs text-muted-foreground">{description}</p>
        )}
      </div>
      {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
    </div>
  );
}

/** Bordered panel used to frame tables and grouped content. */
export function Panel({
  title,
  description,
  actions,
  children,
  bleed = false,
}: {
  title?: string;
  description?: string;
  actions?: ReactNode;
  children: ReactNode;
  /** remove inner padding — use when the child is a full-bleed table */
  bleed?: boolean;
}) {
  return (
    <section className="overflow-hidden rounded-lg border border-border bg-card">
      {(title || actions) && (
        <header className="flex items-center justify-between gap-3 border-b border-border px-3.5 py-2.5">
          <div className="min-w-0">
            {title && <h3 className="text-[0.8125rem] font-semibold">{title}</h3>}
            {description && (
              <p className="mt-0.5 text-xs text-muted-foreground">{description}</p>
            )}
          </div>
          {actions}
        </header>
      )}
      <div className={bleed ? "" : "p-3.5"}>{children}</div>
    </section>
  );
}
