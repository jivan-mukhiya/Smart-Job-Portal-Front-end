  
"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { authStorage } from "@/lib/auth-storage";

import type { UserRole } from "@/constants/roles";
import type { LoginData } from "@/types/auth";

interface AuthUser {
  userId: number;
  fullName: string;
  email: string;
  role: UserRole;
  tokenType: string;
}

interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (data: LoginData) => void;
  logout: () => void;
}

const AuthContext =
  createContext<AuthContextType | undefined>(
    undefined,
  );

export function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] =
    useState<AuthUser | null>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    try {
      const storedUser =
        authStorage.getUser();

      const accessToken =
        authStorage.getAccessToken();

      if (
        storedUser &&
        accessToken
      ) {
        setUser({
          userId: storedUser.userId,
          fullName: storedUser.fullName,
          email: storedUser.email,
          role: storedUser.role,
          tokenType:
            storedUser.tokenType,
        });
      } else {
        authStorage.clear();
        setUser(null);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  const login = (data: LoginData) => {
    authStorage.saveLogin(data);

    setUser({
      userId: data.userId,
      fullName: data.fullName,
      email: data.email,
      role: data.role,
      tokenType: data.tokenType,
    });
  };

  const logout = () => {
    /*
     * Remove access token,
     * refresh token,
     * user information,
     * access-token cookie,
     * role cookie.
     */
    authStorage.clear();

    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        loading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context =
    useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider",
    );
  }

  return context;
}
