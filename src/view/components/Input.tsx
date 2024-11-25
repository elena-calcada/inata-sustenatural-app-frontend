import { ComponentProps } from "react";

interface IInputProps extends ComponentProps<"input"> {
  name: string;
}

export function Input({ placeholder, name, id, ...props }: IInputProps) {
  const inputId = id ?? name;
  return (
    <div className="relative">
      <input
        {...props}
        name={name}
        id={inputId}
        className="bg-white rounded-lg border border-gray-400 px-3 h-[52px] text-gray-800 w-full pt-4 peer placeholder-shown:pt-0 focus:border-gray-800 transition-all outline-none"
        placeholder=" "
      />

      <label
        htmlFor={inputId}
        className="absolute text-xs left-[13px] top-2 pointer-events-none text-gray-700 peer-placeholder-shown:text-base peer-placeholder-shown:top-3.5 transition-all"
      >
        {placeholder}
      </label>
    </div>
  );
}