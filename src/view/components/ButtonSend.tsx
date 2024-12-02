import { ComponentProps } from "react";

import { cn } from "../../app/utils/cn";

import { Spinner } from "./Spinner";

interface IButtonProps extends ComponentProps<"button"> {
  isPending?: boolean;
}

export function ButtonSend({
  className,
  isPending,
  disabled,
  children,
  ...props
}: IButtonProps) {
  return (
    <button
      {...props}
      disabled={disabled || isPending}
      className={cn(
        "bg-blueColor-dark hover:bg-blueColor-dark/90 disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed px-6 h-[48px] rounded-lg font-medium text-white text-base transition-all flex items-center justify-center",
        className,
      )}
    >
      {!isPending && children}
      {isPending && <Spinner className="w-6 h-6" />}
    </button>
  );
}
