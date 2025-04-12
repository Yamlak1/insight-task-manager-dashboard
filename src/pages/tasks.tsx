
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, Filter, Clock, CheckCircle2, AlertTriangle, XCircle } from "lucide-react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";

// Define the task interface
interface Task {
  id: string;
  title: string;
  description: string;
  priority: "low" | "medium" | "high";
  status: "pending" | "in-progress" | "completed" | "cancelled";
  dueDate: string;
  assignee: string;
  facility: string;
}

const Tasks = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("all");
  
  // Sample tasks data
  const [tasksList, setTasksList] = useState<Task[]>([
    {
      id: "task-1",
      title: "HVAC Maintenance Check",
      description: "Quarterly maintenance check of HVAC systems in Building A",
      priority: "high",
      status: "pending",
      dueDate: "2025-04-20",
      assignee: "John Doe",
      facility: "Building A"
    },
    {
      id: "task-2",
      title: "Plumbing Repair",
      description: "Fix leaking pipe in staff bathroom",
      priority: "medium",
      status: "in-progress",
      dueDate: "2025-04-15",
      assignee: "Sarah Johnson",
      facility: "Building B"
    },
    {
      id: "task-3",
      title: "Electrical Inspection",
      description: "Annual electrical system inspection",
      priority: "low",
      status: "completed",
      dueDate: "2025-04-10",
      assignee: "Mike Smith",
      facility: "Building C"
    },
    {
      id: "task-4",
      title: "Window Replacement",
      description: "Replace broken window in conference room",
      priority: "high",
      status: "in-progress",
      dueDate: "2025-04-18",
      assignee: "Lisa Brown",
      facility: "Building A"
    },
    {
      id: "task-5",
      title: "Fire Alarm Test",
      description: "Monthly fire alarm system test",
      priority: "high",
      status: "pending",
      dueDate: "2025-04-25",
      assignee: "John Doe",
      facility: "Building D"
    }
  ]);

  // Filter tasks based on search query and filter
  const filteredTasks = tasksList.filter(task => {
    // Search query filter
    const matchesSearch = 
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.assignee.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.facility.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Status filter
    const matchesFilter = 
      filter === "all" || 
      task.status === filter;
    
    return matchesSearch && matchesFilter;
  });

  // Get task count by status
  const getTaskCountByStatus = (status: string) => {
    return tasksList.filter(task => task.status === status).length;
  };

  // Priority badge component
  const PriorityBadge = ({ priority }: { priority: string }) => {
    const badgeClass = 
      priority === "high" ? "bg-red-100 text-red-800" :
      priority === "medium" ? "bg-amber-100 text-amber-800" :
      "bg-green-100 text-green-800";
    
    return (
      <Badge variant="outline" className={badgeClass}>
        {priority}
      </Badge>
    );
  };

  // Status badge component
  const StatusBadge = ({ status }: { status: string }) => {
    const badgeClass = 
      status === "pending" ? "bg-blue-100 text-blue-800" :
      status === "in-progress" ? "bg-purple-100 text-purple-800" :
      status === "completed" ? "bg-green-100 text-green-800" :
      "bg-gray-100 text-gray-800";
    
    const StatusIcon = 
      status === "pending" ? Clock :
      status === "in-progress" ? AlertTriangle :
      status === "completed" ? CheckCircle2 :
      XCircle;
    
    return (
      <Badge variant="outline" className={`flex items-center gap-1 ${badgeClass}`}>
        <StatusIcon className="h-3 w-3" />
        {status}
      </Badge>
    );
  };

  return (
    <div className="p-4 md:p-6 space-y-6">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Tasks Management</h1>
          <p className="text-muted-foreground">
            View, create and manage maintenance tasks
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Task
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="py-3">
            <CardTitle className="text-sm font-medium">Total Tasks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{tasksList.length}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Across all facilities
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="py-3">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{getTaskCountByStatus("pending")}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Tasks awaiting action
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="py-3">
            <CardTitle className="text-sm font-medium">In Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{getTaskCountByStatus("in-progress")}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Tasks currently being worked on
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="py-3">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{getTaskCountByStatus("completed")}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Tasks finished this month
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Tasks List</CardTitle>
          <CardDescription>
            Browse and manage all maintenance tasks
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
            <div className="relative md:w-1/3">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search tasks..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <Select value={filter} onValueChange={setFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Status</SelectLabel>
                      <SelectItem value="all">All Tasks</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="in-progress">In Progress</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="all">All Tasks</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="in-progress">In Progress</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="space-y-4">
              {filteredTasks.length === 0 ? (
                <div className="text-center py-10 text-muted-foreground">
                  No tasks found matching your criteria
                </div>
              ) : (
                filteredTasks.map((task) => (
                  <div key={task.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                      <div>
                        <h3 className="font-medium">{task.title}</h3>
                        <p className="text-sm text-muted-foreground mt-1">{task.description}</p>
                      </div>
                      <div className="flex flex-wrap items-center gap-2 mt-2 md:mt-0">
                        <PriorityBadge priority={task.priority} />
                        <StatusBadge status={task.status} />
                        <Badge variant="outline" className="bg-gray-100">
                          {task.facility}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex flex-col md:flex-row justify-between mt-3 text-sm">
                      <div>
                        <span className="text-muted-foreground">Assignee: </span>
                        <span className="font-medium">{task.assignee}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Due: </span>
                        <span className="font-medium">{new Date(task.dueDate).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </TabsContent>
            
            <TabsContent value="pending" className="space-y-4">
              {/* Filter content for pending tab */}
              {/* Similar structure to "all" tab */}
              {filteredTasks.filter(task => task.status === "pending").length === 0 ? (
                <div className="text-center py-10 text-muted-foreground">
                  No pending tasks found
                </div>
              ) : (
                filteredTasks
                  .filter(task => task.status === "pending")
                  .map((task) => (
                    <div key={task.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                        <div>
                          <h3 className="font-medium">{task.title}</h3>
                          <p className="text-sm text-muted-foreground mt-1">{task.description}</p>
                        </div>
                        <div className="flex flex-wrap items-center gap-2 mt-2 md:mt-0">
                          <PriorityBadge priority={task.priority} />
                          <StatusBadge status={task.status} />
                          <Badge variant="outline" className="bg-gray-100">
                            {task.facility}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex flex-col md:flex-row justify-between mt-3 text-sm">
                        <div>
                          <span className="text-muted-foreground">Assignee: </span>
                          <span className="font-medium">{task.assignee}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Due: </span>
                          <span className="font-medium">{new Date(task.dueDate).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                  ))
              )}
            </TabsContent>
            
            {/* Similar content for "in-progress" and "completed" tabs */}
            <TabsContent value="in-progress" className="space-y-4">
              {filteredTasks.filter(task => task.status === "in-progress").length === 0 ? (
                <div className="text-center py-10 text-muted-foreground">
                  No in-progress tasks found
                </div>
              ) : (
                filteredTasks
                  .filter(task => task.status === "in-progress")
                  .map((task) => (
                    <div key={task.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                      {/* Task content - same structure as above */}
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                        <div>
                          <h3 className="font-medium">{task.title}</h3>
                          <p className="text-sm text-muted-foreground mt-1">{task.description}</p>
                        </div>
                        <div className="flex flex-wrap items-center gap-2 mt-2 md:mt-0">
                          <PriorityBadge priority={task.priority} />
                          <StatusBadge status={task.status} />
                          <Badge variant="outline" className="bg-gray-100">
                            {task.facility}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex flex-col md:flex-row justify-between mt-3 text-sm">
                        <div>
                          <span className="text-muted-foreground">Assignee: </span>
                          <span className="font-medium">{task.assignee}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Due: </span>
                          <span className="font-medium">{new Date(task.dueDate).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                  ))
              )}
            </TabsContent>
            
            <TabsContent value="completed" className="space-y-4">
              {filteredTasks.filter(task => task.status === "completed").length === 0 ? (
                <div className="text-center py-10 text-muted-foreground">
                  No completed tasks found
                </div>
              ) : (
                filteredTasks
                  .filter(task => task.status === "completed")
                  .map((task) => (
                    <div key={task.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                      {/* Task content - same structure as above */}
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                        <div>
                          <h3 className="font-medium">{task.title}</h3>
                          <p className="text-sm text-muted-foreground mt-1">{task.description}</p>
                        </div>
                        <div className="flex flex-wrap items-center gap-2 mt-2 md:mt-0">
                          <PriorityBadge priority={task.priority} />
                          <StatusBadge status={task.status} />
                          <Badge variant="outline" className="bg-gray-100">
                            {task.facility}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex flex-col md:flex-row justify-between mt-3 text-sm">
                        <div>
                          <span className="text-muted-foreground">Assignee: </span>
                          <span className="font-medium">{task.assignee}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Due: </span>
                          <span className="font-medium">{new Date(task.dueDate).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                  ))
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Tasks;
