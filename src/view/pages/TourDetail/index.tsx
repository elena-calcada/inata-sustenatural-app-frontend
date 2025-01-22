import { getTabData } from "../../../app/utils/getTabData";
import { ButtonBack } from "../../components/ButtonBack";
import { Spinner } from "../../components/Spinner";
import { Tabs } from "../../components/Tabs";

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

  if (!tour) {
    return undefined;
  }

  const tabData = getTabData({
    images,
    tour,
    isFetchingImages,
    handleAssignTourCover,
    handleRemoveTourCover,
    handleRemoveImage,
    items,
    isFetchingItems,
    handleRemoveItem,
  });

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

            <Tabs tabs={tabData} />
          </div>
        )}
      </section>
    </main>
  );
}
