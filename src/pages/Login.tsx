import { useState, useCallback, useEffect } from "react";

import { useAuth } from "contexts/auth";
import { useLocation, useNavigate } from "react-router-dom";
import routeNames from "routes/routeNames.json";
import { useAppDispatch, useAppSelector } from "hooks/redux";
import { fetchAnalysts } from "actions/analystAction";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [infoMessage, setInfoMessage] = useState("");
  const { login, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { status: analystsStatus } = useAppSelector((state) => state.analysts);

  useEffect(() => {
    dispatch(fetchAnalysts());
  }, [dispatch]);

  const handleLogin = useCallback(
    (e) => {
      e.preventDefault();
      login(email, password).isLogged &&
        (location?.state?.from
          ? navigate(location.state.from)
          : navigate(routeNames.HOME));
      setInfoMessage(login(email, password).status);
    },
    [login, email, password, location?.state?.from, navigate]
  );

  const handleLogout = useCallback(
    (e) => {
      e.preventDefault();
      logout();
    },
    [logout]
  );

  return (
    <div>
      <h1 className="text-2xl text-gray-700 mb-4">Login</h1>
      {analystsStatus === "loading" ? (
        "LOADING"
      ) : (
        <form onSubmit={handleLogin}>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={infoMessage || "username"}
          />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="password"
            type="password"
          />
          <button type="submit">Login</button>
          <button type="button" onClick={handleLogout}>
            Logout
          </button>
        </form>
      )}
    </div>
  );
};

export default Login;
