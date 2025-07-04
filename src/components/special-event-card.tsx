import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface SpecialEventCardProps {
  title: string;
  schedule: string;
  description: string;
  imageUrl: string;
  imageAlt: string;
}

export function SpecialEventCard({
  title,
  schedule,
  description,
  imageUrl,
  imageAlt,
}: SpecialEventCardProps) {
  return (
    <Card className="overflow-hidden border-purple-300 bg-purple-50 dark:bg-purple-950/20 border-2 pt-0 pb-4">
      <div className="relative h-48">
        <img src={imageUrl} alt={imageAlt} className="w-full h-full object-cover" />
      </div>

      <CardHeader>
        <CardTitle className="text-2xl font-bold text-foreground mt-4">{title}</CardTitle>
        <CardDescription className="text-lg font-medium text-purple-600 dark:text-purple-400 mb-1">
          {schedule}
        </CardDescription>
      </CardHeader>

      <CardContent>
        <p className="text-foreground leading-relaxed">{description}</p>
      </CardContent>
    </Card>
  );
}
