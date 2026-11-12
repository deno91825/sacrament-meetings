export type MeetingType = "testimony" | "regular" | "stake" | "general";

export interface Speaker {
  name: string;
  topic?: string;
}

export interface MusicalNumber {
  title: string;
  performer: string;
}

export interface Meeting {
  id: number;
  date: string;
  type: MeetingType;
  presiding: string;
  conducting: string;
  announcements: string[];
  openingHymn: string;
  openingPrayer: string;
  wardBusiness: string[];
  stakeBusiness: boolean;
  sacramentHymn: string;
  speakers: Speaker[];
  musicalNumbers: MusicalNumber[];
  closingHymn: string;
  closingPrayer: string;
}
