import { cn } from "@/lib/utils";
import { useStore } from "@/hooks/use-store";
import { useSidebarToggle } from "@/hooks/use-sidebar-toggle";
import { Outlet } from "react-router-dom";
import { Navbar } from "./components/navbar";
import { Sidebar } from "./components/sidebar";

export default function DashboardLayout() {
  const sidebar = useStore(useSidebarToggle, (state) => state);

  if (!sidebar) return null;

  return (
    <>
      <Navbar />

      <Sidebar />

      <main
        className={cn(
          "min-h-[calc(100vh_-_56px)] bg-zinc-50 dark:bg-zinc-900 transition-[margin-left] ease-in-out duration-300",
          sidebar?.isOpen === false ? "lg:ml-0" : "lg:ml-72"
        )}
      >
        <Outlet />
      </main>
    </>
  );
}
