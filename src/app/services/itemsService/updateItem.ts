import { httpClient } from "../HttpClient";

import { ICreateItemTourProps } from "./createItem";

export async function updateItemTour(
  itemId: string | undefined,
  tourId: string | undefined,
  params: ICreateItemTourProps,
) {
  await httpClient.put(`/tours/${tourId}/items/${itemId}`, params);
}
