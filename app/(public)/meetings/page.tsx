import { getMeetings, getMeetingsTotalPages } from "@/lib/meetings-db";
import MeetingCard from "@/components/MeetingCard";
import MeetingSearch from "@/components/MeetingSearch";
import Pagination from "@/components/Pagination";

type MeetingsPageProps = {
  searchParams: Promise<{
    query?: string;
    page?: string;
  }>;
};

export default async function MeetingsPage({
  searchParams,
}: MeetingsPageProps) {
  const params = await searchParams;
  const query = params.query || "";
  const currentPage = Math.max(1, Number(params.page) || 1);

  const [meetings, totalPages] = await Promise.all([
    getMeetings(query, currentPage),
    getMeetingsTotalPages(query),
  ]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">All Meetings</h1>
        <p className="mt-2 text-gray-600">
          Browse current and past sacrament meeting programs.
        </p>
      </div>

      <MeetingSearch placeholder="Search meetings..." />

      {meetings.length > 0 ? (
        <div className="grid gap-5 md:grid-cols-2">
          {meetings.map((meeting) => (
            <MeetingCard key={meeting.id} meeting={meeting} />
          ))}
        </div>
      ) : (
        <p className="py-8 text-center text-gray-600">
          No meetings found.
        </p>
      )}

      <Pagination totalPages={totalPages} />
    </div>
  );
}
