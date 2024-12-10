import { Edit, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

import { IItemsProps } from "../../app/services/itemsService/getItems";
import { IRemoveItemProps } from "../../app/services/itemsService/removeItem";

interface ICardProps {
  href: string;
  hrefEdit: string;
  item: IItemsProps;
  deleteItem: ({ itemId, tourId }: IRemoveItemProps) => void;
}

export function ItemCard({ href, hrefEdit, item, deleteItem }: ICardProps) {
  return (
    <div className="w-full bg-blueColor-backgroundCard shadow-md flex items-center gap-4 rounded-lg">
      <div className="w-full flex items-center justify-between border-l-[10px] border-blueColor-dark rounded-s-lg px-6 py-2">
        <Link
          to={href}
          className="text-[14px] flex items-center gap-3 font-montserrat font-bold text-blueColor-dark hover:text-blueColor-base transition-all"
        >
          {item.cover ? (
            <div className="w-12 h-12">
              <img
                src={`${import.meta.env.VITE_PUBLIC_IMAGE_URL}/${item.cover}`}
                sizes="3rem"
                alt=""
                className="w-full h-full rounded-md object-cover"
              />
            </div>
          ) : (
            <div className="w-12 h-12 rounded-md bg-blueColor-backgroundCard/20 flex items-center justify-center">
              <span className="text-blueColor-base/50 font-bold text-sm text-center">
                Capa
              </span>
            </div>
          )}
          {item.title}
        </Link>
        <div className="flex items-center gap-6">
          <Link
            to={hrefEdit}
            className="text-blueColor-dark hover:scale-[1.1] transition-all"
          >
            <Edit size={24} />
          </Link>
          <button
            onClick={() =>
              deleteItem({ tourId: item.tour_id, itemId: item.id })
            }
            className="text-redAlert hover:scale-[1.1] transition-all"
          >
            <Trash2 size={24} />
          </button>
        </div>
      </div>
    </div>
  );
}
