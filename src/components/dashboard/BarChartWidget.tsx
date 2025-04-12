
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const data = [
  {
    name: "Jan",
    scheduled: 45,
    completed: 42,
    critical: 4,
  },
  {
    name: "Feb",
    scheduled: 52,
    completed: 49,
    critical: 6,
  },
  {
    name: "Mar",
    scheduled: 48,
    completed: 38,
    critical: 10,
  },
  {
    name: "Apr",
    scheduled: 61,
    completed: 58,
    critical: 5,
  },
  {
    name: "May",
    scheduled: 55,
    completed: 51,
    critical: 4,
  },
  {
    name: "Jun",
    scheduled: 67,
    completed: 62,
    critical: 8,
  },
];

interface BarChartWidgetProps {
  className?: string;
}

const BarChartWidget = ({ className }: BarChartWidgetProps) => {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Maintenance Tasks</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="h-[300px] w-full px-2">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{
                top: 20,
                right: 30,
                left: 0,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip 
                contentStyle={{
                  backgroundColor: "rgba(255, 255, 255, 0.95)",
                  borderRadius: "8px",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                  border: "none",
                }}
              />
              <Legend />
              <Bar 
                dataKey="scheduled" 
                fill="#3f37c9" 
                name="Scheduled Tasks" 
                radius={[4, 4, 0, 0]} 
              />
              <Bar 
                dataKey="completed" 
                fill="#4cc9f0" 
                name="Completed Tasks" 
                radius={[4, 4, 0, 0]} 
              />
              <Bar 
                dataKey="critical" 
                fill="#f94144" 
                name="Critical Issues" 
                radius={[4, 4, 0, 0]} 
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default BarChartWidget;
