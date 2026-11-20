import nextEnv from "@next/env";
const { loadEnvConfig } = nextEnv;
import { neon } from "@neondatabase/serverless";

loadEnvConfig(process.cwd());

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is missing.");
}

const sql = neon(process.env.DATABASE_URL);

await sql`
  CREATE TABLE IF NOT EXISTS meetings (
    id SERIAL PRIMARY KEY,
    date DATE NOT NULL UNIQUE,
    meeting_type TEXT NOT NULL CHECK (
      meeting_type IN ('testimony', 'regular', 'stake', 'general')
    ),
    presiding TEXT NOT NULL,
    conducting TEXT NOT NULL,
    announcements JSONB NOT NULL DEFAULT '[]'::jsonb,
    opening_hymn TEXT NOT NULL,
    opening_prayer TEXT NOT NULL,
    ward_business JSONB NOT NULL DEFAULT '[]'::jsonb,
    stake_business BOOLEAN NOT NULL DEFAULT FALSE,
    sacrament_hymn TEXT NOT NULL,
    speakers JSONB NOT NULL DEFAULT '[]'::jsonb,
    musical_numbers JSONB NOT NULL DEFAULT '[]'::jsonb,
    closing_hymn TEXT NOT NULL,
    closing_prayer TEXT NOT NULL
  )
`;

const meetings = [
  {
    date: "2026-11-15", type: "regular",
    presiding: "Bishop John Smith", conducting: "Brother David Brown",
    announcements: ["Youth activity on Saturday", "Ward temple trip next month"],
    openingHymn: "Come, Follow Me", openingPrayer: "Brother James",
    wardBusiness: ["Sustain new ward leaders"], stakeBusiness: false,
    sacramentHymn: "In Humility, Our Savior",
    speakers: [
      { name: "Sister Mary Johnson", topic: "Faith in Jesus Christ" },
      { name: "Brother Peter Wilson", topic: "Keeping Our Covenants" }
    ],
    musicalNumbers: [], closingHymn: "I Am a Child of God",
    closingPrayer: "Sister Sarah"
  },
  {
    date: "2026-11-08", type: "regular",
    presiding: "Bishop John Smith", conducting: "Brother David Brown",
    announcements: ["Family history activity"],
    openingHymn: "Praise to the Lord", openingPrayer: "Brother Mark",
    wardBusiness: [], stakeBusiness: false,
    sacramentHymn: "How Great the Wisdom and the Love",
    speakers: [{ name: "Sister Jane", topic: "Prayer" }],
    musicalNumbers: [], closingHymn: "Nearer, My God, to Thee",
    closingPrayer: "Brother Paul"
  },
  {
    date: "2026-11-01", type: "testimony",
    presiding: "Bishop John Smith", conducting: "Brother David Brown",
    announcements: ["Fast Sunday"],
    openingHymn: "I Need Thee Every Hour", openingPrayer: "Brother Thomas",
    wardBusiness: [], stakeBusiness: false,
    sacramentHymn: "Reverently and Meekly Now",
    speakers: [], musicalNumbers: [],
    closingHymn: "Abide with Me", closingPrayer: "Sister Ruth"
  },
  {
    date: "2026-10-25", type: "stake",
    presiding: "Stake President Brown", conducting: "Brother Peter",
    announcements: ["Stake conference"],
    openingHymn: "The Spirit of God", openingPrayer: "Brother James",
    wardBusiness: [], stakeBusiness: true,
    sacramentHymn: "Jesus, Once of Humble Birth",
    speakers: [{ name: "President Brown", topic: "Discipleship" }],
    musicalNumbers: [
      { title: "I Know That My Redeemer Lives", performer: "Ward Choir" }
    ],
    closingHymn: "We Thank Thee, O God, for a Prophet",
    closingPrayer: "Sister Mary"
  },
  {
    date: "2026-10-18", type: "general",
    presiding: "Bishop John Smith", conducting: "Brother David Brown",
    announcements: ["Ward service project"],
    openingHymn: "All Creatures of Our God and King",
    openingPrayer: "Brother John",
    wardBusiness: [], stakeBusiness: false,
    sacramentHymn: "God Loved Us, So He Sent His Son",
    speakers: [{ name: "Elder James", topic: "Following Christ" }],
    musicalNumbers: [], closingHymn: "Let Us All Press On",
    closingPrayer: "Brother David"
  },
  {
    date: "2026-10-11", type: "regular",
    presiding: "Bishop John Smith", conducting: "Sister Anna Green",
    announcements: ["Primary activity next week"],
    openingHymn: "Come, Thou Fount of Every Blessing",
    openingPrayer: "Brother Daniel",
    wardBusiness: ["Discuss ward service project"], stakeBusiness: false,
    sacramentHymn: "As Now We Take the Sacrament",
    speakers: [{ name: "Sister Ruth", topic: "The Power of Prayer" }],
    musicalNumbers: [], closingHymn: "I Believe in Christ",
    closingPrayer: "Sister Grace"
  },
  {
    date: "2026-10-04", type: "testimony",
    presiding: "Bishop John Smith", conducting: "Brother David Brown",
    announcements: ["General conference weekend"],
    openingHymn: "We Thank Thee, O God, for a Prophet",
    openingPrayer: "Brother Peter",
    wardBusiness: [], stakeBusiness: false,
    sacramentHymn: "While of These Emblems We Partake",
    speakers: [], musicalNumbers: [],
    closingHymn: "The Lord Is My Shepherd",
    closingPrayer: "Sister Mary"
  },
  {
    date: "2026-09-27", type: "regular",
    presiding: "Bishop John Smith", conducting: "Brother David Brown",
    announcements: ["Ward council meeting"],
    openingHymn: "High on the Mountain Top",
    openingPrayer: "Brother James",
    wardBusiness: ["Welcome new members"], stakeBusiness: false,
    sacramentHymn: "In Memory of the Crucified",
    speakers: [{ name: "Brother Mark", topic: "Service and Discipleship" }],
    musicalNumbers: [], closingHymn: "Let Us All Press On",
    closingPrayer: "Brother Thomas"
  }
];

for (const meeting of meetings) {
  await sql`
    INSERT INTO meetings (
      date, meeting_type, presiding, conducting, announcements,
      opening_hymn, opening_prayer, ward_business, stake_business,
      sacrament_hymn, speakers, musical_numbers,
      closing_hymn, closing_prayer
    )
    VALUES (
      ${meeting.date},
      ${meeting.type},
      ${meeting.presiding},
      ${meeting.conducting},
      ${JSON.stringify(meeting.announcements)}::jsonb,
      ${meeting.openingHymn},
      ${meeting.openingPrayer},
      ${JSON.stringify(meeting.wardBusiness)}::jsonb,
      ${meeting.stakeBusiness},
      ${meeting.sacramentHymn},
      ${JSON.stringify(meeting.speakers)}::jsonb,
      ${JSON.stringify(meeting.musicalNumbers)}::jsonb,
      ${meeting.closingHymn},
      ${meeting.closingPrayer}
    )
    ON CONFLICT (date) DO NOTHING
  `;
}

const result = await sql`SELECT COUNT(*) AS total FROM meetings`;

console.log(`Database setup complete. Meetings in database: ${result[0].total}`);


