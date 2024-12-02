import { CircleX } from "lucide-react";
import { ComponentProps, forwardRef } from "react";

import { cn } from "../../app/utils/cn";

interface IInputProps extends ComponentProps<"input"> {
  name: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, IInputProps>(
  ({ className, placeholder, name, id, error, ...props }, ref) => {
    const inputId = id ?? name;
    return (
      <div className="relative">
        <input
          {...props}
          ref={ref}
          name={name}
          id={inputId}
          placeholder=" "
          className={cn(
            "bg-white rounded-lg border border-gray-400 px-3 h-[52px] text-gray-800 w-full pt-4 peer placeholder-shown:pt-0 focus:border-gray-800 transition-all outline-none",
            error && "!border-redAlert",
            className,
          )}
        />

        <label
          htmlFor={inputId}
          className="absolute text-xs left-[13px] top-2 pointer-events-none text-gray-700 peer-placeholder-shown:text-base peer-placeholder-shown:top-3.5 transition-all"
        >
          {placeholder}
        </label>

        {error && (
          <div className="flex items-center gap-1 mt-1 text-redAlert">
            <CircleX size={14} />
            <span className="text-xs ">{error}</span>
          </div>
        )}
      </div>
    );
  },
);
