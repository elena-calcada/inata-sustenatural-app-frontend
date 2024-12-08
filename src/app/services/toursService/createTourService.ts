import { httpClient } from "../HttpClient";

export interface ICreateTourParams {
  title: string;
  location: string;
  description: string;
  type_tour?: string;
  average_duration?: string;
  season?: string;
}

export async function createTour(params: ICreateTourParams) {
  await httpClient.post("/tours", params);
}
