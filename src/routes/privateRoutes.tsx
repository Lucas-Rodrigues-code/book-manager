import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

export const PrivateRoute = () => {
  const { signed } = useAuth();
  return signed ? <Outlet /> : <Navigate to="/auth/login" />;
};
