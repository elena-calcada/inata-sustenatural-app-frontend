import { Outlet } from "react-router-dom";

import logo from "../../assets/logo.png";

export function AuthLayout() {
  return (
    <main className="w-full h-full bg-background flex flex-col items-center justify-center gap-8">
      <img src={logo} alt="" className="w-[236px] h-[119px]" />
      <div className="max-w-md">
        <Outlet />
      </div>
    </main>
  );
}
