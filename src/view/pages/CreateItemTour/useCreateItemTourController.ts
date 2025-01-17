import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

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
  vacancies: z.string().min(1, "Informe a quantidade de vagas"),
  price: z.string().optional(),
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

export function useCreateItemTourController() {
  const navigate = useNavigate();

  const queryCient = useQueryClient();

  const { tour, isFetching: isFetchingTour } = useGetTourById();

  const {
    register,
    handleSubmit: hookFormHandleSubmit,
    formState: { errors },
    control,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (dataProps: ICreateItemTourProps) =>
      itemsService.createItem(dataProps),
  });

  const handleSubmit = hookFormHandleSubmit(async (data) => {
    try {
      await mutateAsync({
        ...data,
        tour_id: tour?.id,
        price: Number(data.price),
        vacancies: Number(data.vacancies),
      });
      showSuccessToast("Passeio cadastrado com sucesso");
      queryCient.invalidateQueries({ queryKey: ["getItems", data.tour_id] });
      navigate(`/tours/${tour?.id}`);
    } catch {
      showErrorToast("Erro ao cadastrar passeio");
    }
    /* console.log({
      ...data,
      tour_id: tour?.id,
      price: Number(data.price),
      vacancies: Number(data.vacancies),
    }); */
  });

  return {
    tour,
    isFetchingTour,
    register,
    handleSubmit,
    errors,
    control,
    isPending,
  };
}
