import { Outlet } from "react-router-dom";

import logo from "../../assets/logo.png";

export function AuthLayout() {
  return (
    <main className="w-full h-full bg-white flex flex-col items-center justify-center gap-8">
      <img src={logo} alt="" className="w-[236px] h-[119px]" />
      <div className="w-full">
        <Outlet />
      </div>
    </main>
  );
}
