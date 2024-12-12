import { useGetTourById } from "../../../app/hooks/useGetTourById";

export function useUploadImagesController() {
  const { tour } = useGetTourById();

  return {
    tour,
  };
}
