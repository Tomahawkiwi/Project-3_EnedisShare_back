import { SpaceHandlers } from "./interface";
import getAll from "./handlers/getAll";
import getOne from "./handlers/getOne";
import create from "./handlers/create";
import update from "./handlers/update";
import uploadSpaceImage from "./handlers/uploadSpaceImage";
import delete_ from "./handlers/delete";
import addUser from "./handlers/addUser";
import removeUser from "./handlers/removeUser";
import disable from "./handlers/disable";
import undisable from "./handlers/undisable";

const controller: SpaceHandlers = {
  getAll,
  getOne,
  create,
  delete: delete_,
  update,
  uploadSpaceImage,
  addUser,
  removeUser,
  disable,
  undisable,
};

export default controller;
