"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

// Define shape of User
interface User {
  id?: string;
  _id?: string;
  name: string;
  email: string;
  role: "admin" | "vendor" | "customer";
  token?: string;
}

interface AuthContextType {
  user: User | null;
  login: (token: string, userData: User) => void;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: () => {},
  logout: () => {},
  loading: true,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/auth/me", {credentials: 'include'});
        const data = await res.json();
        if (data.success && data.user) {
          setUser(data.user);
        }
      } catch (err) {
        console.error("Failed to fetch user session");
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const login = (token: string, userData: User) => {
    // Let cookie handle the token, we just set the local memory state
    setUser(userData);
  };

  const logout = async () => {
    try {
      await fetch("http://localhost:5000/api/auth/logout", {credentials: 'include'});
    } catch (err) {
      console.error(err);
    }
    setUser(null);
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
