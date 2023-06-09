import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const response = await fetch(
      `https://api.replicate.com/v1/predictions/${req.query.id} `,
      {
        headers: {
          Authorization: `Token ${process.env.REPLICATE_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (response.status !== 200) {
      let error = await response.json();
      res.statusCode = 500;
      res.end(JSON.stringify({ detail: error.detail }));
      return;
    }

    const prediction = await response.json();
    res.end(JSON.stringify(prediction));
  } catch (error) {
    error instanceof Error
      ? res.end(JSON.stringify({ detail: error.message }))
      : res.end(JSON.stringify({ detail: error }));
  }
}
