import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { z } from "zod";

import { toursService } from "../../../app/services/toursService";
import { IUpdateTourParams } from "../../../app/services/toursService/updateTour";
import { showErrorToast, showSuccessToast } from "../../../app/utils/toast";

const schema = z.object({
  title: z.string().min(1, "Informe o título"),
  location: z.string().min(1, "Informe a localização"),
  description: z.string().min(1, "Informe uma descrição"),
  type_tour: z.string().optional(),
  level: z.string().optional(),
  season: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

export function useEditTourController() {
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

  const {
    register,
    handleSubmit: hookFormHandleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: tour?.title,
      location: tour?.location,
      description: tour?.description,
      type_tour: tour?.type_tour,
      level: tour?.level,
      season: tour?.season,
    },
  });

  useEffect(() => {
    if (tour) {
      reset(tour);
    }
  }, [tour, reset]);

  const { mutateAsync: updateTour, isPending: isPendingUpdate } = useMutation({
    mutationFn: async (dataProps: IUpdateTourParams) =>
      toursService.updateTour(tourId, dataProps),
  });

  const handleSubmit = hookFormHandleSubmit(async (data) => {
    try {
      await updateTour(data);
      showSuccessToast("Passeio editado com sucesso");
      navigate("/tours");
    } catch {
      showErrorToast("Não foi possível editar o passeio");
    }
  });

  return {
    handleSubmit,
    register,
    errors,
    isPendingUpdate,
    isFetching,
    tour,
  };
}
