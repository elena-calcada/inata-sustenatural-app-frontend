import { ComponentProps } from "react";

import { cn } from "../../app/utils/cn";

interface IButtonProps extends ComponentProps<"button"> {}

export function ButtonSend({ className, ...props }: IButtonProps) {
  return (
    <button
      {...props}
      className={cn(
        "bg-blueColor-dark hover:bg-blueColor-dark/90 disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed px-6 h-[48px] rounded-lg font-medium text-white text-base transition-all",
        className,
      )}
    />
  );
}
