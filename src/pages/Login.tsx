import { useState, useCallback } from "react";

import { useAuth } from "contexts/auth";
import { useLocation, useNavigate } from "react-router-dom";
import routeNames from "routes/routeNames.json";

const Login = () => {
  const [analystName, setAnalystname] = useState("");
  const { login, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = useCallback(
    (e) => {
      e.preventDefault();
      login();
      location?.state?.from
        ? navigate(location.state.from)
        : navigate(routeNames.HOME);
    },
    [login, location?.state?.from, navigate]
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
      <h1>Login page</h1>
      <form onSubmit={handleLogin}>
        <input
          value={analystName}
          onChange={(e) => setAnalystname(e.target.value)}
          placeholder="username"
        />
        <button type="submit">Login</button>
        <button type="button" onClick={handleLogout}>
          Logout
        </button>
      </form>
    </div>
  );
};

export default Login;
