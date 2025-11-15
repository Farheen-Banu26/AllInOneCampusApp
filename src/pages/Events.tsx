import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Users, Heart, MessageCircle, Share2 } from "lucide-react";
import { toast } from "sonner";

export default function Events() {
  const events = [
    {
      id: 1,
      title: "Tech Fest 2024",
      description:
        "Annual technical festival featuring coding competitions, hackathons, and tech talks from industry experts.",
      date: "January 25-27, 2024",
      location: "Main Campus Auditorium",
      category: "Festival",
      image: "/placeholder.svg",
      attendees: 450,
      likes: 128,
      comments: 34,
    },
    {
      id: 2,
      title: "Guest Lecture: AI & Machine Learning",
      description:
        "Join us for an insightful session on the latest trends in AI and ML by Dr. Sarah Johnson from MIT.",
      date: "January 22, 2024",
      location: "Conference Hall A",
      category: "Workshop",
      image: "/placeholder.svg",
      attendees: 150,
      likes: 89,
      comments: 12,
    },
    {
      id: 3,
      title: "Sports Day Championship",
      description:
        "Inter-department sports competition including cricket, football, volleyball, and athletics.",
      date: "February 5, 2024",
      location: "Sports Complex",
      category: "Sports",
      image: "/placeholder.svg",
      attendees: 320,
      likes: 156,
      comments: 45,
    },
    {
      id: 4,
      title: "Cultural Night",
      description:
        "Celebrate diversity with performances from various cultural groups, including music, dance, and drama.",
      date: "January 30, 2024",
      location: "Open Air Theatre",
      category: "Cultural",
      image: "/placeholder.svg",
      attendees: 280,
      likes: 203,
      comments: 67,
    },
  ];

  const announcements = [
    {
      title: "Semester Examination Schedule Released",
      date: "January 10, 2024",
      type: "Academic",
    },
    {
      title: "New Library Timing: 8 AM - 10 PM",
      date: "January 8, 2024",
      type: "Facility",
    },
    {
      title: "Scholarship Applications Open",
      date: "January 5, 2024",
      type: "Financial",
    },
  ];

  const handleLike = () => {
    toast.success("Event liked!");
  };

  const handleShare = () => {
    toast.success("Event link copied to clipboard!");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Events & Announcements</h1>
        <p className="text-muted-foreground">
          Stay updated with campus events and important announcements
        </p>
      </div>

      {/* Announcements */}
      <Card className="border-l-4 border-l-accent shadow-sm">
        <CardHeader>
          <CardTitle>Important Announcements</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {announcements.map((announcement, idx) => (
            <div
              key={idx}
              className="flex items-start justify-between rounded-lg border p-3 transition-colors hover:bg-muted/50"
            >
              <div>
                <p className="font-medium">{announcement.title}</p>
                <p className="text-sm text-muted-foreground">{announcement.date}</p>
              </div>
              <Badge variant="secondary">{announcement.type}</Badge>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Events Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        {events.map((event) => (
          <Card key={event.id} className="overflow-hidden shadow-sm transition-shadow hover:shadow-md">
            <div className="aspect-video bg-muted">
              <img
                src={event.image}
                alt={event.title}
                className="h-full w-full object-cover"
              />
            </div>
            <CardHeader>
              <div className="space-y-2">
                <div className="flex items-start justify-between">
                  <Badge variant="secondary">{event.category}</Badge>
                </div>
                <CardTitle className="text-xl">{event.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">{event.description}</p>

              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>{event.date}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>{event.location}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Users className="h-4 w-4" />
                  <span>{event.attendees} attending</span>
                </div>
              </div>

              <div className="flex items-center justify-between border-t pt-4">
                <div className="flex gap-4">
                  <button
                    onClick={handleLike}
                    className="flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-accent"
                  >
                    <Heart className="h-4 w-4" />
                    <span>{event.likes}</span>
                  </button>
                  <button className="flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-primary">
                    <MessageCircle className="h-4 w-4" />
                    <span>{event.comments}</span>
                  </button>
                  <button
                    onClick={handleShare}
                    className="flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    <Share2 className="h-4 w-4" />
                  </button>
                </div>
                <Button size="sm">Register</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
