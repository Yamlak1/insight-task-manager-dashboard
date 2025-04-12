
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronRight, Clock, AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Task {
  id: string;
  title: string;
  location: string;
  priority: "low" | "medium" | "high" | "critical";
  dueDate: string;
}

const TASKS: Task[] = [
  {
    id: "task-1",
    title: "HVAC System Inspection",
    location: "Building A, Floor 2",
    priority: "high",
    dueDate: "Today"
  },
  {
    id: "task-2",
    title: "Electrical Panel Maintenance",
    location: "Building C, Floor 1",
    priority: "critical",
    dueDate: "Overdue"
  },
  {
    id: "task-3",
    title: "Plumbing Leak Repair",
    location: "Building B, Floor 3",
    priority: "medium",
    dueDate: "Tomorrow"
  },
  {
    id: "task-4",
    title: "Fire Alarm Testing",
    location: "Building A, All Floors",
    priority: "high",
    dueDate: "In 2 days"
  }
];

const getPriorityBadge = (priority: Task["priority"]) => {
  const classes = {
    low: "bg-success text-success-foreground",
    medium: "bg-warning/80 text-warning-foreground",
    high: "bg-warning text-warning-foreground",
    critical: "bg-danger text-danger-foreground animate-pulse-scale"
  };
  
  return (
    <Badge className={classes[priority]} variant="secondary">
      {priority === "critical" && <AlertTriangle className="h-3 w-3 mr-1" />}
      {priority.charAt(0).toUpperCase() + priority.slice(1)}
    </Badge>
  );
};

const TasksWidget = () => {
  const { toast } = useToast();
  
  const handleTaskClick = (task: Task) => {
    toast({
      title: "Task Selected",
      description: `Viewing details for: ${task.title}`
    });
  };
  
  const handleViewAll = () => {
    toast({
      title: "Navigation",
      description: "Navigating to Tasks page"
    });
  };
  
  return (
    <Card className="card-hover h-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-semibold">Pending Tasks</CardTitle>
        <Button variant="ghost" size="sm" onClick={handleViewAll}>
          View all
          <ChevronRight className="ml-1 h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {TASKS.map(task => (
            <div 
              key={task.id}
              className="flex flex-col gap-y-2 p-3 rounded-md border cursor-pointer hover:bg-muted/50 transition-colors"
              onClick={() => handleTaskClick(task)}
            >
              <div className="flex justify-between items-start">
                <div className="font-medium">{task.title}</div>
                {getPriorityBadge(task.priority)}
              </div>
              <div className="text-sm text-muted-foreground">{task.location}</div>
              <div className="flex items-center text-sm text-muted-foreground">
                <Clock className="h-3 w-3 mr-1" />
                <span className={task.dueDate === "Overdue" ? "text-danger" : ""}>
                  {task.dueDate}
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TasksWidget;
