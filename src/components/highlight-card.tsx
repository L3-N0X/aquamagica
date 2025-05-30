import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface HighlightCardProps {
  title: string;
  description: string;
  content: string;
  image: string;
  imageAlt: string;
}

export function HighlightCard({
  title,
  description,
  content,
  image,
  imageAlt,
}: HighlightCardProps) {
  return (
    <Card className="pt-0">
      <div className="h-48 overflow-hidden rounded-t-xl">
        <img src={image} alt={imageAlt} className="w-full h-full object-cover" />
      </div>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>{content}</p>
      </CardContent>
    </Card>
  );
}
