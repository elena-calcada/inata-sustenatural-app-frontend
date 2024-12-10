import { httpClient } from "../HttpClient";

export interface IAssingnCoverProps {
  tourId: string;
  imageId: string;
}

export async function assignTourCover({ tourId, imageId }: IAssingnCoverProps) {
  await httpClient.put("/images/cover-tour", {
    tourId,
    imageId,
  });
}
