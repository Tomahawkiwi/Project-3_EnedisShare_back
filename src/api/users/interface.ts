import { Role, User } from "@prisma/client";
import { RequestHandler } from "express";
import ResponseError from "../ResponseError";

export type TUserWithoutPassword = Omit<User, "password">;

type TUserBody = Omit<User, "createdAt" | "updatedAt">;

type TUserBodyCreate = TUserBody & { site: string };

type TUserBodyUpdate = Omit<TUserBody, "password">;

type TUserQuery = {
  userExcluded: string;
  team: string;
  limit: string;
  spaceId: string;
  categoryId: string;
  role?: Role;
  fromAdmin?: string;
};

export interface IUserHandlers {
  getAll: RequestHandler<
    null,
    TUserWithoutPassword[] | ResponseError,
    null,
    TUserQuery
  >;
  getOne: RequestHandler<
    { id: string },
    TUserWithoutPassword | ResponseError,
    null
  >;
  create: RequestHandler<
    null,
    TUserWithoutPassword | ResponseError,
    TUserBodyCreate,
    TUserQuery
  >;
  update: RequestHandler<
    { id: string },
    TUserWithoutPassword | ResponseError,
    TUserBodyUpdate,
    TUserQuery
  >;
  delete: RequestHandler<
    { id: string },
    TUserWithoutPassword | ResponseError,
    null
  >;
}
