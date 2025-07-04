import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface EventCardProps {
  title: string;
  description: string;
  content: string;
  image: string;
  imageAlt: string;
}

export function EventCard({ title, description, content, image, imageAlt }: EventCardProps) {
  return (
    <Card className="flex flex-col md:flex-row overflow-hidden p-0">
      <div className="md:w-1/3">
        <img src={image} alt={imageAlt} className="h-full w-full object-cover" />
      </div>
      <div className="md:w-2/3 flex flex-col">
        <CardHeader className="pt-4">
          <CardTitle className="text-2xl font-bold tracking-tight">{title}</CardTitle>
          <CardDescription className="mb-1">{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <p>{content}</p>
        </CardContent>
      </div>
    </Card>
  );
}
