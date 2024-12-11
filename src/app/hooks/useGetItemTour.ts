import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

import { itemsService } from "../services/itemsService";
import { showErrorToast } from "../utils/toast";

export function useGetItemTour() {
  const { tourId, itemId } = useParams();

  const { data: item, isFetching } = useQuery({
    queryKey: ["getItemTour", itemId, tourId],
    queryFn: async () => {
      if (!tourId || !itemId) {
        showErrorToast("Algo deu errado...");
        return null;
      }
      return itemsService.getItemByTour({ itemId, tourId });
    },
  });

  return { item, isFetching };
}
