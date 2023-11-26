/* eslint-disable no-console */

import { SpaceHandlers } from "../interface";
import prisma from "../../../../prisma/client";
import asyncFormParse from "../../../middlewares/upload/formParse";
import { uploadImage } from "../../../middlewares/upload/uploadCloudinary";

const updateSpaceImage: SpaceHandlers["updateSpaceImage"] = async (
  req,
  res
) => {
  const { id: spaceId } = req.params;
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
        const spaceUpdated = await prisma.space.update({
          where: { id: spaceId },
          data: {
            imageUrl: dataImage.securePath,
          },
        });
        res.status(200).json(spaceUpdated);
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error });
    }
  } else {
    res.status(403).json({ message: "Unauthorized" });
  }
};

export default updateSpaceImage;
