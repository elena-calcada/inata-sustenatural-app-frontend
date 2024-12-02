import logo from "../../assets/logo.png";

import { Spinner } from "./Spinner";

export function PageLoader() {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex flex-col gap-4 items-center justify-center">
      <img className="w-[145px] h-[83px]" src={logo} alt="" />
      <Spinner />
    </div>
  );
}
