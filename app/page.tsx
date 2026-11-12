export const instant = false;

import Image from "next/image";
import Link from "next/link";
import { getApiBaseUrl } from "@/lib/api-url";
import MeetingCard from "@/components/MeetingCard";
import { Meeting } from "@/types/meeting";

export default async function HomePage() {
  const baseUrl = await getApiBaseUrl();
  const response = await fetch(`${baseUrl}/api/meetings`, {
    cache: "no-store",
  });

  if (!response.ok) throw new Error("Unable to load meetings.");

  const meetings: Meeting[] = await response.json();

  return (
    <div className="space-y-10">
      <section className="grid items-center gap-8 overflow-hidden rounded-2xl bg-blue-900 p-8 text-white md:grid-cols-2">
        <div>
          <p className="font-semibold uppercase tracking-wider text-blue-200">
            Welcome
          </p>
          <h1 className="mt-3 text-4xl font-bold">
            Sacrament Meeting Planner
          </h1>
          <p className="mt-4 text-blue-100">
            Organize meeting programs, announcements, hymns, prayers, and speakers in one place.
          </p>
          <Link href="/meetings" className="mt-6 inline-block rounded-lg bg-white px-5 py-3 font-semibold text-blue-900">
            View All Meetings
          </Link>
        </div>
        <Image
          src="/meeting-illustration.svg"
          alt="Illustration of a chapel building"
          width={800}
          height={420}
          priority
          className="w-full rounded-xl"
        />
      </section>

      <section>
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-2xl font-bold">Recent Meeting Programs</h2>
          <Link href="/meetings" className="font-semibold text-blue-700">
            View all →
          </Link>
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          {meetings.slice(0, 2).map((meeting) => (
            <MeetingCard key={meeting.id} meeting={meeting} />
          ))}
        </div>
      </section>
    </div>
  );
}

