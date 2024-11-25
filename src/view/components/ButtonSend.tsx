import { ComponentProps } from "react";

interface IButtonProps extends ComponentProps<"button"> {
  containerStyle: string;
}

export function ButtonSend({ containerStyle = "", ...props }: IButtonProps) {
  return (
    <button
      {...props}
      className={` ${containerStyle} bg-blueColor-dark hover:bg-blueColor-dark/90 disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed px-6 h-[48px] rounded-lg font-medium text-white text-base transition-all`}
    />
  );
}
