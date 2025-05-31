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
    <Card className="pt-0 pb-4">
      <div className="h-48 overflow-hidden rounded-t-xl">
        <img src={image} alt={imageAlt} className="w-full h-full object-cover" />
      </div>
      <CardHeader>
        <CardTitle className="text-2xl font-bold tracking-tight mt-4">{title}</CardTitle>
        <CardDescription className="mb-1">{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>{content}</p>
      </CardContent>
    </Card>
  );
}
