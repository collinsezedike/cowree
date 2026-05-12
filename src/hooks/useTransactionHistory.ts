import { useState, useEffect } from "react";
import { Transaction } from "@/types";
import { getTransactions } from "@/lib/store/transactions";

export function useTransactionHistory() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    setTransactions(getTransactions());
  }, []);

  const refresh = () => setTransactions(getTransactions());

  return { transactions, refresh };
}
