"use client";

import { useState, useEffect, useCallback } from "react";

export function useTokens() {
  const [balance, setBalance] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBalance = useCallback(async () => {
    try {
      const res = await fetch("/api/tokens/balance");
      if (res.ok) {
        const data = await res.json();
        setBalance(data.balance);
        setError(null);
      } else {
        setError("Token bakiyesi alinamadi");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Baglanti hatasi");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBalance();
  }, [fetchBalance]);

  return { balance, loading, error, refetch: fetchBalance };
}
