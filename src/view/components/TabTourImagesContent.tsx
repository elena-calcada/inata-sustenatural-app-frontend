import { PackageOpen } from "lucide-react";

import { IAssingnCoverProps } from "../../app/services/imagesService/assignTourCover";
import { IImageProps } from "../../app/services/imagesService/getImages";
import { ITourProps } from "../../app/services/toursService/getTours";

import { ButtonLink } from "./ButtonLink";
import { CardImage } from "./CardImage";
import { Spinner } from "./Spinner";

interface ITabTourImagesContentProps {
  images: IImageProps[];
  tour: ITourProps;
  isFetchingImages: boolean;
  handleAssignTourCover: ({ tourId, imageId }: IAssingnCoverProps) => void;
  handleRemoveTourCover: ({ tourId, imageId }: IAssingnCoverProps) => void;
  handleRemoveImage: ({ tourId, imageId }: IAssingnCoverProps) => void;
}

export function TabTourImagesContent({
  images,
  tour,
  isFetchingImages,
  handleAssignTourCover,
  handleRemoveTourCover,
  handleRemoveImage,
}: ITabTourImagesContentProps) {
  return (
    <section className="w-full">
      <div className="w-full flex items-center justify-between border-b-[1px] border-textColor/25 pb-2 mb-4">
        <div className="flex items-center gap-4 text-textColor">
          <span className="text-base font-semibold font-montserrat">
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
        <div className="w-full flex flex-col gap-1 items-center justify-center mt-2">
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
        <div className="w-full grid grid-cols-12 gap-4 items-center justify-center">
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
    </section>
  );
}
