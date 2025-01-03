import { PackageOpen } from "lucide-react";

import { ButtonBack } from "../../components/ButtonBack";
import { ButtonLink } from "../../components/ButtonLink";
import { CardImage } from "../../components/CardImage";
import { ItemCard } from "../../components/CardItem";
import { Spinner } from "../../components/Spinner";

import { useTourDetailController } from "./useTourDetailController";

export function TourDetail() {
  const {
    tour,
    items,
    images,
    isFetchingTour,
    isFetchingItems,
    isFetchingImages,
    handleAssignTourCover,
    handleRemoveTourCover,
    handleRemoveImage,
    handleRemoveItem,
  } = useTourDetailController();

  return (
    <main className="w-full z-30 h-full overflow-y-auto bg-background">
      <section className="containerSection">
        {tour && (
          <div className="divContainerSection">
            {isFetchingTour ? (
              <Spinner />
            ) : (
              <div className="w-full flex items-center gap-4 xs:flex-col">
                {tour?.cover ? (
                  <div className="w-20 h-20 mb-4">
                    <img
                      src={`${import.meta.env.VITE_PUBLIC_IMAGE_URL}/${tour.cover}`}
                      sizes="5rem"
                      alt=""
                      className="w-full h-full rounded-md object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-20 h-20 mb-4 rounded-md bg-blueColor-backgroundCard flex items-center justify-center">
                    <span className="text-blueColor-base/30 font-bold text-sm text-center">
                      Capa
                    </span>
                  </div>
                )}
                <div className="flex items-center gap-2 mb-4">
                  <h1 className="text-2xl font-bold xs:text-xl">
                    {`Grupo - ${tour?.title}`}
                  </h1>
                  <ButtonBack href="/tours" containerStyle="" />
                </div>
              </div>
            )}

            <div className="w-full flex items-center justify-between gap-4 border-b-[1px] border-textColor/25 pb-2 mb-4">
              <div className="">
                <span className="text-base font-bold font-montserrat">
                  {items?.length === 1
                    ? `${items.length} passeio`
                    : `${items?.length} passeios`}
                </span>
              </div>
              <ButtonLink
                href={`/tours/${tour?.id}/items/register`}
                name="Novo"
                containerStyle=""
              />
            </div>

            {isFetchingItems && (
              <div className="w-full flex items-center justify-center mt-4">
                <Spinner />
              </div>
            )}

            {items.length === 0 && !isFetchingItems ? (
              <div className="w-full flex flex-col gap-1 items-center justify-center">
                <PackageOpen className="size-16 stroke-1 text-blueColor-dark/70" />
                <div className="flex flex-col items-center justify-center gap-1">
                  <span className="text-textColor/30 font-semibold text-sm text-center">
                    Você ainda não tem nenhum item cadastrado nesse passeio.
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
            ) : (
              <div className="w-full flex flex-col gap-2">
                {items.map((item) => (
                  <ItemCard
                    key={item.id}
                    href={`/tours/${tour?.id}/items/${item.id}/cover`}
                    hrefEdit={`/tours/${tour?.id}/items/${item.id}`}
                    item={item}
                    deleteItem={handleRemoveItem}
                  />
                ))}
              </div>
            )}

            <div className="w-full flex items-center justify-between border-b-[1px] border-textColor/25 pb-2 mt-4 mb-4">
              <div className="flex items-center gap-4 text-">
                <span className="text-lg font-bold font-montserrat">
                  {images.length === 1
                    ? `${images.length} imagem`
                    : `${images.length} imagens`}
                </span>
              </div>
              <ButtonLink
                href={`/tours/${tour?.id}/imagens/upload`}
                name="Inserir"
                containerStyle=""
              />
            </div>

            {isFetchingImages && (
              <div className="w-full flex items-center justify-center mt-4">
                <Spinner />
              </div>
            )}

            {images.length === 0 && !isFetchingImages && (
              <div className="w-full flex flex-col gap-1 items-center justify-center mt-2 pb-20">
                <PackageOpen className="size-16 stroke-1 text-blueColor-dark/70" />
                <div className="flex flex-col items-center justify-center gap-1">
                  <span className="text-textColor/30 font-semibold text-sm text-center">
                    Você ainda não tem nenhuma imagem cadastrada nesse passeio.
                  </span>
                  <span className="text-textColor/30 font-semibold text-sm text-center">
                    Clique no botão{" "}
                    <span className="text-blueColor-base font-bold text-sm">
                      Inserir
                    </span>{" "}
                    acima para cadastrar o primeiro.
                  </span>
                </div>
              </div>
            )}

            {images.length !== 0 && !isFetchingImages && (
              <div className="w-full grid grid-cols-12 gap-4 pb-20 items-center justify-center">
                {images.map((image) => (
                  <CardImage
                    key={image.id}
                    image={image}
                    tour={tour}
                    assignTourCover={handleAssignTourCover}
                    removeCover={handleRemoveTourCover}
                    deleteImage={handleRemoveImage}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </section>
    </main>
  );
}
