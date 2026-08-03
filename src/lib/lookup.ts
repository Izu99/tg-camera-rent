import { branches, customers, products } from "@/lib/data";

export function getCustomer(id: string) {
  return customers.find((c) => c.id === id);
}

export function customerName(id: string) {
  return getCustomer(id)?.fullName ?? "Unknown customer";
}

export function getProduct(id: string) {
  return products.find((p) => p.id === id);
}

export function productName(id: string) {
  return getProduct(id)?.name ?? "Unknown item";
}

export function getBranch(id: string) {
  return branches.find((b) => b.id === id);
}

export function branchName(id: string) {
  return getBranch(id)?.name ?? "Unknown branch";
}
