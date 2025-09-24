import { useEffect, useState } from 'react';
import type User from '../interfaces/User';

export function useUser() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await fetch("/api/login", {
          method: "GET",
          credentials: "include",
        });
        const data = await response.json();

        if (response.ok && !data.error) {
          setUser(data);
        }
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, []);

  return { user, loading };
}