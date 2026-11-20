import Link from "next/link";
import { Meeting } from "@/types/meeting";

type MeetingCardProps = {
  meeting: Meeting;
};

export default function MeetingCard({ meeting }: MeetingCardProps) {
  return (
    <article className="rounded-xl border bg-white p-5 shadow-sm">
      <p className="text-sm font-medium uppercase text-blue-700">
        {meeting.type} meeting
      </p>
      <h2 className="mt-2 text-xl font-bold text-gray-900">
        {new Date(`${meeting.date}T00:00:00`).toLocaleDateString("en-US", {
          dateStyle: "long",
        })}
      </h2>
      <p className="mt-2 text-gray-600">
        Presiding: {meeting.presiding}
      </p>
      <p className="text-gray-600">
        Conducting: {meeting.conducting}
      </p>
      <Link
        href={`/meetings/${meeting.id}`}
        className="mt-4 inline-block font-semibold text-blue-700 hover:underline"
      >
        View meeting details ?
      </Link>
    </article>
  );
}
