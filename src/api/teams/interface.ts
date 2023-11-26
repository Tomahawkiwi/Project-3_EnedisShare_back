import { RequestHandler } from "express";
import ResponseError from "../ResponseError";
import { Team } from "@prisma/client";

type TTeamBody = {
  name: string;
};

type TQueryParam = {
  members?: string;
  fromAdmin?: string;
};

export interface ITeamHandlers {
  getAll: RequestHandler<null, Team[] | ResponseError, null, TQueryParam>;
  getOne: RequestHandler<{ id: string }, Team | ResponseError, null>;
  create: RequestHandler<null, Team | ResponseError, TTeamBody, TQueryParam>;
  update: RequestHandler<{ id: string }, Team | ResponseError, TTeamBody>;
  delete: RequestHandler<{ id: string }, Team | ResponseError, null>;
}
