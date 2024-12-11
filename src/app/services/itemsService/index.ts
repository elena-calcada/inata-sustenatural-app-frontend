import { createItem } from "./createItem";
import { getItemByTour } from "./getItemBytour";
import { getItems } from "./getItems";
import { removeItem } from "./removeItem";
import { updateItemTour } from "./updateItem";

export const itemsService = {
  getItems,
  removeItem,
  createItem,
  getItemByTour,
  updateItemTour,
};
