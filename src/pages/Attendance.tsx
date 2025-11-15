import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Calendar as CalendarIcon, TrendingUp, AlertCircle } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";

export default function Attendance() {
  const [date, setDate] = useState<Date | undefined>(new Date());

  const subjects = [
    { name: "Data Structures", present: 28, total: 30, percentage: 93 },
    { name: "Database Systems", present: 26, total: 30, percentage: 87 },
    { name: "Operating Systems", present: 23, total: 30, percentage: 77 },
    { name: "Computer Networks", present: 29, total: 30, percentage: 97 },
    { name: "Software Engineering", present: 25, total: 28, percentage: 89 },
  ];

  const recentAttendance = [
    { date: "2024-01-10", subject: "Data Structures", status: "present" },
    { date: "2024-01-10", subject: "Database Systems", status: "present" },
    { date: "2024-01-09", subject: "Operating Systems", status: "absent" },
    { date: "2024-01-09", subject: "Computer Networks", status: "present" },
    { date: "2024-01-08", subject: "Software Engineering", status: "present" },
  ];

  const overallPercentage = Math.round(
    subjects.reduce((acc, s) => acc + s.percentage, 0) / subjects.length
  );

  const getStatusColor = (percentage: number) => {
    if (percentage >= 85) return "text-success";
    if (percentage >= 75) return "text-warning";
    return "text-destructive";
  };

  const getProgressColor = (percentage: number) => {
    if (percentage >= 85) return "bg-success";
    if (percentage >= 75) return "bg-warning";
    return "bg-destructive";
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Attendance</h1>
        <p className="text-muted-foreground">Track your class attendance and performance</p>
      </div>

      {/* Overall Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Overall Attendance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">{overallPercentage}%</div>
            <Progress value={overallPercentage} className="mt-3 h-2" />
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Classes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-bold">148</span>
              <span className="text-sm text-muted-foreground">classes</span>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Classes Attended
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-bold">131</span>
              <span className="text-sm text-muted-foreground">attended</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Subject-wise Attendance */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Subject-wise Attendance
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            {subjects.map((subject) => (
              <div key={subject.name} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{subject.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {subject.present} / {subject.total} classes
                    </p>
                  </div>
                  <span className={`text-lg font-bold ${getStatusColor(subject.percentage)}`}>
                    {subject.percentage}%
                  </span>
                </div>
                <Progress
                  value={subject.percentage}
                  className={`h-2 ${getProgressColor(subject.percentage)}`}
                />
                {subject.percentage < 75 && (
                  <div className="flex items-center gap-1 text-xs text-destructive">
                    <AlertCircle className="h-3 w-3" />
                    <span>Below minimum requirement (75%)</span>
                  </div>
                )}
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Calendar & Recent */}
        <div className="space-y-6">
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CalendarIcon className="h-5 w-5 text-accent" />
                Calendar
              </CardTitle>
            </CardHeader>
            <CardContent className="flex justify-center">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border"
              />
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle>Recent Attendance</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {recentAttendance.map((record, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between rounded-lg border p-3"
                >
                  <div>
                    <p className="font-medium">{record.subject}</p>
                    <p className="text-sm text-muted-foreground">{record.date}</p>
                  </div>
                  <Badge
                    variant={record.status === "present" ? "default" : "destructive"}
                    className={
                      record.status === "present"
                        ? "bg-success hover:bg-success/90"
                        : ""
                    }
                  >
                    {record.status}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
