import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/sidebar/sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex h-full w-full">
      <SidebarProvider className="w-auto">
        <AppSidebar />
        <SidebarTrigger />
      </SidebarProvider>

      <div className="flex justify-center items-center w-full mr-5">
        <div className="w-full">{children}</div>
      </div>
    </main>
  );
}
