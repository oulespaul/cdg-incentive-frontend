import { cn } from '@/lib/utils';
import { useStore } from '@/hooks/use-store';
import { useSidebarToggle } from '@/hooks/use-sidebar-toggle';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { ToastContainer } from 'react-toastify';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const sidebar = useStore(useSidebarToggle, state => state);

  if (!sidebar) return null;

  return (
    <>
      <Navbar />

      <Sidebar />

      <main
        className={cn(
          'min-h-[calc(100vh_-_56px)] bg-zinc-50 dark:bg-zinc-900 transition-[margin-left] ease-in-out duration-300 p-4 mt-14',
          sidebar?.isOpen === false ? 'lg:ml-0' : 'lg:ml-72',
        )}
      >
        {children}
      </main>
      <ToastContainer />
    </>
  );
}
