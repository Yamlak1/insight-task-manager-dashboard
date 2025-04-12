
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Info, CheckCircle2, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Alert {
  id: string;
  message: string;
  location: string;
  type: "critical" | "warning" | "info" | "success";
  time: string;
}

const alerts: Alert[] = [
  {
    id: "alert-1",
    message: "HVAC system failure",
    location: "Building A, Floor 3",
    type: "critical",
    time: "10 minutes ago"
  },
  {
    id: "alert-2",
    message: "Water pressure anomaly detected",
    location: "Building B, Floor 1",
    type: "warning",
    time: "35 minutes ago"
  },
  {
    id: "alert-3",
    message: "Scheduled maintenance completed",
    location: "Building C, Floor 2",
    type: "success",
    time: "2 hours ago"
  },
  {
    id: "alert-4",
    message: "Routine inspection scheduled",
    location: "Building A, Floor 1",
    type: "info",
    time: "Today, 4:00 PM"
  }
];

const getAlertIcon = (type: Alert["type"]) => {
  switch (type) {
    case "critical":
      return <AlertTriangle className="h-5 w-5 text-danger" />;
    case "warning":
      return <AlertTriangle className="h-5 w-5 text-warning" />;
    case "info":
      return <Info className="h-5 w-5 text-primary" />;
    case "success":
      return <CheckCircle2 className="h-5 w-5 text-success" />;
    default:
      return null;
  }
};

const getAlertBadge = (type: Alert["type"]) => {
  const classes = {
    critical: "bg-danger text-danger-foreground",
    warning: "bg-warning text-warning-foreground",
    info: "bg-primary text-primary-foreground",
    success: "bg-success text-success-foreground"
  };
  
  return (
    <Badge className={classes[type]} variant="secondary">
      {type.charAt(0).toUpperCase() + type.slice(1)}
    </Badge>
  );
};

const AlertsWidget = () => {
  const { toast } = useToast();
  
  const handleAlertClick = (alert: Alert) => {
    toast({
      title: "Alert Selected",
      description: `Viewing details for: ${alert.message} at ${alert.location}`
    });
  };
  
  return (
    <Card className="card-hover h-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-semibold">Recent Alerts</CardTitle>
        <Button variant="outline" size="sm">
          Clear All
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {alerts.map(alert => (
            <div 
              key={alert.id}
              className="flex items-start gap-3 p-3 rounded-md border cursor-pointer hover:bg-muted/50 transition-colors"
              onClick={() => handleAlertClick(alert)}
            >
              <div className="pt-1">{getAlertIcon(alert.type)}</div>
              <div className="flex flex-col gap-1 flex-1">
                <div className="flex justify-between items-start">
                  <div className="font-medium">{alert.message}</div>
                  {getAlertBadge(alert.type)}
                </div>
                <div className="text-sm text-muted-foreground">{alert.location}</div>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  {alert.time}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default AlertsWidget;
