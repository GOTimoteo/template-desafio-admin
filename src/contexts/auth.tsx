import analystSlice from "slices/analystSlice";
import { useAppDispatch, useAppSelector } from "hooks/redux";
import { useLocalStorage } from "hooks/useLocalStorage";
import { createContext, useContext, useEffect } from "react";
import type { ReactNode } from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import routeNames from "routes/routeNames.json";

export const AuthContext = createContext(
  {} as {
    analyst: Analyst;
    login: (
      email: string,
      password: string
    ) => { isLogged: boolean; status: string };
    logout: () => void;
  }
);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const dispatch = useAppDispatch();
  const { analysts } = useAppSelector((state) => state.analysts);
  const { loggedAnalyst } = useAppSelector((state) => state.analysts); // TODO: passar a loggedAnalyst ao provider no lugar da auth após passar o login para o backend
  const [auth, setAuth] = useLocalStorage("auth");
  // TODO: remover o localstorage após o login ser passado para o backend. O Front irá gerenciar a autenticação através de httpOnly cookies que expiram.

  const login = (email: string, password: string) => {
    const analyst = analysts.find((analyst) => analyst.email === email);

    if (!analyst) return { isLogged: false, status: "Usuário não encontrado" };

    if (analyst.password !== password)
      return { isLogged: false, status: "Senha inválida" };

    setAuth(analyst);

    dispatch(analystSlice.actions.setLoggedAnalyst(analyst));

    return { isLogged: true, status: "" };
  };

  const logout = () => {
    setAuth({});
    dispatch(analystSlice.actions.setLoggedAnalyst({} as Analyst));
  };

  useEffect(() => {
    if (Object.keys(auth).length !== 0)
      dispatch(analystSlice.actions.setLoggedAnalyst(auth));
  }, [auth, dispatch]);

  return (
    <AuthContext.Provider value={{ analyst: auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const RequireAuth = () => {
  const { analyst } = useAuth();
  const location = useLocation();

  if (Object.keys(analyst).length === 0) {
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

// TECH: Essa abordagem permite fácil bloqueio de usuários a rotas, centralizando a regra negocial e facilitando escala

export const RequireN2 = () => {
  const { analyst } = useAuth();
  const location = useLocation();

  if (!analyst.roles.includes("n2")) {
    // TODO: centralizar variáveis hardcoded em dictionaries para facilitar entendimento e alteração das regras de negócio
    // TODO: o redirect poderia ser para uma página de acesso não autorizado, para ter feedback ao usuário e evitar confusão.
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
