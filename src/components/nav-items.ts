import {
  LayoutDashboard,
  Package,
  CalendarCheck,
  Handshake,
  Undo2,
  Users,
  FileText,
  FileSpreadsheet,
  Wrench,
  Wallet,
  UserCog,
  Building2,
  type LucideIcon,
} from "lucide-react";

export interface NavItem {
  title: string;
  href: string;
  icon: LucideIcon;
  /** shown in the mobile bottom tab bar; the rest live under "More" */
  mobilePrimary?: boolean;
}

export interface NavGroup {
  label: string;
  items: NavItem[];
}

export const navGroups: NavGroup[] = [
  {
    label: "Overview",
    items: [{ title: "Dashboard", href: "/", icon: LayoutDashboard, mobilePrimary: true }],
  },
  {
    label: "Operations",
    items: [
      { title: "Bookings", href: "/bookings", icon: CalendarCheck, mobilePrimary: true },
      { title: "Rentals", href: "/rentals", icon: Handshake, mobilePrimary: true },
      { title: "Returns", href: "/returns", icon: Undo2 },
      { title: "Repairs", href: "/repairs", icon: Wrench },
    ],
  },
  {
    label: "Catalog",
    items: [
      { title: "Inventory", href: "/inventory", icon: Package, mobilePrimary: true },
      { title: "Customers", href: "/customers", icon: Users },
    ],
  },
  {
    label: "Billing",
    items: [
      { title: "Invoices", href: "/invoices", icon: FileText },
      { title: "Quotations", href: "/quotations", icon: FileSpreadsheet },
      { title: "Finance", href: "/finance", icon: Wallet },
    ],
  },
  {
    label: "Administration",
    items: [
      { title: "Staff", href: "/staff", icon: UserCog },
      { title: "Branches", href: "/branches", icon: Building2 },
    ],
  },
];

export const navItems: NavItem[] = navGroups.flatMap((g) => g.items);

export function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

export function sectionTitle(pathname: string) {
  const match = [...navItems]
    .filter((i) => i.href !== "/")
    .sort((a, b) => b.href.length - a.href.length)
    .find((i) => pathname.startsWith(i.href));
  return pathname === "/" ? "Dashboard" : match?.title ?? "Dashboard";
}
