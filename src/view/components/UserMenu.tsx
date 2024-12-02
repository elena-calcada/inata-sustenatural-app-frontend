import * as RadixDropdownMenu from "@radix-ui/react-dropdown-menu";
import { LogOut } from "lucide-react";

import { useAuth } from "../../app/hooks/useAuth";

export function UserMenu() {
  const { signout, user } = useAuth();

  return (
    <RadixDropdownMenu.Root>
      <RadixDropdownMenu.Trigger className="outline-none">
        <div className="bg-blueColor-base rounded-full w-12 h-12 flex items-center justify-center border border-grayDark">
          <span className="text-sm traking-[-0.5px] text-white font-medium font-outfit">
            {user?.first_name && user?.first_name.slice(0, 2).toUpperCase()}
          </span>
        </div>
      </RadixDropdownMenu.Trigger>

      <RadixDropdownMenu.Portal>
        <RadixDropdownMenu.Content className=" mt-3 p-2 rounded-2xl bg-gray-100 space-y-2 shadow-[0px_11px_20px_0px_rgba(0,_0,_0,_0.10)] w-32">
          <RadixDropdownMenu.Item
            onSelect={signout}
            className="min-h-[48px] text-grayDark outline-none flex items-center justify-between py-2 px-4 font-regular font-outfit text-sm  data-[highlighted]:bg-gray-200  rounded-2xl transition-colors cursor-pointer"
          >
            Sair
            <LogOut size={18} />
          </RadixDropdownMenu.Item>
        </RadixDropdownMenu.Content>
      </RadixDropdownMenu.Portal>
    </RadixDropdownMenu.Root>
  );
}
