
import React, { useState } from "react";
import Layout from "../components/dashboard/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Download, Filter, FileText, BarChart2, LineChart, Printer } from "lucide-react";
import { cn } from "@/lib/utils";

const reports = [
  { id: 1, name: "Monthly Maintenance Summary", date: "2025-03-15", type: "PDF", status: "Ready" },
  { id: 2, name: "Equipment Status Report", date: "2025-03-10", type: "Excel", status: "Ready" },
  { id: 3, name: "Facility Inspection Results", date: "2025-03-05", type: "PDF", status: "Ready" },
  { id: 4, name: "Maintenance Team Performance", date: "2025-03-01", type: "PDF", status: "Processing" },
  { id: 5, name: "Critical Issues Summary", date: "2025-02-28", type: "Excel", status: "Ready" },
];

function Reports() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedReport, setSelectedReport] = useState<number | null>(null);

  return (
    <Layout>
      <div className="p-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">Reports</h1>
            <p className="text-muted-foreground">View and generate system reports</p>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="gap-2">
                  <CalendarIcon className="h-4 w-4" />
                  {date ? format(date, "PPP") : "Pick a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="end">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                  className="pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
            
            <Button variant="outline" className="gap-2">
              <Filter className="h-4 w-4" />
              Filter
            </Button>
            
            <Button className="gap-2">
              <FileText className="h-4 w-4" />
              Generate Report
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Report Library */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Report Library</CardTitle>
              <CardDescription>Access and download your available reports</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <div className="grid grid-cols-12 py-3 px-4 text-sm font-medium text-muted-foreground bg-muted/50">
                  <div className="col-span-5">Report Name</div>
                  <div className="col-span-2">Date</div>
                  <div className="col-span-2">Type</div>
                  <div className="col-span-2">Status</div>
                  <div className="col-span-1">Action</div>
                </div>
                <div className="divide-y">
                  {reports.map((report) => (
                    <div 
                      key={report.id} 
                      className={cn(
                        "grid grid-cols-12 py-3 px-4 items-center hover:bg-muted/50 cursor-pointer transition-colors",
                        selectedReport === report.id ? "bg-muted/50" : ""
                      )}
                      onClick={() => setSelectedReport(report.id)}
                    >
                      <div className="col-span-5 font-medium">{report.name}</div>
                      <div className="col-span-2 text-sm">{report.date}</div>
                      <div className="col-span-2 text-sm">{report.type}</div>
                      <div className="col-span-2 text-sm">
                        <span className={cn(
                          "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
                          report.status === "Ready" 
                            ? "bg-green-100 text-green-800" 
                            : "bg-yellow-100 text-yellow-800"
                        )}>
                          {report.status}
                        </span>
                      </div>
                      <div className="col-span-1">
                        {report.status === "Ready" && (
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Download className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Report Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common report operations</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button variant="outline" className="w-full justify-start gap-2">
                <BarChart2 className="h-4 w-4" />
                Generate Maintenance Summary
              </Button>
              <Button variant="outline" className="w-full justify-start gap-2">
                <LineChart className="h-4 w-4" />
                Equipment Status Overview
              </Button>
              <Button variant="outline" className="w-full justify-start gap-2">
                <Printer className="h-4 w-4" />
                Print Selected Report
              </Button>
              <Button variant="outline" className="w-full justify-start gap-2">
                <Download className="h-4 w-4" />
                Batch Download
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}

export default Reports;
