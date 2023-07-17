import { analystActions } from "actions/analystAction";
import { useAppDispatch, useAppSelector } from "hooks/redux";
import { useLocalStorage } from "hooks/useLocalStorage";
import { createContext, useContext } from "react";
import type { ReactNode } from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import routeNames from "routes/routeNames.json";

const AuthContext = createContext(
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
  const { loggedAnalyst } = useAppSelector((state) => state.analysts);
  const [auth, setAuth] = useLocalStorage("auth"); // TODO: remove localstorage and add redux-persist

  const login = (email: string, password: string) => {
    const analyst = analysts.find((analyst) => analyst.email === email);

    if (!analyst) return { isLogged: false, status: "User not found" };

    if (analyst.password !== password)
      return { isLogged: false, status: "Invalid password" };

    setAuth(analyst);

    dispatch(analystActions.setLoggedAnalyst(analyst));

    return { isLogged: true, status: "" };
  };

  const logout = () => {
    dispatch(analystActions.setLoggedAnalyst({} as Analyst));
  };

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
