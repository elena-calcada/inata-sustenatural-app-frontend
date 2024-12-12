import { Link2 } from "lucide-react";
import { Link } from "react-router-dom";

import { IImage } from "../../app/entites/IImage";
import { IItemTour } from "../../app/entites/IItemTour";
// import { ITour } from "../../app/entites/ITour";
import { IAssingnItemCoverProps } from "../../app/services/imagesService/assignItemTourCover";

interface ICardItemImageProps {
  image: IImage;
  // tour: ITour;
  item: IItemTour;
  assignCover: ({ imageId, itemTourId }: IAssingnItemCoverProps) => void;
  removeCover: (imageId: string) => void;
  deleteImage: ({ imageId, itemTourId }: IAssingnItemCoverProps) => void;
}

export function CardItemImage({
  // tour,
  assignCover,
  removeCover,
  deleteImage,
  item,
  image,
}: ICardItemImageProps) {
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

        {item.cover === image.id && (
          <button
            className="text-xs text-redAlert font-bold"
            onClick={() => removeCover(image.id)}
          >
            Remover capa
          </button>
        )}

        {!item.cover && !image.item_cover_id && (
          <button
            className="text-xs text-blueColor-base font-bold"
            onClick={() =>
              assignCover({ imageId: image.id, itemTourId: item.id })
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
            onClick={() =>
              deleteImage({ imageId: image.id, itemTourId: item.id })
            }
          >
            Excluir
          </button>
        </div>
      </div>
    </div>
  );
}
