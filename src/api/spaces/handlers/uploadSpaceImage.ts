/* eslint-disable no-console */

import { SpaceHandlers } from "../interface";
import asyncFormParse from "../../../middlewares/upload/formParse";
import { uploadImage } from "../../../middlewares/upload/uploadCloudinary";

const uploadSpaceImage: SpaceHandlers["uploadSpaceImage"] = async (
  req,
  res
) => {
  const { role: authRole } = req.user;
  const { fromAdmin } = req.query;

  const { files } = await asyncFormParse(req);
  // Only from admin
  if (
    (authRole === "ADMIN" || authRole === "SUPER_ADMIN") &&
    fromAdmin === "true"
  ) {
    try {
      const dataImage = await uploadImage(
        files.postImage[0].path,
        "/spaceImages"
      );
      if (dataImage) {
        res.status(200).json({ url: dataImage.securePath });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error });
    }
  } else {
    res.status(403).json({ message: "Unauthorized" });
  }
};

export default uploadSpaceImage;
