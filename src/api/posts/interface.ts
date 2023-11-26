import { Post } from "@prisma/client";
import { RequestHandler } from "express";
import ResponseError from "../ResponseError";

type TPostBody = Omit<Post, "id" | "createdAt" | "updatedAt">;

type TPostQuery = {
  categoryId?: string;
  category?: string;
  image?: string;
  limit?: string;
  spaceId?: string;
  author?: string;
  space?: string;
  fromAdmin?: string;
};

type TPostBodyAdmin = {
  isDisabled: boolean;
};

export default interface IPostHandler {
  getAll: RequestHandler<null, Post[] | ResponseError, null, TPostQuery>;
  getOne: RequestHandler<{ id: string }, Post | ResponseError, null>;
  create: RequestHandler<null, Post | ResponseError, TPostBody>;
  update: RequestHandler<
    { id: string },
    Post | TPostBodyAdmin | ResponseError,
    TPostBody,
    TPostQuery
  >;
  delete: RequestHandler<{ id: string }, Post | ResponseError, null>;
  disable: RequestHandler<{ id: string }, Post | ResponseError, null>;
  undisable: RequestHandler<{ id: string }, Post | ResponseError, null>;
}
