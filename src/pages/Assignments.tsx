import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Calendar,
  FileText,
  Upload,
  CheckCircle2,
  Clock,
  XCircle,
} from "lucide-react";
import { toast } from "sonner";

export default function Assignments() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const assignments = [
    {
      id: 1,
      title: "Data Structures - Binary Trees Implementation",
      subject: "Computer Science",
      description: "Implement AVL tree with insertion, deletion, and balancing operations.",
      deadline: "2024-01-15",
      points: 100,
      status: "pending",
      submittedOn: null,
    },
    {
      id: 2,
      title: "Calculus - Integration Problem Set",
      subject: "Mathematics",
      description: "Solve problems 1-20 from Chapter 5 on integration techniques.",
      deadline: "2024-01-18",
      points: 50,
      status: "submitted",
      submittedOn: "2024-01-10",
    },
    {
      id: 3,
      title: "Database Design - ER Diagram",
      subject: "Database Systems",
      description: "Create an ER diagram for a library management system.",
      deadline: "2024-01-20",
      points: 75,
      status: "pending",
      submittedOn: null,
    },
    {
      id: 4,
      title: "Operating Systems - Process Scheduling",
      subject: "Operating Systems",
      description: "Compare FCFS, SJF, and Round Robin scheduling algorithms.",
      deadline: "2024-01-12",
      points: 80,
      status: "graded",
      submittedOn: "2024-01-11",
      grade: 72,
    },
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSubmit = () => {
    toast.success("Assignment submitted successfully!");
    setSelectedFile(null);
  };

  const filterAssignments = (status: string) => {
    if (status === "all") return assignments;
    return assignments.filter((a) => a.status === status);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="h-4 w-4" />;
      case "submitted":
        return <CheckCircle2 className="h-4 w-4" />;
      case "graded":
        return <CheckCircle2 className="h-4 w-4" />;
      default:
        return <XCircle className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "border-warning text-warning";
      case "submitted":
        return "border-accent text-accent";
      case "graded":
        return "border-success text-success";
      default:
        return "border-destructive text-destructive";
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Assignments</h1>
        <p className="text-muted-foreground">
          Manage and submit your course assignments
        </p>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-4">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="submitted">Submitted</TabsTrigger>
          <TabsTrigger value="graded">Graded</TabsTrigger>
        </TabsList>

        {["all", "pending", "submitted", "graded"].map((tab) => (
          <TabsContent key={tab} value={tab} className="space-y-4">
            {filterAssignments(tab).map((assignment) => (
              <Card key={assignment.id} className="shadow-sm transition-shadow hover:shadow-md">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <CardTitle className="text-lg">{assignment.title}</CardTitle>
                      <p className="text-sm text-muted-foreground">{assignment.subject}</p>
                    </div>
                    <Badge variant="outline" className={getStatusColor(assignment.status)}>
                      {getStatusIcon(assignment.status)}
                      <span className="ml-1 capitalize">{assignment.status}</span>
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm">{assignment.description}</p>

                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>Due: {assignment.deadline}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <FileText className="h-4 w-4" />
                      <span>Points: {assignment.points}</span>
                    </div>
                  </div>

                  {assignment.status === "graded" && assignment.grade && (
                    <div className="rounded-lg border border-success/50 bg-success/5 p-3">
                      <p className="text-sm font-medium text-success">
                        Grade: {assignment.grade}/{assignment.points}
                      </p>
                    </div>
                  )}

                  {assignment.status === "submitted" && assignment.submittedOn && (
                    <p className="text-sm text-muted-foreground">
                      Submitted on: {assignment.submittedOn}
                    </p>
                  )}

                  {assignment.status === "pending" && (
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button className="w-full sm:w-auto">
                          <Upload className="mr-2 h-4 w-4" />
                          Submit Assignment
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Submit Assignment</DialogTitle>
                          <DialogDescription>
                            Upload your assignment file and add any notes for your teacher.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                          <div className="space-y-2">
                            <Label htmlFor="file">Assignment File</Label>
                            <Input
                              id="file"
                              type="file"
                              onChange={handleFileChange}
                              accept=".pdf,.doc,.docx,.zip"
                            />
                            {selectedFile && (
                              <p className="text-sm text-muted-foreground">
                                Selected: {selectedFile.name}
                              </p>
                            )}
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="notes">Notes (Optional)</Label>
                            <Textarea
                              id="notes"
                              placeholder="Add any notes or comments for your teacher..."
                              className="resize-none"
                            />
                          </div>
                          <Button onClick={handleSubmit} className="w-full">
                            Submit
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  )}
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
