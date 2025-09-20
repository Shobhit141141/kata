import {
  createContext,
  useContext,
  useMemo,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useAuth } from "../api/auth";

const AuthContext = createContext(undefined);

export function AuthProvider({ children }) {
  const auth = useAuth();
  const [tokens, setTokens] = useState(auth.data?.tokens || 0);
  useEffect(() => {
    if (auth.data?.tokens !== undefined) setTokens(auth.data.tokens);
  }, [auth.data?.tokens]);

  const value = useMemo(
    () => ({
      user: auth.data,
      isLoading: auth.isLoading,
      isAuthenticated: !!auth.data,
      isAdmin: auth.data?.role === "admin",
      tokens,
      setTokens,
      refetch: auth.refetch,
    }),
    [auth.data, auth.isLoading, auth.refetch, tokens]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (!context)
    throw new Error("useAuthContext must be used within an AuthProvider");
  return context;
}
