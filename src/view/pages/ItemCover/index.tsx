import { PackageOpen } from "lucide-react";

import { ButtonBack } from "../../components/ButtonBack";
import { CardItemImage } from "../../components/CardItemImage";

import { useItemCoverController } from "./useItemCoverController";

export function PageItemCover() {
  const {
    handleAssignItemTourCover,
    handleRemoveImage,
    handleRemoveItemTourCover,
    images,
    item,
    tour,
  } = useItemCoverController();

  return (
    <main className="w-full z-30 h-full overflow-y-auto bg-white">
      <section className="containerSection">
        {tour && item && (
          <div className="divContainerSection">
            <div className="w-full flex items-center gap-4 xs:flex-col">
              {item?.cover ? (
                <div className="w-20 h-20 mb-4">
                  <img
                    src={`${import.meta.env.VITE_PUBLIC_IMAGE_URL}/${item.cover}`}
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
                <h1 className="text-2xl font-bold xs:text-xl">{item?.title}</h1>
                <ButtonBack href={`/tours/${tour?.id}`} containerStyle="" />
              </div>
            </div>
            <div className="w-full flex flex-col gap-2">
              <div className="w-full flex items-center justify-between border-b-[1px] border-textColor/25 pb-2 mb-4 mt-8">
                <div className="flex items-center gap-4 text-">
                  <span className="text-lg font-bold font-montserrat">
                    {images.length === 1
                      ? `${images.length} item`
                      : `${images.length} imagens`}
                  </span>
                </div>
              </div>
              {images.length === 0 ? (
                <div className="w-full flex flex-col gap-4 items-center justify-center mt-4 pb-20">
                  <PackageOpen className="size-20 stroke-1 text-blueColor-dark/70" />
                  <div className="flex flex-col items-center justify-center gap-1">
                    <span className="text-textColor/30 font-semibold">
                      Você ainda não tem nenhuma imagem cadastrada nesse
                      passeio.
                    </span>
                    <span className="text-textColor/30 font-semibold">
                      Clique no botão{" "}
                      <span className="text-blueColor-base font-bold">
                        Inserir
                      </span>{" "}
                      acima para cadastrar o primeiro.
                    </span>
                  </div>
                </div>
              ) : (
                <div className="w-full grid grid-cols-12 gap-4 pb-20 items-center justify-center">
                  {images.map((image) => (
                    <CardItemImage
                      key={image.id}
                      image={image}
                      // tour={tour}
                      item={item}
                      assignCover={handleAssignItemTourCover}
                      removeCover={handleRemoveItemTourCover}
                      deleteImage={handleRemoveImage}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
