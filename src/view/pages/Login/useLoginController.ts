import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { useAuth } from "../../../app/hooks/useAuth";
import { authService } from "../../../app/services/authService";
import { ISigninParams } from "../../../app/services/authService/signin";
import { showErrorToast, showSuccessToast } from "../../../app/utils/toast";

const schema = z.object({
  email: z
    .string()
    .min(1, "E-mail é obrigatório")
    .email("Informe um e-mail válido"),
  password: z
    .string()
    .min(8, "Senha é obrigatória e deve conter no mínimo 8 dígitos"),
});

type FormData = z.infer<typeof schema>;

export function useLoginController() {
  const {
    register,
    handleSubmit: hookFormHandleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (data: ISigninParams) => {
      return authService.signin(data);
    },
  });

  const { signinSaveCredentials } = useAuth();

  const handleSubmit = hookFormHandleSubmit(async (dataProps) => {
    try {
      const response = await mutateAsync(dataProps);
      showSuccessToast("Login Efetuado com sucesso!");
      signinSaveCredentials(response.accessToken, response.refreshToken);
    } catch {
      showErrorToast("Credenciais inválidas!");
    }
  });

  return { handleSubmit, register, errors, isPending };
}
