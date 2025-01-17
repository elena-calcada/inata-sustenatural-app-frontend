import { httpClient } from "../HttpClient";

export interface ICreateItemTourProps {
  tour_id?: string;
  title: string;
  date?: string | "";
  duration: string;
  route_size: string;
  vacancies: number;
  price?: number;
  level?: string | "";
  type?: string | "";
  season?: string | "";
  meeting_point_name?: string | "";
  meeting_point_hour?: string | "";
  meeting_point_address?: string | "";
  meeting_point_description?: string | "";
  pet: "SIM" | "NAO";
  available: "SIM" | "NAO";
  long_description: string;
  short_description: string;
  note?: string | "";
  important?: string | "";
}

export async function createItem(params: ICreateItemTourProps) {
  await httpClient.post("/tours/items", params);
}
