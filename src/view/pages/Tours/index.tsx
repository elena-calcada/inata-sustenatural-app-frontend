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
          <h1 className="h1">Grupos de Passeios</h1>
          <div className="w-full flex items-center justify-between border-b-[1px] border-textColor/25 pb-2 mb-4">
            <span className="text-base font-bold font-montserrat">
              {tours.length === 1
                ? `${tours.length} grupo`
                : `${tours.length} grupos`}
            </span>
            <ButtonLink containerStyle="" href="/tours/new" name="Novo" />
          </div>

          {isLoading && (
            <div className="w-full h-full flex justify-center mt-14">
              <Spinner />
            </div>
          )}

          {!isLoading && tours.length === 0 && <span>Nada aqui...</span>}

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
