
import { cn } from "@/lib/utils";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowDownIcon, ArrowUpIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon: React.ReactNode;
  trend?: {
    value: number;
    isPositive?: boolean;
  };
  className?: string;
}

const StatCard = ({
  title,
  value,
  description,
  icon,
  trend,
  className,
}: StatCardProps) => {
  return (
    <Card className={cn("overflow-hidden card-hover", className)}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className="h-8 w-8 rounded-md bg-primary/10 flex items-center justify-center text-primary">
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {(description || trend) && (
          <div className="flex items-center pt-1">
            {trend && (
              <div 
                className={cn(
                  "flex items-center text-xs font-medium",
                  trend.isPositive ? "text-green-500" : "text-red-500"
                )}
              >
                {trend.isPositive ? (
                  <ArrowUpIcon className="mr-1 h-3 w-3" />
                ) : (
                  <ArrowDownIcon className="mr-1 h-3 w-3" />
                )}
                {Math.abs(trend.value)}%
              </div>
            )}
            {description && (
              <CardDescription className="text-xs ml-2">
                {description}
              </CardDescription>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default StatCard;
