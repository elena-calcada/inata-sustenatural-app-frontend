import { httpClient } from "../HttpClient";

export async function deleteTour(tourId: string | undefined) {
  await httpClient.delete(`/tours/${tourId}`);
}
