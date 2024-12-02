import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

import { authService } from "../../../app/services/authService";
import { IResetPasswordParams } from "../../../app/services/authService/resetPassword";
import { showErrorToast, showSuccessToast } from "../../../app/utils/toast";

const schema = z.object({
  email: z
    .string()
    .min(1, "E-mail é obrigatório")
    .email("Informe um e-mail válido"),
  code: z.string().min(1, "O código é obrigatório"),
  newPassword: z
    .string()
    .min(8, "Senha é obrigatória e deve conter no mínimo 8 dígitos"),
});

type FormData = z.infer<typeof schema>;

export function useResetPasswordController() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit: hookFormHandleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (dataProps: IResetPasswordParams) =>
      authService.resetPassword(dataProps),
  });

  const handleSubmit = hookFormHandleSubmit(async (data) => {
    try {
      await mutateAsync(data);
      showSuccessToast("Senha alterada com sucesso!");
      navigate("/");
    } catch {
      showErrorToast("Algo deu errado...");
    }
  });

  return { handleSubmit, register, errors, isPending };
}
