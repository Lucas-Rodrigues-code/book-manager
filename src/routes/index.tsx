import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { PrivateRoute } from "./privateRoutes";
import LoginPage from "@/pages/login";
import RegisterPage from "@/pages/register";

export const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/auth/login" element={<LoginPage />} />
        <Route path="/auth/register" element={<RegisterPage />} />
        <Route path="/" element={<PrivateRoute />}>
          <Route path="/home" element={<div>home</div>} />
        </Route>
      </Routes>
    </Router>
  );
};
