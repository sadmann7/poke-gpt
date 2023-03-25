import type { Dispatch, SetStateAction } from "react";
import type { DropEvent, FileRejection } from "react-dropzone";

// generics
export type SetState<T> = Dispatch<SetStateAction<T>>;

// file input
export type OriginalImage = {
  name: string;
  url: string;
};

export type OnDrop =
  | (<T extends File>(
      acceptedFiles: T[],
      fileRejections: FileRejection[],
      event: DropEvent
    ) => void)
  | undefined;

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

export type TextToPokemonBody = {
  version: string;
  input: {
    prompt: string;
    num_outputs: number;
    num_inference_steps: number;
    guidance_scale: number;
    seed?: string;
  };
};

export type PredictionResult = {
  completed_at: string;
  created_at: string;
  error: string | null;
  id: string;
  input: {
    image: string;
    target_age: string;
  };
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

export type PromptResponseData = {
  input: string | null;
  output: string | null;
  id: string;
};
