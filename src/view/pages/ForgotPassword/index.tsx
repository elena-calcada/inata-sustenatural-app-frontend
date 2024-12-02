import { MoveRight } from "lucide-react";
import { Link } from "react-router-dom";

import { ButtonSend } from "../../components/ButtonSend";
import { Input } from "../../components/Input";

import { useForgotPasswordController } from "./useForgotPasswordController";

export function ForgotPassword() {
  const { errors, handleSubmit, register } = useForgotPasswordController();

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

      <h1 className="text-2xl font-bold">Esqueceu sua senha?</h1>

      <p className="text-textColor font-outfit text-center mt-4">
        Informe o seu e-mail no campo abaixo e lhe enviaremos um código de
        verificação para prosseguir com a recuperação da senha.
      </p>

      <form
        onSubmit={handleSubmit}
        className="mt-10 flex flex-col gap-4 mx-auto w-full"
      >
        <Input
          type="text"
          placeholder="E-mail"
          {...register("email")}
          error={errors.email?.message}
        />
        <ButtonSend>Enviar código para o e-mail</ButtonSend>
      </form>
    </div>
  );
}
