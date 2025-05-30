import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface SpecialEventCardProps {
  title: string;
  schedule: string;
  description: string;
  imageUrl: string;
  imageAlt: string;
  icon: string;
}

export function SpecialEventCard({
  title,
  schedule,
  description,
  imageUrl,
  imageAlt,
  icon,
}: SpecialEventCardProps) {
  return (
    <Card className="overflow-hidden border-purple-500 bg-purple-50 dark:bg-purple-950/20 border-2">
      <div className="relative h-48">
        <img src={imageUrl} alt={imageAlt} className="w-full h-full object-cover" />
        <div className="absolute top-4 left-4">
          <span className="text-2xl">{icon}</span>
        </div>
      </div>

      <CardHeader>
        <CardTitle className="text-xl font-bold text-foreground">{title}</CardTitle>
        <CardDescription className="text-lg font-medium text-purple-600 dark:text-purple-400">
          {schedule}
        </CardDescription>
      </CardHeader>

      <CardContent>
        <p className="text-foreground leading-relaxed">{description}</p>
      </CardContent>
    </Card>
  );
}
