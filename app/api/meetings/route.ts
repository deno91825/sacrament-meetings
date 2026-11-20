import { NextResponse } from "next/server";
import {
  getAllMeetings,
  getMeetingsByDate,
} from "@/lib/meetings-db";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const date = searchParams.get("date");

  try {
    const meetings = date
      ? await getMeetingsByDate(date)
      : await getAllMeetings();

    return NextResponse.json(meetings);
  } catch (error) {
    console.error("Failed to fetch meetings:", error);

    return NextResponse.json(
      { error: "Unable to load meetings." },
      { status: 500 }
    );
  }
}
