import { Navigate, Outlet } from "react-router-dom";

interface IAuthGuardProps {
  isPrivate: boolean;
}

export function AuthGuard({ isPrivate }: IAuthGuardProps) {
  const signedIn = false;

  if (!signedIn && isPrivate) {
    return <Navigate to="/" replace />;
  }

  if (signedIn && !isPrivate) {
    return <Navigate to="/tours" replace />;
  }

  return <Outlet />;
}
