export type ID = string;

export interface Category {
  id: ID;
  name: string;
  description: string;
  icon: string;
}

export type ProductCondition = "Excellent" | "Good" | "Fair" | "Needs Repair";
export type ProductStatus = "Available" | "Rented" | "In Repair" | "Reserved";

export interface Product {
  id: ID;
  categoryId: ID;
  name: string;
  brand: string;
  model: string;
  year: number;
  serialNumber: string;
  barcode: string;
  dailyRate: number;
  weeklyRate: number;
  monthlyRate: number;
  depositAmount: number;
  quantity: number;
  availableQuantity: number;
  condition: ProductCondition;
  status: ProductStatus;
  icon: string;
  notes?: string;
}

export interface Customer {
  id: ID;
  fullName: string;
  nic: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  registeredDate: string;
  totalRentals: number;
  totalSpent: number;
  rating: number;
  blacklisted: boolean;
  documentsVerified: boolean;
  notes?: string;
}

export interface BookingItem {
  productId: ID;
  quantity: number;
  unitPrice: number;
}

export type BookingStatus = "Pending" | "Confirmed" | "Cancelled";

export interface Booking {
  id: ID;
  customerId: ID;
  branchId: ID;
  bookingDate: string;
  rentalStart: string;
  rentalEnd: string;
  items: BookingItem[];
  advancePayment: number;
  status: BookingStatus;
  totalAmount: number;
  notes?: string;
}

export interface RentalItem {
  productId: ID;
  serialNumber: string;
  quantity: number;
  unitPrice: number;
  condition: ProductCondition;
}

export type RentalStatus = "Active" | "Returned" | "Overdue";

export interface Rental {
  id: ID;
  customerId: ID;
  branchId: ID;
  bookingId?: ID;
  issueDate: string;
  expectedReturnDate: string;
  items: RentalItem[];
  status: RentalStatus;
  staffName: string;
  totalValue: number;
}

export interface ReturnRecord {
  id: ID;
  rentalId: ID;
  customerId: ID;
  productId: ID;
  returnDate: string;
  condition: ProductCondition;
  damageCost: number;
  lateFee: number;
  additionalCharges: number;
  totalDue: number;
  staffName: string;
  notes?: string;
}

export type PaymentStatus = "Paid" | "Partial" | "Unpaid";
export type PaymentMethod = "Cash" | "Card" | "Bank Transfer" | "Online";

export interface Invoice {
  id: ID;
  invoiceNumber: string;
  customerId: ID;
  rentalId?: ID;
  date: string;
  dueDate: string;
  subtotal: number;
  additionalCharges: number;
  discountAmount: number;
  totalAmount: number;
  paidAmount: number;
  balanceAmount: number;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
}

export type QuotationStatus = "Draft" | "Sent" | "Accepted" | "Expired";

export interface Quotation {
  id: ID;
  quotationNumber: string;
  customerId: ID;
  date: string;
  validUntil: string;
  items: BookingItem[];
  totalAmount: number;
  status: QuotationStatus;
}

export type RepairStatus = "Pending" | "In Progress" | "Completed";

export interface Repair {
  id: ID;
  productId: ID;
  serialNumber: string;
  repairShop: string;
  givenDate: string;
  expectedDate: string;
  returnedDate?: string;
  cost: number;
  status: RepairStatus;
  issue: string;
}

export type FinanceType = "Income" | "Expense";

export interface FinanceEntry {
  id: ID;
  date: string;
  type: FinanceType;
  category: string;
  description: string;
  amount: number;
  method: PaymentMethod;
}

export type StaffRole = "Admin" | "Manager" | "Staff";

export interface StaffMember {
  id: ID;
  name: string;
  role: StaffRole;
  branchId: ID;
  email: string;
  phone: string;
  status: "Active" | "Inactive";
  joinedDate: string;
}

export interface Branch {
  id: ID;
  name: string;
  address: string;
  city: string;
  phone: string;
  manager: string;
  status: "Active" | "Inactive";
}
