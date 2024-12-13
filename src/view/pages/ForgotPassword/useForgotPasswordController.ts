import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

import { authService } from "../../../app/services/authService";
import { IForgotPasswordParams } from "../../../app/services/authService/forgotPassword";
import { showSuccessToast } from "../../../app/utils/toast";

const schema = z.object({
  email: z
    .string()
    .min(1, "E-mail é obrigatório")
    .email("Informe um e-mail válido"),
});

type FormData = z.infer<typeof schema>;

export function useForgotPasswordController() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit: hookFormHandleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (dataProps: IForgotPasswordParams) => {
      authService.forgotPassword(dataProps);
    },
  });

  const handleSubmit = hookFormHandleSubmit(async (data) => {
    await mutateAsync(data);
    showSuccessToast("Código enviado para o e-mail.");
    navigate("/reset-password");
  });

  return { handleSubmit, register, isPending, errors };
}
