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
  Bell,
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
  collapsed?: boolean;
}

const SidebarItem = ({
  icon: Icon,
  label,
  active,
  badge,
  onClick,
  collapsed = false,
}: SidebarItemProps) => (
  <Button
    variant="ghost"
    className={cn(
      "w-full justify-start gap-x-3 mb-1",
      active ? "bg-primary/10 text-primary" : "hover:bg-muted hover:text-black"
    )}
    onClick={onClick}
    // When collapsed, expose label in native tooltip
    title={collapsed ? label : undefined}
  >
    {/* Optionally, you can enlarge the icon slightly in collapsed mode */}
    <Icon className={cn("h-10 w-10", collapsed && "h-16 w-16")} />
    {/* Render label only when not collapsed and use a larger text size */}
    {!collapsed && <span className="flex-1 text-left text-lg">{label}</span>}
    {badge && badge > 0 && (
      <Badge
        className={cn(
          "bg-accent text-accent-foreground",
          collapsed && "mr-20 mb-3"
        )}
        variant="secondary"
      >
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
    // Uncomment below to show a toast for navigation if needed:
    // toast({
    //   title: "Navigation",
    //   description: `Navigated to ${path.charAt(1).toUpperCase() + path.slice(2)}`,
    // });
  };

  return (
    <div
      className={cn(
        "h-screen flex flex-col bg-card text-card-foreground border-r p-4 transition-all duration-300",
        collapsed ? "w-24" : "w-64",
        className
      )}
    >
      <div className="flex items-center justify-between mb-8">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-md bg-primary flex items-center justify-center">
              <span className="font-bold text-white">MS</span>
            </div>
            {/* Larger text when expanded */}
            <h1 className="font-bold text-2xl">MainSync</h1>
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
          {collapsed ? (
            <ChevronRight className="h-5 w-5" />
          ) : (
            <ChevronLeft className="h-5 w-5" />
          )}
        </Button>
      </div>

      <nav className="space-y-1 flex-1 w-full h-10">
        <SidebarItem
          icon={LayoutDashboard}
          label="Dashboard"
          active={location.pathname === "/"}
          onClick={() => handleNavigation("/")}
          collapsed={collapsed}
        />
        <SidebarItem
          icon={ClipboardList}
          label="Tasks"
          badge={12}
          active={location.pathname === "/tasks"}
          onClick={() => handleNavigation("/tasks")}
          collapsed={collapsed}
        />
        <SidebarItem
          icon={Building2}
          label="Facilities"
          active={location.pathname === "/facilities"}
          onClick={() => handleNavigation("/facilities")}
          collapsed={collapsed}
        />
        <SidebarItem
          icon={Users}
          label="Teams"
          active={location.pathname === "/teams"}
          onClick={() => handleNavigation("/teams")}
          collapsed={collapsed}
        />
        <SidebarItem
          icon={Bell}
          label="Notifications"
          badge={5}
          active={location.pathname === "/notifications"}
          onClick={() => handleNavigation("/notifications")}
          collapsed={collapsed}
        />
        <SidebarItem
          icon={BarChart2}
          label="Reports"
          active={location.pathname === "/reports"}
          onClick={() => handleNavigation("/reports")}
          collapsed={collapsed}
        />
      </nav>

      <Separator className="my-4" />

      <div className="mt-auto">
        <SidebarItem
          icon={Settings}
          label="Settings"
          active={location.pathname === "/settings"}
          onClick={() => handleNavigation("/settings")}
          collapsed={collapsed}
        />
      </div>
    </div>
  );
};

export default Sidebar;
