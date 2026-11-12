"use client";

import { Meeting } from "@/types/meeting";

type MeetingDetailProps = {
  meeting: Meeting;
};

export default function MeetingDetail({ meeting }: MeetingDetailProps) {
  return (
    <article className="space-y-8 rounded-xl border bg-white p-6 shadow-sm">
      <header>
        <p className="font-semibold uppercase text-blue-700">
          {meeting.type} meeting
        </p>
        <h1 className="mt-2 text-3xl font-bold text-gray-900">
          Sacrament Meeting Program
        </h1>
        <p className="mt-2 text-gray-600">
          {new Date(`${meeting.date}T00:00:00`).toLocaleDateString("en-US", {
            dateStyle: "full",
          })}
        </p>
      </header>

      <section>
        <h2 className="text-xl font-bold">Meeting Leadership</h2>
        <p>Presiding: {meeting.presiding}</p>
        <p>Conducting: {meeting.conducting}</p>
      </section>

      <section>
        <h2 className="text-xl font-bold">Opening</h2>
        <p>Opening hymn: {meeting.openingHymn}</p>
        <p>Opening prayer: {meeting.openingPrayer}</p>
      </section>

      <section>
        <h2 className="text-xl font-bold">Announcements</h2>
        {meeting.announcements.length > 0 ? (
          <ul className="list-disc pl-6">
            {meeting.announcements.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        ) : <p>No announcements.</p>}
      </section>

      <section>
        <h2 className="text-xl font-bold">Ward and Stake Business</h2>
        {meeting.wardBusiness.length > 0 ? (
          <ul className="list-disc pl-6">
            {meeting.wardBusiness.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        ) : <p>No ward business.</p>}
        <p>Stake business: {meeting.stakeBusiness ? "Yes" : "No"}</p>
      </section>

      <section>
        <h2 className="text-xl font-bold">Sacrament</h2>
        <p>Sacrament hymn: {meeting.sacramentHymn}</p>
      </section>

      <section>
        <h2 className="text-xl font-bold">Speakers</h2>
        {meeting.speakers.length > 0 ? (
          <ul className="list-disc pl-6">
            {meeting.speakers.map((speaker, index) => (
              <li key={index}>
                {speaker.name}{speaker.topic ? ` â€” ${speaker.topic}` : ""}
              </li>
            ))}
          </ul>
        ) : <p>No speakers listed.</p>}
      </section>

      <section>
        <h2 className="text-xl font-bold">Musical Numbers</h2>
        {meeting.musicalNumbers.length > 0 ? (
          <ul className="list-disc pl-6">
            {meeting.musicalNumbers.map((number, index) => (
              <li key={index}>
                {number.title} â€” {number.performer}
              </li>
            ))}
          </ul>
        ) : <p>No musical numbers.</p>}
      </section>

      <section>
        <h2 className="text-xl font-bold">Closing</h2>
        <p>Closing hymn: {meeting.closingHymn}</p>
        <p>Closing prayer: {meeting.closingPrayer}</p>
      </section>

      <button
        type="button"
        onClick={() => window.print()}
        className="rounded-lg bg-blue-800 px-5 py-3 font-semibold text-white hover:bg-blue-900 print:hidden"
      >
        Print Meeting Program
      </button>
    </article>
  );
}


