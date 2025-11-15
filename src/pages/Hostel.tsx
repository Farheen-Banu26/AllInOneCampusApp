import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import {
  Home,
  CalendarIcon,
  Dumbbell,
  FileCheck,
  Clock,
  CheckCircle2,
  Plus,
} from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";

export default function Hostel() {
  const [gatepassDialog, setGatepassDialog] = useState(false);
  const [gymDialog, setGymDialog] = useState(false);
  const [fromDate, setFromDate] = useState<Date>();
  const [toDate, setToDate] = useState<Date>();

  const gatepasses = [
    {
      id: 1,
      type: "Home Visit",
      fromDate: "2024-01-15",
      toDate: "2024-01-17",
      reason: "Family emergency",
      status: "approved",
      appliedOn: "2024-01-10",
    },
    {
      id: 2,
      type: "Local Visit",
      fromDate: "2024-01-20",
      toDate: "2024-01-20",
      reason: "Medical checkup",
      status: "pending",
      appliedOn: "2024-01-12",
    },
  ];

  const gymSubscriptions = [
    {
      id: 1,
      plan: "Monthly",
      startDate: "2024-01-01",
      endDate: "2024-01-31",
      amount: 500,
      status: "active",
    },
  ];

  const handleGatepassSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fromDate || !toDate) {
      toast.error("Please select dates");
      return;
    }
    toast.success("Gatepass application submitted!");
    setGatepassDialog(false);
  };

  const handleGymSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Gym subscription payment initiated!");
    setGymDialog(false);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Hostel Management</h1>
        <p className="text-muted-foreground">Manage gatepass, gym subscription, and hostel facilities</p>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Room Number
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline gap-2">
              <Home className="h-5 w-5 text-primary" />
              <span className="text-3xl font-bold">A-204</span>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Pending Gatepasses
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline gap-2">
              <FileCheck className="h-5 w-5 text-warning" />
              <span className="text-3xl font-bold">1</span>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Gym Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline gap-2">
              <Dumbbell className="h-5 w-5 text-success" />
              <span className="text-xl font-bold text-success">Active</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Gatepass Section */}
        <Card className="shadow-sm">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <FileCheck className="h-5 w-5 text-primary" />
                Gatepass Management
              </CardTitle>
              <Dialog open={gatepassDialog} onOpenChange={setGatepassDialog}>
                <DialogTrigger asChild>
                  <Button size="sm">
                    <Plus className="mr-2 h-4 w-4" />
                    Apply
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Apply for Gatepass</DialogTitle>
                    <DialogDescription>Fill in the details for your gatepass request</DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleGatepassSubmit} className="space-y-4">
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
                        placeholder="Please provide a reason for your gatepass..."
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
          </CardHeader>
          <CardContent className="space-y-3">
            {gatepasses.map((gatepass) => (
              <div
                key={gatepass.id}
                className="rounded-lg border p-4 transition-colors hover:bg-muted/50"
              >
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <p className="font-medium">{gatepass.type}</p>
                    <p className="text-sm text-muted-foreground">
                      {gatepass.fromDate} to {gatepass.toDate}
                    </p>
                    <p className="text-sm text-muted-foreground">Reason: {gatepass.reason}</p>
                    <p className="text-xs text-muted-foreground">Applied: {gatepass.appliedOn}</p>
                  </div>
                  <Badge
                    variant="outline"
                    className={
                      gatepass.status === "approved"
                        ? "border-success text-success"
                        : "border-warning text-warning"
                    }
                  >
                    {gatepass.status === "approved" ? (
                      <CheckCircle2 className="mr-1 h-3 w-3" />
                    ) : (
                      <Clock className="mr-1 h-3 w-3" />
                    )}
                    {gatepass.status}
                  </Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Gym Subscription */}
        <Card className="shadow-sm">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Dumbbell className="h-5 w-5 text-accent" />
                Gym Subscription
              </CardTitle>
              <Dialog open={gymDialog} onOpenChange={setGymDialog}>
                <DialogTrigger asChild>
                  <Button size="sm" variant="outline">
                    <Plus className="mr-2 h-4 w-4" />
                    Subscribe
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Gym Subscription</DialogTitle>
                    <DialogDescription>Choose your subscription plan</DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleGymSubmit} className="space-y-4">
                    <div className="space-y-4">
                      <div className="rounded-lg border p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Monthly Plan</p>
                            <p className="text-sm text-muted-foreground">Access for 30 days</p>
                          </div>
                          <p className="text-2xl font-bold">₹500</p>
                        </div>
                      </div>

                      <div className="rounded-lg border p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Quarterly Plan</p>
                            <p className="text-sm text-muted-foreground">Access for 90 days</p>
                          </div>
                          <div className="text-right">
                            <p className="text-2xl font-bold">₹1,200</p>
                            <p className="text-xs text-success">Save ₹300</p>
                          </div>
                        </div>
                      </div>

                      <div className="rounded-lg border p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Yearly Plan</p>
                            <p className="text-sm text-muted-foreground">Access for 365 days</p>
                          </div>
                          <div className="text-right">
                            <p className="text-2xl font-bold">₹4,000</p>
                            <p className="text-xs text-success">Save ₹2,000</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <Button type="submit" className="w-full">
                      Proceed to Payment
                    </Button>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {gymSubscriptions.map((sub) => (
              <div
                key={sub.id}
                className="rounded-lg border border-success/50 bg-success/5 p-4"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="font-medium">{sub.plan} Subscription</p>
                    <Badge className="bg-success hover:bg-success/90">
                      <CheckCircle2 className="mr-1 h-3 w-3" />
                      {sub.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Valid: {sub.startDate} to {sub.endDate}
                  </p>
                  <p className="text-sm font-medium">Amount: ₹{sub.amount}</p>
                </div>
              </div>
            ))}

            <div className="rounded-lg border p-4">
              <h4 className="mb-2 font-medium">Gym Timings</h4>
              <div className="space-y-1 text-sm text-muted-foreground">
                <p>Morning: 6:00 AM - 9:00 AM</p>
                <p>Evening: 5:00 PM - 9:00 PM</p>
                <p className="mt-2 text-xs">Closed on Sundays and public holidays</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
