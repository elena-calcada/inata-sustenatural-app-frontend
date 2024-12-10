import { httpClient } from "../HttpClient";

export interface IRemoveItemProps {
  itemId: string;
  tourId: string;
}

export async function removeItem({ itemId, tourId }: IRemoveItemProps) {
  await httpClient.delete(`/tours/${tourId}/items/${itemId}`);
}
