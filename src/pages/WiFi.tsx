import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Wifi, CheckCircle2, Clock, Plus, Download } from "lucide-react";
import { toast } from "sonner";

export default function WiFi() {
  const [requestDialog, setRequestDialog] = useState(false);

  const wifiRequests = [
    {
      id: 1,
      deviceName: "John's Laptop",
      macAddress: "00:1B:44:11:3A:B7",
      status: "approved",
      requestDate: "2024-01-05",
      approvedDate: "2024-01-06",
      expiryDate: "2024-07-06",
    },
    {
      id: 2,
      deviceName: "John's Phone",
      macAddress: "A4:D1:8C:12:4E:F2",
      status: "pending",
      requestDate: "2024-01-12",
    },
  ];

  const handleRequestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Wi-Fi access request submitted!");
    setRequestDialog(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Wi-Fi Access Request</h1>
          <p className="text-muted-foreground">Request and manage campus Wi-Fi access</p>
        </div>
        <Dialog open={requestDialog} onOpenChange={setRequestDialog}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Request
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Request Wi-Fi Access</DialogTitle>
              <DialogDescription>
                Fill in your device details to request Wi-Fi access
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleRequestSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="deviceName">Device Name *</Label>
                <Input
                  id="deviceName"
                  placeholder="e.g., John's Laptop"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="macAddress">MAC Address *</Label>
                <Input
                  id="macAddress"
                  placeholder="e.g., 00:1B:44:11:3A:B7"
                  required
                />
                <p className="text-xs text-muted-foreground">
                  Find your MAC address in device network settings
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="deviceType">Device Type *</Label>
                <Input
                  id="deviceType"
                  placeholder="e.g., Laptop, Smartphone, Tablet"
                  required
                />
              </div>

              <div className="rounded-lg border border-accent/50 bg-accent/5 p-4">
                <h4 className="mb-2 font-semibold">Important Notes:</h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• Maximum 2 devices per student</li>
                  <li>• Access valid for 6 months</li>
                  <li>• Approval takes 1-2 working days</li>
                  <li>• Ensure MAC address is accurate</li>
                </ul>
              </div>

              <Button type="submit" className="w-full">
                Submit Request
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Active Devices
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline gap-2">
              <Wifi className="h-5 w-5 text-success" />
              <span className="text-3xl font-bold">1</span>
              <span className="text-sm text-muted-foreground">/ 2 allowed</span>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Pending Requests
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline gap-2">
              <Clock className="h-5 w-5 text-warning" />
              <span className="text-3xl font-bold">1</span>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Network Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-success animate-pulse"></div>
              <span className="text-lg font-bold text-success">Online</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Requests List */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">My Requests</h2>
        {wifiRequests.map((request) => (
          <Card key={request.id} className="shadow-sm">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <CardTitle className="text-lg">{request.deviceName}</CardTitle>
                  <p className="font-mono text-sm text-muted-foreground">{request.macAddress}</p>
                </div>
                <Badge
                  variant="outline"
                  className={
                    request.status === "approved"
                      ? "border-success text-success"
                      : "border-warning text-warning"
                  }
                >
                  {request.status === "approved" ? (
                    <CheckCircle2 className="mr-1 h-3 w-3" />
                  ) : (
                    <Clock className="mr-1 h-3 w-3" />
                  )}
                  {request.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <p className="text-sm text-muted-foreground">Request Date</p>
                  <p className="font-medium">{request.requestDate}</p>
                </div>
                {request.approvedDate && (
                  <div>
                    <p className="text-sm text-muted-foreground">Approved Date</p>
                    <p className="font-medium">{request.approvedDate}</p>
                  </div>
                )}
                {request.expiryDate && (
                  <div>
                    <p className="text-sm text-muted-foreground">Valid Until</p>
                    <p className="font-medium">{request.expiryDate}</p>
                  </div>
                )}
              </div>

              {request.status === "approved" && (
                <Button size="sm" variant="outline">
                  <Download className="mr-2 h-4 w-4" />
                  Download Certificate
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Wi-Fi Info */}
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle>Campus Wi-Fi Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-lg border p-4">
              <h4 className="mb-2 font-semibold">Network Details</h4>
              <div className="space-y-1 text-sm">
                <p><span className="text-muted-foreground">SSID:</span> <span className="font-mono">CampusHub-WiFi</span></p>
                <p><span className="text-muted-foreground">Type:</span> WPA2-Enterprise</p>
                <p><span className="text-muted-foreground">Coverage:</span> All campus buildings</p>
              </div>
            </div>

            <div className="rounded-lg border p-4">
              <h4 className="mb-2 font-semibold">Support</h4>
              <div className="space-y-1 text-sm">
                <p><span className="text-muted-foreground">Help Desk:</span> +91 123-456-7890</p>
                <p><span className="text-muted-foreground">Email:</span> support@campushub.edu</p>
                <p><span className="text-muted-foreground">Hours:</span> 9 AM - 6 PM (Mon-Sat)</p>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-primary/50 bg-primary/5 p-4">
            <h4 className="mb-2 font-semibold">Connection Guidelines</h4>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>• Use your student credentials to connect</li>
              <li>• Keep your device antivirus updated</li>
              <li>• Report any connectivity issues immediately</li>
              <li>• Do not share your credentials with others</li>
              <li>• Avoid downloading large files during peak hours</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
