import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useGetImages } from "../../../app/hooks/useGetImages";
import { useGetItemTour } from "../../../app/hooks/useGetItemTour";
import { useGetTourById } from "../../../app/hooks/useGetTourById";
import { imagesService } from "../../../app/services/imagesService";
import { IAssingnItemCoverProps } from "../../../app/services/imagesService/assignItemTourCover";
import { showErrorToast, showSuccessToast } from "../../../app/utils/toast";

export function useItemCoverController() {
  const { tour, isFetching: isFetchingTour } = useGetTourById();
  const { item, isFetching: isFetchingItem } = useGetItemTour();
  const { images = [], isFetching: isFetchingImages } = useGetImages();

  const queryCient = useQueryClient();

  const {
    mutateAsync: assignItemTourCover /* , isPending: isPendingAssingnCover */,
  } = useMutation({
    mutationFn: async (dataProps: IAssingnItemCoverProps) =>
      imagesService.assignItemTourCover(dataProps),
  });

  const {
    mutateAsync: removeItemTourCover /* , isPending: isPendingRemoveCover */,
  } = useMutation({
    mutationFn: async (dataProps: string) =>
      imagesService.removeItemTourCover(dataProps),
  });

  const { mutateAsync: removeImage } = useMutation({
    mutationFn: async (dataProps: string) =>
      imagesService.removeImage(dataProps),
  });

  async function handleAssignItemTourCover({
    imageId,
    itemTourId,
  }: IAssingnItemCoverProps) {
    try {
      await assignItemTourCover({ imageId, itemTourId });
      queryCient.invalidateQueries({
        queryKey: ["getItemTour", itemTourId, tour?.id],
      });
      queryCient.invalidateQueries({ queryKey: ["getImages", tour?.id] });
      showSuccessToast("Seu passeio agora tem uma capa!");
    } catch {
      showErrorToast("Não foi possível atribuir capa a esse passeio...");
    }
  }

  async function handleRemoveItemTourCover(imageId: string) {
    try {
      await removeItemTourCover(imageId);
      queryCient.invalidateQueries({
        queryKey: ["getItemTour", item?.id, tour?.id],
      });
      queryCient.invalidateQueries({ queryKey: ["getImages", tour?.id] });
      showSuccessToast("A capa passeio foi removida");
    } catch {
      showErrorToast("Erro ao remover capa passeio");
    }
  }

  async function handleRemoveImage({
    imageId,
    itemTourId,
  }: IAssingnItemCoverProps) {
    try {
      await removeImage(imageId);
      queryCient.invalidateQueries({
        queryKey: ["getItemTour", itemTourId, tour?.id],
      });
      queryCient.invalidateQueries({ queryKey: ["getImages", tour?.id] });
      showSuccessToast("Imagem deletada com sucesso");
    } catch {
      showErrorToast("Não foi possível deletar a imagem");
    }
  }

  return {
    tour,
    item,
    images,
    isFetchingTour,
    isFetchingImages,
    isFetchingItem,
    handleAssignItemTourCover,
    handleRemoveItemTourCover,
    handleRemoveImage,
  };
}
