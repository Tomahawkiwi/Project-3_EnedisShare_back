import { RequestHandler } from "express";
import { Image } from "@prisma/client";
import ResponseError from "../ResponseError";

type TImageBody = Omit<Image, "id" | "createdAt" | "updatedAt">;

type TImageBodyCreate = {
  postId?: string | null;
};

type ImageSpace = Omit<Image, "id" | "createdAt" | "updatedAt" | "postId">;

export interface ImageHandlers {
  getAll: RequestHandler<null, Image[] | ResponseError, null>;
  getOne: RequestHandler<{ id: string }, Image | ResponseError, null>;
  create: RequestHandler<null, Image | ResponseError, TImageBodyCreate>;
  createForSpace: RequestHandler<null, ImageSpace | ResponseError, null>;
  update: RequestHandler<{ id: string }, Image | ResponseError, TImageBody>;
  delete: RequestHandler;
}
