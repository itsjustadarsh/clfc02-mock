import { Suspense } from "react";
import { DomainPracticeClient } from "./client";

export function generateStaticParams() {
  return [{ domain: "1" }, { domain: "2" }, { domain: "3" }, { domain: "4" }];
}

export default async function DomainPracticePage({
  params,
}: {
  params: Promise<{ domain: string }>;
}) {
  const { domain } = await params;
  return (
    <Suspense>
      <DomainPracticeClient domainId={Number(domain)} />
    </Suspense>
  );
}
