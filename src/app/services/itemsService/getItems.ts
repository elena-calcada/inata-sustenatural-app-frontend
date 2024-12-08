import { httpClient } from "../HttpClient";

export interface IItemsProps {
  id: string;
  title: string;
  tour_id: string;
  date: string;
  long_description: string;
  short_description: string;
  note: string;
  duration: string;
  route_size: string;
  vacancies: number;
  price: number;
  level: string;
  type: string;
  season: string;
  meeting_point_name: string;
  meeting_point_hour: string;
  meeting_point_address: string;
  meeting_point_description: string;
  pet: string;
  important: string;
  cover: string;
  available: string;
}

export async function getItems(tourId: string) {
  const { data } = await httpClient.get<IItemsProps[]>(
    `/tours/${tourId}/items`,
  );
  return data;
}
