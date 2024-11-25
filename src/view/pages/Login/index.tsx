import { ButtonSend } from "../../components/ButtonSend";
import { Input } from "../../components/Input";

export function Login() {
  return (
    <div className="px-4 h-full overflow-y-auto w-full flex flex-col items-center justify-center max-w-[460px] mx-auto">
      <h1 className="text-2xl font-bold">Entre em sua conta</h1>
      <form className="mt-10 flex flex-col gap-4 mx-auto w-full">
        <Input type="email" name="email" placeholder="E-mail" />
        <Input type="password" name="password" placeholder="Senha" />
        <ButtonSend containerStyle="">Entrar</ButtonSend>
      </form>
    </div>
  );
}
