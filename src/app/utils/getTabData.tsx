import React from "react";

import { TabTourImagesContent } from "../../view/components/TabTourImagesContent";
import { TabTourItemsContent } from "../../view/components/TabTourItemsContent";
import { IAssingnCoverProps } from "../services/imagesService/assignTourCover";
import { IImageProps } from "../services/imagesService/getImages";
import { IItemsProps } from "../services/itemsService/getItems";
import { IRemoveItemProps } from "../services/itemsService/removeItem";
import { ITourProps } from "../services/toursService/getTours";

interface ITabDataProps {
  images: IImageProps[];
  tour: ITourProps;
  isFetchingImages: boolean;
  handleAssignTourCover: ({ tourId, imageId }: IAssingnCoverProps) => void;
  handleRemoveTourCover: ({ tourId, imageId }: IAssingnCoverProps) => void;
  handleRemoveImage: ({ tourId, imageId }: IAssingnCoverProps) => void;
  items: IItemsProps[];
  isFetchingItems: boolean;
  handleRemoveItem: ({ itemId, tourId }: IRemoveItemProps) => void;
}

export interface ITabDataItem {
  id: number;
  title: string;
  content: React.ReactNode;
}

export function getTabData({
  handleAssignTourCover,
  handleRemoveImage,
  handleRemoveItem,
  handleRemoveTourCover,
  images,
  isFetchingImages,
  isFetchingItems,
  items,
  tour,
}: ITabDataProps): ITabDataItem[] {
  return [
    {
      id: 0,
      title: "Passeios",
      content: (
        <TabTourItemsContent
          handleRemoveItem={handleRemoveItem}
          isFetchingItems={isFetchingItems}
          items={items}
          tour={tour}
        />
      ),
    },
    {
      id: 1,
      title: "Imagens",
      content: (
        <TabTourImagesContent
          handleAssignTourCover={handleAssignTourCover}
          handleRemoveImage={handleRemoveImage}
          handleRemoveTourCover={handleRemoveTourCover}
          images={images}
          isFetchingImages={isFetchingImages}
          tour={tour}
        />
      ),
    },
  ];
}
