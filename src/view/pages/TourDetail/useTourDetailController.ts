import { useGetImages } from "../../../app/hooks/useGetImages";
import { useGetItems } from "../../../app/hooks/useGetItems";
import { useGetTourById } from "../../../app/hooks/useGetTourById";

export function useTourDetailController() {
  const { tour, isFetching: isFetchingTour } = useGetTourById();
  const { items = [], isFetching: isFetchingItems } = useGetItems();
  const { images = [], isFetching: isFetchingImages } = useGetImages();

  return {
    tour,
    items,
    images,
    isFetchingImages,
    isFetchingItems,
    isFetchingTour,
  };
}
