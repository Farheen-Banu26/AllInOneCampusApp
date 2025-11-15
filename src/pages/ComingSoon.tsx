import { Card, CardContent } from "@/components/ui/card";
import { Construction } from "lucide-react";

interface ComingSoonProps {
  title: string;
  description: string;
}

export default function ComingSoon({ title, description }: ComingSoonProps) {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <Card className="w-full max-w-md shadow-lg">
        <CardContent className="flex flex-col items-center space-y-4 p-8 text-center">
          <div className="rounded-full bg-primary/10 p-4">
            <Construction className="h-12 w-12 text-primary" />
          </div>
          <h2 className="text-2xl font-bold text-foreground">{title}</h2>
          <p className="text-muted-foreground">{description}</p>
          <p className="text-sm text-muted-foreground">
            This feature is currently under development and will be available soon.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
