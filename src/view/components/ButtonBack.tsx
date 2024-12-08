import { ComponentProps } from "react";
import { Link } from "react-router-dom";

interface IButtonLinkProps extends ComponentProps<"a"> {
  href: string;
  containerStyle: string;
}

export function ButtonBack({
  href,
  containerStyle = "",
  ...props
}: IButtonLinkProps) {
  return (
    <Link
      {...props}
      to={href}
      className={`${containerStyle} text-[12px] text-blueColor-dark bg-blueColor-base/30 font-montserrat font-bold px-2 py-1 rounded-md`}
    >
      Voltar
    </Link>
  );
}
