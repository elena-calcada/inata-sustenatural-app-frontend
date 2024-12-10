import { ChevronDownIcon, ChevronUpIcon } from "@radix-ui/react-icons";
import * as RdxSelect from "@radix-ui/react-select";
import { CircleX } from "lucide-react";

import { cn } from "../../app/utils/cn";

interface ISelectProps {
  className?: string;
  error?: string;
  placeholder?: string;
  label: string;
  options: {
    value: string;
    name: string;
  }[];
  onChange?(value: string): void;
  value?: string;
}

export function Select({
  className,
  error,
  placeholder,
  options,
  label,
  onChange,
  value,
}: ISelectProps) {
  function handleSelect(selectValue: string) {
    onChange?.(selectValue);
  }

  return (
    <div className="w-full">
      <div className="mb-1">
        <label className="font-outfit font-semibold text-grayDark text-sm">
          {label}
        </label>
      </div>
      <RdxSelect.Root value={value ?? ""} onValueChange={handleSelect}>
        <RdxSelect.Trigger
          className={cn(
            "border border-gray-400 rounded-lg px-3 h-[52px] text-grayDark focus:border-grayDark w-full transition-all outline-none text-left relative flex items-center bg-white",
            className,
            error && "border-redAlert focus:border-redAlert text-redAlert",
          )}
        >
          <RdxSelect.Value
            placeholder={
              <span className="text-gray-400 font-outfit font-light">
                {placeholder}
              </span>
            }
          />
          <RdxSelect.Icon className="absolute right-3">
            <ChevronDownIcon className="w-6 h-6 text-grayDark" />
          </RdxSelect.Icon>
        </RdxSelect.Trigger>

        <RdxSelect.Portal>
          <RdxSelect.Content
            position="popper"
            // sideOffset={3}
            style={{ maxHeight: "400px" }}
            className="bg-white w-80 rounded-2xl border border-gray-100 shadow-[0px_11px_20px_0px_rgba(0,_0,_0,_0.10)]"
          >
            <RdxSelect.ScrollUpButton className="flex h-[25px] cursor-default items-center justify-center bg-white text-grayDark">
              <ChevronUpIcon />
            </RdxSelect.ScrollUpButton>
            <RdxSelect.Viewport className="p-2">
              <RdxSelect.Group>
                <RdxSelect.Label className="px-2 text-xs leading-[25px] mb-2 text-primary">
                  {label}
                </RdxSelect.Label>

                {options.map((option) => (
                  <RdxSelect.Item
                    key={option.value}
                    value={option.value}
                    className="p-2 text-sm text-grayDark data-[state=checked]:font-bold outline-none data-[highlighted]:bg-gray-100 rounded-lg transition-colors cursor-pointer"
                  >
                    <RdxSelect.ItemText>{option.name}</RdxSelect.ItemText>
                  </RdxSelect.Item>
                ))}
              </RdxSelect.Group>
            </RdxSelect.Viewport>
            <RdxSelect.ScrollDownButton className="flex h-[25px] cursor-default items-center justify-center bg-white text-grayDark">
              <ChevronDownIcon />
            </RdxSelect.ScrollDownButton>
          </RdxSelect.Content>
        </RdxSelect.Portal>
      </RdxSelect.Root>

      {error && (
        <div className="flex items-center gap-1 mt-1 mb-[3px] text-redAlert">
          <CircleX size={14} />
          <span className="text-xs ">{error}</span>
        </div>
      )}

      {!error && (
        <div className="flex h-0 xl:h-4 items-center mt-1 mb-[3px] text-white" />
      )}
    </div>
  );
}
