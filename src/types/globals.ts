import type { Dispatch, SetStateAction } from "react";

export type SetState<T> = Dispatch<SetStateAction<T>>;

// file
export type OriginalImage = {
  name: string;
  url: string;
};

export type UploadedFile = {
  publicId: string;
  secureUrl: string;
  createdAt: string;
};

// replicate
export type ImageToPromptBody = {
  version: string;
  input: {
    image: string;
  };
};

export type ClipInterrogatorBody = {
  version: string;
  input: {
    image: string;
    clip_model_name: "ViT-L-14/openai" | "ViT-H-14/laion2b_s32b_b79k";
    mode: "best" | "fast";
  };
};

export type PromptToPokemonBody = {
  version: string;
  input: {
    prompt: string;
    num_outputs: number;
    num_inference_steps: number;
    guidance_scale: number;
    seed?: string;
  };
};

export type ResponseData = {
  id: string;
  input: string | null;
  output: string | null;
};

export type PredictionResult<TInput> = {
  completed_at: string;
  created_at: string;
  error: string | null;
  id: string;
  input: TInput;
  logs: string;
  metrics: {
    predict_time: number;
  };
  output: string | null;
  started_at: string;
  status: "starting" | "succeeded" | "failed";
  urls: {
    cancel: string;
    get: string;
  };
  version: string;
  webhook_completed: null;
};
