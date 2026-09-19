import type { User, UserContextType } from "@/schemas/auth.schema";
import { loggedInUser } from "@/services/auth.service";
import { UNAUTHORIZED_EVENT } from "@/services/api";
import { createContext, useEffect, useState, type ReactNode } from "react";

export const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
});

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const handleUnauthorized = () => setUser(null);

    window.addEventListener(UNAUTHORIZED_EVENT, handleUnauthorized);

    const loadUser = async () => {
      try {
        const user = await loggedInUser();

        setUser(user);
      } catch {
        setUser(null);
      }
    };

    loadUser();

    return () => {
      window.removeEventListener(UNAUTHORIZED_EVENT, handleUnauthorized);
    };
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
