import { httpClient } from "../HttpClient";

export async function removeImage(imageId: string) {
  await httpClient.delete(`/images/${imageId}`);
}
