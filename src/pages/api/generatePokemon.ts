import type { PromptToPokemonBody, ResponseData } from "@/types/globals";
import type { NextApiRequest, NextApiResponse } from "next";

interface ExtendedNextApiRequest extends NextApiRequest {
  body: {
    prompt: string;
  };
}

export default async function handler(
  req: ExtendedNextApiRequest,
  res: NextApiResponse<ResponseData | string>
) {
  try {
    const { prompt } = req.body;
    console.log(prompt);

    // POST request to Replicate to start the image restoration generation process
    const responseBody: PromptToPokemonBody = {
      version:
        "3554d9e699e09693d3fa334a79c58be9a405dd021d3e11281256d53185868912",
      input: {
        prompt,
        num_outputs: 1,
        num_inference_steps: 25,
        guidance_scale: 7.5,
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
    const originalInput = jsonStartResponse.input.prompt;
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
        generatedOutput = jsonFinalResponse.output[0] as string;
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
    res.status(500).json("Failed to generate pokemon");
  }
}
