"use client";
import Sidebar from '../../components/Sidebar';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen text-white relative z-10 w-full">
      <Sidebar />
      <div className="flex-1 w-full overflow-y-auto">
        {children}
      </div>
    </div>
  );
}
