import getAll from "./handlers/getAll";
import getOne from "./handlers/getOne";
import create from "./handlers/create";
import update from "./handlers/update";
import updateFromAdmin from "./handlers/updateFromAdmin";
import delete_ from "./handlers/delete";

const controller = {
  getAll,
  getOne,
  create,
  update,
  updateFromAdmin,
  delete_,
};

export default controller;
