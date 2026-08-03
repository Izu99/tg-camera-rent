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
  mobilePrimary?: boolean;
}

export const navItems: NavItem[] = [
  { title: "Dashboard", href: "/", icon: LayoutDashboard, mobilePrimary: true },
  { title: "Inventory", href: "/inventory", icon: Package, mobilePrimary: true },
  { title: "Bookings", href: "/bookings", icon: CalendarCheck, mobilePrimary: true },
  { title: "Rentals", href: "/rentals", icon: Handshake, mobilePrimary: true },
  { title: "Returns", href: "/returns", icon: Undo2 },
  { title: "Customers", href: "/customers", icon: Users },
  { title: "Invoices", href: "/invoices", icon: FileText },
  { title: "Quotations", href: "/quotations", icon: FileSpreadsheet },
  { title: "Repairs", href: "/repairs", icon: Wrench },
  { title: "Finance", href: "/finance", icon: Wallet },
  { title: "Staff", href: "/staff", icon: UserCog },
  { title: "Branches", href: "/branches", icon: Building2 },
];
