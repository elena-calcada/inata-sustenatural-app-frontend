import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

import { toursService } from "../../../app/services/toursService";
import { ICreateTourParams } from "../../../app/services/toursService/createTourService";
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

export function useCreateTourController() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit: hookFormHandleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (dataProps: ICreateTourParams) =>
      toursService.createTour(dataProps),
  });

  const handleSubmit = hookFormHandleSubmit(async (data) => {
    try {
      await mutateAsync(data);
      showSuccessToast("Grupo de passeio cadastrado com sucesso");
      navigate("/tours");
    } catch {
      showErrorToast("Não foi possível criar o grupo...");
    }
  });

  return { handleSubmit, register, errors, isPending };
}
