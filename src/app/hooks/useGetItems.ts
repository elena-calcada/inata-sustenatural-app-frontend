import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

import { itemsService } from "../services/itemsService";
import { showErrorToast } from "../utils/toast";

export function useGetItems() {
  const { tourId } = useParams();

  const { data: items, isFetching } = useQuery({
    queryKey: ["getItems", tourId],
    queryFn: async () => {
      if (!tourId) {
        showErrorToast("O Passeio não pode ser editado");
        return [];
      }
      return itemsService.getItems(tourId);
    },
    enabled: !!tourId,
  });

  return { items, isFetching };
}
