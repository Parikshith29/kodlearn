import Link from 'next/link';
import { useAuthStore } from '../store/authStore';
import { Home, Compass, BookOpen, User, LogOut } from 'lucide-react';
import { useRouter, usePathname } from 'next/navigation';

export default function Sidebar() {
  const { user, logout } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  const navs = [
    { name: 'Dashboard', path: '/dashboard', icon: Home },
    { name: 'Browse Courses', path: '/dashboard/browse', icon: Compass },
    { name: 'My Courses', path: '/dashboard/my-courses', icon: BookOpen },
    { name: 'My Profile', path: '/dashboard/profile', icon: User },
  ];

  return (
    <div className="w-64 h-screen bg-black/60 backdrop-blur-3xl border-r border-white/10 flex flex-col sticky top-0 shrink-0 z-50 shadow-2xl">
      <div className="p-8 pb-4">
        <Link href="/dashboard" className="text-4xl font-extrabold text-white tracking-tighter">
          KodLearn
        </Link>
      </div>
      <div className="flex-1 px-4 space-y-2 mt-8">
        {navs.map((n) => {
          const active = pathname === n.path;
          return (
            <Link 
              key={n.name} 
              href={n.path} 
              className={`flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all ${
                active 
                  ? 'bg-white text-black font-semibold shadow-[0_0_15px_rgba(255,255,255,0.3)]' 
                  : 'text-gray-400 hover:text-white hover:bg-white/5 font-medium'
              }`}
            >
              <n.icon size={20} /> {n.name}
            </Link>
          )
        })}
      </div>
      <div className="p-6 border-t border-white/10 space-y-4">
        <p className="text-sm font-mono text-gray-300 truncate w-full flex items-center gap-2 font-medium">
          <User size={16}/> {user?.name || user?.email?.split('@')[0]}
        </p>
        <button onClick={handleLogout} className="flex items-center gap-3 text-red-500 hover:text-red-400 transition-colors text-sm font-semibold w-full px-2 py-2 rounded-lg hover:bg-red-500/10">
          <LogOut size={16} /> Disconnect
        </button>
      </div>
    </div>
  );
}
