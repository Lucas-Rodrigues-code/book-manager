import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";
import { PrivateRoute } from "./privateRoutes";
import LoginPage from "@/pages/login";
import RegisterPage from "@/pages/register";
import Layout from "@/components/layout";

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
            <Route path="/home" element={<div className="container">home</div>} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
};
