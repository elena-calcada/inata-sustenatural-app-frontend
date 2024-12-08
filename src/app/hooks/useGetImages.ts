import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

import { imagesService } from "../services/imagesService";
import { showErrorToast } from "../utils/toast";

export function useGetImages() {
  const { tourId } = useParams();

  const { data: images, isFetching } = useQuery({
    queryKey: ["getImages", tourId],
    queryFn: async () => {
      if (!tourId) {
        showErrorToast("O Passeio não pode ser editado");
        return [];
      }
      return imagesService.getImages(tourId);
    },
    enabled: !!tourId,
  });

  return { images, isFetching };
}
