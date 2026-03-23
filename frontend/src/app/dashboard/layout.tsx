"use client";
import Sidebar from '../../components/Sidebar';
import KodBotSidebar from '../../components/KodBotSidebar';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen text-white relative z-10 w-full overflow-hidden">
      <Sidebar />
      <div className="flex-1 w-full overflow-y-auto">
        {children}
      </div>
      <KodBotSidebar />
    </div>
  );
}
