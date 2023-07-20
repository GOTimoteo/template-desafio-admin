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
  const { login } = useAuth();
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

  return (
    <div>
      <h1 className="text-2xl text-gray-700 mb-4">Login</h1>
      {analystsStatus === "loading" ? (
        "LOADING"
      ) : (
        <form
          className="flex flex-col gap-2 items-center"
          onSubmit={handleLogin}
        >
          <input
            className="text-center"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={infoMessage || "email"}
          />
          <input
            className="text-center"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="senha"
            type="password"
          />
          <div className="text-red-500 font-semibold">{infoMessage}</div>
          <button
            className="w-28 max-w-xs text-white font-semibold py-1 px-2 rounded bg-stone-green-500 hover:bg-stone-green-600 "
            type="submit"
          >
            Login
          </button>
        </form>
      )}
    </div>
  );
};

export default Login;
