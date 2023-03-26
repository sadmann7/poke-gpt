import type {
  ClipInterrogatorBody,
  ImageToPromptBody,
  ResponseData,
} from "@/types/globals";
import type { NextApiRequest, NextApiResponse } from "next";

interface ExtendedNextApiRequest extends NextApiRequest {
  body: {
    imageUrl: string;
  };
}

export default async function handler(
  req: ExtendedNextApiRequest,
  res: NextApiResponse<ResponseData | string>
) {
  try {
    const { imageUrl } = req.body;
    console.log(imageUrl);

    // POST request to Replicate to start the image restoration generation process
    // const responseBody: ImageToPromptBody = {
    //   version: "50adaf2d3ad20a6f911a8a9e3ccf777b263b8596fbd2c8fc26e8888f8a0edbb5",
    //   input: {
    //     image: imageUrl,
    //   },
    // };

    const responseBody: ClipInterrogatorBody = {
      version:
        "a4a8bafd6089e1716b06057c42b19378250d008b80fe87caa5cd36d40c1eda90",
      input: {
        image: imageUrl,
        clip_model_name: "ViT-L-14/openai",
        mode: "fast",
      },
    };

    let startResponse = await fetch(
      "https://api.replicate.com/v1/predictions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${process.env.REPLICATE_API_KEY}`,
        },
        body: JSON.stringify({ ...responseBody }),
      }
    );

    let jsonStartResponse = await startResponse.json();

    let endpointUrl = jsonStartResponse.urls.get;
    const originalInput = jsonStartResponse.input.image;
    const generationId = jsonStartResponse.id;

    // GET request to get the status of the image restoration process & return the result when it's ready
    let generatedOutput: string | null = null;
    while (!generatedOutput) {
      // Loop in 1s intervals until the alt text is ready
      let finalResponse = await fetch(endpointUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Token " + process.env.REPLICATE_API_KEY,
        },
      });
      let jsonFinalResponse = await finalResponse.json();

      if (jsonFinalResponse.status === "succeeded") {
        generatedOutput = jsonFinalResponse.output as string;
      } else if (jsonFinalResponse.status === "failed") {
        break;
      } else {
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
    }

    res.status(200).json(
      generatedOutput
        ? {
            id: generationId,
            input: originalInput,
            output: generatedOutput,
          }
        : "Generation failed"
    );
  } catch (error) {
    console.error(error);
    res.status(500).json("Failed to generate prompt");
  }
}
