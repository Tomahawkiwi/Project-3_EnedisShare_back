import { SpaceHandlers } from "./interface";
import getAll from "./handlers/getAll";
import getOne from "./handlers/getOne";
import create from "./handlers/create";
import createFromAdmin from "./handlers/createFromAdmin";
import update from "./handlers/update";
import updateFromAdmin from "./handlers/updateFromAdmin";
import delete_ from "./handlers/delete";
import addUser from "./handlers/addUser";
import removeUser from "./handlers/removeUser";
import disable from "./handlers/disable";
import undisable from "./handlers/undisable";

const controller: SpaceHandlers = {
  getAll,
  getOne,
  create,
  createFromAdmin,
  delete: delete_,
  update,
  updateFromAdmin,
  addUser,
  removeUser,
  disable,
  undisable,
};

export default controller;
