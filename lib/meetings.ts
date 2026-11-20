import { Meeting } from "@/types/meeting";

export const meetings: Meeting[] = [
  {
    id: 1,
    date: "2026-11-15",
    type: "regular",
    presiding: "Bishop John Smith",
    conducting: "Brother David Brown",
    announcements: ["Youth activity on Saturday", "Ward temple trip next month"],
    openingHymn: "Come, Follow Me",
    openingPrayer: "Brother James",
    wardBusiness: ["Sustain new ward leaders"],
    stakeBusiness: false,
    sacramentHymn: "In Humility, Our Savior",
    speakers: [
      { name: "Sister Mary Johnson", topic: "Faith in Jesus Christ" },
      { name: "Brother Peter Wilson", topic: "Keeping Our Covenants" }
    ],
    musicalNumbers: [],
    closingHymn: "I Am a Child of God",
    closingPrayer: "Sister Sarah"
  },
  {
    id: 2,
    date: "2026-11-08",
    type: "regular",
    presiding: "Bishop John Smith",
    conducting: "Brother David Brown",
    announcements: ["Family history activity"],
    openingHymn: "Praise to the Lord",
    openingPrayer: "Brother Mark",
    wardBusiness: [],
    stakeBusiness: false,
    sacramentHymn: "How Great the Wisdom and the Love",
    speakers: [{ name: "Sister Jane", topic: "Prayer" }],
    musicalNumbers: [],
    closingHymn: "Nearer, My God, to Thee",
    closingPrayer: "Brother Paul"
  },
  {
    id: 3,
    date: "2026-11-01",
    type: "testimony",
    presiding: "Bishop John Smith",
    conducting: "Brother David Brown",
    announcements: ["Fast Sunday"],
    openingHymn: "I Need Thee Every Hour",
    openingPrayer: "Brother Thomas",
    wardBusiness: [],
    stakeBusiness: false,
    sacramentHymn: "Reverently and Meekly Now",
    speakers: [],
    musicalNumbers: [],
    closingHymn: "Abide with Me",
    closingPrayer: "Sister Ruth"
  },
  {
    id: 4,
    date: "2026-10-25",
    type: "stake",
    presiding: "Stake President Brown",
    conducting: "Brother Peter",
    announcements: ["Stake conference"],
    openingHymn: "The Spirit of God",
    openingPrayer: "Brother James",
    wardBusiness: [],
    stakeBusiness: true,
    sacramentHymn: "Jesus, Once of Humble Birth",
    speakers: [{ name: "President Brown", topic: "Discipleship" }],
    musicalNumbers: [{ title: "I Know That My Redeemer Lives", performer: "Ward Choir" }],
    closingHymn: "We Thank Thee, O God, for a Prophet",
    closingPrayer: "Sister Mary"
  },
  {
    id: 5,
    date: "2026-10-18",
    type: "general",
    presiding: "Bishop John Smith",
    conducting: "Brother David Brown",
    announcements: ["Ward service project"],
    openingHymn: "All Creatures of Our God and King",
    openingPrayer: "Brother John",
    wardBusiness: [],
    stakeBusiness: false,
    sacramentHymn: "God Loved Us, So He Sent His Son",
    speakers: [{ name: "Elder James", topic: "Following Christ" }],
    musicalNumbers: [],
    closingHymn: "Let Us All Press On",
    closingPrayer: "Brother David"
  }
];

export function getAllMeetings(): Meeting[] {
  return [...meetings].sort((a, b) => b.date.localeCompare(a.date));
}

export function getMeetingById(id: number): Meeting | undefined {
  return meetings.find((meeting) => meeting.id === id);
}

export function getMeetingsByDate(date: string): Meeting[] {
  return meetings.filter((meeting) => meeting.date === date);
}

export function getCurrentMeeting(): Meeting | undefined {
  const today = new Date().toISOString().split("T")[0];
  return getAllMeetings().find((meeting) => meeting.date >= today);
}
