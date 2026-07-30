import { Link, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  ShoppingCart, 
  Package, 
  Users, 
  BarChart3, 
  LogOut
} from "lucide-react";
import { cn } from "../../lib/utils";

const NAV_ITEMS = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/penjualan", label: "Penjualan", icon: ShoppingCart },
  { href: "/masterdata", label: "Masterdata", icon: Package },
  { href: "/member", label: "Member", icon: Users },
  { href: "/laporan", label: "Laporan", icon: BarChart3 },
];

export function Sidebar() {
  const location = useLocation();
  const pathname = location.pathname; 

  return (
    <aside className="w-64 bg-sidebar border-r border-sidebar-border h-screen flex flex-col fixed left-0 top-0">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-primary flex items-center gap-2">
          <span className="bg-primary text-primary-foreground p-1.5 rounded-lg">
            <LayoutDashboard className="w-5 h-5" />
          </span>
          Mini ERP
        </h1>
      </div>

      <nav className="flex-1 px-4 space-y-1.5 overflow-y-auto">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-sm font-medium",
                isActive 
                  ? "bg-primary text-primary-foreground shadow-md shadow-primary/20" 
                  : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              )}
            >
              <item.icon className={cn("w-5 h-5", isActive ? "text-primary-foreground" : "text-sidebar-foreground/50")} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-sidebar-border">
        <div className="flex items-center gap-3 px-4 py-3">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
            PB
          </div>
          <div className="flex-1 overflow-hidden">
            <p className="text-sm font-medium truncate">Pak Budi</p>
            <p className="text-xs text-sidebar-foreground/50 truncate">Pemilik</p>
          </div>
          <button className="text-sidebar-foreground/50 hover:text-destructive transition-colors">
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </div>
    </aside>
  );
}
