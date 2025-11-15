import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Search,
  UserPlus,
  Users,
  GraduationCap,
  Briefcase,
  MapPin,
  Mail,
} from "lucide-react";
import { toast } from "sonner";

export default function Connect() {
  const [searchQuery, setSearchQuery] = useState("");

  const students = [
    {
      id: 1,
      name: "Alice Johnson",
      role: "Student",
      department: "Computer Science",
      year: "3rd Year",
      interests: ["Web Development", "AI/ML", "Cloud Computing"],
      location: "Chennai",
      connected: false,
    },
    {
      id: 2,
      name: "Bob Smith",
      role: "Student",
      department: "Information Technology",
      year: "4th Year",
      interests: ["Mobile Development", "Blockchain", "Cybersecurity"],
      location: "Bangalore",
      connected: true,
    },
    {
      id: 3,
      name: "Carol Davis",
      role: "Student",
      department: "Computer Science",
      year: "2nd Year",
      interests: ["Data Science", "Machine Learning", "Python"],
      location: "Chennai",
      connected: false,
    },
  ];

  const teachers = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      role: "Professor",
      department: "Computer Science",
      specialization: "Artificial Intelligence",
      experience: "15 years",
      location: "Chennai",
      connected: true,
    },
    {
      id: 2,
      name: "Dr. Michael Chen",
      role: "Associate Professor",
      department: "Information Technology",
      specialization: "Database Systems",
      experience: "10 years",
      location: "Chennai",
      connected: false,
    },
  ];

  const alumni = [
    {
      id: 1,
      name: "Emily Watson",
      role: "Alumni",
      department: "Computer Science",
      batch: "2018-2022",
      currentRole: "Software Engineer at Google",
      location: "San Francisco",
      connected: false,
    },
    {
      id: 2,
      name: "David Brown",
      role: "Alumni",
      department: "Information Technology",
      batch: "2016-2020",
      currentRole: "Tech Lead at Microsoft",
      location: "Seattle",
      connected: true,
    },
    {
      id: 3,
      name: "Sophia Martinez",
      role: "Alumni",
      department: "Computer Science",
      batch: "2017-2021",
      currentRole: "Data Scientist at Amazon",
      location: "Boston",
      connected: false,
    },
  ];

  const handleConnect = (name: string) => {
    toast.success(`Connection request sent to ${name}`);
  };

  const handleMessage = (name: string) => {
    toast.success(`Opening chat with ${name}`);
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Connect & Network</h1>
        <p className="text-muted-foreground">
          Build your professional network with students, teachers, and alumni
        </p>
      </div>

      {/* Search Bar */}
      <Card className="shadow-sm">
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search by name, department, or interests..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="students" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="students">
            <GraduationCap className="mr-2 h-4 w-4" />
            Students
          </TabsTrigger>
          <TabsTrigger value="teachers">
            <Users className="mr-2 h-4 w-4" />
            Teachers
          </TabsTrigger>
          <TabsTrigger value="alumni">
            <Briefcase className="mr-2 h-4 w-4" />
            Alumni
          </TabsTrigger>
        </TabsList>

        {/* Students */}
        <TabsContent value="students" className="space-y-4">
          {students.map((student) => (
            <Card key={student.id} className="shadow-sm transition-shadow hover:shadow-md">
              <CardHeader>
                <div className="flex items-start gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src="/placeholder.svg" />
                    <AvatarFallback className="bg-primary text-primary-foreground text-lg">
                      {getInitials(student.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-2">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-lg font-semibold">{student.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {student.department} • {student.year}
                        </p>
                      </div>
                      <Badge variant="secondary">{student.role}</Badge>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      <span>{student.location}</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {student.interests.map((interest, idx) => (
                        <Badge key={idx} variant="outline">
                          {interest}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex gap-2 pt-2">
                      {student.connected ? (
                        <>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleMessage(student.name)}
                          >
                            <Mail className="mr-2 h-4 w-4" />
                            Message
                          </Button>
                          <Button size="sm" variant="secondary">
                            Connected
                          </Button>
                        </>
                      ) : (
                        <Button size="sm" onClick={() => handleConnect(student.name)}>
                          <UserPlus className="mr-2 h-4 w-4" />
                          Connect
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </CardHeader>
            </Card>
          ))}
        </TabsContent>

        {/* Teachers */}
        <TabsContent value="teachers" className="space-y-4">
          {teachers.map((teacher) => (
            <Card key={teacher.id} className="shadow-sm transition-shadow hover:shadow-md">
              <CardHeader>
                <div className="flex items-start gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src="/placeholder.svg" />
                    <AvatarFallback className="bg-accent text-accent-foreground text-lg">
                      {getInitials(teacher.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-2">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-lg font-semibold">{teacher.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {teacher.role} • {teacher.department}
                        </p>
                      </div>
                      <Badge variant="secondary">{teacher.role}</Badge>
                    </div>
                    <div className="space-y-1 text-sm">
                      <p className="text-muted-foreground">
                        <span className="font-medium">Specialization:</span> {teacher.specialization}
                      </p>
                      <p className="text-muted-foreground">
                        <span className="font-medium">Experience:</span> {teacher.experience}
                      </p>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      <span>{teacher.location}</span>
                    </div>
                    <div className="flex gap-2 pt-2">
                      {teacher.connected ? (
                        <>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleMessage(teacher.name)}
                          >
                            <Mail className="mr-2 h-4 w-4" />
                            Message
                          </Button>
                          <Button size="sm" variant="secondary">
                            Connected
                          </Button>
                        </>
                      ) : (
                        <Button size="sm" onClick={() => handleConnect(teacher.name)}>
                          <UserPlus className="mr-2 h-4 w-4" />
                          Connect
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </CardHeader>
            </Card>
          ))}
        </TabsContent>

        {/* Alumni */}
        <TabsContent value="alumni" className="space-y-4">
          {alumni.map((alum) => (
            <Card key={alum.id} className="shadow-sm transition-shadow hover:shadow-md">
              <CardHeader>
                <div className="flex items-start gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src="/placeholder.svg" />
                    <AvatarFallback className="bg-success text-success-foreground text-lg">
                      {getInitials(alum.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-2">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-lg font-semibold">{alum.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {alum.department} • Batch {alum.batch}
                        </p>
                      </div>
                      <Badge variant="secondary">{alum.role}</Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <Briefcase className="h-4 w-4 text-primary" />
                      <p className="text-sm font-medium">{alum.currentRole}</p>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      <span>{alum.location}</span>
                    </div>
                    <div className="flex gap-2 pt-2">
                      {alum.connected ? (
                        <>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleMessage(alum.name)}
                          >
                            <Mail className="mr-2 h-4 w-4" />
                            Message
                          </Button>
                          <Button size="sm" variant="secondary">
                            Connected
                          </Button>
                        </>
                      ) : (
                        <Button size="sm" onClick={() => handleConnect(alum.name)}>
                          <UserPlus className="mr-2 h-4 w-4" />
                          Connect
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </CardHeader>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}
