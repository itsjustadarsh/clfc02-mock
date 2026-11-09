import type { ServiceInfo } from "@/lib/types";

interface ServiceCardProps {
  service: ServiceInfo;
}

export function ServiceCard({ service }: ServiceCardProps) {
  return (
    <div className="rounded-lg border bg-muted/30 p-3">
      <h4 className="text-sm font-semibold">{service.name}</h4>
      <p className="mt-0.5 text-xs text-muted-foreground">{service.description}</p>
      <p className="mt-1.5 text-xs font-medium text-primary">{service.keyFact}</p>
    </div>
  );
}
