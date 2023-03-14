import { Events } from "../event/interfaces";

export interface Month {
  name: string;
  id: number;
  abbreviation?: string;
}


export interface Day {
  name: string;
  id: number;
  abbreviation?: string;
}

export interface MonthDays {
  date: number | null;
  month: number;
  year: number;
  events: Events[];
}


