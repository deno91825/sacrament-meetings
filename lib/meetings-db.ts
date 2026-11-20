import { neon } from "@neondatabase/serverless";
import { Meeting } from "@/types/meeting";

const sql = neon(process.env.DATABASE_URL!);

const ITEMS_PER_PAGE = 5;

export async function getMeetings(
  query: string = "",
  currentPage: number = 1
): Promise<Meeting[]> {
  const offset = (Math.max(1, currentPage) - 1) * ITEMS_PER_PAGE;
  const search = `%${query}%`;

  const rows = query
    ? await sql`
        SELECT
          id,
          TO_CHAR(date, 'YYYY-MM-DD') AS date,
          meeting_type AS type,
          presiding,
          conducting,
          announcements,
          opening_hymn AS "openingHymn",
          opening_prayer AS "openingPrayer",
          ward_business AS "wardBusiness",
          stake_business AS "stakeBusiness",
          sacrament_hymn AS "sacramentHymn",
          speakers,
          musical_numbers AS "musicalNumbers",
          closing_hymn AS "closingHymn",
          closing_prayer AS "closingPrayer"
        FROM meetings
        WHERE
          presiding ILIKE ${search}
          OR conducting ILIKE ${search}
          OR meeting_type ILIKE ${search}
          OR speakers::text ILIKE ${search}
        ORDER BY date DESC
        LIMIT ${ITEMS_PER_PAGE}
        OFFSET ${offset}
      `
    : await sql`
        SELECT
          id,
          TO_CHAR(date, 'YYYY-MM-DD') AS date,
          meeting_type AS type,
          presiding,
          conducting,
          announcements,
          opening_hymn AS "openingHymn",
          opening_prayer AS "openingPrayer",
          ward_business AS "wardBusiness",
          stake_business AS "stakeBusiness",
          sacrament_hymn AS "sacramentHymn",
          speakers,
          musical_numbers AS "musicalNumbers",
          closing_hymn AS "closingHymn",
          closing_prayer AS "closingPrayer"
        FROM meetings
        ORDER BY date DESC
        LIMIT ${ITEMS_PER_PAGE}
        OFFSET ${offset}
      `;

  return rows as unknown as Meeting[];
}

export async function getMeetingsTotalPages(
  query: string = ""
): Promise<number> {
  const search = `%${query}%`;

  const result = query
    ? await sql`
        SELECT COUNT(*) AS total
        FROM meetings
        WHERE
          presiding ILIKE ${search}
          OR conducting ILIKE ${search}
          OR meeting_type ILIKE ${search}
          OR speakers::text ILIKE ${search}
      `
    : await sql`
        SELECT COUNT(*) AS total
        FROM meetings
      `;

  const total = Number(result[0].total);

  return Math.ceil(total / ITEMS_PER_PAGE);
}

export async function getMeetingById(
  id: number
): Promise<Meeting | null> {
  const rows = await sql`
    SELECT
      id,
      TO_CHAR(date, 'YYYY-MM-DD') AS date,
      meeting_type AS type,
      presiding,
      conducting,
      announcements,
      opening_hymn AS "openingHymn",
      opening_prayer AS "openingPrayer",
      ward_business AS "wardBusiness",
      stake_business AS "stakeBusiness",
      sacrament_hymn AS "sacramentHymn",
      speakers,
      musical_numbers AS "musicalNumbers",
      closing_hymn AS "closingHymn",
      closing_prayer AS "closingPrayer"
    FROM meetings
    WHERE id = ${id}
    LIMIT 1
  `;

  return (rows[0] as unknown as Meeting) ?? null;
}

export async function getAllMeetings(): Promise<Meeting[]> {
  return getMeetings("", 1).then(async (firstPage) => {
    const totalPages = await getMeetingsTotalPages();
    if (totalPages <= 1) return firstPage;

    const remainingPages = await Promise.all(
      Array.from(
        { length: totalPages - 1 },
        (_, index) => getMeetings("", index + 2)
      )
    );

    return [...firstPage, ...remainingPages.flat()];
  });
}

export async function getMeetingsByDate(date: string): Promise<Meeting[]> {
  const rows = await sql`
    SELECT
      id,
      TO_CHAR(date, 'YYYY-MM-DD') AS date,
      meeting_type AS type,
      presiding,
      conducting,
      announcements,
      opening_hymn AS "openingHymn",
      opening_prayer AS "openingPrayer",
      ward_business AS "wardBusiness",
      stake_business AS "stakeBusiness",
      sacrament_hymn AS "sacramentHymn",
      speakers,
      musical_numbers AS "musicalNumbers",
      closing_hymn AS "closingHymn",
      closing_prayer AS "closingPrayer"
    FROM meetings
    WHERE date = ${date}::date
    ORDER BY date DESC
  `;

  return rows as unknown as Meeting[];
}
