import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
  const {
    register,
    handleSubmit: hookFormHandleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const handleSubmit = hookFormHandleSubmit((data) => {
    console.log("Chama a API com: ", data);
  });

  return { handleSubmit, register, errors };
}
