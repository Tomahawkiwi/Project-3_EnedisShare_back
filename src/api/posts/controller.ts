import IPostHandler from "./interface";
import delete_ from "./handlers/delete";
import getAll from "./handlers/getAll";
import getAllPostsByAdmin from "./handlers/getAllFromAdmin";
import getOne from "./handlers/getOne";
import create from "./handlers/create";
import update from "./handlers/update";
import updatePostByAdmin from "./handlers/updateFromAdmin";
import disable from "./handlers/disable";
import undisable from "./handlers/undisable";

const controller: IPostHandler = {
  update,
  updatePostByAdmin,
  create,
  getAll,
  getAllPostsByAdmin,
  getOne,
  delete: delete_,
  disable,
  undisable,
};

export default controller;
