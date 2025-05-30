import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface GastronomyCardProps {
  title: string;
  content: string;
  image: string;
  imageAlt: string;
}

export function GastronomyCard({ title, content, image, imageAlt }: GastronomyCardProps) {
  return (
    <Card className="pt-0">
      <div className="h-48 overflow-hidden rounded-t-xl">
        <img src={image} alt={imageAlt} className="w-full h-full object-cover" />
      </div>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>{content}</p>
      </CardContent>
    </Card>
  );
}
