import { PackageOpen } from "lucide-react";

import { ButtonLink } from "../../components/ButtonLink";
import { CardTour } from "../../components/CardTour";
import { Spinner } from "../../components/Spinner";

import { useToursController } from "./useToursController";

export function Tours() {
  const { tours, isLoading, handleDeleteTour } = useToursController();

  return (
    <main className="w-full overflow-y-auto bg-white">
      <section className="containerSection flex flex-col">
        <div className="divContainerSection">
          <h1 className="h1">Destinos</h1>
          <div className="w-full flex items-center justify-between border-b-[1px] border-textColor/25 pb-2 mb-4">
            <span className="text-base font-bold font-montserrat">
              {tours.length === 1
                ? `${tours.length} destino`
                : `${tours.length} destinos`}
            </span>
            <ButtonLink containerStyle="" href="/tours/new" name="Novo" />
          </div>

          {isLoading && (
            <div className="w-full h-full flex justify-center mt-14">
              <Spinner />
            </div>
          )}

          {!isLoading && tours.length === 0 && (
            <div className="w-full flex flex-col gap-1 items-center justify-center mt-2">
              <PackageOpen className="size-16 stroke-1 text-blueColor-dark/70" />
              <div className="flex flex-col items-center justify-center gap-1">
                <span className="text-textColor/30 font-semibold text-sm text-center">
                  Você ainda não tem nenhuma imagem cadastrada nesse passeio.
                </span>
                <span className="text-textColor/30 font-semibold text-sm text-center">
                  Clique no botão{" "}
                  <span className="text-blueColor-base font-bold text-sm">
                    Novo
                  </span>{" "}
                  acima para cadastrar o primeiro.
                </span>
              </div>
            </div>
          )}

          {!isLoading && tours.length !== 0 && (
            <div className="w-full flex flex-col gap-2 flex-1 lg:overflow-y-auto">
              {tours.map((tour) => (
                <CardTour
                  key={tour.id}
                  title={tour.title}
                  href={`/tours/${tour.id}`}
                  hrefEdit={`/tours/${tour.id}/edit`}
                  tourId={tour.id}
                  onDelete={handleDeleteTour}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
