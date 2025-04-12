import React, { useState } from "react";
import Layout from "../components/dashboard/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Lock, Bell, Palette, Globe, Database, Shield, Users } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";

function Settings() {
  const { toast } = useToast();
  
  const [generalSettings, setGeneralSettings] = useState({
    displayDensity: "comfortable",
    defaultView: "list",
    language: "english",
    dateFormat: "mm/dd/yyyy"
  });
  
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    criticalAlerts: true,
    taskAssignments: true,
    systemUpdates: false,
    dailySummary: true,
    desktopNotifications: false
  });
  
  const [appearanceSettings, setAppearanceSettings] = useState({
    theme: "light",
    colorScheme: "blue",
    fontSize: "medium",
    animationsEnabled: true
  });
  
  const saveSettings = (settingType: string) => {
    toast({
      title: "Settings Saved",
      description: `Your ${settingType} settings have been updated successfully.`,
    });
  };
  
  return (
    <Layout>
      <div className="p-6 space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Settings</h1>
          <p className="text-muted-foreground">Manage your system settings and preferences</p>
        </div>
        
        <Tabs defaultValue="general" className="space-y-4">
          <TabsList className="w-full justify-start border-b pb-px">
            <TabsTrigger value="general" className="gap-2">
              <Globe className="h-4 w-4" />
              General
            </TabsTrigger>
            <TabsTrigger value="account" className="gap-2">
              <User className="h-4 w-4" />
              Account
            </TabsTrigger>
            <TabsTrigger value="notifications" className="gap-2">
              <Bell className="h-4 w-4" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="appearance" className="gap-2">
              <Palette className="h-4 w-4" />
              Appearance
            </TabsTrigger>
            <TabsTrigger value="security" className="gap-2">
              <Shield className="h-4 w-4" />
              Security
            </TabsTrigger>
            <TabsTrigger value="team" className="gap-2">
              <Users className="h-4 w-4" />
              Team
            </TabsTrigger>
            <TabsTrigger value="data" className="gap-2">
              <Database className="h-4 w-4" />
              Data Management
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="general">
            <Card>
              <CardHeader>
                <CardTitle>General Settings</CardTitle>
                <CardDescription>Manage your general system preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="displayDensity">Display Density</Label>
                      <select
                        id="displayDensity"
                        className="w-full h-10 px-3 py-2 mt-1 bg-background border border-input rounded-md"
                        value={generalSettings.displayDensity}
                        onChange={(e) => setGeneralSettings({...generalSettings, displayDensity: e.target.value})}
                      >
                        <option value="comfortable">Comfortable</option>
                        <option value="compact">Compact</option>
                        <option value="spacious">Spacious</option>
                      </select>
                    </div>
                    
                    <div>
                      <Label htmlFor="defaultView">Default View</Label>
                      <select
                        id="defaultView"
                        className="w-full h-10 px-3 py-2 mt-1 bg-background border border-input rounded-md"
                        value={generalSettings.defaultView}
                        onChange={(e) => setGeneralSettings({...generalSettings, defaultView: e.target.value})}
                      >
                        <option value="list">List</option>
                        <option value="grid">Grid</option>
                        <option value="kanban">Kanban</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="language">Language</Label>
                      <select
                        id="language"
                        className="w-full h-10 px-3 py-2 mt-1 bg-background border border-input rounded-md"
                        value={generalSettings.language}
                        onChange={(e) => setGeneralSettings({...generalSettings, language: e.target.value})}
                      >
                        <option value="english">English</option>
                        <option value="spanish">Spanish</option>
                        <option value="french">French</option>
                        <option value="german">German</option>
                        <option value="chinese">Chinese</option>
                      </select>
                    </div>
                    
                    <div>
                      <Label htmlFor="dateFormat">Date Format</Label>
                      <select
                        id="dateFormat"
                        className="w-full h-10 px-3 py-2 mt-1 bg-background border border-input rounded-md"
                        value={generalSettings.dateFormat}
                        onChange={(e) => setGeneralSettings({...generalSettings, dateFormat: e.target.value})}
                      >
                        <option value="mm/dd/yyyy">MM/DD/YYYY</option>
                        <option value="dd/mm/yyyy">DD/MM/YYYY</option>
                        <option value="yyyy-mm-dd">YYYY-MM-DD</option>
                      </select>
                    </div>
                  </div>
                </div>
                
                <Button onClick={() => saveSettings("general")}>Save Changes</Button>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="account">
            <Card>
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
                <CardDescription>Manage your account details and preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="h-20 w-20 rounded-full bg-muted flex items-center justify-center">
                    <User className="h-10 w-10 text-muted-foreground" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium">John Doe</h3>
                    <p className="text-sm text-muted-foreground">Administrator</p>
                    <Button variant="outline" size="sm" className="mt-2">
                      Change Avatar
                    </Button>
                  </div>
                </div>
                
                <Separator />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="fullName">Full Name</Label>
                      <input
                        id="fullName"
                        type="text"
                        className="w-full h-10 px-3 py-2 mt-1 bg-background border border-input rounded-md"
                        defaultValue="John Doe"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <input
                        id="email"
                        type="email"
                        className="w-full h-10 px-3 py-2 mt-1 bg-background border border-input rounded-md"
                        defaultValue="john.doe@mainsync.com"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="jobTitle">Job Title</Label>
                      <input
                        id="jobTitle"
                        type="text"
                        className="w-full h-10 px-3 py-2 mt-1 bg-background border border-input rounded-md"
                        defaultValue="Maintenance Manager"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <input
                        id="phone"
                        type="tel"
                        className="w-full h-10 px-3 py-2 mt-1 bg-background border border-input rounded-md"
                        defaultValue="(555) 123-4567"
                      />
                    </div>
                  </div>
                </div>
                
                <Button onClick={() => saveSettings("account")}>Save Changes</Button>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>Notification Settings</CardTitle>
                <CardDescription>Manage how you receive notifications</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="emailNotifications" className="font-medium">Email Notifications</Label>
                      <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                    </div>
                    <Switch
                      id="emailNotifications"
                      checked={notificationSettings.emailNotifications}
                      onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, emailNotifications: checked})}
                    />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="criticalAlerts" className="font-medium">Critical Alerts</Label>
                      <p className="text-sm text-muted-foreground">Receive alerts for critical system issues</p>
                    </div>
                    <Switch
                      id="criticalAlerts"
                      checked={notificationSettings.criticalAlerts}
                      onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, criticalAlerts: checked})}
                    />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="taskAssignments" className="font-medium">Task Assignments</Label>
                      <p className="text-sm text-muted-foreground">Get notified when tasks are assigned to you</p>
                    </div>
                    <Switch
                      id="taskAssignments"
                      checked={notificationSettings.taskAssignments}
                      onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, taskAssignments: checked})}
                    />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="systemUpdates" className="font-medium">System Updates</Label>
                      <p className="text-sm text-muted-foreground">Receive notifications about system updates</p>
                    </div>
                    <Switch
                      id="systemUpdates"
                      checked={notificationSettings.systemUpdates}
                      onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, systemUpdates: checked})}
                    />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="dailySummary" className="font-medium">Daily Summary</Label>
                      <p className="text-sm text-muted-foreground">Receive a daily summary of activities</p>
                    </div>
                    <Switch
                      id="dailySummary"
                      checked={notificationSettings.dailySummary}
                      onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, dailySummary: checked})}
                    />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="desktopNotifications" className="font-medium">Desktop Notifications</Label>
                      <p className="text-sm text-muted-foreground">Show notifications on your desktop</p>
                    </div>
                    <Switch
                      id="desktopNotifications"
                      checked={notificationSettings.desktopNotifications}
                      onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, desktopNotifications: checked})}
                    />
                  </div>
                </div>
                
                <Button onClick={() => saveSettings("notification")}>Save Changes</Button>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="appearance">
            <Card>
              <CardHeader>
                <CardTitle>Appearance Settings</CardTitle>
                <CardDescription>Customize how MainSync looks and feels</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="theme">Theme</Label>
                      <select
                        id="theme"
                        className="w-full h-10 px-3 py-2 mt-1 bg-background border border-input rounded-md"
                        value={appearanceSettings.theme}
                        onChange={(e) => setAppearanceSettings({...appearanceSettings, theme: e.target.value})}
                      >
                        <option value="light">Light</option>
                        <option value="dark">Dark</option>
                        <option value="system">System Default</option>
                      </select>
                    </div>
                    
                    <div>
                      <Label htmlFor="colorScheme">Color Scheme</Label>
                      <select
                        id="colorScheme"
                        className="w-full h-10 px-3 py-2 mt-1 bg-background border border-input rounded-md"
                        value={appearanceSettings.colorScheme}
                        onChange={(e) => setAppearanceSettings({...appearanceSettings, colorScheme: e.target.value})}
                      >
                        <option value="blue">Blue</option>
                        <option value="green">Green</option>
                        <option value="purple">Purple</option>
                        <option value="red">Red</option>
                        <option value="orange">Orange</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="fontSize">Font Size</Label>
                      <select
                        id="fontSize"
                        className="w-full h-10 px-3 py-2 mt-1 bg-background border border-input rounded-md"
                        value={appearanceSettings.fontSize}
                        onChange={(e) => setAppearanceSettings({...appearanceSettings, fontSize: e.target.value})}
                      >
                        <option value="small">Small</option>
                        <option value="medium">Medium</option>
                        <option value="large">Large</option>
                      </select>
                    </div>
                    
                    <div className="flex items-center justify-between pt-2">
                      <div>
                        <Label htmlFor="animationsEnabled" className="font-medium">Enable Animations</Label>
                        <p className="text-sm text-muted-foreground">Show animated transitions and effects</p>
                      </div>
                      <Switch
                        id="animationsEnabled"
                        checked={appearanceSettings.animationsEnabled}
                        onCheckedChange={(checked) => setAppearanceSettings({...appearanceSettings, animationsEnabled: checked})}
                      />
                    </div>
                  </div>
                </div>
                
                <Button onClick={() => saveSettings("appearance")}>Save Changes</Button>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="security">
            <Card>
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
                <CardDescription>Manage your account security and access</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4 p-8 justify-center">
                  <Lock className="h-10 w-10 text-muted-foreground" />
                  <p className="text-muted-foreground">Security settings content will be implemented in future updates.</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="team">
            <Card>
              <CardHeader>
                <CardTitle>Team Settings</CardTitle>
                <CardDescription>Manage team access and permissions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4 p-8 justify-center">
                  <Users className="h-10 w-10 text-muted-foreground" />
                  <p className="text-muted-foreground">Team management settings will be implemented in future updates.</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="data">
            <Card>
              <CardHeader>
                <CardTitle>Data Management</CardTitle>
                <CardDescription>Manage your data, backups and exports</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4 p-8 justify-center">
                  <Database className="h-10 w-10 text-muted-foreground" />
                  <p className="text-muted-foreground">Data management features will be implemented in future updates.</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}

export default Settings;
