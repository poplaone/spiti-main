
import { Link, useLocation } from 'react-router-dom';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import { 
  Package, 
  Settings, 
  LogOut, 
  Plus, 
  List,
  Home
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const AdminSidebar = () => {
  const { signOut } = useAdminAuth();
  const location = useLocation();
  
  const navItems = [
    { 
      label: 'Dashboard', 
      icon: Home, 
      href: '/admin' 
    },
    { 
      label: 'Tour Packages', 
      icon: Package, 
      href: '/admin/tour-packages' 
    },
    { 
      label: 'Create Package', 
      icon: Plus, 
      href: '/admin/tour-packages/create' 
    },
    { 
      label: 'Site Settings', 
      icon: Settings, 
      href: '/admin/settings' 
    },
  ];

  const isActive = (href: string) => {
    return location.pathname === href || 
           (href !== '/admin' && location.pathname.startsWith(href));
  };

  return (
    <div className="w-64 bg-spiti-forest text-white h-full flex flex-col">
      <div className="p-4 border-b border-white/10">
        <h1 className="text-xl font-bold">Spiti Admin</h1>
        <p className="text-sm text-gray-300">Tour Package Management</p>
      </div>
      
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link 
                to={item.href}
                className={cn(
                  "flex items-center p-3 rounded-md hover:bg-white/10 transition-colors",
                  isActive(item.href) && "bg-white/20"
                )}
              >
                <item.icon className="h-5 w-5 mr-3" />
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="p-4 border-t border-white/10">
        <Button 
          variant="ghost" 
          className="w-full justify-start text-white hover:bg-white/10" 
          onClick={signOut}
        >
          <LogOut className="h-5 w-5 mr-2" />
          Sign Out
        </Button>
      </div>
    </div>
  );
};

export default AdminSidebar;
