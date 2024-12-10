import { httpClient } from "../HttpClient";

export interface IAssingnCoverProps {
  tourId: string;
  imageId: string;
}

export async function removeTourCover(imageId: string) {
  await httpClient.put("/images/remove-cover-tour", { imageId });
}
