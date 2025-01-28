import { Controller } from "react-hook-form";

import { ButtonBack } from "../../components/ButtonBack";
import { ButtonSend } from "../../components/ButtonSend";
import { Input } from "../../components/Input";
import { Select } from "../../components/Select";
import { TextArea } from "../../components/TextArea";

import { useCreateItemTourController } from "./useCreateItemTourController";

export function CreateItemTour() {
  const { tour, register, errors, handleSubmit, control, isPending } =
    useCreateItemTourController();

  return (
    <main className="w-full z-30 h-full bg-white overflow-y-auto">
      <section className="containerSection">
        {tour && (
          <div className="divContainerSection">
            <div className="flex items-center justify-center gap-2">
              <div className="flex items-center justify-center gap-2">
                <h1 className="text-2xl font-bold">
                  {`Cadastre um novo passeio para ${tour.title}`}
                </h1>
                <ButtonBack href={`/tours/${tour?.id}`} containerStyle="" />
              </div>
            </div>
            <div className="w-full">
              <form
                onSubmit={handleSubmit}
                className="mt-10 flex flex-col gap-2 mx-auto w-full pb-8"
              >
                <Input
                  type="text"
                  placeholder="Título *"
                  {...register("title")}
                  error={errors.title?.message}
                />
                <Input type="text" placeholder="Data" {...register("date")} />
                <Input
                  type="text"
                  placeholder="Duração *"
                  {...register("duration")}
                  error={errors.duration?.message}
                />
                <Input
                  type="text"
                  placeholder="Tamanho do Percurso *"
                  {...register("route_size")}
                  error={errors.route_size?.message}
                />
                <Input
                  type="number"
                  placeholder="Quantidade de vagas *"
                  {...register("vacancies")}
                  error={errors.vacancies?.message}
                />
                <Input
                  type="number"
                  placeholder="Preço"
                  {...register("price")}
                  error={errors.price?.message}
                />
                <Input
                  type="text"
                  placeholder="Nível de esforço"
                  {...register("level")}
                  error={errors.level?.message}
                />
                <Input
                  type="text"
                  placeholder="Tipo de passeio (a pé, caiaque, barco...)"
                  {...register("type")}
                  error={errors.type?.message}
                />
                <Input
                  type="text"
                  placeholder="Temporada de ocorrência do passeio"
                  {...register("season")}
                  error={errors.season?.message}
                />
                <Input
                  type="text"
                  placeholder="Nome do ponto de encontro"
                  {...register("meeting_point_name")}
                />
                <Input
                  type="text"
                  placeholder="Horário de chegada no ponto de encontro"
                  {...register("meeting_point_hour")}
                />
                <Input
                  type="text"
                  placeholder="Endereço do ponto de encontro"
                  {...register("meeting_point_address")}
                />
                <Input
                  type="text"
                  placeholder="Descrição do ponto de encontro"
                  {...register("meeting_point_description")}
                />

                <div className="w-full flex flex-col items-center gap-2 md:gap-4 my-2 md:flex-row">
                  <div className="flex flex-col w-full items-start md:w-1/2">
                    <Controller
                      control={control}
                      name="pet"
                      defaultValue="SIM"
                      render={({ field: { onChange, value } }) => (
                        <Select
                          onChange={onChange}
                          value={value}
                          label="É permitido pet?"
                          placeholder="Selecione uma opção..."
                          error={errors.pet?.message}
                          options={[
                            {
                              value: "SIM",
                              name: "Sim",
                            },
                            {
                              value: "NAO",
                              name: "Não",
                            },
                          ]}
                        />
                      )}
                    />
                  </div>

                  <div className="flex flex-col w-full items-start md:w-1/2">
                    <Controller
                      control={control}
                      name="available"
                      defaultValue="SIM"
                      render={({ field: { onChange, value } }) => (
                        <Select
                          onChange={onChange}
                          value={value}
                          label="Quer destacar esse passeio?"
                          placeholder="Selecione uma opção..."
                          error={errors.pet?.message}
                          options={[
                            {
                              value: "SIM",
                              name: "Sim",
                            },
                            {
                              value: "NAO",
                              name: "Não",
                            },
                          ]}
                        />
                      )}
                    />
                  </div>
                </div>

                <TextArea
                  placeholder="Descrição Longa *"
                  {...register("long_description")}
                  error={errors.long_description?.message}
                />
                <TextArea
                  placeholder="Descrição curta *"
                  {...register("short_description")}
                  error={errors.short_description?.message}
                />
                <TextArea placeholder="Observação" {...register("note")} />
                <TextArea
                  placeholder="Recado importante"
                  {...register("important")}
                />
                <ButtonSend
                  isPending={isPending}
                  type="submit"
                  className="mt-4"
                >
                  Cadastrar
                </ButtonSend>
              </form>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
