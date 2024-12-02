import { Navigate, Outlet } from "react-router-dom";

import { useAuth } from "../app/hooks/useAuth";

interface IAuthGuardProps {
  isPrivate: boolean;
}

export function AuthGuard({ isPrivate }: IAuthGuardProps) {
  const { isSignedIn, signout } = useAuth();

  if (!isSignedIn && isPrivate) {
    signout();
    return <Navigate to="/" replace />;
  }

  if (isSignedIn && !isPrivate) {
    return <Navigate to="/tours" replace />;
  }

  return <Outlet />;
}
