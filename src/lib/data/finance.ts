import type { FinanceEntry } from "@/lib/types";

export const financeEntries: FinanceEntry[] = [
  { id: "fn-1", date: "2026-08-02", type: "Income", category: "Rental", description: "Rental payment - Colombo Ad Collective", amount: 42000, method: "Online" },
  { id: "fn-2", date: "2026-08-02", type: "Income", category: "Rental", description: "Rental payment - Nimal Rajapaksha", amount: 22000, method: "Cash" },
  { id: "fn-3", date: "2026-08-01", type: "Expense", category: "Salary", description: "Staff salaries - July", amount: 385000, method: "Bank Transfer" },
  { id: "fn-4", date: "2026-08-01", type: "Income", category: "Deposit", description: "Security deposit - Kavith Studios", amount: 90000, method: "Bank Transfer" },
  { id: "fn-5", date: "2026-07-31", type: "Income", category: "Rental", description: "Rental payment - Kavith Studios (partial)", amount: 40000, method: "Card" },
  { id: "fn-6", date: "2026-07-30", type: "Expense", category: "Repair", description: "Godox AD200 flash tube repair", amount: 3500, method: "Cash" },
  { id: "fn-7", date: "2026-07-30", type: "Income", category: "Rental", description: "Rental payment - Wedding Wale Studios (partial)", amount: 20000, method: "Cash" },
  { id: "fn-8", date: "2026-07-29", type: "Income", category: "Rental", description: "Rental payment - Lakshan Media Productions", amount: 31000, method: "Bank Transfer" },
  { id: "fn-9", date: "2026-07-29", type: "Expense", category: "Transport", description: "Equipment delivery - Kandy branch", amount: 8500, method: "Cash" },
  { id: "fn-10", date: "2026-07-28", type: "Expense", category: "Utilities", description: "Electricity bill - Colombo Main", amount: 24000, method: "Bank Transfer" },
  { id: "fn-11", date: "2026-07-27", type: "Income", category: "Late Fee", description: "Late return fee - Godox AD200 kit", amount: 2000, method: "Cash" },
  { id: "fn-12", date: "2026-07-26", type: "Income", category: "Rental", description: "Rental payment - Pinnacle Films", amount: 30000, method: "Bank Transfer" },
  { id: "fn-13", date: "2026-07-25", type: "Expense", category: "Maintenance", description: "Studio lighting bulb replacements", amount: 6200, method: "Cash" },
  { id: "fn-14", date: "2026-07-24", type: "Income", category: "Damage Fee", description: "Damage charge - Sigma 35mm lens scratch", amount: 8000, method: "Cash" },
  { id: "fn-15", date: "2026-07-22", type: "Income", category: "Rental", description: "Rental payment - Chamodi Wijesuriya", amount: 18000, method: "Card" },
  { id: "fn-16", date: "2026-07-20", type: "Expense", category: "Rent", description: "Galle branch shop rent - July", amount: 95000, method: "Bank Transfer" },
  { id: "fn-17", date: "2026-07-20", type: "Income", category: "Rental", description: "Rental payment - Tharushi Ellawala", amount: 8500, method: "Online" },
  { id: "fn-18", date: "2026-07-18", type: "Expense", category: "Marketing", description: "Social media ad campaign", amount: 15000, method: "Card" },
  { id: "fn-19", date: "2026-07-18", type: "Income", category: "Rental", description: "Rental payment - Isuru Madushanka", amount: 13000, method: "Cash" },
  { id: "fn-20", date: "2026-07-15", type: "Income", category: "Rental", description: "Rental payment - Lakshan Media Productions", amount: 91000, method: "Bank Transfer" },
];

// Daily revenue for the dashboard trend chart (last 14 days)
export const revenueHistory: { date: string; revenue: number; expenses: number }[] = [
  { date: "2026-07-21", revenue: 68000, expenses: 12000 },
  { date: "2026-07-22", revenue: 82000, expenses: 15000 },
  { date: "2026-07-23", revenue: 54000, expenses: 9000 },
  { date: "2026-07-24", revenue: 96000, expenses: 18000 },
  { date: "2026-07-25", revenue: 71000, expenses: 22000 },
  { date: "2026-07-26", revenue: 88000, expenses: 11000 },
  { date: "2026-07-27", revenue: 63000, expenses: 14000 },
  { date: "2026-07-28", revenue: 79000, expenses: 26000 },
  { date: "2026-07-29", revenue: 105000, expenses: 13000 },
  { date: "2026-07-30", revenue: 92000, expenses: 17000 },
  { date: "2026-07-31", revenue: 118000, expenses: 15500 },
  { date: "2026-08-01", revenue: 132000, expenses: 385000 },
  { date: "2026-08-02", revenue: 64000, expenses: 9500 },
  { date: "2026-08-03", revenue: 41000, expenses: 4000 },
];

// Revenue share by equipment category (last 30 days)
export const categoryRevenue: { category: string; revenue: number }[] = [
  { category: "Cameras", revenue: 612000 },
  { category: "Lenses", revenue: 248000 },
  { category: "Drones & Gimbals", revenue: 196000 },
  { category: "Lighting", revenue: 134000 },
  { category: "Audio", revenue: 87000 },
  { category: "Tripods & Support", revenue: 58000 },
  { category: "Accessories", revenue: 32000 },
];
