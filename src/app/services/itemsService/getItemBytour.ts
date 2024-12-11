import { IItemTour } from "../../entites/IItemTour";
import { httpClient } from "../HttpClient";

export interface IGetItemByTourProps {
  tourId: string;
  itemId: string;
}

export async function getItemByTour({ itemId, tourId }: IGetItemByTourProps) {
  const { data } = await httpClient.get<IItemTour>(
    `/tours/items/detail?tourId=${tourId}&itemId=${itemId}`,
  );
  return data;
}
