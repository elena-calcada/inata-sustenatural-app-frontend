import { createTour } from "./createTourService";
import { deleteTour } from "./deleteTour";
import { getTourById } from "./getTourById";
import { getTours } from "./getTours";
import { updateTour } from "./updateTour";

export const toursService = {
  getTours,
  createTour,
  getTourById,
  updateTour,
  deleteTour,
};
