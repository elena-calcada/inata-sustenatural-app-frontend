import { httpClient } from "../HttpClient";

export async function getPresignedURL(file: File, tourId: string) {
  const { data } = await httpClient.post("/presignedURL", {
    fileName: file.name,
    tourId,
  });

  return data.signedUrl;
}
