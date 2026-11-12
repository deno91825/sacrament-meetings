import { NextResponse } from "next/server";
import { getAllMeetings, getMeetingsByDate } from "@/lib/meetings";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const date = searchParams.get("date");

  const meetings = date
    ? getMeetingsByDate(date)
    : getAllMeetings();

  return NextResponse.json(meetings);
}
