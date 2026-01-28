import { Button } from "@/components/ui/button";
import { useTranslation } from "@/store/useLanguage";
import { useRegistrationStore } from "@/store/useRegistration";
import { useStep } from "@/store/useStep";
import { UploadIcon, X } from "lucide-react";
import Image from "next/image";
import { ChangeEvent, FormEvent, useRef, useState } from "react";
import { toast } from "sonner";
import { API_URL } from "@/lib/env";

export const MarathonImage = () => {
  const imageRef = useRef<HTMLInputElement>(null);

  const [image, setImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const { identificationNumber } = useRegistrationStore();
  const [loading, setLoading] = useState<boolean>(false);

  const t = useTranslation();
  const { nextStep, previousStep } = useStep();

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const ext = file.name.split(".").pop();
    if (ext !== "jpg" && ext !== "jpeg" && ext !== "png") {
      toast.error("Please upload a valid image (jpg, jpeg, png)");
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    setImage(file);
    setPreviewUrl(objectUrl);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    if (!identificationNumber) {
      toast.error("Identification number is not yet assigned");
      return;
    }

    if (!image) {
      toast.error("Please upload image");
      return;
    }

    try {
      const formData = new FormData();
      const extension = image.name.split(".").pop();

      formData.append("file", image);
      formData.append("filename", `${identificationNumber}.${extension}`);

      const response = await fetch(`${API_URL}/image/upload`, {
        method: "POST",
        body: formData,
      });

      await response.json();

      fetch(`${API_URL}/image/process/${identificationNumber}`, {
        method: "POST",
      });

      nextStep();
    } catch (error) {
      console.error(error);
      toast.error("Failed to upload image");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <p className="text-sm">{t.image.description}</p>

      <div
        onClick={() => imageRef?.current?.click()}
        className="w-full relative overflow-hidden p-2 mt-5 space-y-2  hover:text-primary hover:border-primary flex bg-white/20 flex-col text-white transition-colors justify-center border-dashed items-center h-60 border-2 rounded-xl"
      >
        {previewUrl ? (
          <>
            <Image
              src={previewUrl}
              alt="image"
              height={152}
              width={120}
              className="h-full w-fit object-contain"
            />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                setImage(null);
                setPreviewUrl(null);
              }}
              className="absolute top-0 right-2 size-7 text-white z-10 hover:text-primary"
            >
              <X />
            </Button>
          </>
        ) : (
          <>
            <UploadIcon className="size-8" />
            <p className="font-semibold text-lg">{t.image.upload_button}</p>
          </>
        )}
      </div>
      <input
        ref={imageRef}
        onChange={handleImageChange}
        type="file"
        id="marathon-image"
        className="hidden"
        accept=".jpg, .jpeg, .png"
      />
      <div className="mt-4 pt-4 flex justify-between gap-3  border-purple-100">
        <Button
          type="button"
          onClick={previousStep}
          variant="secondary"
          size="sm"
        >
          {t.personal.back_button}
        </Button>
        <Button isLoading={loading} disabled={!image} type="submit" size="sm">
          {t.personal.next_button}
        </Button>
      </div>
    </form>
  );
};
