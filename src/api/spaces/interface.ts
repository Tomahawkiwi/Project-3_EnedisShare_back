import { RequestHandler } from "express";
import { Space } from "@prisma/client";
import ResponseError from "../ResponseError";

type TSpaceBody = Omit<Space, "id" | "createdAt" | "updatedAt">;

type TSpaceBodyAdmin = {
  name?: string;
  description?: string;
  imageUrl: string;
  siteId?: string;
  ownerId?: string;
};

type TSpaceQuery = { categories?: string; owner?: string; fromAdmin?: string };

type TAddUserBody = string[];
type TRemoveUserBody = string[];

export interface SpaceHandlers {
  getAll: RequestHandler<null, Space[] | ResponseError, null, TSpaceQuery>;
  getOne: RequestHandler<
    { id: string },
    Space | ResponseError,
    null,
    TSpaceQuery
  >;
  create: RequestHandler<
    { id: string },
    Space | TSpaceBodyAdmin | ResponseError | string,
    TSpaceBody | TSpaceBodyAdmin,
    TSpaceQuery
  >;
  update: RequestHandler<
    { id: string },
    Space | TSpaceBodyAdmin | ResponseError,
    TSpaceBody | TSpaceBodyAdmin,
    TSpaceQuery
  >;
  updateSpaceImage: RequestHandler<
    { id: string },
    TSpaceBodyAdmin | ResponseError,
    TSpaceBody,
    TSpaceQuery
  >;
  delete: RequestHandler;
  addUser: RequestHandler<
    { id: string },
    Space | ResponseError,
    TAddUserBody,
    TSpaceQuery
  >;
  removeUser: RequestHandler<
    { id: string },
    Space | ResponseError,
    TRemoveUserBody,
    TSpaceQuery
  >;
  disable: RequestHandler<{ id: string }, Space | ResponseError, null>;
  undisable: RequestHandler<{ id: string }, Space | ResponseError, null>;
}
