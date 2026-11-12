export const instant = false;

import { getApiBaseUrl } from "@/lib/api-url";
import MeetingCard from "@/components/MeetingCard";
import { Meeting } from "@/types/meeting";

export default async function MeetingsPage() {
  const baseUrl = await getApiBaseUrl();
  const response = await fetch(`${baseUrl}/api/meetings`, {
    cache: "no-store",
  });

  if (!response.ok) throw new Error("Unable to load meetings.");

  const meetings: Meeting[] = await response.json();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">All Meetings</h1>
        <p className="mt-2 text-gray-600">
          Browse current and past sacrament meeting programs.
        </p>
      </div>
      <div className="grid gap-5 md:grid-cols-2">
        {meetings.map((meeting) => (
          <MeetingCard key={meeting.id} meeting={meeting} />
        ))}
      </div>
    </div>
  );
}

