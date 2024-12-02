import { Outlet } from "react-router-dom";

import { Header } from "../components/Header";

export function PageLayout() {
  return (
    <div>
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  );
}
