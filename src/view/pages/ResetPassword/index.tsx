import { MoveRight } from "lucide-react";
import { Link } from "react-router-dom";

import { ButtonSend } from "../../components/ButtonSend";
import { Input } from "../../components/Input";

import { useResetPasswordController } from "./useResetPasswordController";

export function ResetPassword() {
  const { handleSubmit, register, errors } = useResetPasswordController();

  return (
    <div className="px-4 h-full overflow-y-auto w-full flex flex-col items-center justify-center max-w-[448px] mx-auto">
      <div className="flex gap-4 items-center mb-4">
        <Link
          to="/"
          className="flex gap-4 items-center text-blueColor-dark hover:text-blueColor-base transition-all"
        >
          <span className="font-outfit text-lg font-bold">Voltar ao login</span>
          <MoveRight />
        </Link>
      </div>

      <h1 className="text-2xl font-bold">Altere sua senha</h1>

      <form
        onSubmit={handleSubmit}
        className="mt-10 flex flex-col gap-4 mx-auto w-full"
      >
        <Input
          type="email"
          placeholder="E-mail"
          {...register("email")}
          error={errors.email?.message}
        />
        <Input
          type="text"
          placeholder="Código de verificação"
          {...register("code")}
          error={errors.code?.message}
        />
        <Input
          type="password"
          placeholder="Nova senha"
          {...register("newPassword")}
          error={errors.newPassword?.message}
        />
        <ButtonSend>Alterar senha</ButtonSend>
      </form>
    </div>
  );
}
