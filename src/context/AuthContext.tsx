// src/contexts/AuthContext.tsx
import type { ReactNode } from "react";
import { jwtDecode } from "jwt-decode";
import React, {
  useMemo,
  useState,
  useEffect,
  useContext,
  useCallback,
  createContext,
} from "react";
import { useNavigate } from "react-router-dom";

interface AuthContextType {
  token: string | null;
  username: string | null;
  role: string | null;
  setToken: (
    token: string | null,
    user?: { username: string; role: string }
  ) => void;
  setUsername: (username: string | null) => void;
  setRole: (role: string | null) => void;
  isAuthenticated: () => boolean | null;
  useLogout: () => void;
}

interface DecodedToken {
  exp: number;
  username?: string;
  role?: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [token, setTokenState] = useState<string | null>(null);
  const [username, setUsernameState] = useState<string | null>(null);
  const [role, setRoleState] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const setUsername = useCallback((newUsername: string | null) => {
    setUsernameState(newUsername);
    if (newUsername) {
      localStorage.setItem("authUsername", newUsername);
    } else {
      localStorage.removeItem("authUsername");
    }
  }, []);

  const setRole = useCallback((newRole: string | null) => {
    setRoleState(newRole);
    if (newRole) {
      localStorage.setItem("authRole", newRole);
    } else {
      localStorage.removeItem("authRole");
    }
  }, []);

  const setToken = useCallback(
    (newToken: string | null, user?: { username: string; role: string }) => {
      setTokenState(newToken);

      if (newToken) {
        localStorage.setItem("authToken", newToken);

        if (user) {
          setUsername(user.username);
          setRole(user.role);
        }
      } else {
        localStorage.removeItem("authToken");
        setUsername(null);
        setRole(null);
      }
    },
    [setUsername, setRole]
  );

  useEffect(() => {
    const savedToken = localStorage.getItem("authToken");
    const savedUsername = localStorage.getItem("authUsername");
    const savedRole = localStorage.getItem("authRole");

    if (savedToken) {
      setTokenState(savedToken);
      setUsernameState(savedUsername);
      setRoleState(savedRole);

      try {
        const decoded: DecodedToken = jwtDecode(savedToken);
        const currentTime = Date.now() / 1000;

        if (decoded.exp <= currentTime) {
          setToken(null);
          navigate("/");
        } else {
          const timeout = (decoded.exp - currentTime) * 1000;
          const timer = setTimeout(() => {
            setToken(null);
            navigate("/");
          }, timeout);

          setIsLoading(false);
          return () => clearTimeout(timer);
        }
      } catch (error) {
        console.error("Erro ao decodificar o token:", error);
        setToken(null);
      }
    } else {
      setIsLoading(false);
    }

    return undefined;
  }, [setToken, navigate]);

  const isAuthenticated = useCallback(() => {
    if (isLoading) return null;
    if (!token) return false;

    try {
      const decoded: DecodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      return decoded.exp > currentTime;
    } catch (error) {
      console.error("Erro ao decodificar o token:", error);
      return false;
    }
  }, [token, isLoading]);

  const useLogout = useCallback(() => {
    setToken(null);
    navigate("/");
  }, [setToken, navigate]);

  const memorizedValue = useMemo(
    () => ({
      token,
      username,
      role,
      setToken,
      setUsername,
      setRole,
      isAuthenticated,
      useLogout,
    }),
    [
      token,
      username,
      role,
      setToken,
      setUsername,
      setRole,
      isAuthenticated,
      useLogout,
    ]
  );

  return (
    <AuthContext.Provider value={memorizedValue}>
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
};
