import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { BarChart3, TrendingUp, Award, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Marks() {
  const internalMarks = [
    { subject: "Data Structures", test1: 18, test2: 20, test3: 19, assignment: 8, total: 65, max: 75 },
    { subject: "Database Systems", test1: 20, test2: 18, test3: 20, assignment: 9, total: 67, max: 75 },
    { subject: "Operating Systems", test1: 17, test2: 19, test3: 18, assignment: 7, total: 61, max: 75 },
    { subject: "Computer Networks", test1: 19, test2: 20, test3: 19, assignment: 10, total: 68, max: 75 },
    { subject: "Software Engineering", test1: 20, test2: 19, test3: 20, assignment: 9, total: 68, max: 75 },
  ];

  const semesterMarks = [
    { semester: "Semester 1", sgpa: 8.9, cgpa: 8.9, credits: 24, status: "completed" },
    { semester: "Semester 2", sgpa: 9.1, cgpa: 9.0, credits: 24, status: "completed" },
    { semester: "Semester 3", sgpa: 8.7, cgpa: 8.9, credits: 24, status: "completed" },
    { semester: "Semester 4", sgpa: 9.0, cgpa: 8.925, credits: 24, status: "ongoing" },
  ];

  const subjectGrades = [
    { code: "CS401", name: "Data Structures", credits: 4, grade: "A+", points: 10 },
    { code: "CS402", name: "Database Systems", credits: 4, grade: "A+", points: 10 },
    { code: "CS403", name: "Operating Systems", credits: 4, grade: "A", points: 9 },
    { code: "CS404", name: "Computer Networks", credits: 4, grade: "A+", points: 10 },
    { code: "CS405", name: "Software Engineering", credits: 4, grade: "A+", points: 10 },
  ];

  const getPercentage = (obtained: number, max: number) => {
    return Math.round((obtained / max) * 100);
  };

  const getGradeColor = (grade: string) => {
    if (grade === "A+" || grade === "O") return "bg-success text-success-foreground";
    if (grade === "A") return "bg-accent text-accent-foreground";
    if (grade === "B+" || grade === "B") return "bg-primary text-primary-foreground";
    return "bg-muted text-muted-foreground";
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Marks & Reports</h1>
        <p className="text-muted-foreground">View your academic performance and progress reports</p>
      </div>

      {/* Overall Performance */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Current CGPA
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-bold text-success">8.92</span>
              <span className="text-sm text-muted-foreground">/ 10</span>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Current SGPA
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-bold text-primary">9.0</span>
              <span className="text-sm text-muted-foreground">/ 10</span>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Credits Earned
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-bold">72</span>
              <span className="text-sm text-muted-foreground">/ 96</span>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Class Rank
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline gap-2">
              <Award className="h-8 w-8 text-warning" />
              <span className="text-4xl font-bold">3</span>
              <span className="text-sm text-muted-foreground">/ 60</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="internal" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="internal">Internal Marks</TabsTrigger>
          <TabsTrigger value="semester">Semester</TabsTrigger>
          <TabsTrigger value="progress">Progress</TabsTrigger>
        </TabsList>

        {/* Internal Marks */}
        <TabsContent value="internal" className="space-y-4">
          <Card className="shadow-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-primary" />
                  Internal Assessment Marks
                </CardTitle>
                <Button size="sm" variant="outline">
                  <Download className="mr-2 h-4 w-4" />
                  Download Report
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Subject</TableHead>
                    <TableHead className="text-center">Test 1</TableHead>
                    <TableHead className="text-center">Test 2</TableHead>
                    <TableHead className="text-center">Test 3</TableHead>
                    <TableHead className="text-center">Assignment</TableHead>
                    <TableHead className="text-center">Total</TableHead>
                    <TableHead className="text-center">Percentage</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {internalMarks.map((mark) => (
                    <TableRow key={mark.subject}>
                      <TableCell className="font-medium">{mark.subject}</TableCell>
                      <TableCell className="text-center">{mark.test1}/20</TableCell>
                      <TableCell className="text-center">{mark.test2}/20</TableCell>
                      <TableCell className="text-center">{mark.test3}/20</TableCell>
                      <TableCell className="text-center">{mark.assignment}/10</TableCell>
                      <TableCell className="text-center font-bold">{mark.total}/75</TableCell>
                      <TableCell className="text-center">
                        <Badge
                          className={
                            getPercentage(mark.total, mark.max) >= 85
                              ? "bg-success"
                              : getPercentage(mark.total, mark.max) >= 70
                              ? "bg-primary"
                              : "bg-warning"
                          }
                        >
                          {getPercentage(mark.total, mark.max)}%
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Semester Marks */}
        <TabsContent value="semester" className="space-y-4">
          <Card className="shadow-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-accent" />
                  Semester-wise Performance
                </CardTitle>
                <Button size="sm" variant="outline">
                  <Download className="mr-2 h-4 w-4" />
                  Download Transcript
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {semesterMarks.map((sem) => (
                <div key={sem.semester} className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold">{sem.semester}</h3>
                      <p className="text-sm text-muted-foreground">Credits: {sem.credits}</p>
                    </div>
                    <Badge
                      variant={sem.status === "completed" ? "default" : "secondary"}
                      className={
                        sem.status === "completed" ? "bg-success hover:bg-success/90" : ""
                      }
                    >
                      {sem.status}
                    </Badge>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-lg border p-3">
                      <p className="text-sm text-muted-foreground">SGPA</p>
                      <p className="text-2xl font-bold">{sem.sgpa}</p>
                    </div>
                    <div className="rounded-lg border p-3">
                      <p className="text-sm text-muted-foreground">CGPA</p>
                      <p className="text-2xl font-bold">{sem.cgpa}</p>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle>Current Semester - Subject Grades</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Code</TableHead>
                    <TableHead>Subject</TableHead>
                    <TableHead className="text-center">Credits</TableHead>
                    <TableHead className="text-center">Grade</TableHead>
                    <TableHead className="text-center">Points</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {subjectGrades.map((subject) => (
                    <TableRow key={subject.code}>
                      <TableCell className="font-mono">{subject.code}</TableCell>
                      <TableCell className="font-medium">{subject.name}</TableCell>
                      <TableCell className="text-center">{subject.credits}</TableCell>
                      <TableCell className="text-center">
                        <Badge className={getGradeColor(subject.grade)}>{subject.grade}</Badge>
                      </TableCell>
                      <TableCell className="text-center">{subject.points}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Progress */}
        <TabsContent value="progress" className="space-y-4">
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle>Academic Progress</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">Overall Progress</span>
                  <span className="font-bold">75%</span>
                </div>
                <Progress value={75} className="h-3" />
                <p className="text-xs text-muted-foreground">3 out of 4 years completed</p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">Credit Completion</span>
                  <span className="font-bold">72/96 credits</span>
                </div>
                <Progress value={(72 / 96) * 100} className="h-3" />
              </div>

              <div className="space-y-4 pt-4">
                <h4 className="font-semibold">CGPA Trend</h4>
                {semesterMarks.map((sem, idx) => (
                  <div key={idx} className="flex items-center gap-4">
                    <span className="w-24 text-sm text-muted-foreground">{sem.semester}</span>
                    <div className="flex-1">
                      <Progress value={sem.cgpa * 10} className="h-2" />
                    </div>
                    <span className="w-12 text-right text-sm font-bold">{sem.cgpa}</span>
                  </div>
                ))}
              </div>

              <div className="rounded-lg border border-success/50 bg-success/5 p-4">
                <h4 className="mb-2 font-semibold text-success">Performance Summary</h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• Consistent performance with CGPA above 8.9</li>
                  <li>• Strong in technical subjects</li>
                  <li>• On track to graduate with distinction</li>
                  <li>• Class rank improved from 5th to 3rd</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
