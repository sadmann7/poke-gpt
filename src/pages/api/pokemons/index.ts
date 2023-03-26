import type { PromptToPokemonBody, ResponseData } from "@/types/globals";
import type { NextApiRequest, NextApiResponse } from "next";

interface ExtendedNextApiRequest extends NextApiRequest {
  body: {
    prompt: string;
  };
}

export default async function handler(
  req: ExtendedNextApiRequest,
  res: NextApiResponse
) {
  const { prompt } = req.body;

  console.log(prompt);

  const responseBody: PromptToPokemonBody = {
    version: "3554d9e699e09693d3fa334a79c58be9a405dd021d3e11281256d53185868912",
    input: {
      prompt,
      num_outputs: 1,
      num_inference_steps: 25,
      guidance_scale: 7.5,
    },
  };

  const response = await fetch("https://api.replicate.com/v1/predictions", {
    method: "POST",
    headers: {
      Authorization: `Token ${process.env.REPLICATE_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...responseBody }),
  });

  if (response.status !== 201) {
    let error = await response.json();
    res.statusCode = 500;
    res.end(JSON.stringify({ detail: error.detail }));
    return;
  }

  const prediction = await response.json();
  res.statusCode = 201;
  res.end(JSON.stringify(prediction));
}
