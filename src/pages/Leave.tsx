import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import {
  CalendarIcon,
  FileText,
  Clock,
  CheckCircle2,
  XCircle,
  Plus,
  Download,
} from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";

export default function Leave() {
  const [leaveDialog, setLeaveDialog] = useState(false);
  const [onDutyDialog, setOnDutyDialog] = useState(false);
  const [fromDate, setFromDate] = useState<Date>();
  const [toDate, setToDate] = useState<Date>();
  const [leaveType, setLeaveType] = useState("");

  const leaveApplications = [
    {
      id: 1,
      type: "Medical Leave",
      fromDate: "2024-01-15",
      toDate: "2024-01-17",
      reason: "Fever and flu symptoms",
      status: "approved",
      appliedOn: "2024-01-14",
      approvedBy: "Dr. Sarah Johnson",
    },
    {
      id: 2,
      type: "Personal Leave",
      fromDate: "2024-01-22",
      toDate: "2024-01-23",
      reason: "Family function",
      status: "pending",
      appliedOn: "2024-01-20",
    },
  ];

  const onDutyApplications = [
    {
      id: 1,
      event: "Technical Symposium",
      venue: "IIT Chennai",
      fromDate: "2024-01-10",
      toDate: "2024-01-12",
      status: "approved",
      appliedOn: "2024-01-05",
    },
    {
      id: 2,
      event: "Hackathon 2024",
      venue: "NIT Trichy",
      fromDate: "2024-01-25",
      toDate: "2024-01-27",
      status: "pending",
      appliedOn: "2024-01-18",
    },
  ];

  const hallTickets = [
    {
      id: 1,
      exam: "End Semester Examination - Semester 4",
      startDate: "2024-02-01",
      endDate: "2024-02-10",
      venue: "Main Block",
      seatNo: "A-204",
    },
  ];

  const handleLeaveSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fromDate || !toDate || !leaveType) {
      toast.error("Please fill all required fields");
      return;
    }
    toast.success("Leave application submitted!");
    setLeaveDialog(false);
  };

  const handleOnDutySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fromDate || !toDate) {
      toast.error("Please fill all required fields");
      return;
    }
    toast.success("On-duty application submitted!");
    setOnDutyDialog(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "border-success text-success";
      case "pending":
        return "border-warning text-warning";
      case "rejected":
        return "border-destructive text-destructive";
      default:
        return "border-muted text-muted-foreground";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return <CheckCircle2 className="h-4 w-4" />;
      case "pending":
        return <Clock className="h-4 w-4" />;
      case "rejected":
        return <XCircle className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Leave & On-Duty</h1>
        <p className="text-muted-foreground">Apply for leave and on-duty requests</p>
      </div>

      <Tabs defaultValue="leave" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="leave">Leave</TabsTrigger>
          <TabsTrigger value="onduty">On-Duty</TabsTrigger>
          <TabsTrigger value="hallticket">Hall Ticket</TabsTrigger>
        </TabsList>

        {/* Leave Applications */}
        <TabsContent value="leave" className="space-y-4">
          <div className="flex justify-end">
            <Dialog open={leaveDialog} onOpenChange={setLeaveDialog}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Apply Leave
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Apply for Leave</DialogTitle>
                  <DialogDescription>Fill in the details for your leave request</DialogDescription>
                </DialogHeader>
                <form onSubmit={handleLeaveSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="leaveType">Leave Type *</Label>
                    <Select value={leaveType} onValueChange={setLeaveType}>
                      <SelectTrigger id="leaveType">
                        <SelectValue placeholder="Select leave type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="medical">Medical Leave</SelectItem>
                        <SelectItem value="personal">Personal Leave</SelectItem>
                        <SelectItem value="emergency">Emergency Leave</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>From Date *</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !fromDate && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {fromDate ? format(fromDate, "PPP") : "Pick a date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar mode="single" selected={fromDate} onSelect={setFromDate} />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div className="space-y-2">
                    <Label>To Date *</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !toDate && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {toDate ? format(toDate, "PPP") : "Pick a date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar mode="single" selected={toDate} onSelect={setToDate} />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="reason">Reason *</Label>
                    <Textarea
                      id="reason"
                      placeholder="Please provide a reason for your leave..."
                      className="resize-none"
                      rows={3}
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full">
                    Submit Application
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          {leaveApplications.map((leave) => (
            <Card key={leave.id} className="shadow-sm transition-shadow hover:shadow-md">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <CardTitle className="text-lg">{leave.type}</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      {leave.fromDate} to {leave.toDate}
                    </p>
                  </div>
                  <Badge variant="outline" className={getStatusColor(leave.status)}>
                    {getStatusIcon(leave.status)}
                    <span className="ml-1 capitalize">{leave.status}</span>
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm">
                  <span className="font-medium">Reason:</span> {leave.reason}
                </p>
                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                  <span>Applied: {leave.appliedOn}</span>
                  {leave.approvedBy && <span>Approved by: {leave.approvedBy}</span>}
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        {/* On-Duty Applications */}
        <TabsContent value="onduty" className="space-y-4">
          <div className="flex justify-end">
            <Dialog open={onDutyDialog} onOpenChange={setOnDutyDialog}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Apply On-Duty
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Apply for On-Duty</DialogTitle>
                  <DialogDescription>
                    Fill in the details for your on-duty request
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleOnDutySubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="eventName">Event Name *</Label>
                    <Input id="eventName" placeholder="e.g., Technical Symposium" required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="venue">Venue *</Label>
                    <Input id="venue" placeholder="e.g., IIT Chennai" required />
                  </div>

                  <div className="space-y-2">
                    <Label>From Date *</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !fromDate && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {fromDate ? format(fromDate, "PPP") : "Pick a date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar mode="single" selected={fromDate} onSelect={setFromDate} />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div className="space-y-2">
                    <Label>To Date *</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !toDate && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {toDate ? format(toDate, "PPP") : "Pick a date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar mode="single" selected={toDate} onSelect={setToDate} />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description *</Label>
                    <Textarea
                      id="description"
                      placeholder="Provide details about the event..."
                      className="resize-none"
                      rows={3}
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full">
                    Submit Application
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          {onDutyApplications.map((onduty) => (
            <Card key={onduty.id} className="shadow-sm transition-shadow hover:shadow-md">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <CardTitle className="text-lg">{onduty.event}</CardTitle>
                    <p className="text-sm text-muted-foreground">{onduty.venue}</p>
                  </div>
                  <Badge variant="outline" className={getStatusColor(onduty.status)}>
                    {getStatusIcon(onduty.status)}
                    <span className="ml-1 capitalize">{onduty.status}</span>
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm">
                  <span className="font-medium">Duration:</span> {onduty.fromDate} to{" "}
                  {onduty.toDate}
                </p>
                <p className="text-sm text-muted-foreground">Applied: {onduty.appliedOn}</p>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        {/* Hall Tickets */}
        <TabsContent value="hallticket" className="space-y-4">
          {hallTickets.map((ticket) => (
            <Card key={ticket.id} className="shadow-sm">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <CardTitle>{ticket.exam}</CardTitle>
                  <Button size="sm">
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-muted-foreground">Start Date</p>
                    <p className="text-base font-semibold">{ticket.startDate}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-muted-foreground">End Date</p>
                    <p className="text-base font-semibold">{ticket.endDate}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-muted-foreground">Venue</p>
                    <p className="text-base font-semibold">{ticket.venue}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-muted-foreground">Seat Number</p>
                    <p className="text-base font-semibold">{ticket.seatNo}</p>
                  </div>
                </div>

                <div className="rounded-lg border border-accent/50 bg-accent/5 p-4">
                  <h4 className="mb-2 font-semibold">Important Instructions</h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• Carry your hall ticket and ID card to the examination hall</li>
                    <li>• Report to the examination hall 15 minutes before the start time</li>
                    <li>• Electronic devices are not allowed inside the examination hall</li>
                    <li>• Follow all instructions given by the invigilators</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}
