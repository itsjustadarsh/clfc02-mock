import { Suspense } from "react";
import { StudyDomainClient } from "./client";

export function generateStaticParams() {
  return [{ domain: "1" }, { domain: "2" }, { domain: "3" }, { domain: "4" }];
}

export default async function StudyDomainPage({
  params,
}: {
  params: Promise<{ domain: string }>;
}) {
  const { domain } = await params;
  return (
    <Suspense>
      <StudyDomainClient domainId={Number(domain)} />
    </Suspense>
  );
}
