import { Role, User } from "@prisma/client";
import { RequestHandler } from "express";
import ResponseError from "../ResponseError";

export type TUserWithoutPassword = Omit<User, "password">;

type TUserBody = Omit<User, "id" | "createdAt" | "updatedAt">;

type TUserBodyUpdate = Omit<TUserBody, "password">;

type TUserQuery = {
  userExcluded: string;
  team: string;
  limit: string;
  spaceId: string;
  categoryId: string;
};

type TUserBodyAdmin = {
  firstname?: string;
  lastname?: string;
  email?: string;
  birthday?: Date;
  teamId?: string;
  workLocation?: string;
  isDisabled?: boolean;
  showBirthday?: boolean;
  showEmail?: boolean;
  role: Role;
  imageUrl?: string | null;
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
  create: RequestHandler<null, TUserWithoutPassword | ResponseError, TUserBody>;
  update: RequestHandler<
    { id: string },
    TUserWithoutPassword | ResponseError,
    TUserBodyUpdate
  >;
  updateFromAdmin: RequestHandler<
    {
      id: string;
    },
    TUserBodyAdmin | ResponseError,
    TUserBodyAdmin
  >;
  delete: RequestHandler<
    { id: string },
    TUserWithoutPassword | ResponseError,
    null
  >;
}
