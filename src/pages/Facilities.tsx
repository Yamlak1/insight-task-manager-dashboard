
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Building2, MapPin, Search, Filter, Plus, CheckCircle, AlertTriangle, Info } from "lucide-react";
import { cn } from "@/lib/utils";

// Sample facility data
const facilities = [
  { id: 1, name: "Headquarters", location: "New York", status: "Operational", lastInspection: "2025-03-20", healthScore: 95 },
  { id: 2, name: "Manufacturing Plant A", location: "Chicago", status: "Operational", lastInspection: "2025-03-15", healthScore: 87 },
  { id: 3, name: "Distribution Center", location: "Atlanta", status: "Under Maintenance", lastInspection: "2025-02-28", healthScore: 62 },
  { id: 4, name: "Research Lab", location: "Boston", status: "Operational", lastInspection: "2025-03-10", healthScore: 91 },
  { id: 5, name: "Data Center", location: "Dallas", status: "Critical Issues", lastInspection: "2025-03-05", healthScore: 45 },
  { id: 6, name: "Regional Office", location: "Seattle", status: "Operational", lastInspection: "2025-03-25", healthScore: 88 },
];

// Sample issues data
const issues = [
  { id: 1, facilityId: 3, description: "HVAC System Failure", status: "Open", priority: "High", reported: "2025-03-01" },
  { id: 2, facilityId: 5, description: "Power Distribution Unit Malfunction", status: "Open", priority: "Critical", reported: "2025-03-04" },
  { id: 3, facilityId: 5, description: "Backup Generator Issue", status: "In Progress", priority: "High", reported: "2025-03-05" },
  { id: 4, facilityId: 2, description: "Water Leak in Section B", status: "Open", priority: "Medium", reported: "2025-03-12" },
];

function Facilities() {
  const [searchQuery, setSearchQuery] = useState("");
  
  const filteredFacilities = facilities.filter(facility => 
    facility.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    facility.location.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const operational = filteredFacilities.filter(f => f.status === "Operational").length;
  const underMaintenance = filteredFacilities.filter(f => f.status === "Under Maintenance").length;
  const criticalIssues = filteredFacilities.filter(f => f.status === "Critical Issues").length;
  
  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Facilities</h1>
          <p className="text-muted-foreground">Manage your buildings and locations</p>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search facilities..."
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
            Add Facility
          </Button>
        </div>
      </div>
      
      {/* Facility Status Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4 flex items-center gap-4">
            <div className="bg-green-100 text-green-800 p-3 rounded-full">
              <CheckCircle className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Operational</p>
              <p className="text-2xl font-bold">{operational}</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 flex items-center gap-4">
            <div className="bg-blue-100 text-blue-800 p-3 rounded-full">
              <Info className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Under Maintenance</p>
              <p className="text-2xl font-bold">{underMaintenance}</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 flex items-center gap-4">
            <div className="bg-red-100 text-red-800 p-3 rounded-full">
              <AlertTriangle className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Critical Issues</p>
              <p className="text-2xl font-bold">{criticalIssues}</p>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Facilities & Issues Tabs */}
      <Card>
        <CardHeader>
          <CardTitle>Facilities Management</CardTitle>
          <CardDescription>Monitor and manage your facilities and issues</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="facilities">
            <TabsList className="mb-4">
              <TabsTrigger value="facilities">Facilities</TabsTrigger>
              <TabsTrigger value="issues">Active Issues</TabsTrigger>
            </TabsList>
            
            <TabsContent value="facilities" className="space-y-4">
              <div className="rounded-md border">
                <div className="grid grid-cols-12 py-3 px-4 text-sm font-medium text-muted-foreground bg-muted/50">
                  <div className="col-span-3">Facility Name</div>
                  <div className="col-span-2">Location</div>
                  <div className="col-span-2">Last Inspection</div>
                  <div className="col-span-2">Health Score</div>
                  <div className="col-span-3">Status</div>
                </div>
                <div className="divide-y">
                  {filteredFacilities.map((facility) => (
                    <div key={facility.id} className="grid grid-cols-12 py-3 px-4 items-center hover:bg-muted/50 cursor-pointer transition-colors">
                      <div className="col-span-3 font-medium flex items-center gap-2">
                        <Building2 className="h-4 w-4 text-muted-foreground" />
                        {facility.name}
                      </div>
                      <div className="col-span-2 text-sm flex items-center gap-1">
                        <MapPin className="h-3 w-3 text-muted-foreground" />
                        {facility.location}
                      </div>
                      <div className="col-span-2 text-sm">{facility.lastInspection}</div>
                      <div className="col-span-2">
                        <div className="flex items-center gap-2">
                          <div className="w-full bg-muted rounded-full h-2">
                            <div 
                              className={cn(
                                "h-2 rounded-full",
                                facility.healthScore >= 80 ? "bg-green-500" :
                                facility.healthScore >= 60 ? "bg-yellow-500" :
                                "bg-red-500"
                              )}
                              style={{ width: `${facility.healthScore}%` }}
                            ></div>
                          </div>
                          <span className="text-xs font-medium">{facility.healthScore}%</span>
                        </div>
                      </div>
                      <div className="col-span-3">
                        <span className={cn(
                          "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
                          facility.status === "Operational" ? "bg-green-100 text-green-800" :
                          facility.status === "Under Maintenance" ? "bg-blue-100 text-blue-800" :
                          "bg-red-100 text-red-800"
                        )}>
                          {facility.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="issues" className="space-y-4">
              <div className="rounded-md border">
                <div className="grid grid-cols-12 py-3 px-4 text-sm font-medium text-muted-foreground bg-muted/50">
                  <div className="col-span-3">Facility</div>
                  <div className="col-span-4">Issue Description</div>
                  <div className="col-span-2">Reported On</div>
                  <div className="col-span-1">Priority</div>
                  <div className="col-span-2">Status</div>
                </div>
                <div className="divide-y">
                  {issues.map((issue) => {
                    const facility = facilities.find(f => f.id === issue.facilityId);
                    return (
                      <div key={issue.id} className="grid grid-cols-12 py-3 px-4 items-center hover:bg-muted/50 cursor-pointer transition-colors">
                        <div className="col-span-3 font-medium">{facility?.name}</div>
                        <div className="col-span-4 text-sm">{issue.description}</div>
                        <div className="col-span-2 text-sm">{issue.reported}</div>
                        <div className="col-span-1">
                          <span className={cn(
                            "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
                            issue.priority === "Critical" ? "bg-red-100 text-red-800" :
                            issue.priority === "High" ? "bg-orange-100 text-orange-800" :
                            "bg-yellow-100 text-yellow-800"
                          )}>
                            {issue.priority}
                          </span>
                        </div>
                        <div className="col-span-2">
                          <span className={cn(
                            "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
                            issue.status === "Open" ? "bg-red-100 text-red-800" :
                            "bg-blue-100 text-blue-800"
                          )}>
                            {issue.status}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}

export default Facilities;
