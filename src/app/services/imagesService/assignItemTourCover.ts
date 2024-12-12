import { httpClient } from "../HttpClient";

export interface IAssingnItemCoverProps {
  imageId: string;
  itemTourId: string;
}

export async function assignItemTourCover({
  imageId,
  itemTourId,
}: IAssingnItemCoverProps) {
  await httpClient.put("/images/cover-item-tour", {
    itemTourId,
    imageId,
  });
}
