import { httpClient } from "../HttpClient";

interface ITourProps {
  id: string;
  title: string;
  location: string;
  description: string;
  type_tour: string;
  level: string;
  season: string;
  cover: string;
}

interface IGetToursResponse {
  tours: ITourProps[];
}

export async function getTours() {
  const { data } = await httpClient.get<IGetToursResponse>("/tours");
  return data.tours;
}
