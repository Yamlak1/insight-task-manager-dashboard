
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { 
  LayoutDashboard,
  ClipboardList,
  Building2,
  Users,
  BarChart2,
  Settings,
  ChevronLeft,
  ChevronRight,
  Bell
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { useNavigate, useLocation } from "react-router-dom";

interface SidebarItemProps {
  icon: React.ElementType;
  label: string;
  active?: boolean;
  badge?: number;
  onClick?: () => void;
}

const SidebarItem = ({ 
  icon: Icon, 
  label, 
  active, 
  badge, 
  onClick 
}: SidebarItemProps) => (
  <Button
    variant="ghost"
    className={cn(
      "w-full justify-start gap-x-3 mb-1",
      active ? "bg-primary/10 text-primary" : "hover:bg-muted"
    )}
    onClick={onClick}
  >
    <Icon className="h-5 w-5" />
    <span className="flex-1 text-left">{label}</span>
    {badge && badge > 0 && (
      <Badge className="bg-accent text-accent-foreground" variant="secondary">
        {badge}
      </Badge>
    )}
  </Button>
);

interface SidebarProps {
  className?: string;
}

const Sidebar = ({ className }: SidebarProps) => {
  const [collapsed, setCollapsed] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  
  const handleNavigation = (path: string) => {
    navigate(path);
    toast({
      title: "Navigation",
      description: `Navigated to ${path.charAt(1).toUpperCase() + path.slice(2)}`,
    });
  };

  return (
    <div className={cn(
      "h-screen flex flex-col bg-card text-card-foreground border-r p-4 transition-all duration-300",
      collapsed ? "w-20" : "w-64",
      className
    )}>
      <div className="flex items-center justify-between mb-8">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-md bg-primary flex items-center justify-center">
              <span className="font-bold text-white">MS</span>
            </div>
            <h1 className="font-bold text-xl">MainSync</h1>
          </div>
        )}
        {collapsed && (
          <div className="h-8 w-8 mx-auto rounded-md bg-primary flex items-center justify-center">
            <span className="font-bold text-white">MS</span>
          </div>
        )}
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => setCollapsed(!collapsed)}
          className={collapsed ? "mx-auto mt-2" : ""}
        >
          {collapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
        </Button>
      </div>

      <nav className="space-y-1 flex-1">
        <SidebarItem 
          icon={LayoutDashboard} 
          label="Dashboard" 
          active={location.pathname === "/"}
          onClick={() => handleNavigation("/")} 
        />
        <SidebarItem 
          icon={ClipboardList} 
          label="Tasks" 
          badge={12}
          active={location.pathname === "/tasks"}
          onClick={() => handleNavigation("/tasks")} 
        />
        <SidebarItem 
          icon={Building2} 
          label="Facilities" 
          active={location.pathname === "/facilities"}
          onClick={() => handleNavigation("/facilities")} 
        />
        <SidebarItem 
          icon={Users} 
          label="Teams" 
          active={location.pathname === "/teams"}
          onClick={() => handleNavigation("/teams")} 
        />
        <SidebarItem 
          icon={Bell} 
          label="Notifications" 
          badge={5}
          active={location.pathname === "/notifications"}
          onClick={() => handleNavigation("/notifications")} 
        />
        <SidebarItem 
          icon={BarChart2} 
          label="Reports" 
          active={location.pathname === "/reports"}
          onClick={() => handleNavigation("/reports")} 
        />
      </nav>

      <Separator className="my-4" />
      
      <div className="mt-auto">
        <SidebarItem 
          icon={Settings} 
          label="Settings" 
          active={location.pathname === "/settings"}
          onClick={() => handleNavigation("/settings")} 
        />
      </div>
    </div>
  );
};

export default Sidebar;
