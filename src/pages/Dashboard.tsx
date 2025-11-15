import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  BookOpen,
  Calendar,
  TrendingUp,
  Clock,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

export default function Dashboard() {
  const stats = [
    {
      title: "Pending Assignments",
      value: "3",
      icon: BookOpen,
      color: "text-warning",
      bgColor: "bg-warning/10",
    },
    {
      title: "Attendance",
      value: "87%",
      icon: Calendar,
      color: "text-success",
      bgColor: "bg-success/10",
    },
    {
      title: "Overall Grade",
      value: "A",
      icon: TrendingUp,
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      title: "Upcoming Events",
      value: "5",
      icon: Clock,
      color: "text-accent",
      bgColor: "bg-accent/10",
    },
  ];

  const recentAssignments = [
    {
      title: "Data Structures - Assignment 3",
      subject: "Computer Science",
      deadline: "2024-01-15",
      status: "pending",
    },
    {
      title: "Calculus Problem Set",
      subject: "Mathematics",
      deadline: "2024-01-18",
      status: "submitted",
    },
    {
      title: "Database Design Project",
      subject: "Database Systems",
      deadline: "2024-01-20",
      status: "pending",
    },
  ];

  const upcomingEvents = [
    {
      title: "Tech Fest 2024",
      date: "Jan 25, 2024",
      type: "Festival",
    },
    {
      title: "Semester Exams",
      date: "Feb 1-10, 2024",
      type: "Academic",
    },
    {
      title: "Guest Lecture: AI & ML",
      date: "Jan 22, 2024",
      type: "Workshop",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Welcome back, John!</h1>
        <p className="text-muted-foreground">Here's what's happening in your campus today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="border-border/50 shadow-sm transition-shadow hover:shadow-md">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <div className={`rounded-full p-2 ${stat.bgColor}`}>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Assignments */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-primary" />
              Recent Assignments
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentAssignments.map((assignment, idx) => (
              <div
                key={idx}
                className="flex items-start justify-between rounded-lg border p-3 transition-colors hover:bg-muted/50"
              >
                <div className="space-y-1">
                  <p className="font-medium">{assignment.title}</p>
                  <p className="text-sm text-muted-foreground">{assignment.subject}</p>
                  <p className="text-xs text-muted-foreground">Due: {assignment.deadline}</p>
                </div>
                {assignment.status === "submitted" ? (
                  <Badge variant="outline" className="border-success text-success">
                    <CheckCircle2 className="mr-1 h-3 w-3" />
                    Submitted
                  </Badge>
                ) : (
                  <Badge variant="outline" className="border-warning text-warning">
                    <AlertCircle className="mr-1 h-3 w-3" />
                    Pending
                  </Badge>
                )}
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Upcoming Events */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-accent" />
              Upcoming Events
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {upcomingEvents.map((event, idx) => (
              <div
                key={idx}
                className="flex items-start justify-between rounded-lg border p-3 transition-colors hover:bg-muted/50"
              >
                <div className="space-y-1">
                  <p className="font-medium">{event.title}</p>
                  <p className="text-sm text-muted-foreground">{event.date}</p>
                </div>
                <Badge variant="secondary">{event.type}</Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Attendance Overview */}
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle>Attendance Overview</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {[
            { subject: "Data Structures", percentage: 92 },
            { subject: "Database Systems", percentage: 87 },
            { subject: "Operating Systems", percentage: 78 },
            { subject: "Computer Networks", percentage: 95 },
          ].map((subject) => (
            <div key={subject.subject} className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium">{subject.subject}</span>
                <span
                  className={`font-bold ${
                    subject.percentage >= 85 ? "text-success" : subject.percentage >= 75 ? "text-warning" : "text-destructive"
                  }`}
                >
                  {subject.percentage}%
                </span>
              </div>
              <Progress value={subject.percentage} className="h-2" />
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
