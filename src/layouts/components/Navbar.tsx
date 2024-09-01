import { UserRound, LogOut } from "lucide-react";
import { useMsal } from "@azure/msal-react";
import { SidebarToggle } from "./SidebarToggle";
import { useStore } from "@/hooks/use-store";
import { useSidebarToggle } from "@/hooks/use-sidebar-toggle";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

export function Navbar() {
  const sidebar = useStore(useSidebarToggle, (state) => state);
  const { instance, accounts } = useMsal();

  return (
    <header className="fixed w-full z-10 flex justify-between bg-primary px-4 py-1">
      <div className="flex items-center">
        <SidebarToggle isOpen={sidebar?.isOpen} setIsOpen={sidebar?.setIsOpen} />

        <Avatar className="mr-2">
          <AvatarImage src="/central-logo2.png" alt="central-logo2" width={30} height={30} />
        </Avatar>
        <div className="flex flex-col items-start">
          <p className="text-primary-foreground text-base	font-semibold">CDG</p>
          <p className="text-primary-foreground text-base	font-semibold">Incentive System</p>
        </div>
      </div>

      <div className="flex items-center">
        <Avatar className="mr-2 rounded bg-blue-600">
          <UserRound className="h-10 w-10" color="white" />
        </Avatar>
        <div className="flex flex-col items-start mr-2">
          <p className="text-primary-foreground text-sm font-semibold">{accounts[0]?.name}</p>
          <p className="text-primary-foreground text-xs font-normal">{accounts[0]?.username}</p>
        </div>
        <Button>
          <LogOut onClick={() => instance.logout()} />
        </Button>
      </div>
    </header>
  );
}
