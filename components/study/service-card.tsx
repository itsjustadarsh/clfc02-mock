import type { ServiceInfo } from "@/lib/types";

interface ServiceCardProps {
  service: ServiceInfo;
}

export function ServiceCard({ service }: ServiceCardProps) {
  return (
    <div className="rounded-lg border border-l-2 border-l-primary/30 bg-muted/30 p-2.5">
      <h4 className="text-xs font-semibold">{service.name}</h4>
      <p className="mt-0.5 text-[11px] text-muted-foreground">{service.description}</p>
      <p className="mt-1 text-[11px] font-medium text-primary">{service.keyFact}</p>
    </div>
  );
}
