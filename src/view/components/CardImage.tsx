import { Link2 } from "lucide-react";
import { Link } from "react-router-dom";

import { IAssingnCoverProps } from "../../app/services/imagesService/assignTourCover";
import { IImageProps } from "../../app/services/imagesService/getImages";
import { ITourProps } from "../../app/services/toursService/getTours";

interface ICardImageProps {
  image: IImageProps;
  tour: ITourProps;
  assignTourCover: ({ tourId, imageId }: IAssingnCoverProps) => void;
  removeCover: ({ tourId, imageId }: IAssingnCoverProps) => void;
  deleteImage: ({ tourId, imageId }: IAssingnCoverProps) => void;
}

export function CardImage({
  tour,
  image,
  assignTourCover,
  removeCover,
  deleteImage,
}: ICardImageProps) {
  return (
    <div className="w-full xs:col-span-12 xs-sm:col-span-6 sm-lg:col-span-4 lg:col-span-3 flex items-center gap-2">
      <div className="w-16 h-16">
        <img
          sizes="4rem"
          src={`${import.meta.env.VITE_PUBLIC_IMAGE_URL}/${image.id}`}
          alt=""
          className="w-full h-full rounded-md object-cover"
        />
      </div>
      <div className="flex flex-col items-start">
        <span className="font-medium text-[14px]">{image.original_name}</span>
        {tour.cover === image.id && (
          <button
            className="text-xs text-redAlert font-bold"
            onClick={() => removeCover({ imageId: image.id, tourId: tour.id })}
          >
            Remover capa
          </button>
        )}

        {!tour.cover && image.cover === "NO" && (
          <button
            className="text-xs text-blueColor-base font-bold"
            onClick={() =>
              assignTourCover({ tourId: tour.id, imageId: image.id })
            }
          >
            Usar como capa
          </button>
        )}
        <div className="flex gap-4">
          <Link
            target="_blank"
            to={`${import.meta.env.VITE_PUBLIC_IMAGE_URL}/${image.id}`}
          >
            <Link2 size={20} />
          </Link>
          <button
            className="text-xs text-redAlert font-semibold"
            onClick={() => deleteImage({ imageId: image.id, tourId: tour.id })}
          >
            Excluir
          </button>
        </div>
      </div>
    </div>
  );
}
