"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import { User, UserRole } from "@/lib/types";

interface SignupPayload {
  full_name: string;
  email: string;
  password: string;
  confirm_password: string;
  phone?: string;
  institution?: string;
  role: UserRole;
}

interface AuthContextValue {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (payload: SignupPayload) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = window.localStorage.getItem("genepredict_access_token");
    if (!token) {
      setLoading(false);
      return;
    }
    api
      .get<User>("/api/auth/me")
      .then((res) => setUser(res.data))
      .catch(() => {
        window.localStorage.removeItem("genepredict_access_token");
        window.localStorage.removeItem("genepredict_refresh_token");
      })
      .finally(() => setLoading(false));
  }, []);

  async function login(email: string, password: string) {
    const res = await api.post("/api/auth/login", { email, password });
    window.localStorage.setItem(
      "genepredict_access_token",
      res.data.access_token
    );
    window.localStorage.setItem(
      "genepredict_refresh_token",
      res.data.refresh_token
    );
    const me = await api.get<User>("/api/auth/me");
    setUser(me.data);
    router.push("/dashboard");
  }

  async function signup(payload: SignupPayload) {
    await api.post("/api/auth/signup", payload);
    await login(payload.email, payload.password);
  }

  function logout() {
    window.localStorage.removeItem("genepredict_access_token");
    window.localStorage.removeItem("genepredict_refresh_token");
    setUser(null);
    router.push("/login");
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}
