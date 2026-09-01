import { Navigate, Outlet } from "react-router";
import { useContext } from "react";
import { UserContext } from "@/contexts/User.context";

type ProtectedRouteProps = {
  requireAuth?: boolean;
  redirectTo?: string;
};

function ProtectedRoute({
  requireAuth = false,
  redirectTo = "/",
}: ProtectedRouteProps) {
  const { user } = useContext(UserContext);

  if (requireAuth && !user) {
    return <Navigate to={redirectTo} replace />;
  }

  if (!requireAuth && user) {
    return <Navigate to={redirectTo} replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
