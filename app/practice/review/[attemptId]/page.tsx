import { ReviewClient } from "./client";

export default async function ReviewPage({
  params,
}: {
  params: Promise<{ attemptId: string }>;
}) {
  const { attemptId } = await params;
  return <ReviewClient attemptId={attemptId} />;
}
