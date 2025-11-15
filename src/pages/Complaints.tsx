import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { MessageSquare, Clock, CheckCircle2, AlertCircle, Plus } from "lucide-react";
import { toast } from "sonner";

export default function Complaints() {
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);

  const complaints = [
    {
      id: 1,
      title: "Broken AC in Room 204",
      category: "Hostel",
      description: "The air conditioning unit in room 204 has been making loud noises and not cooling properly.",
      status: "in-progress",
      date: "2024-01-10",
      updatedAt: "2024-01-12",
    },
    {
      id: 2,
      title: "Food Quality Issue",
      category: "Mess",
      description: "The food served during lunch on Jan 8 was undercooked and cold.",
      status: "resolved",
      date: "2024-01-08",
      updatedAt: "2024-01-09",
      resolution: "Quality checks have been improved. New chef has been assigned.",
    },
    {
      id: 3,
      title: "Library WiFi Not Working",
      category: "Academic",
      description: "Unable to connect to WiFi in the library for the past 2 days.",
      status: "pending",
      date: "2024-01-11",
      updatedAt: "2024-01-11",
    },
    {
      id: 4,
      title: "Washroom Maintenance",
      category: "Hostel",
      description: "Water leakage in 2nd floor washroom near the common room.",
      status: "in-progress",
      date: "2024-01-09",
      updatedAt: "2024-01-11",
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!category || !title || !description) {
      toast.error("Please fill all required fields");
      return;
    }
    toast.success("Complaint submitted successfully!");
    setCategory("");
    setTitle("");
    setDescription("");
    setDialogOpen(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "border-warning text-warning";
      case "in-progress":
        return "border-accent text-accent";
      case "resolved":
        return "border-success text-success";
      default:
        return "border-muted text-muted-foreground";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="h-4 w-4" />;
      case "in-progress":
        return <AlertCircle className="h-4 w-4" />;
      case "resolved":
        return <CheckCircle2 className="h-4 w-4" />;
      default:
        return <MessageSquare className="h-4 w-4" />;
    }
  };

  const filterComplaints = (status: string) => {
    if (status === "all") return complaints;
    return complaints.filter((c) => c.status === status);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Complaint Box</h1>
          <p className="text-muted-foreground">Submit and track campus facility complaints</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Complaint
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Submit New Complaint</DialogTitle>
              <DialogDescription>
                Describe your issue and we'll work to resolve it quickly
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="category">Category *</Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hostel">Hostel</SelectItem>
                    <SelectItem value="mess">Mess/Food</SelectItem>
                    <SelectItem value="academic">Academic</SelectItem>
                    <SelectItem value="maintenance">Maintenance</SelectItem>
                    <SelectItem value="transport">Transport</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Brief description of the issue"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Provide detailed information about your complaint..."
                  className="resize-none"
                  rows={4}
                  required
                />
              </div>

              <Button type="submit" className="w-full">
                Submit Complaint
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-4">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="in-progress">In Progress</TabsTrigger>
          <TabsTrigger value="resolved">Resolved</TabsTrigger>
        </TabsList>

        {["all", "pending", "in-progress", "resolved"].map((tab) => (
          <TabsContent key={tab} value={tab} className="space-y-4">
            {filterComplaints(tab).map((complaint) => (
              <Card key={complaint.id} className="shadow-sm transition-shadow hover:shadow-md">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <CardTitle className="text-lg">{complaint.title}</CardTitle>
                      <Badge variant="secondary" className="w-fit">
                        {complaint.category}
                      </Badge>
                    </div>
                    <Badge variant="outline" className={getStatusColor(complaint.status)}>
                      {getStatusIcon(complaint.status)}
                      <span className="ml-1 capitalize">{complaint.status.replace("-", " ")}</span>
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm">{complaint.description}</p>

                  {complaint.resolution && (
                    <div className="rounded-lg border border-success/50 bg-success/5 p-3">
                      <p className="text-sm font-medium text-success">Resolution:</p>
                      <p className="mt-1 text-sm text-muted-foreground">{complaint.resolution}</p>
                    </div>
                  )}

                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                    <span>Submitted: {complaint.date}</span>
                    <span>Last Updated: {complaint.updatedAt}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
