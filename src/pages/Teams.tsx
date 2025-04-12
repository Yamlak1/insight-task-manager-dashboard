
import React, { useState } from "react";
import Layout from "../components/dashboard/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, Search, Filter, Plus, BarChart2, User, Mail, Phone } from "lucide-react";
import { cn } from "@/lib/utils";

// Sample teams data
const teams = [
  { 
    id: 1, 
    name: "Maintenance A Team", 
    lead: "John Smith", 
    members: 5, 
    specialty: "HVAC & Electrical", 
    activeJobs: 3,
    completedJobs: 125,
    availability: "Available"
  },
  { 
    id: 2, 
    name: "Plumbing Specialists", 
    lead: "Maria Garcia", 
    members: 3, 
    specialty: "Plumbing", 
    activeJobs: 2,
    completedJobs: 87,
    availability: "Available"
  },
  { 
    id: 3, 
    name: "Emergency Response", 
    lead: "David Johnson", 
    members: 4, 
    specialty: "Emergency Repairs", 
    activeJobs: 1,
    completedJobs: 54,
    availability: "On Call"
  },
  { 
    id: 4, 
    name: "Construction Crew", 
    lead: "Sarah Williams", 
    members: 8, 
    specialty: "Renovations & Construction", 
    activeJobs: 0,
    completedJobs: 32,
    availability: "Unavailable"
  },
  { 
    id: 5, 
    name: "IT Infrastructure", 
    lead: "Michael Brown", 
    members: 3, 
    specialty: "IT & Network", 
    activeJobs: 4,
    completedJobs: 98,
    availability: "Available"
  },
];

// Sample team members data
const teamMembers = [
  { id: 1, teamId: 1, name: "John Smith", role: "Team Lead", email: "john.smith@mainsync.com", phone: "555-1234", skills: ["HVAC", "Electrical", "Carpentry"] },
  { id: 2, teamId: 1, name: "Emma Davis", role: "HVAC Specialist", email: "emma.davis@mainsync.com", phone: "555-2345", skills: ["HVAC", "Ventilation"] },
  { id: 3, teamId: 1, name: "Robert Wilson", role: "Electrician", email: "robert.wilson@mainsync.com", phone: "555-3456", skills: ["Electrical", "Lighting", "Security Systems"] },
  { id: 4, teamId: 1, name: "Lisa Chen", role: "General Maintenance", email: "lisa.chen@mainsync.com", phone: "555-4567", skills: ["General Repairs", "Painting", "Carpentry"] },
  { id: 5, teamId: 1, name: "Carlos Rodriguez", role: "General Maintenance", email: "carlos.rodriguez@mainsync.com", phone: "555-5678", skills: ["General Repairs", "Flooring", "Drywall"] },
  { id: 6, teamId: 2, name: "Maria Garcia", role: "Team Lead", email: "maria.garcia@mainsync.com", phone: "555-6789", skills: ["Plumbing", "Pipe Fitting", "Drainage"] },
  { id: 7, teamId: 3, name: "David Johnson", role: "Team Lead", email: "david.johnson@mainsync.com", phone: "555-7890", skills: ["Emergency Response", "Fire Systems", "Electrical"] },
  { id: 8, teamId: 4, name: "Sarah Williams", role: "Team Lead", email: "sarah.williams@mainsync.com", phone: "555-8901", skills: ["Construction", "Project Management", "Carpentry"] },
  { id: 9, teamId: 5, name: "Michael Brown", role: "Team Lead", email: "michael.brown@mainsync.com", phone: "555-9012", skills: ["IT Infrastructure", "Network", "Security Systems"] },
];

function Teams() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTeam, setSelectedTeam] = useState<number | null>(null);
  
  const filteredTeams = teams.filter(team => 
    team.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    team.lead.toLowerCase().includes(searchQuery.toLowerCase()) ||
    team.specialty.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const selectedTeamMembers = selectedTeam 
    ? teamMembers.filter(member => member.teamId === selectedTeam)
    : [];
  
  const activeTeams = teams.filter(team => team.availability === "Available" || team.availability === "On Call").length;
  
  return (
    <Layout>
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
              Create Team
            </Button>
          </div>
        </div>
        
        {/* Team Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-4 flex items-center gap-4">
              <div className="bg-blue-100 text-blue-800 p-3 rounded-full">
                <Users className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Teams</p>
                <p className="text-2xl font-bold">{teams.length}</p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 flex items-center gap-4">
              <div className="bg-green-100 text-green-800 p-3 rounded-full">
                <User className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Personnel</p>
                <p className="text-2xl font-bold">{teamMembers.length}</p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 flex items-center gap-4">
              <div className="bg-purple-100 text-purple-800 p-3 rounded-full">
                <BarChart2 className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Active Teams</p>
                <p className="text-2xl font-bold">{activeTeams}</p>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Team Management */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle>Team Management</CardTitle>
              <CardDescription>Manage your maintenance teams and their members</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="teams">
                <TabsList className="mb-4">
                  <TabsTrigger value="teams">Teams</TabsTrigger>
                  {selectedTeam && <TabsTrigger value="members">Team Members</TabsTrigger>}
                </TabsList>
                
                <TabsContent value="teams" className="space-y-4">
                  <div className="rounded-md border">
                    <div className="grid grid-cols-12 py-3 px-4 text-sm font-medium text-muted-foreground bg-muted/50">
                      <div className="col-span-3">Team Name</div>
                      <div className="col-span-2">Team Lead</div>
                      <div className="col-span-2">Specialty</div>
                      <div className="col-span-1">Members</div>
                      <div className="col-span-1">Active Jobs</div>
                      <div className="col-span-1">Completed</div>
                      <div className="col-span-2">Availability</div>
                    </div>
                    <div className="divide-y">
                      {filteredTeams.map((team) => (
                        <div 
                          key={team.id} 
                          className={cn(
                            "grid grid-cols-12 py-3 px-4 items-center hover:bg-muted/50 cursor-pointer transition-colors",
                            selectedTeam === team.id ? "bg-muted/50" : ""
                          )}
                          onClick={() => setSelectedTeam(team.id)}
                        >
                          <div className="col-span-3 font-medium">{team.name}</div>
                          <div className="col-span-2 text-sm">{team.lead}</div>
                          <div className="col-span-2 text-sm">{team.specialty}</div>
                          <div className="col-span-1 text-sm">{team.members}</div>
                          <div className="col-span-1 text-sm">{team.activeJobs}</div>
                          <div className="col-span-1 text-sm">{team.completedJobs}</div>
                          <div className="col-span-2">
                            <span className={cn(
                              "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
                              team.availability === "Available" ? "bg-green-100 text-green-800" :
                              team.availability === "On Call" ? "bg-yellow-100 text-yellow-800" :
                              "bg-red-100 text-red-800"
                            )}>
                              {team.availability}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>
                
                {selectedTeam && (
                  <TabsContent value="members" className="space-y-4">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-medium">
                        {teams.find(t => t.id === selectedTeam)?.name} - Team Members
                      </h3>
                      <Button size="sm">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Member
                      </Button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {selectedTeamMembers.map((member) => (
                        <Card key={member.id} className="hover:shadow-md transition-shadow">
                          <CardContent className="p-5">
                            <div className="flex flex-col items-center text-center mb-4">
                              <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mb-3">
                                <User className="h-8 w-8 text-muted-foreground" />
                              </div>
                              <h4 className="text-lg font-medium">{member.name}</h4>
                              <p className="text-sm text-muted-foreground">{member.role}</p>
                            </div>
                            <div className="space-y-2">
                              <div className="flex items-center gap-2 text-sm">
                                <Mail className="h-4 w-4 text-muted-foreground" />
                                <span>{member.email}</span>
                              </div>
                              <div className="flex items-center gap-2 text-sm">
                                <Phone className="h-4 w-4 text-muted-foreground" />
                                <span>{member.phone}</span>
                              </div>
                              <div className="mt-3">
                                <p className="text-xs text-muted-foreground mb-2">Skills:</p>
                                <div className="flex flex-wrap gap-1">
                                  {member.skills.map((skill, index) => (
                                    <span key={index} className="bg-muted px-2 py-1 rounded-md text-xs">
                                      {skill}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>
                )}
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}

export default Teams;
