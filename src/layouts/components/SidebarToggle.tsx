import { Menu } from "lucide-react";

import { cn } from "@/lib/utils";

interface SidebarToggleProps {
  isOpen: boolean | undefined;
  setIsOpen?: () => void;
}

export function SidebarToggle({ isOpen, setIsOpen }: SidebarToggleProps) {
  return (
    <Menu
      onClick={() => setIsOpen?.()}
      className={cn(
        "h-5 w-5 transition-transform ease-in-out duration-700 mr-4 cursor-pointer",
        isOpen === false ? "rotate-180" : "rotate-0"
      )}
      color="white"
    />
  );
}
