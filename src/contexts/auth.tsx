import { useLocalStorage } from "hooks/useLocalStorage";
import { createContext, useContext } from "react";
import type { ReactNode } from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import routeNames from "routes/routeNames.json";

const AuthContext = createContext(
  {} as {
    analyst: Analyst | null;
    login: () => void;
    logout: () => void;
  }
);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [analyst, setAnalyst] = useLocalStorage<Analyst | null>("analyst");

  const login = () => {
    setAnalyst({
      id: "Id do analista",
      user_id: "Id do usuário",
      email: "Email de autenticação do analista",
      password: "Senha do analista",
      roles: "Cada role representa um grupo de acesso",
    });
  };

  const logout = () => {
    setAnalyst(null);
  };

  return (
    <AuthContext.Provider value={{ analyst, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const RequireAuth = () => {
  const { analyst } = useAuth();
  const location = useLocation();

  if (!analyst) {
    return (
      <Navigate
        to={{ pathname: routeNames.LOGIN }}
        state={{ from: location }}
        replace
      />
    );
  }

  return <Outlet />;
};
