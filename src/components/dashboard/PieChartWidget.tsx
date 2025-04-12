
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const INITIAL_DATA = [
  { name: "Completed", value: 68, color: "#4cc9f0" },
  { name: "In Progress", value: 15, color: "#3f37c9" },
  { name: "Pending", value: 10, color: "#f8961e" },
  { name: "Delayed", value: 7, color: "#f94144" },
];

const BUILDINGS = [
  { value: "all", label: "All Buildings" },
  { value: "buildingA", label: "Building A" },
  { value: "buildingB", label: "Building B" },
  { value: "buildingC", label: "Building C" },
];

interface PieChartWidgetProps {
  className?: string;
}

const PieChartWidget = ({ className }: PieChartWidgetProps) => {
  const [data, setData] = useState(INITIAL_DATA);
  const [selectedBuilding, setSelectedBuilding] = useState("all");
  
  const handleBuildingChange = (value: string) => {
    setSelectedBuilding(value);
    
    // Simulate different data for different buildings
    if (value === "all") {
      setData(INITIAL_DATA);
    } else if (value === "buildingA") {
      setData([
        { name: "Completed", value: 75, color: "#4cc9f0" },
        { name: "In Progress", value: 10, color: "#3f37c9" },
        { name: "Pending", value: 8, color: "#f8961e" },
        { name: "Delayed", value: 7, color: "#f94144" },
      ]);
    } else if (value === "buildingB") {
      setData([
        { name: "Completed", value: 60, color: "#4cc9f0" },
        { name: "In Progress", value: 25, color: "#3f37c9" },
        { name: "Pending", value: 12, color: "#f8961e" },
        { name: "Delayed", value: 3, color: "#f94144" },
      ]);
    } else {
      setData([
        { name: "Completed", value: 55, color: "#4cc9f0" },
        { name: "In Progress", value: 20, color: "#3f37c9" },
        { name: "Pending", value: 15, color: "#f8961e" },
        { name: "Delayed", value: 10, color: "#f94144" },
      ]);
    }
  };
  
  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <CardTitle>Task Status</CardTitle>
        <Select value={selectedBuilding} onValueChange={handleBuildingChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select building" />
          </SelectTrigger>
          <SelectContent>
            {BUILDINGS.map((building) => (
              <SelectItem key={building.value} value={building.value}>
                {building.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="p-0">
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={2}
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                labelLine={false}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value, name) => [`${value}%`, name]}
                contentStyle={{
                  backgroundColor: "rgba(255, 255, 255, 0.95)",
                  borderRadius: "8px",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                  border: "none",
                }}
              />
              <Legend 
                layout="horizontal" 
                verticalAlign="bottom" 
                align="center"
                iconType="circle"
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default PieChartWidget;
