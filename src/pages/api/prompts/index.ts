import type { ClipInterrogatorBody } from "@/types/globals";
import type { NextApiRequest, NextApiResponse } from "next";

interface ExtendedNextApiRequest extends NextApiRequest {
  body: {
    imageUrl: string;
  };
}

export default async function handler(
  req: ExtendedNextApiRequest,
  res: NextApiResponse
) {
  try {
    const { imageUrl } = req.body;
    console.log(req.body);

    const predictionBody: ClipInterrogatorBody = {
      version:
        "a4a8bafd6089e1716b06057c42b19378250d008b80fe87caa5cd36d40c1eda90",
      input: {
        image: imageUrl,
        clip_model_name: "ViT-L-14/openai",
        mode: "fast",
      },
    };

    const response = await fetch("https://api.replicate.com/v1/predictions", {
      method: "POST",
      headers: {
        Authorization: `Token ${process.env.REPLICATE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...predictionBody,
      }),
    });

    if (response.status !== 201) {
      let error = await response.json();
      res.statusCode = 500;
      res.end(JSON.stringify({ detail: error.detail }));
      return;
    }

    const prediction = await response.json();
    console.log(prediction);
    res.statusCode = 201;
    res.end(JSON.stringify(prediction));
  } catch (error) {
    error instanceof Error
      ? res.end(JSON.stringify({ detail: error.message }))
      : res.end(JSON.stringify({ detail: error }));
  }
}
