import { ButtonBack } from "../../components/ButtonBack";
import { ButtonSend } from "../../components/ButtonSend";
import { Input } from "../../components/Input";
import { Spinner } from "../../components/Spinner";
import { TextArea } from "../../components/TextArea";

import { useEditTourController } from "./useEditTourController";

export function UpdateTour() {
  const { register, handleSubmit, errors, isPendingUpdate, tour } =
    useEditTourController();

  return (
    <main className="w-full overflow-y-auto bg-white">
      <section className="containerSection flex flex-col">
        <div className="divContainerSection">
          <div className="flex items-center justify-center gap-2">
            <h1 className="text-2xl font-bold">Cadastre um novo passeio</h1>
            <ButtonBack href="/tours" containerStyle="" />
          </div>

          {!tour && (
            <div className="w-full h-full flex justify-center items-center">
              <Spinner />
            </div>
          )}
          {tour && (
            <div className="w-full">
              <form
                onSubmit={handleSubmit}
                className="mt-6 flex flex-col gap-2 mx-auto w-full pb-8"
              >
                <Input
                  type="text"
                  placeholder="Título do passeio *"
                  {...register("title")}
                  error={errors.title?.message}
                />
                <Input
                  type="text"
                  placeholder="Localização (cidade/estado) *"
                  {...register("location")}
                  error={errors.location?.message}
                />
                <Input
                  type="text"
                  placeholder="Tipo de passeio (a pé, caiaque, barco...)"
                  {...register("type_tour")}
                  error={errors.type_tour?.message}
                />
                <Input
                  type="text"
                  placeholder="Nível de esforço (baixo, moderado, alto...)"
                  {...register("level")}
                  error={errors.level?.message}
                />
                <Input
                  type="text"
                  placeholder="Temporada de ocorrência do passeio"
                  {...register("season")}
                  error={errors.season?.message}
                />
                <TextArea
                  placeholder="Descrição geral *"
                  {...register("description")}
                  error={errors.description?.message}
                />
                <ButtonSend isPending={isPendingUpdate} type="submit">
                  Salvar
                </ButtonSend>
              </form>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
