import { Loader2Icon, PackageOpenIcon, Trash2Icon } from "lucide-react";
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { useNavigate } from "react-router-dom";

import { getPresignedURL } from "../../../app/services/uploadImagesService/getPresignedURL";
import { uploadImage } from "../../../app/services/uploadImagesService/uploadImage";
import { cn } from "../../../app/utils/cn";
import { formatBytes } from "../../../app/utils/formatBytes";
import { showSuccessToast } from "../../../app/utils/toast";
import { ButtonBack } from "../../components/ButtonBack";
import { ButtonSend } from "../../components/ButtonSend";
import { Progress } from "../../components/Progress";
import { Spinner } from "../../components/Spinner";

import { useUploadImagesController } from "./useUploadImagesController";

interface IUpload {
  file: File;
  progress: number;
}

export function UploadImages() {
  const { tour } = useUploadImagesController();

  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [uploads, setUploads] = useState<IUpload[]>([]);
  const tourId = tour ? tour.id : "";

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles) => {
      setUploads((prevState) =>
        prevState.concat(acceptedFiles.map((file) => ({ file, progress: 0 }))),
      );
    },
  });

  function handleRemoveUpload(removingIndex: number) {
    setUploads((prevState) => {
      const newState = [...prevState];
      newState.splice(removingIndex, 1);

      return newState;
    });
  }

  async function handleUpload() {
    try {
      setIsLoading(true);

      const uploadObjects = await Promise.all(
        uploads.map(async ({ file }) => ({
          file,
          url: await getPresignedURL(file, tourId),
        })),
      );

      const response = await Promise.allSettled(
        uploadObjects.map(({ file, url }, index) =>
          uploadImage(url, file, (progress) => {
            setUploads((prevState) => {
              const newState = [...prevState];
              const upload = newState[index];

              newState[index] = {
                ...upload,
                progress,
              };

              return newState;
            });
          }),
        ),
      );

      response.forEach((res, index) => {
        if (res.status === "rejected") {
          const fileWithError = uploads[index].file;
          console.log(`O upload do arquivo ${fileWithError.name} falhou.`);
        }
      });

      setUploads([]);
      showSuccessToast("Uploads realizados com sucesso!");
    } catch {
    } finally {
      setIsLoading(false);
    }

    navigate(`/tours/${tour?.id}`);
  }

  return (
    <>
      {!tour && (
        <div className="w-full h-full flex justify-center items-center">
          <Spinner />
        </div>
      )}
      {tour && (
        <div className="bg-background flex flex-col items-center py-28 px-6 h-screen overflow-y-auto">
          <div className="flex items-center gap-2 mb-6">
            <h1 className="text-xl font-bold">
              Inserir Imagens para{" "}
              <span className="text-blueColor-dark">{tour.title}</span>
            </h1>
            <ButtonBack href={`/tours/${tour.id}`} containerStyle="" />
          </div>

          <div className="w-full max-w-xl">
            <div
              {...getRootProps()}
              className={cn(
                "border border-textColor/30 h-60 w-full rounded-md border-dashed transition-colors flex items-center justify-center flex-col cursor-pointer bg-white",
                isDragActive && "border-textColor/80 bg-blueColor-dark/10",
              )}
            >
              <input {...getInputProps()} />

              <PackageOpenIcon className="size-10 stroke-1 mb-2" />

              <span>Solte suas imagens aqui</span>
              <small className="text-textColor/70">
                Apenas arquivos PNG, JPEG e JPG de até 2MB
              </small>
            </div>

            {uploads.length > 0 && (
              <div className="mt-10">
                <h2 className="font-medium text-2xl tracking-tight">
                  Arquivos selecionados
                </h2>

                <div className="mt-4 space-y-2">
                  {uploads.map(({ file, progress }, index) => (
                    <div
                      key={file.name}
                      className="border border-textColor/30 p-3 rounded-md bg-white"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-start justify-start flex-col">
                          <span className="text-sm font-medium">
                            {file.name}
                          </span>
                          <span className="text-[12px]">
                            {formatBytes(file.size)}
                          </span>
                        </div>
                        <button
                          className="text-white bg-redAlert p-2 rounded-md hover:bg-redAlert/85 transition-all"
                          onClick={() => handleRemoveUpload(index)}
                        >
                          <Trash2Icon className="size-4" />
                        </button>
                      </div>

                      <Progress className="h-2 mt-3" value={progress} />
                    </div>
                  ))}
                </div>

                <ButtonSend
                  onClick={handleUpload}
                  disabled={isLoading}
                  className="mt-4 w-full flex items-center justify-center"
                >
                  {isLoading ? (
                    <Loader2Icon className="size-4 animate-spin" />
                  ) : (
                    <span>Upload</span>
                  )}
                </ButtonSend>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
