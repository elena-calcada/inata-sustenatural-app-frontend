import { MoveRight } from "lucide-react";
import { Link } from "react-router-dom";

import { ButtonSend } from "../../components/ButtonSend";
import { Input } from "../../components/Input";

export function ResetPassword() {
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

      <form className="mt-10 flex flex-col gap-4 mx-auto w-full">
        <Input type="email" name="email" placeholder="E-mail" />
        <Input type="text" name="code" placeholder="Código de verificação" />
        <Input type="password" name="newPassword" placeholder="Nova senha" />
        <ButtonSend containerStyle="">Alterar senha</ButtonSend>
      </form>
    </div>
  );
}
