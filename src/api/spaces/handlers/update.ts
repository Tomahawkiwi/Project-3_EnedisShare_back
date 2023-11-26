/* eslint-disable no-console */

import { SpaceHandlers } from "./../interface";
import prisma from "../../../../prisma/client";
import asyncFormParse from "../../../middlewares/upload/formParse";
import { uploadImage } from "../../../middlewares/upload/uploadCloudinary";

const updateSpace: SpaceHandlers["update"] = async (req, res) => {
  const { id } = req.params;
  const { role: roleUser } = req.user;
  const { name: spaceName, description, imageUrl } = req.body;
  const { fromAdmin } = req.query;
  const siteId = process.env.CLOUDINARY_DIRECTORY;

  // Only from admin
  if (
    (roleUser === "ADMIN" || roleUser === "SUPER_ADMIN") &&
    fromAdmin === "true"
  ) {
    try {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      if (req.headers["content-type"]!.includes("multipart/form-data")) {
        const { files } = await asyncFormParse(req);
        const dataSpacePicture =
          files.imageUrl &&
          (await uploadImage(files.imageUrl[0].path, "/spaceImages"));

        const updatedSpace = await prisma.space.update({
          where: {
            id: id,
          },
          data: {
            imageUrl: dataSpacePicture
              ? dataSpacePicture.securePath
              : undefined,
          },
        });
        res.status(200).json(updatedSpace);
      } else {
        const updatedSpace = await prisma.space.update({
          where: {
            id: id,
          },
          data: {
            name: spaceName || undefined,
            description: description || undefined,
            siteId: siteId,
            imageUrl: imageUrl || undefined,
          },
        });
        res.status(200).json(updatedSpace);
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
      res.status(500).json({ message: error });
    }
  } else {
    return res.status(403).json({ message: "Forbidden" });
  }
  return;
};

export default updateSpace;
