import type { NextApiRequest } from "next";
import type { DropEvent, FileRejection } from "react-dropzone";

// next api request
export interface NextApiRequestReplicate extends NextApiRequest {
  body: {
    theme: string;
    room: string;
    image: string;
  };
}

export interface NextApiRequestCloudinary extends NextApiRequest {
  body: {
    base64: string;
  };
}

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
export type ControlNetBody = {
  version: string;
  input: {
    image: string;
    prompt: string;
    a_prompt: string;
    n_prompt: string;
    num_samples?: string;
    image_resolution?: string;
    ddim_steps?: number;
    scale?: number;
    eta?: number;
    detect_resolution?: number;
    value_threshold?: number;
    distance_threshold?: number;
  };
};

export type DeticBody = {
  version: string;
  input: {
    image: string;
    vocabulary: "lvis" | "objects365" | "openimages" | "coco" | "custom";
    custom_vocabulary: string;
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

// form
export enum THEME {
  MODERN = "Modern",
  VINTAGE = "Vintage",
  MINIMALIST = "Minimalist",
  PROFESSIONAL = "Professional",
  TROPICAL = "Tropical",
}

export enum ROOM {
  LIVING_ROOM = "Living Room",
  DINING_ROOM = "Dining Room",
  BEDROOM = "Bedroom",
  BATHROOM = "Bathroom",
  OFFICE = "Office",
  GAMING_ROOM = "Gaming Room",
  KITCHEN = "Kitchen",
}
