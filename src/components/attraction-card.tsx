import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface AttractionCardProps {
  title: string;
  subtitle?: string;
  description: string;
  adrenalinLevel: string;
  specialFeatures: string[];
  imageUrl: string;
  imageAlt: string;
  speed?: string;
  category: "action" | "family" | "relaxation";
}

const categoryColors = {
  action: "border-red-200 bg-red-50 dark:bg-red-950/20",
  family: "border-blue-200 bg-blue-50 dark:bg-blue-950/20",
  relaxation: "border-green-200 bg-green-50 dark:bg-green-950/20",
};

const categoryLabels = {
  action: "Action & Nervenkitzel",
  family: "Familie & Kinder",
  relaxation: "Entspannung & Wellness",
};

export function AttractionCard({
  title,
  subtitle,
  description,
  adrenalinLevel,
  specialFeatures,
  imageUrl,
  imageAlt,
  speed,
  category,
}: AttractionCardProps) {
  return (
    <Card className={`overflow-hidden ${categoryColors[category]} border-2`}>
      <div className="grid md:grid-cols-2 gap-0">
        <div className="relative h-64 md:h-full">
          <img
            src={imageUrl}
            alt={imageAlt}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1 bg-black/70 text-white text-sm rounded-full">
              {categoryLabels[category]}
            </span>
          </div>
        </div>

        <div className="p-6">
          <CardHeader className="p-0 pb-4">
            <CardTitle className="text-2xl font-bold text-foreground">{title}</CardTitle>
            {subtitle && (
              <CardDescription className="text-lg font-medium text-muted-foreground">
                {subtitle}
              </CardDescription>
            )}
          </CardHeader>

          <CardContent className="p-0 space-y-4">
            <p className="text-foreground leading-relaxed">{description}</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold text-foreground mb-1">Adrenalin-Faktor:</h4>
                <p className="text-muted-foreground">{adrenalinLevel}</p>
              </div>

              {speed && (
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Geschwindigkeit:</h4>
                  <p className="text-muted-foreground">{speed}</p>
                </div>
              )}
            </div>

            <div>
              <h4 className="font-semibold text-foreground mb-2">Besonderheiten:</h4>
              <ul className="space-y-1">
                {specialFeatures.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2 text-muted-foreground">
                    <span className="text-primary mt-1">✨</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </div>
      </div>
    </Card>
  );
}
