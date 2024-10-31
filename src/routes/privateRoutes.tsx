import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

export const PrivateRoute = () => {
  const { signed } = useAuth();
  console.log(signed, "signed");
  return signed ? <Outlet /> : <Navigate to="/auth/login" />;
};
