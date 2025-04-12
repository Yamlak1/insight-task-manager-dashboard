
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, Filter, Plus, Users, UserPlus, Mail, Phone } from "lucide-react";
import { cn } from "@/lib/utils";

// Sample team data
const teams = [
  { 
    id: 1, 
    name: "Facilities Management", 
    description: "Manages facilities and infrastructure",
    members: 8,
    activeProjects: 12,
    lead: "Sarah Johnson"
  },
  { 
    id: 2, 
    name: "Maintenance Crew A", 
    description: "First-shift daily maintenance operations",
    members: 6,
    activeProjects: 8,
    lead: "Michael Chen"
  },
  { 
    id: 3, 
    name: "HVAC Specialists", 
    description: "HVAC system installation and repairs",
    members: 4,
    activeProjects: 5,
    lead: "Robert Martinez"
  },
  { 
    id: 4, 
    name: "Safety Inspectors", 
    description: "Regular safety checks and compliance",
    members: 3,
    activeProjects: 9,
    lead: "Jessica Williams"
  },
];

// Sample team members data
const members = [
  { id: 1, name: "Sarah Johnson", role: "Team Lead", team: "Facilities Management", email: "sarah.j@mainsync.com", phone: "555-0101", status: "Active" },
  { id: 2, name: "Michael Chen", role: "Team Lead", team: "Maintenance Crew A", email: "michael.c@mainsync.com", phone: "555-0102", status: "Active" },
  { id: 3, name: "Robert Martinez", role: "Team Lead", team: "HVAC Specialists", email: "robert.m@mainsync.com", phone: "555-0103", status: "Active" },
  { id: 4, name: "Jessica Williams", role: "Team Lead", team: "Safety Inspectors", email: "jessica.w@mainsync.com", phone: "555-0104", status: "Active" },
  { id: 5, name: "David Kim", role: "Technician", team: "Maintenance Crew A", email: "david.k@mainsync.com", phone: "555-0105", status: "On Leave" },
  { id: 6, name: "Emily Rodriguez", role: "Inspector", team: "Safety Inspectors", email: "emily.r@mainsync.com", phone: "555-0106", status: "Active" },
  { id: 7, name: "James Wilson", role: "HVAC Specialist", team: "HVAC Specialists", email: "james.w@mainsync.com", phone: "555-0107", status: "Active" },
  { id: 8, name: "Anna Singh", role: "Facilities Manager", team: "Facilities Management", email: "anna.s@mainsync.com", phone: "555-0108", status: "Active" },
];

function Teams() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Teams</h1>
          <p className="text-muted-foreground">Manage your maintenance teams and personnel</p>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search teams..."
              className="h-10 w-full rounded-md border border-input bg-background pl-8 pr-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 sm:w-[200px]"
            />
          </div>
          
          <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" />
            Filter
          </Button>
          
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Create Team
          </Button>
        </div>
      </div>
      
      {/* Teams Management */}
      <Card>
        <CardHeader>
          <CardTitle>Teams Management</CardTitle>
          <CardDescription>View and manage all maintenance teams</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="teams">
            <TabsList className="mb-4">
              <TabsTrigger value="teams">Teams</TabsTrigger>
              <TabsTrigger value="members">Team Members</TabsTrigger>
            </TabsList>
            
            <TabsContent value="teams" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {teams.map((team) => (
                  <Card key={team.id} className="hover:shadow-md transition-shadow">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg">{team.name}</CardTitle>
                        <div className="bg-primary/10 text-primary p-2 rounded-full">
                          <Users className="h-5 w-5" />
                        </div>
                      </div>
                      <CardDescription>{team.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-2 text-sm mb-4">
                        <div>
                          <p className="text-muted-foreground">Team Lead</p>
                          <p className="font-medium">{team.lead}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Members</p>
                          <p className="font-medium">{team.members}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Active Projects</p>
                          <p className="font-medium">{team.activeProjects}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="flex-1">
                          Details
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1">
                          Assign Tasks
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="members" className="space-y-4">
              <div className="flex justify-end mb-4">
                <Button variant="outline" className="gap-2">
                  <UserPlus className="h-4 w-4" />
                  Add Member
                </Button>
              </div>
              
              <div className="rounded-md border">
                <div className="grid grid-cols-12 py-3 px-4 text-sm font-medium text-muted-foreground bg-muted/50">
                  <div className="col-span-3">Name</div>
                  <div className="col-span-2">Role</div>
                  <div className="col-span-3">Team</div>
                  <div className="col-span-2">Contact</div>
                  <div className="col-span-2">Status</div>
                </div>
                <div className="divide-y">
                  {members.map((member) => (
                    <div key={member.id} className="grid grid-cols-12 py-3 px-4 items-center hover:bg-muted/50 cursor-pointer transition-colors">
                      <div className="col-span-3 font-medium flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>{member.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                        </Avatar>
                        {member.name}
                      </div>
                      <div className="col-span-2 text-sm">{member.role}</div>
                      <div className="col-span-3 text-sm">{member.team}</div>
                      <div className="col-span-2 text-sm">
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="icon" className="h-7 w-7">
                            <Mail className="h-3.5 w-3.5" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-7 w-7">
                            <Phone className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                      </div>
                      <div className="col-span-2">
                        <span className={cn(
                          "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
                          member.status === "Active" ? "bg-green-100 text-green-800" :
                          "bg-yellow-100 text-yellow-800"
                        )}>
                          {member.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}

export default Teams;
