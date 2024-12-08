import { ComponentProps } from "react";
import { Link } from "react-router-dom";

interface IButtonLinkProps extends ComponentProps<"a"> {
  href: string;
  containerStyle: string;
  name: string;
}

export function ButtonLink({
  href,
  name,
  containerStyle = "",
  ...props
}: IButtonLinkProps) {
  return (
    <Link
      {...props}
      to={href}
      className={`${containerStyle} text-[14px] text-blueColor-dark font-montserrat font-bold border-[3px] border-blueColor-dark px-2 py-1 rounded-md hover:bg-blueColor-dark hover:text-white transition-all`}
    >
      {name}
    </Link>
  );
}
