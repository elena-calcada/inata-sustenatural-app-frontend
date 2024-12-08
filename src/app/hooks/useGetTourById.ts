import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";

import { toursService } from "../services/toursService";
import { showErrorToast } from "../utils/toast";

export function useGetTourById() {
  const navigate = useNavigate();
  const { tourId } = useParams();

  const { data: tour, isFetching } = useQuery({
    queryKey: ["getTourById", tourId],
    queryFn: async () => {
      if (!tourId) {
        showErrorToast("O Passeio não pode ser editado");
        navigate("/tours");
        return null;
      }
      return toursService.getTourById(tourId);
    },
    enabled: !!tourId,
  });

  return { tour, isFetching };
}
