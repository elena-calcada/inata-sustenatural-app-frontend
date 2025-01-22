import { PackageOpen } from "lucide-react";

import { IItemsProps } from "../../app/services/itemsService/getItems";
import { IRemoveItemProps } from "../../app/services/itemsService/removeItem";
import { ITourProps } from "../../app/services/toursService/getTours";

import { ButtonLink } from "./ButtonLink";
import { ItemCard } from "./CardItem";
import { Spinner } from "./Spinner";

interface ITabTourItemsProps {
  items: IItemsProps[];
  tour: ITourProps;
  isFetchingItems: boolean;
  handleRemoveItem: ({ itemId, tourId }: IRemoveItemProps) => void;
}

export function TabTourItemsContent({
  items,
  tour,
  isFetchingItems,
  handleRemoveItem,
}: ITabTourItemsProps) {
  return (
    <section className="w-full">
      <div className="w-full flex items-center justify-between gap-4 border-b-[1px] border-textColor/25 pb-2 mb-4">
        <div className="">
          <span className="text-base font-semibold font-montserrat">
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
    </section>
  );
}
