export type InternshipRecord = {
  source: string;
  sequence: number;
  industry: string;
  role: string;
  location: string;
  website: string | null;
  period: string;
  participants: number;
  rating: string;
  ratingScore: number | null;
  note: string;
  yearLabel: string;
  yearNumbers: number[];
};

export type InternshipCompany = {
  id: string;
  name: string;
  industries: string[];
  roles: string[];
  locations: string[];
  websites: string[];
  periods: string[];
  yearLabels: string[];
  minYear: number;
  maxYear: number;
  totalParticipants: number;
  averageRating: number | null;
  notes: string[];
  records: InternshipRecord[];
};
