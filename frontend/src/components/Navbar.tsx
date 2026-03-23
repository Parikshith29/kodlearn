import Link from 'next/link';
import { useAuthStore } from '../store/authStore';
import { LogOut, User as UserIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const { user, logout } = useAuthStore();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  return (
    <nav className="glass-panel mx-4 mt-6 mb-10 px-6 py-4 flex justify-between items-center sticky top-6 z-50">
      <Link href="/dashboard" className="text-2xl font-bold neon-text text-white tracking-tighter">
        KodLearn
      </Link>
      <div className="flex items-center gap-6">
        <span className="text-gray-300 flex items-center gap-2 text-sm font-mono">
          <UserIcon size={16} /> {user?.name || user?.email?.split('@')[0] || 'Student'}
        </span>
        <button 
          onClick={handleLogout}
          className="text-red-400 hover:text-red-300 flex items-center gap-2 text-sm font-medium transition-colors"
        >
          <LogOut size={16} /> Disconnect
        </button>
      </div>
    </nav>
  );
}
