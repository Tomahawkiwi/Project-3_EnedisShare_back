import { ImageHandlers } from "./interface";
import getAll from "./handlers/getAll";
import getOne from "./handlers/getOne";
import create from "./handlers/create";
import createForSpace from "./handlers/createForSpace";
import update from "./handlers/update";
import delete_ from "./handlers/delete";

const controller: ImageHandlers = {
  getAll,
  getOne,
  create,
  createForSpace,
  delete: delete_,
  update,
};

export default controller;
