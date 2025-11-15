import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Users,
  Plus,
  Send,
  Search,
  MessageCircle,
  Settings,
  Paperclip,
} from "lucide-react";
import { toast } from "sonner";

export default function Groups() {
  const [selectedGroup, setSelectedGroup] = useState<number | null>(1);
  const [message, setMessage] = useState("");
  const [createDialog, setCreateDialog] = useState(false);

  const groups = [
    {
      id: 1,
      name: "CS Department - 4th Year",
      description: "Main group for all CS 4th year students",
      members: 45,
      unread: 3,
      lastMessage: "Don't forget about the project submission tomorrow!",
      lastMessageTime: "10:30 AM",
    },
    {
      id: 2,
      name: "Tech Club",
      description: "Discussions about latest tech trends",
      members: 120,
      unread: 0,
      lastMessage: "Check out this amazing AI tool!",
      lastMessageTime: "Yesterday",
    },
    {
      id: 3,
      name: "Hackathon Team",
      description: "Team for upcoming hackathon",
      members: 4,
      unread: 8,
      lastMessage: "We need to finalize the tech stack",
      lastMessageTime: "2:15 PM",
    },
    {
      id: 4,
      name: "Study Group - DS",
      description: "Data Structures study group",
      members: 8,
      unread: 0,
      lastMessage: "Anyone free for doubt session?",
      lastMessageTime: "Jan 10",
    },
  ];

  const chatMessages = [
    {
      id: 1,
      sender: "Alice Johnson",
      message: "Hey everyone! Did anyone complete the assignment?",
      time: "9:30 AM",
      isOwn: false,
    },
    {
      id: 2,
      sender: "You",
      message: "Yes, I just submitted it. It was quite challenging!",
      time: "9:32 AM",
      isOwn: true,
    },
    {
      id: 3,
      sender: "Bob Smith",
      message: "Can someone share the resources for the next topic?",
      time: "9:45 AM",
      isOwn: false,
    },
    {
      id: 4,
      sender: "Carol Davis",
      message: "I'll upload them to the drive shortly",
      time: "10:15 AM",
      isOwn: false,
    },
    {
      id: 5,
      sender: "You",
      message: "Thanks Carol! That would be really helpful.",
      time: "10:16 AM",
      isOwn: true,
    },
  ];

  const handleSendMessage = () => {
    if (!message.trim()) return;
    toast.success("Message sent!");
    setMessage("");
  };

  const handleCreateGroup = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Group created successfully!");
    setCreateDialog(false);
  };

  const selectedGroupData = groups.find((g) => g.id === selectedGroup);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Groups & Chat</h1>
          <p className="text-muted-foreground">Connect with classmates and join interest-based groups</p>
        </div>
        <Dialog open={createDialog} onOpenChange={setCreateDialog}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Create Group
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Group</DialogTitle>
              <DialogDescription>Create a group to connect with your classmates</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleCreateGroup} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="groupName">Group Name *</Label>
                <Input id="groupName" placeholder="e.g., Study Group" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="groupDesc">Description</Label>
                <Textarea
                  id="groupDesc"
                  placeholder="Brief description of the group..."
                  className="resize-none"
                  rows={3}
                />
              </div>
              <Button type="submit" className="w-full">
                Create Group
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Groups List */}
        <Card className="shadow-sm lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              My Groups
            </CardTitle>
            <div className="relative mt-2">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search groups..." className="pl-10" />
            </div>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[500px]">
              <div className="space-y-2">
                {groups.map((group) => (
                  <button
                    key={group.id}
                    onClick={() => setSelectedGroup(group.id)}
                    className={`w-full rounded-lg border p-3 text-left transition-colors ${
                      selectedGroup === group.id
                        ? "border-primary bg-primary/5"
                        : "hover:bg-muted/50"
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1 space-y-1">
                        <h4 className="font-semibold">{group.name}</h4>
                        <p className="line-clamp-1 text-sm text-muted-foreground">
                          {group.lastMessage}
                        </p>
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        <span className="text-xs text-muted-foreground">{group.lastMessageTime}</span>
                        {group.unread > 0 && (
                          <Badge className="h-5 w-5 rounded-full p-0 text-xs">
                            {group.unread}
                          </Badge>
                        )}
                      </div>
                    </div>
                    <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
                      <Users className="h-3 w-3" />
                      <span>{group.members} members</span>
                    </div>
                  </button>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Chat Area */}
        <Card className="shadow-sm lg:col-span-2">
          <CardHeader className="border-b">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    {selectedGroupData?.name.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold">{selectedGroupData?.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {selectedGroupData?.members} members
                  </p>
                </div>
              </div>
              <Button size="icon" variant="ghost">
                <Settings className="h-5 w-5" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-[400px] p-4">
              <div className="space-y-4">
                {chatMessages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.isOwn ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[70%] space-y-1 ${
                        msg.isOwn ? "items-end" : "items-start"
                      }`}
                    >
                      {!msg.isOwn && (
                        <p className="text-xs font-medium text-muted-foreground">{msg.sender}</p>
                      )}
                      <div
                        className={`rounded-lg px-4 py-2 ${
                          msg.isOwn
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted text-foreground"
                        }`}
                      >
                        <p className="text-sm">{msg.message}</p>
                      </div>
                      <p className="text-xs text-muted-foreground">{msg.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            <div className="border-t p-4">
              <div className="flex items-center gap-2">
                <Button size="icon" variant="ghost">
                  <Paperclip className="h-5 w-5" />
                </Button>
                <Input
                  placeholder="Type a message..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  className="flex-1"
                />
                <Button onClick={handleSendMessage} size="icon">
                  <Send className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Group Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Groups
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline gap-2">
              <MessageCircle className="h-5 w-5 text-primary" />
              <span className="text-3xl font-bold">{groups.length}</span>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Unread Messages
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline gap-2">
              <Badge className="h-6 w-6 rounded-full p-0 text-sm">
                {groups.reduce((acc, g) => acc + g.unread, 0)}
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Members
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline gap-2">
              <Users className="h-5 w-5 text-accent" />
              <span className="text-3xl font-bold">
                {groups.reduce((acc, g) => acc + g.members, 0)}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
