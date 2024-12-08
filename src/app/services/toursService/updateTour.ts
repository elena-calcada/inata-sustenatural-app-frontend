import { httpClient } from "../HttpClient";

export interface IUpdateTourParams {
  title: string;
  location: string;
  description: string;
  type_tour?: string;
  level?: string;
  season?: string;
}

export async function updateTour(
  tourId: string | undefined,
  params: IUpdateTourParams,
) {
  await httpClient.put(`/tours/${tourId}`, params);
}
