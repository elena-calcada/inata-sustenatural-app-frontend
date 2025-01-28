import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useGetImages } from "../../../app/hooks/useGetImages";
import { useGetItems } from "../../../app/hooks/useGetItems";
import { useGetTourById } from "../../../app/hooks/useGetTourById";
import { imagesService } from "../../../app/services/imagesService";
import { IAssingnCoverProps } from "../../../app/services/imagesService/assignTourCover";
import { itemsService } from "../../../app/services/itemsService";
import { IRemoveItemProps } from "../../../app/services/itemsService/removeItem";
import { showErrorToast, showSuccessToast } from "../../../app/utils/toast";

export function useTourDetailController() {
  const { tour, isFetching: isFetchingTour } = useGetTourById();
  const { items = [], isFetching: isFetchingItems } = useGetItems();
  const { images = [], isFetching: isFetchingImages } = useGetImages();

  const queryCient = useQueryClient();

  const {
    mutateAsync: assignTourCover /* , isPending: isPendingAssingnCover */,
  } = useMutation({
    mutationFn: async (dataProps: IAssingnCoverProps) =>
      imagesService.assignTourCover(dataProps),
  });

  const {
    mutateAsync: removeTourCover /* , isPending: isPendingRemoveCover */,
  } = useMutation({
    mutationFn: async (dataProps: string) =>
      imagesService.removeTourCover(dataProps),
  });

  const { mutateAsync: removeImage } = useMutation({
    mutationFn: async (dataProps: string) =>
      imagesService.removeImage(dataProps),
  });

  const { mutateAsync: removeItem } = useMutation({
    mutationFn: async (dataProps: IRemoveItemProps) =>
      itemsService.removeItem(dataProps),
  });

  async function handleAssignTourCover({
    tourId,
    imageId,
  }: IAssingnCoverProps) {
    try {
      await assignTourCover({ tourId, imageId });
      queryCient.invalidateQueries({ queryKey: ["getTourById", tourId] });
      queryCient.invalidateQueries({ queryKey: ["getImages", tourId] });
      showSuccessToast("Seu destino agora tem uma capa!");
    } catch {
      showErrorToast("Não foi possível atribuir capa a esse destino...");
    }
  }

  async function handleRemoveTourCover({
    tourId,
    imageId,
  }: IAssingnCoverProps) {
    try {
      await removeTourCover(imageId);
      queryCient.invalidateQueries({ queryKey: ["getTourById", tourId] });
      queryCient.invalidateQueries({ queryKey: ["getImages", tourId] });
      showSuccessToast("A capa do destino foi removida");
    } catch {
      showErrorToast("Erro ao remover capa do destino");
    }
  }

  async function handleRemoveImage({ tourId, imageId }: IAssingnCoverProps) {
    try {
      await removeImage(imageId);
      queryCient.invalidateQueries({ queryKey: ["getImages", tourId] });
      queryCient.invalidateQueries({ queryKey: ["getTourById", tourId] });
      queryCient.invalidateQueries({ queryKey: ["getItems", tourId] });
      showSuccessToast("Imagem deletada com sucesso");
    } catch {
      showErrorToast("Não foi possível deletar a imagem");
    }
  }

  async function handleRemoveItem({ itemId, tourId }: IRemoveItemProps) {
    try {
      await removeItem({ itemId, tourId });
      queryCient.invalidateQueries({ queryKey: ["getItems", tourId] });
      showSuccessToast("Passeio deletado com sucesso");
    } catch {
      showErrorToast("Erro ao deletar passeio");
    }
  }

  return {
    tour,
    items,
    images,
    isFetchingImages,
    isFetchingItems,
    isFetchingTour,
    handleAssignTourCover,
    handleRemoveTourCover,
    handleRemoveImage,
    handleRemoveItem,
  };
}
