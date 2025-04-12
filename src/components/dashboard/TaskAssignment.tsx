
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  DragDropContext, 
  Droppable, 
  Draggable, 
  DropResult,
  DroppableProvided,
  DraggableProvided
} from "@hello-pangea/dnd";
import { Button } from "@/components/ui/button";
import { Plus, User, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Task {
  id: string;
  content: string;
  priority: "low" | "medium" | "high" | "critical";
  location: string;
}

interface Column {
  id: string;
  title: string;
  tasks: Task[];
}

interface BoardData {
  columns: {
    [key: string]: Column;
  };
  columnOrder: string[];
}

const initialData: BoardData = {
  columns: {
    "unassigned": {
      id: "unassigned",
      title: "Unassigned",
      tasks: [
        { 
          id: "task-1", 
          content: "HVAC System Inspection", 
          priority: "high",
          location: "Building A, Floor 2"
        },
        { 
          id: "task-2", 
          content: "Elevator Maintenance", 
          priority: "medium",
          location: "Building B, Floor 1-5"
        },
        { 
          id: "task-3", 
          content: "Plumbing Repair", 
          priority: "critical",
          location: "Building C, Room 304"
        },
      ],
    },
    "team-a": {
      id: "team-a",
      title: "Team Alpha",
      tasks: [
        { 
          id: "task-4", 
          content: "Fire System Testing", 
          priority: "high",
          location: "Building A, All Floors"
        },
      ],
    },
    "team-b": {
      id: "team-b",
      title: "Team Beta",
      tasks: [
        { 
          id: "task-5", 
          content: "Lighting Replacement", 
          priority: "low",
          location: "Building D, Floor 1"
        },
      ],
    },
  },
  columnOrder: ["unassigned", "team-a", "team-b"],
};

const getPriorityColor = (priority: Task["priority"]) => {
  const colors = {
    low: "bg-success/20 text-success-foreground",
    medium: "bg-warning/20 text-warning-foreground",
    high: "bg-warning/80 text-warning-foreground",
    critical: "bg-danger/20 text-danger-foreground",
  };
  return colors[priority];
};

const TaskAssignment = () => {
  const [boardData, setBoardData] = useState<BoardData>(initialData);
  const { toast } = useToast();

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    // If no destination, return
    if (!destination) return;

    // If dropped in the same place, return
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    // Get source and destination columns
    const sourceColumn = boardData.columns[source.droppableId];
    const destColumn = boardData.columns[destination.droppableId];

    // If moved within the same column
    if (sourceColumn.id === destColumn.id) {
      const newTasks = Array.from(sourceColumn.tasks);
      const movedTask = newTasks.splice(source.index, 1)[0];
      newTasks.splice(destination.index, 0, movedTask);

      const newColumn = {
        ...sourceColumn,
        tasks: newTasks,
      };

      setBoardData({
        ...boardData,
        columns: {
          ...boardData.columns,
          [newColumn.id]: newColumn,
        },
      });
      
      toast({
        title: "Task reordered",
        description: `Task "${movedTask.content}" reordered within ${sourceColumn.title}`,
      });
      return;
    }

    // Moving from one column to another
    const sourceTasks = Array.from(sourceColumn.tasks);
    const movedTask = sourceTasks.splice(source.index, 1)[0];
    const destTasks = Array.from(destColumn.tasks);
    destTasks.splice(destination.index, 0, movedTask);

    const newSourceColumn = {
      ...sourceColumn,
      tasks: sourceTasks,
    };

    const newDestColumn = {
      ...destColumn,
      tasks: destTasks,
    };

    setBoardData({
      ...boardData,
      columns: {
        ...boardData.columns,
        [newSourceColumn.id]: newSourceColumn,
        [newDestColumn.id]: newDestColumn,
      },
    });
    
    toast({
      title: "Task assigned",
      description: `Task "${movedTask.content}" moved from ${sourceColumn.title} to ${destColumn.title}`,
    });
  };

  return (
    <Card className="col-span-2">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle>Task Assignment</CardTitle>
        <Button size="sm">
          <Plus className="mr-1 h-4 w-4" />
          Add Team
        </Button>
      </CardHeader>
      <CardContent>
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {boardData.columnOrder.map((columnId) => {
              const column = boardData.columns[columnId];
              const tasks = column.tasks;

              return (
                <div key={column.id} className="flex flex-col h-full">
                  <div className="mb-2 flex items-center gap-2">
                    <h3 className="font-medium flex items-center">
                      {column.id === "unassigned" ? (
                        <User className="mr-2 h-4 w-4 text-muted-foreground" />
                      ) : (
                        <Users className="mr-2 h-4 w-4 text-primary" />
                      )}
                      {column.title}
                    </h3>
                    <Badge variant="outline">
                      {tasks.length}
                    </Badge>
                  </div>
                  <Droppable droppableId={column.id}>
                    {(provided: DroppableProvided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className={`p-2 min-h-[200px] bg-muted/30 rounded-md border border-dashed flex-1 ${
                          tasks.length === 0 ? "flex items-center justify-center" : ""
                        }`}
                      >
                        {tasks.length === 0 && (
                          <div className="text-sm text-muted-foreground">
                            Drop tasks here
                          </div>
                        )}
                        {tasks.map((task, index) => (
                          <Draggable
                            key={task.id}
                            draggableId={task.id}
                            index={index}
                          >
                            {(provided: DraggableProvided) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className="p-3 mb-2 bg-card rounded-md shadow-sm border cursor-grab active:cursor-grabbing"
                              >
                                <div className="font-medium mb-1">{task.content}</div>
                                <div className="flex flex-col gap-1">
                                  <Badge 
                                    variant="outline"
                                    className={`w-fit text-xs ${getPriorityColor(task.priority)}`}
                                  >
                                    {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                                  </Badge>
                                  <div className="text-xs text-muted-foreground">
                                    {task.location}
                                  </div>
                                </div>
                              </div>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </div>
              );
            })}
          </div>
        </DragDropContext>
      </CardContent>
    </Card>
  );
};

export default TaskAssignment;
