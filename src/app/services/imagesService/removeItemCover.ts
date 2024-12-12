import { httpClient } from "../HttpClient";

export async function removeItemTourCover(imageId: string) {
  await httpClient.put("/images/remove-cover-item-tour", { imageId });
}
