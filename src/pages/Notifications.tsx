
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bell, CheckCircle, Filter, AlertTriangle, Info, MailOpen, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

// Sample notifications data
const notifications = [
  { 
    id: 1, 
    title: "Critical Issue Reported", 
    message: "Power Distribution Unit Malfunction in Data Center", 
    type: "critical", 
    date: "2025-04-12", 
    time: "09:15 AM", 
    read: false 
  },
  { 
    id: 2, 
    title: "Maintenance Completed", 
    message: "HVAC system maintenance in Building A has been completed", 
    type: "success", 
    date: "2025-04-11", 
    time: "04:30 PM", 
    read: true 
  },
  { 
    id: 3, 
    title: "New Task Assigned", 
    message: "You have been assigned to repair water leak in Bathroom 2F", 
    type: "info", 
    date: "2025-04-11", 
    time: "11:22 AM", 
    read: false 
  },
  { 
    id: 4, 
    title: "Inspection Reminder", 
    message: "Scheduled inspection for Manufacturing Plant A is due tomorrow", 
    type: "warning", 
    date: "2025-04-10", 
    time: "02:45 PM", 
    read: true 
  },
  { 
    id: 5, 
    title: "Team Performance Report", 
    message: "Monthly performance report for all maintenance teams is now available", 
    type: "info", 
    date: "2025-04-10", 
    time: "09:00 AM", 
    read: false 
  },
  { 
    id: 6, 
    title: "System Update Complete", 
    message: "MainSync software has been updated to version 2.4.1", 
    type: "success", 
    date: "2025-04-09", 
    time: "11:30 PM", 
    read: true 
  },
  { 
    id: 7, 
    title: "Budget Approval Needed", 
    message: "Equipment replacement request for Building B needs your approval", 
    type: "warning", 
    date: "2025-04-09", 
    time: "01:15 PM", 
    read: false 
  },
  { 
    id: 8, 
    title: "Critical Alert Resolved", 
    message: "The fire alarm system issue in Research Lab has been resolved", 
    type: "success", 
    date: "2025-04-08", 
    time: "05:20 PM", 
    read: true 
  },
];

function Notifications() {
  const [activeNotifications, setActiveNotifications] = useState(notifications);
  
  const unreadCount = activeNotifications.filter(n => !n.read).length;
  const criticalCount = activeNotifications.filter(n => n.type === "critical" && !n.read).length;
  const warningCount = activeNotifications.filter(n => n.type === "warning" && !n.read).length;
  
  const markAsRead = (id: number) => {
    setActiveNotifications(
      activeNotifications.map(notification => 
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };
  
  const markAllAsRead = () => {
    setActiveNotifications(
      activeNotifications.map(notification => ({ ...notification, read: true }))
    );
  };
  
  const deleteNotification = (id: number) => {
    setActiveNotifications(
      activeNotifications.filter(notification => notification.id !== id)
    );
  };
  
  const clearAllRead = () => {
    setActiveNotifications(
      activeNotifications.filter(notification => !notification.read)
    );
  };
  
  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Notifications</h1>
          <p className="text-muted-foreground">View and manage your system notifications</p>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" className="gap-2" onClick={markAllAsRead}>
            <CheckCircle className="h-4 w-4" />
            Mark All as Read
          </Button>
          
          <Button variant="outline" className="gap-2" onClick={clearAllRead}>
            <Trash2 className="h-4 w-4" />
            Clear Read
          </Button>
          
          <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" />
            Filter
          </Button>
        </div>
      </div>
      
      {/* Notification Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4 flex items-center gap-4">
            <div className="bg-blue-100 text-blue-800 p-3 rounded-full">
              <Bell className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Unread</p>
              <p className="text-2xl font-bold">{unreadCount}</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 flex items-center gap-4">
            <div className="bg-red-100 text-red-800 p-3 rounded-full">
              <AlertTriangle className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Critical</p>
              <p className="text-2xl font-bold">{criticalCount}</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 flex items-center gap-4">
            <div className="bg-yellow-100 text-yellow-800 p-3 rounded-full">
              <Info className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Warnings</p>
              <p className="text-2xl font-bold">{warningCount}</p>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Notifications List */}
      <Card>
        <CardHeader>
          <CardTitle>Notification Center</CardTitle>
          <CardDescription>Stay updated with system notifications and alerts</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all">
            <TabsList className="mb-4">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="unread">Unread</TabsTrigger>
              <TabsTrigger value="critical">Critical</TabsTrigger>
              <TabsTrigger value="warnings">Warnings</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="space-y-4">
              <NotificationsList 
                notifications={activeNotifications} 
                onMarkAsRead={markAsRead} 
                onDelete={deleteNotification} 
              />
            </TabsContent>
            
            <TabsContent value="unread" className="space-y-4">
              <NotificationsList 
                notifications={activeNotifications.filter(n => !n.read)} 
                onMarkAsRead={markAsRead} 
                onDelete={deleteNotification} 
              />
            </TabsContent>
            
            <TabsContent value="critical" className="space-y-4">
              <NotificationsList 
                notifications={activeNotifications.filter(n => n.type === "critical")} 
                onMarkAsRead={markAsRead} 
                onDelete={deleteNotification} 
              />
            </TabsContent>
            
            <TabsContent value="warnings" className="space-y-4">
              <NotificationsList 
                notifications={activeNotifications.filter(n => n.type === "warning")} 
                onMarkAsRead={markAsRead} 
                onDelete={deleteNotification} 
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}

interface NotificationsListProps {
  notifications: typeof notifications;
  onMarkAsRead: (id: number) => void;
  onDelete: (id: number) => void;
}

function NotificationsList({ notifications, onMarkAsRead, onDelete }: NotificationsListProps) {
  if (notifications.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="flex justify-center mb-3">
          <Bell className="h-10 w-10 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-medium">No notifications</h3>
        <p className="text-sm text-muted-foreground">You're all caught up!</p>
      </div>
    );
  }
  
  return (
    <div className="space-y-3">
      {notifications.map((notification) => (
        <Card 
          key={notification.id} 
          className={cn(
            "transition-all hover:shadow-md",
            !notification.read && "border-l-4 border-l-primary"
          )}
        >
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <div className="flex items-start gap-3">
                <div className={cn(
                  "mt-1 p-2 rounded-full",
                  notification.type === "critical" ? "bg-red-100 text-red-800" :
                  notification.type === "warning" ? "bg-yellow-100 text-yellow-800" :
                  notification.type === "success" ? "bg-green-100 text-green-800" :
                  "bg-blue-100 text-blue-800"
                )}>
                  {notification.type === "critical" ? <AlertTriangle className="h-4 w-4" /> :
                   notification.type === "warning" ? <Info className="h-4 w-4" /> :
                   notification.type === "success" ? <CheckCircle className="h-4 w-4" /> :
                   <Bell className="h-4 w-4" />}
                </div>
                <div>
                  <div className="flex items-baseline gap-2">
                    <h4 className="font-medium">{notification.title}</h4>
                    {!notification.read && (
                      <span className="h-2 w-2 rounded-full bg-primary" />
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{notification.message}</p>
                  <div className="flex items-center text-xs text-muted-foreground mt-2">
                    <span>{notification.date}</span>
                    <span className="mx-1">•</span>
                    <span>{notification.time}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1">
                {!notification.read && (
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8"
                    onClick={() => onMarkAsRead(notification.id)}
                  >
                    <MailOpen className="h-4 w-4" />
                  </Button>
                )}
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8 text-muted-foreground hover:text-destructive"
                  onClick={() => onDelete(notification.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default Notifications;
