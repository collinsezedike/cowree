import { Transaction } from "@/types";
import { DEMO_HISTORY } from "@/lib/demo/demoData";

const STORAGE_KEY = "cowree_transactions";

function isClient() {
  return typeof window !== "undefined";
}

export function getTransactions(): Transaction[] {
  if (!isClient()) return DEMO_HISTORY;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const saved: Transaction[] = raw ? JSON.parse(raw) : [];
    return [...saved, ...DEMO_HISTORY.filter((d) => !saved.find((s) => s.id === d.id))];
  } catch {
    return DEMO_HISTORY;
  }
}

export function saveTransaction(txn: Transaction): void {
  if (!isClient()) return;
  const existing = getTransactions().filter((t) => !t.id.startsWith("demo-"));
  const updated = [txn, ...existing.filter((t) => t.id !== txn.id)];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
}

export function updateTransaction(id: string, patch: Partial<Transaction>): void {
  if (!isClient()) return;
  const all = getTransactions().filter((t) => !t.id.startsWith("demo-"));
  const updated = all.map((t) => (t.id === id ? { ...t, ...patch, updatedAt: new Date().toISOString() } : t));
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
}
