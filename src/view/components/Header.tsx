import { Link } from "react-router-dom";

import { useAuth } from "../../app/hooks/useAuth";
import logo from "../../assets/logo.png";

import { UserMenu } from "./UserMenu";

export function Header() {
  const { user } = useAuth();
  return (
    <header className="h-20 fixed w-full top-0 z-50 bg-white">
      <div className="flex items-center justify-between mx-auto h-full w-full max-w-[1280px] px-4 md:px-[24px] lg:px-[64px]">
        <div>
          <Link to="/tours">
            <img
              alt="Logo do Inata Sustenatural"
              src={logo}
              width={149}
              height={75}
              className="w-[149px] h-[75px]"
            />
          </Link>
        </div>
        <div>
          <nav>
            <div className="flex items-center gap-3 md:gap-5">
              <p className="text-base font-outfit max-w-8 hidden md:block">
                {`Olá, ${user?.first_name}`}
              </p>
              <UserMenu />
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
