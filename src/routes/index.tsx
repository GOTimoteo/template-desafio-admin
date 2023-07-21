import { BrowserRouter, Routes, Route } from "react-router-dom";
import routeNames from "routes/routeNames.json";

import { AuthProvider, RequireAuth, RequireN2 } from "contexts/auth";
import Layout from "components/Layout";
import HomePage from "pages/Home";
import UsersPage from "pages/Users";
import AuditsPage from "pages/Audits";
import LoginPage from "pages/Login";

const Router = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route element={<RequireAuth />}>
              <Route path={routeNames.HOME} element={<HomePage />} />
              <Route path={routeNames.USERS} element={<UsersPage />} />
              <Route element={<RequireN2 />}>
                <Route path={routeNames.AUDITS} element={<AuditsPage />} />
              </Route>
              {/* TODO: <Route path="*" element={<NotFoundPage />} /> */}
            </Route>
            <Route path={routeNames.LOGIN} element={<LoginPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default Router;
