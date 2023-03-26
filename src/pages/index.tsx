import DefaultLayout from "@/components/layouts/DefaultLayout";
import Pokeball from "@/components/Pokeball";
import Button from "@/components/ui/Button";
import FileInput from "@/components/ui/FileInput";
import type { NextPageWithLayout } from "@/pages/_app";
import type {
  OriginalImage,
  ResponseData,
  UploadedFile,
} from "@/types/globals";
import { zodResolver } from "@hookform/resolvers/zod";
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { toast } from "react-hot-toast";
import { z } from "zod";

const schema = z.object({
  image: z.unknown().refine((v) => v instanceof File, {
    message: "Upload an image",
  }),
});
type Inputs = z.infer<typeof schema>;

const Home: NextPageWithLayout = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [originalImage, setOriginalImage] = useState<OriginalImage | null>(
    null
  );
  const [generatedPrompt, setGeneratedPrompt] = useState<string | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [sideBySide, setSideBySide] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isDownloading, setIsDownloading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // react-hook-form
  const { handleSubmit, formState, setValue, control, reset } = useForm<Inputs>(
    { resolver: zodResolver(schema) }
  );
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    console.log(data);
    if (!(data.image instanceof File)) return;
    await uploadImage(data.image);
  };

  // upload image to cloudinary
  const uploadImage = async (image: File) => {
    setIsLoading(true);
    const reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onload = async () => {
      const base64 = reader.result;
      if (typeof base64 !== "string") return;
      const response = await fetch("/api/upload", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          base64,
        }),
      });

      if (response.status !== 200) {
        toast.error("Something went wrong");
        setIsLoading(false);
      } else {
        const uploadedFile: UploadedFile = await response.json();
        if (!uploadedFile) return;
        setOriginalImage({
          name: image.name,
          url: uploadedFile.secureUrl,
        });
        setIsLoading(true);
        await generatePokemon(uploadedFile.secureUrl);
      }
    };
  };

  // generate pokemon from replicate
  const generatePokemon = async (imageUrl: string) => {
    await new Promise((resolve) => setTimeout(resolve, 200));
    setIsLoading(true);
    const res = await fetch("/api/generatePrompt", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ imageUrl }),
    });

    let response = (await res.json()) as ResponseData;
    if (res.status !== 200) {
      setError(response as any);
      setIsLoading(false);
    } else {
      setGeneratedPrompt(response.output);
      const res2 = await fetch("/api/generatePokemon", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: response.output }),
      });

      let response2 = (await res2.json()) as ResponseData;
      if (res2.status !== 200) {
        setError(response2 as any);
        setIsLoading(false);
      } else {
        setGeneratedImage(response2.output);
        setIsLoading(false);
      }
    }
    setTimeout(() => {
      setIsLoading(false);
    }, 1300);
  };

  console.log({
    generatedPrompt,
    generatedImage,
  });

  // moch pokemon generation
  const mockGeneratePokemon = () => {
    setIsLoading(true);
    setTimeout(() => {
      setGeneratedPrompt("A pokemon with a blue body and a red head");
      setOriginalImage({
        name: "tumblr_9db78b4044f75f24f612f4943501e419_2b620c58_2048",
        url: "https://res.cloudinary.com/dasxoa9r4/image/upload/v1679751365/poke-gpt/pepgd5gycsvpzjmvjr0f.jpg",
      });
      setGeneratedImage(
        "https://res.cloudinary.com/dasxoa9r4/image/upload/v1679751365/poke-gpt/pepgd5gycsvpzjmvjr0f.jpg"
      );
      setIsLoading(false);
    }, 16000);
  };

  return (
    <>
      <Head>
        <title>PokeGPT</title>
      </Head>
      <main className="w-full pt-40 pb-32 sm:pt-32">
        <div className="container grid max-w-6xl place-items-center gap-12 sm:gap-14">
          <div className="grid max-w-4xl place-items-center gap-5">
            <h1 className="w-full text-center text-4xl font-bold leading-tight text-gray-200 sm:text-6xl sm:leading-tight">
              Generating <span className="text-blue-500">pokemons</span> from
              your images using AI
            </h1>
            <p className="w-full text-center text-lg text-gray-400 sm:text-xl">
              Upload your image and get a pokemon generated from it
            </p>
          </div>
          <Button
            aria-label="Mock generate pokemon"
            onClick={mockGeneratePokemon}
            className="w-full max-w-lg"
          >
            Mock generate pokemon
          </Button>

          {isLoading ? (
            <Pokeball className="h-60 w-60" isGenerated={!!generatedImage} />
          ) : !originalImage ? (
            <form
              aria-label="Generate pokemon form"
              className="grid w-full max-w-lg gap-8"
              onSubmit={handleSubmit(onSubmit)}
            >
              <fieldset className="grid gap-5">
                <label
                  htmlFor="image"
                  className="sr-only text-sm font-medium sm:text-base"
                >
                  Upload your image
                </label>
                <FileInput
                  name="image"
                  setValue={setValue}
                  maxSize={10 * 1024 * 1024}
                  selectedFile={selectedFile}
                  setSelectedFile={setSelectedFile}
                  disabled={isLoading}
                />
                {formState.errors.image?.message ? (
                  <p className="text-sm font-medium text-red-500">
                    {formState.errors.image.message}
                  </p>
                ) : null}
              </fieldset>
              <Button
                aria-label="Generate pokemon"
                className="w-full"
                isLoading={isLoading}
                loadingVariant="dots"
                disabled={isLoading}
              >
                Generate pokemon
              </Button>
            </form>
          ) : (
            <div className="flex w-full flex-col items-center gap-5 sm:flex-row">
              <div className="grid w-full place-items-center gap-2 sm:w-1/2">
                <h2 className="text-base font-medium text-white sm:text-lg">
                  Original image
                </h2>
                <Image
                  src={originalImage.url}
                  alt={originalImage.name ?? "original"}
                  width={480}
                  height={480}
                  className="rounded-xl"
                  priority
                />
              </div>
              <div className="grid w-full place-items-center gap-2 sm:w-1/2">
                <h2 className="text-base font-medium text-white sm:text-lg">
                  Generated pokemon
                </h2>
                {generatedImage ? (
                  <Image
                    src={generatedImage as string}
                    alt={"Generated pokemon"}
                    width={480}
                    height={480}
                    className="rounded-xl"
                    priority
                  />
                ) : (
                  <div className="aspect-square w-full">Skeleton loading</div>
                )}
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
};

export default Home;

Home.getLayout = (page) => <DefaultLayout>{page}</DefaultLayout>;
