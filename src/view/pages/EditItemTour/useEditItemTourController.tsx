import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

import { useGetItemTour } from "../../../app/hooks/useGetItemTour";
import { useGetTourById } from "../../../app/hooks/useGetTourById";
import { itemsService } from "../../../app/services/itemsService";
import { ICreateItemTourProps } from "../../../app/services/itemsService/createItem";
import { showErrorToast, showSuccessToast } from "../../../app/utils/toast";

const schema = z.object({
  tour_id: z.string().uuid().optional(),
  title: z.string().min(1, "Informe o título"),
  date: z.string().min(1, "Informe quando será"),
  duration: z.string().min(1, "Informe a duração do passeio"),
  route_size: z.string().min(1, "Informe o tamanho do percurso"),
  vacancies: z.preprocess(
    (value) => (typeof value === "string" ? Number(value) : value),
    z.number().min(1, "Informe a quantidade de vagas"),
  ),
  price: z.preprocess(
    (value) => (typeof value === "string" ? Number(value) : value),
    z.number().optional(),
  ),
  level: z.string().optional(),
  type: z.string().optional(),
  season: z.string().optional(),
  meeting_point_name: z.string().min(1, "Informe o nome do ponto de encontro"),
  meeting_point_hour: z.string().min(1, "Informe o horário do encontro"),
  meeting_point_address: z.string().min(1, "Informe o endereço do encontro"),
  meeting_point_description: z
    .string()
    .min(1, "Informe uma descrição do ponto de encontro"),
  pet: z.enum(["SIM", "NAO"]),
  available: z.enum(["SIM", "NAO"]),
  long_description: z
    .string()
    .min(1, "Informe uma descrição mais detalhada do passeio"),
  short_description: z
    .string()
    .min(1, "Informe uma descrição curta do passeio"),
  note: z.string().optional(),
  important: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

export function useEditItemTourController() {
  const navigate = useNavigate();

  const { tour } = useGetTourById();

  const { item } = useGetItemTour();

  const {
    register,
    handleSubmit: hookFormHandleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: item?.title,
      tour_id: item?.tour_id,
      date: item?.date,
      long_description: item?.long_description,
      short_description: item?.short_description,
      note: item?.note,
      duration: item?.duration,
      route_size: item?.route_size,
      vacancies: item?.vacancies,
      price: item?.price,
      level: item?.level,
      type: item?.type,
      season: item?.season,
      meeting_point_name: item?.meeting_point_name,
      meeting_point_hour: item?.meeting_point_hour,
      meeting_point_address: item?.meeting_point_address,
      meeting_point_description: item?.meeting_point_description,
      pet: item?.pet,
      important: item?.important,
      available: item?.available,
    },
  });

  useEffect(() => {
    if (item) {
      reset(item);
    }
  }, [item, reset]);

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (dataProps: ICreateItemTourProps) =>
      itemsService.updateItemTour(item?.id, tour?.id, dataProps),
  });

  const handleSubmit = hookFormHandleSubmit(async (data) => {
    try {
      await mutateAsync(data);

      showSuccessToast("Passeio editado com sucesso");
      navigate(`/tours/${tour?.id}`);
    } catch {
      showErrorToast("Não foi possível editar o passeio");
    }

    /* console.log({
      ...data,
      tour_id: tour?.id,
      price: Number(data.price),
      vacancies: Number(data.vacancies),
    }); */

    // console.log(data);
  });

  return {
    register,
    errors,
    control,
    isPending,
    handleSubmit,
    tour,
    item,
  };
}
