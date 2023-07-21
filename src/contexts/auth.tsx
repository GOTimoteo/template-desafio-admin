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
  const { loggedAnalyst } = useAppSelector((state) => state.analysts); // TODO: passar a loggedAnalyst ao provider no lugar da auth após persistir estado
  const [auth, setAuth] = useLocalStorage("auth"); // TODO: remove localstorage and add redux-persist

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

export const RequireN2 = () => {
  const { analyst } = useAuth();
  const location = useLocation();

  if (!analyst.roles.includes("n2")) {
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
