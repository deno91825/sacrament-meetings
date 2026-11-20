import { connection } from "next/server";
import { redirect } from "next/navigation";
import { getApiBaseUrl } from "@/lib/api-url";
import { Meeting } from "@/types/meeting";

export default async function CurrentMeetingPage() {
  await connection();

  const baseUrl = await getApiBaseUrl();
  const response = await fetch(`${baseUrl}/api/meetings`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Unable to load meetings.");
  }

  const meetings: Meeting[] = await response.json();
  const today = new Date().toISOString().split("T")[0];
  const currentMeeting = meetings.find((meeting) => meeting.date >= today);

  if (!currentMeeting) {
    redirect("/meetings");
  }

  redirect(`/meetings/${currentMeeting.id}`);
}
