import { Transaction } from "@/types";

const STORAGE_KEY = "cowree_transactions";

export function getTransactions(): Transaction[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveTransaction(txn: Transaction): void {
  const existing = getTransactions();
  const updated = [txn, ...existing.filter((t) => t.id !== txn.id)];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
}

export function updateTransaction(id: string, patch: Partial<Transaction>): void {
  const all = getTransactions();
  const updated = all.map((t) => (t.id === id ? { ...t, ...patch, updatedAt: new Date().toISOString() } : t));
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
}
