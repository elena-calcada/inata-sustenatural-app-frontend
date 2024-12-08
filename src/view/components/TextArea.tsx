import { CircleX } from "lucide-react";
import { ComponentProps, forwardRef } from "react";

import { cn } from "../../app/utils/cn";

interface ITextAreaProps extends ComponentProps<"textarea"> {
  name: string;
  error?: string;
}

export const TextArea = forwardRef<HTMLTextAreaElement, ITextAreaProps>(
  ({ placeholder, className, name, id, error, ...props }, ref) => {
    const textareaId = id ?? name;
    return (
      <div className="relative">
        <textarea
          {...props}
          ref={ref}
          name={name}
          id={textareaId}
          placeholder=" "
          className={cn(
            "bg-white rounded-lg border border-gray-400 px-3 min-h-48 text-gray-800 w-full pt-7 peer placeholder-shown:pt-3 focus:border-gray-800 transition-all outline-none resize-none",
            error && "!border-redAlert",
            className,
          )}
        />

        <label
          htmlFor={textareaId}
          className="absolute text-xs left-[13px] top-2 pointer-events-none text-gray-700 peer-placeholder-shown:text-base peer-placeholder-shown:top-3.5 transition-all"
        >
          {placeholder}
        </label>

        {error && (
          <div className="flex items-center gap-1 mt-0 text-redAlert">
            <CircleX size={14} />
            <span className="text-xs ">{error}</span>
          </div>
        )}
      </div>
    );
  },
);
