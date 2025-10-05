import { createContext, useContext, useState, useEffect } from 'react';
import type User from '../interfaces/User';

interface UserContextType {
  user: User | null;
  loading: boolean;
  setUser: (user: User | null) => void;
}

const UserContext = createContext<UserContextType>({
  user: null,
  loading: true,
  setUser: () => { }
});

export function UserProvider({ children }: { children: any }) {
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

  return (
    <UserContext.Provider value={{ user, loading, setUser }
    }>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}