
import React, { useState } from "react";
import Layout from "../components/dashboard/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle, Clock, AlertTriangle, Plus, Filter, Search } from "lucide-react";
import { cn } from "@/lib/utils";

// Sample task data
const tasks = [
  { id: 1, title: "Fix HVAC in Building A", priority: "High", status: "Pending", assignee: "John Doe", dueDate: "2025-04-15" },
  { id: 2, title: "Replace light fixtures in Conference Room", priority: "Medium", status: "In Progress", assignee: "Sarah Johnson", dueDate: "2025-04-18" },
  { id: 3, title: "Inspect elevator maintenance", priority: "High", status: "Completed", assignee: "Mike Brown", dueDate: "2025-04-10" },
  { id: 4, title: "Repair water leak in Bathroom 2F", priority: "Critical", status: "Pending", assignee: "Unassigned", dueDate: "2025-04-13" },
  { id: 5, title: "Clean ventilation system", priority: "Low", status: "In Progress", assignee: "Lisa Wong", dueDate: "2025-04-20" },
  { id: 6, title: "Replace carpet in HR department", priority: "Medium", status: "Completed", assignee: "David Chen", dueDate: "2025-04-08" },
  { id: 7, title: "Fix door handle at main entrance", priority: "High", status: "In Progress", assignee: "John Doe", dueDate: "2025-04-14" },
  { id: 8, title: "Check fire alarm system", priority: "Critical", status: "Completed", assignee: "Emma White", dueDate: "2025-04-05" },
];

function Tasks() {
  const [searchQuery, setSearchQuery] = useState("");
  
  const filteredTasks = tasks.filter(task => 
    task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    task.assignee.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const pendingTasks = filteredTasks.filter(task => task.status === "Pending");
  const inProgressTasks = filteredTasks.filter(task => task.status === "In Progress");
  const completedTasks = filteredTasks.filter(task => task.status === "Completed");
  
  return (
    <Layout>
      <div className="p-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">Tasks</h1>
            <p className="text-muted-foreground">Manage your maintenance tasks and assignments</p>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search tasks..."
                className="h-10 w-full rounded-md border border-input bg-background pl-8 pr-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 sm:w-[200px]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <Button variant="outline" className="gap-2">
              <Filter className="h-4 w-4" />
              Filter
            </Button>
            
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              New Task
            </Button>
          </div>
        </div>
        
        {/* Task Overview Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-4 flex items-center gap-4">
              <div className="bg-red-100 text-red-800 p-3 rounded-full">
                <AlertTriangle className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Pending</p>
                <p className="text-2xl font-bold">{pendingTasks.length}</p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 flex items-center gap-4">
              <div className="bg-blue-100 text-blue-800 p-3 rounded-full">
                <Clock className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">In Progress</p>
                <p className="text-2xl font-bold">{inProgressTasks.length}</p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 flex items-center gap-4">
              <div className="bg-green-100 text-green-800 p-3 rounded-full">
                <CheckCircle className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Completed</p>
                <p className="text-2xl font-bold">{completedTasks.length}</p>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Task List */}
        <Card>
          <CardHeader>
            <CardTitle>Task List</CardTitle>
            <CardDescription>View and manage all maintenance tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all">
              <TabsList className="mb-4">
                <TabsTrigger value="all">All Tasks</TabsTrigger>
                <TabsTrigger value="pending">Pending</TabsTrigger>
                <TabsTrigger value="in-progress">In Progress</TabsTrigger>
                <TabsTrigger value="completed">Completed</TabsTrigger>
              </TabsList>
              
              <TabsContent value="all" className="space-y-4">
                <TaskTable tasks={filteredTasks} />
              </TabsContent>
              
              <TabsContent value="pending" className="space-y-4">
                <TaskTable tasks={pendingTasks} />
              </TabsContent>
              
              <TabsContent value="in-progress" className="space-y-4">
                <TaskTable tasks={inProgressTasks} />
              </TabsContent>
              
              <TabsContent value="completed" className="space-y-4">
                <TaskTable tasks={completedTasks} />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}

function TaskTable({ tasks }: { tasks: typeof tasks }) {
  return (
    <div className="rounded-md border">
      <div className="grid grid-cols-12 py-3 px-4 text-sm font-medium text-muted-foreground bg-muted/50">
        <div className="col-span-5">Task Name</div>
        <div className="col-span-2">Assignee</div>
        <div className="col-span-2">Due Date</div>
        <div className="col-span-1">Priority</div>
        <div className="col-span-2">Status</div>
      </div>
      <div className="divide-y">
        {tasks.length === 0 ? (
          <div className="py-6 text-center text-muted-foreground">No tasks found</div>
        ) : (
          tasks.map((task) => (
            <div key={task.id} className="grid grid-cols-12 py-3 px-4 items-center hover:bg-muted/50 cursor-pointer transition-colors">
              <div className="col-span-5 font-medium">{task.title}</div>
              <div className="col-span-2 text-sm">{task.assignee}</div>
              <div className="col-span-2 text-sm">{task.dueDate}</div>
              <div className="col-span-1">
                <span className={cn(
                  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
                  task.priority === "Critical" ? "bg-red-100 text-red-800" :
                  task.priority === "High" ? "bg-orange-100 text-orange-800" :
                  task.priority === "Medium" ? "bg-yellow-100 text-yellow-800" :
                  "bg-green-100 text-green-800"
                )}>
                  {task.priority}
                </span>
              </div>
              <div className="col-span-2">
                <span className={cn(
                  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
                  task.status === "Pending" ? "bg-gray-100 text-gray-800" :
                  task.status === "In Progress" ? "bg-blue-100 text-blue-800" :
                  "bg-green-100 text-green-800"
                )}>
                  {task.status}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Tasks;
