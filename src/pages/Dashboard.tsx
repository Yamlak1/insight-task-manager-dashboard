import {
  BarChart2,
  Building2,
  CheckCircle,
  ClipboardCheck,
  Clock,
  Users,
} from "lucide-react";
import Header from "@/components/dashboard/Header";
import StatCard from "@/components/dashboard/StatCard";
import BarChartWidget from "@/components/dashboard/BarChartWidget";
import PieChartWidget from "@/components/dashboard/PieChartWidget";
import TasksWidget from "@/components/dashboard/TasksWidget";
import AlertsWidget from "@/components/dashboard/AlertsWidget";
import TaskAssignment from "@/components/dashboard/TaskAssignment";

const Dashboard = () => {
  return (
    <div className="h-screen flex flex-col">
      {/* Fixed header */}
      <Header title="Dashboard" />

      {/* Scrollable content area */}
      <div className="flex-1 p-6 space-y-6 overflow-y-auto">
        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Total Tasks"
            value="152"
            description="This month"
            icon={<ClipboardCheck className="h-4 w-4" />}
            trend={{ value: 12, isPositive: true }}
          />
          <StatCard
            title="Completed Tasks"
            value="87"
            description="This month"
            icon={<CheckCircle className="h-4 w-4" />}
            trend={{ value: 8, isPositive: true }}
          />
          <StatCard
            title="Active Teams"
            value="5"
            description="Currently working"
            icon={<Users className="h-4 w-4" />}
          />
          <StatCard
            title="Average Time"
            value="4.5 hrs"
            description="For task completion"
            icon={<Clock className="h-4 w-4" />}
            trend={{ value: 5, isPositive: false }}
          />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <BarChartWidget />
          <PieChartWidget />
        </div>

        {/* Task Assignment Section */}
        <TaskAssignment />

        {/* Info Panels Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TasksWidget />
          <AlertsWidget />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
