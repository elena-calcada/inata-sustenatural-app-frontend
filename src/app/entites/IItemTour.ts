export interface IItemTour {
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
  pet: "SIM" | "NAO";
  important: string;
  cover: string;
  available: "SIM" | "NAO";
}
