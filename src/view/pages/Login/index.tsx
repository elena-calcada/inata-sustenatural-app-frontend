import { Link } from "react-router-dom";

import { ButtonSend } from "../../components/ButtonSend";
import { Input } from "../../components/Input";

export function Login() {
  return (
    <div className="px-4 h-full overflow-y-auto w-full flex flex-col items-center justify-center max-w-[448px] mx-auto">
      <h1 className="text-2xl font-bold">Entre em sua conta</h1>
      <form className="mt-10 flex flex-col gap-4 mx-auto w-full">
        <Input type="email" name="email" placeholder="E-mail" />
        <div>
          <Input type="password" name="password" placeholder="Senha" />
          <div className="flex items-center justify-between mt-2">
            <Link
              to="/forgot-password"
              className="text-xs text-grayLight hover:text-blueColor-base transition-all"
            >
              Esqueci minha senha
            </Link>
          </div>
        </div>
        <ButtonSend containerStyle="">Entrar</ButtonSend>
      </form>
    </div>
  );
}
