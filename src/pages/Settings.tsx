
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Bell, User, Shield, Lightbulb, Languages, Palette, Save } from "lucide-react";

function Settings() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-muted-foreground">Manage your account and application preferences</p>
      </div>
      
      <Tabs defaultValue="profile">
        <div className="flex gap-6">
          <div className="hidden md:block w-[200px] flex-shrink-0">
            <div className="space-y-1">
              <TabsList className="flex flex-col items-start h-auto bg-transparent p-0">
                <TabsTrigger
                  value="profile"
                  className="w-full justify-start px-2 data-[state=active]:bg-muted/50"
                >
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <span>Profile</span>
                  </div>
                </TabsTrigger>
                <TabsTrigger
                  value="notifications"
                  className="w-full justify-start px-2 data-[state=active]:bg-muted/50"
                >
                  <div className="flex items-center gap-2">
                    <Bell className="h-4 w-4" />
                    <span>Notifications</span>
                  </div>
                </TabsTrigger>
                <TabsTrigger
                  value="appearance"
                  className="w-full justify-start px-2 data-[state=active]:bg-muted/50"
                >
                  <div className="flex items-center gap-2">
                    <Palette className="h-4 w-4" />
                    <span>Appearance</span>
                  </div>
                </TabsTrigger>
                <TabsTrigger
                  value="language"
                  className="w-full justify-start px-2 data-[state=active]:bg-muted/50"
                >
                  <div className="flex items-center gap-2">
                    <Languages className="h-4 w-4" />
                    <span>Language</span>
                  </div>
                </TabsTrigger>
                <TabsTrigger
                  value="security"
                  className="w-full justify-start px-2 data-[state=active]:bg-muted/50"
                >
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4" />
                    <span>Security</span>
                  </div>
                </TabsTrigger>
                <TabsTrigger
                  value="advanced"
                  className="w-full justify-start px-2 data-[state=active]:bg-muted/50"
                >
                  <div className="flex items-center gap-2">
                    <Lightbulb className="h-4 w-4" />
                    <span>Advanced</span>
                  </div>
                </TabsTrigger>
              </TabsList>
            </div>
          </div>
          
          <div className="flex-1">
            <TabsList className="mb-4 md:hidden">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
              <TabsTrigger value="appearance">Appearance</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
            </TabsList>
            
            <TabsContent value="profile" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Profile</CardTitle>
                  <CardDescription>Manage your profile information</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
                    <Avatar className="h-16 w-16">
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <div className="space-y-1">
                      <h3 className="text-lg font-medium">John Doe</h3>
                      <p className="text-sm text-muted-foreground">Facilities Manager</p>
                    </div>
                    <div className="md:ml-auto">
                      <Button variant="outline">Change Photo</Button>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input id="name" defaultValue="John Doe" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" defaultValue="john.doe@mainsync.com" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="title">Job Title</Label>
                      <Input id="title" defaultValue="Facilities Manager" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" defaultValue="(555) 123-4567" />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="bio">Bio</Label>
                      <Input id="bio" defaultValue="Facilities manager with 10+ years of experience" />
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button className="gap-2">
                    <Save className="h-4 w-4" />
                    Save Changes
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="notifications" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Notifications</CardTitle>
                  <CardDescription>Configure your notification preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <h3 className="text-sm font-medium">Email Notifications</h3>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="critical-email" className="text-sm">Critical Alerts</Label>
                        <p className="text-xs text-muted-foreground">Receive notifications for critical system events</p>
                      </div>
                      <Switch id="critical-email" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="task-email" className="text-sm">Task Assignments</Label>
                        <p className="text-xs text-muted-foreground">Receive notifications when tasks are assigned to you</p>
                      </div>
                      <Switch id="task-email" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="reports-email" className="text-sm">Report Generation</Label>
                        <p className="text-xs text-muted-foreground">Receive notifications when reports are ready</p>
                      </div>
                      <Switch id="reports-email" defaultChecked />
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-4">
                    <h3 className="text-sm font-medium">In-App Notifications</h3>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="maintenance-app" className="text-sm">Maintenance Alerts</Label>
                        <p className="text-xs text-muted-foreground">Show notifications for maintenance events</p>
                      </div>
                      <Switch id="maintenance-app" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="system-app" className="text-sm">System Updates</Label>
                        <p className="text-xs text-muted-foreground">Show notifications for system updates</p>
                      </div>
                      <Switch id="system-app" defaultChecked />
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button className="gap-2">
                    <Save className="h-4 w-4" />
                    Save Preferences
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="appearance" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Appearance</CardTitle>
                  <CardDescription>Customize the look and feel of the application</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <h3 className="text-sm font-medium">Theme</h3>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="border rounded-md p-2 cursor-pointer bg-white">
                        <div className="h-10 bg-white rounded-md border mb-2"></div>
                        <div className="text-xs font-medium text-center">Light</div>
                      </div>
                      <div className="border rounded-md p-2 cursor-pointer bg-slate-950">
                        <div className="h-10 bg-slate-900 rounded-md border border-slate-800 mb-2"></div>
                        <div className="text-xs font-medium text-white text-center">Dark</div>
                      </div>
                      <div className="border rounded-md p-2 cursor-pointer bg-gradient-to-r from-white to-slate-950">
                        <div className="h-10 bg-gradient-to-r from-white to-slate-900 rounded-md border mb-2"></div>
                        <div className="text-xs font-medium text-center">System</div>
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-4">
                    <h3 className="text-sm font-medium">Layout</h3>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="compact-mode" className="text-sm">Compact Mode</Label>
                        <p className="text-xs text-muted-foreground">Reduce the spacing and size of elements</p>
                      </div>
                      <Switch id="compact-mode" />
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button className="gap-2">
                    <Save className="h-4 w-4" />
                    Save Preferences
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="security" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Security</CardTitle>
                  <CardDescription>Manage your security settings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <h3 className="text-sm font-medium">Password</h3>
                    <div className="grid gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="current-password">Current Password</Label>
                        <Input id="current-password" type="password" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="new-password">New Password</Label>
                        <Input id="new-password" type="password" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="confirm-password">Confirm New Password</Label>
                        <Input id="confirm-password" type="password" />
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-4">
                    <h3 className="text-sm font-medium">Two-Factor Authentication</h3>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="two-factor" className="text-sm">Enable Two-Factor Authentication</Label>
                        <p className="text-xs text-muted-foreground">Secure your account with two-factor authentication</p>
                      </div>
                      <Switch id="two-factor" />
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button className="gap-2">
                    <Save className="h-4 w-4" />
                    Save Changes
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </div>
        </div>
      </Tabs>
    </div>
  );
}

export default Settings;
