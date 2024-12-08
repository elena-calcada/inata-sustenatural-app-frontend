import { httpClient } from "../HttpClient";

export interface IImageProps {
  item_cover_id: string;
  cover: string;
  tour_id: string;
  original_name: string;
  id: string;
}

export async function getImages(tourId: string) {
  const { data } = await httpClient.get<IImageProps[]>(`/images/${tourId}`);
  return data;
}
