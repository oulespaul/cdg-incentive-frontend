import { cn } from "@/lib/utils";
import { useStore } from "@/hooks/use-store";
import { useSidebarToggle } from "@/hooks/use-sidebar-toggle";
import { Menu } from "./menu";

export function Sidebar() {
  const sidebar = useStore(useSidebarToggle, (state) => state);

  if (!sidebar) return null;

  return (
    <aside
      className={cn(
        "fixed top-10 left-0 h-screen -translate-x-full lg:translate-x-0 transition-[width] ease-in-out duration-300 bg-[#27282E]",
        sidebar?.isOpen === false ? "w-0" : "w-72"
      )}
    >
      <div className="relative h-full flex flex-col py-4 overflow-y-auto shadow-md">
        <Menu isOpen={sidebar?.isOpen} />
      </div>
    </aside>
  );
}

