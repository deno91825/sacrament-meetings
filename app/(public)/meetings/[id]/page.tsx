export const instant = false;

import { notFound } from "next/navigation";
import { getApiBaseUrl } from "@/lib/api-url";
import MeetingDetail from "@/components/MeetingDetail";
import { Meeting } from "@/types/meeting";

type MeetingPageProps = {
  params: Promise<{ id: string }>;
};

export default async function MeetingPage({ params }: MeetingPageProps) {
  const { id } = await params;
  const meetingId = Number(id);

  if (!Number.isInteger(meetingId) || meetingId <= 0) {
    notFound();
  }

  const baseUrl = await getApiBaseUrl();
  const response = await fetch(`${baseUrl}/api/meetings/${meetingId}`, {
    cache: "no-store",
  });

  if (response.status === 404 || response.status === 400) {
    notFound();
  }

  if (!response.ok) {
    throw new Error("Unable to load this meeting.");
  }

  const meeting: Meeting = await response.json();

  return <MeetingDetail meeting={meeting} />;
}

