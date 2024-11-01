import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";

import { PrivateRoute } from "./privateRoutes";
import LoginPage from "@/pages/login";
import RegisterPage from "@/pages/register";
import Layout from "@/components/layout";
import ListBookPage from "@/pages/list-book";
import NotFoundPage from "@/pages/not-found";

export const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/auth/login" element={<LoginPage />} />
        <Route path="/auth/register" element={<RegisterPage />} />
        <Route path="/" element={<PrivateRoute />}>
          <Route
            element={
              <Layout>
                <Outlet />
              </Layout>
            }
          >
            <Route path="/" element={<ListBookPage />} />
          </Route>
        </Route>
        <Route path="/*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
};
