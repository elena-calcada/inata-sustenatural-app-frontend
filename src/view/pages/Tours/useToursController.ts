import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { toursService } from "../../../app/services/toursService";
import { showErrorToast, showSuccessToast } from "../../../app/utils/toast";

export function useToursController() {
  const { data = [], isFetching } = useQuery({
    queryKey: ["getTours"],
    queryFn: toursService.getTours,
  });

  const queryClient = useQueryClient();

  const { mutateAsync: deleteTour, isPending: isPendingDelete } = useMutation({
    mutationFn: async (dataDeleteProps: string) =>
      toursService.deleteTour(dataDeleteProps),
  });

  async function handleDeleteTour(id: string) {
    try {
      await deleteTour(id);
      queryClient.invalidateQueries({ queryKey: ["getTours"] });
      showSuccessToast("Grupo de passeios deletado com sucesso");
    } catch {
      showErrorToast("Falha ao deletar grupo");
    }
  }

  return {
    tours: data,
    isLoading: isFetching,
    isPendingDelete,
    handleDeleteTour,
  };
}
