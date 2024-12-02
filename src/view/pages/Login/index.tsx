import { Link } from "react-router-dom";

import { ButtonSend } from "../../components/ButtonSend";
import { Input } from "../../components/Input";

import { useLoginController } from "./useLoginController";

export function Login() {
  const { handleSubmit, register, errors } = useLoginController();

  return (
    <div className="px-4 h-full overflow-y-auto w-full flex flex-col items-center justify-center max-w-[448px] mx-auto">
      <h1 className="text-2xl font-bold">Entre em sua conta</h1>
      <form
        onSubmit={handleSubmit}
        className="mt-10 flex flex-col gap-4 mx-auto w-full"
      >
        <Input
          type="text"
          placeholder="E-mail"
          error={errors.email?.message}
          {...register("email")}
        />
        <div>
          <Input
            type="password"
            placeholder="Senha"
            error={errors.password?.message}
            {...register("password")}
          />
          <div className="flex items-center justify-between mt-2">
            <Link
              to="/forgot-password"
              className="text-xs text-grayLight hover:text-blueColor-base transition-all"
            >
              Esqueci minha senha
            </Link>
          </div>
        </div>
        <ButtonSend>Entrar</ButtonSend>
      </form>
    </div>
  );
}
