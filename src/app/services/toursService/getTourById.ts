import { httpClient } from "../HttpClient";

interface IGetTourByIdResponse {
  tour: {
    id: string;
    title: string;
    location: string;
    description: string;
    type_tour: string;
    level: string;
    season: string;
    cover: string;
  };
}

export async function getTourById(tourId: string | undefined) {
  const { data } = await httpClient.get<IGetTourByIdResponse>(
    `/tours/${tourId}`,
  );
  return data.tour;
}
