import prisma from "../../../../prisma/client";
import asyncFormParse from "../../../middlewares/upload/formParse";
import { uploadImage } from "../../../middlewares/upload/uploadCloudinary";
import { SpaceHandlers } from "../interface";

const updateSpace: SpaceHandlers["updateFromAdmin"] = async (req, res) => {
  const { id } = req.params;
  const { role: roleUser } = req.user;
  const { name: spaceName, description, imageUrl } = req.body;

  if (roleUser === "ADMIN" || roleUser === "SUPER_ADMIN") {
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
            siteId: "88aab5a1-4d7d-412e-9da2-0f082e569dfd",
            imageUrl: imageUrl || undefined,
          },
        });
        res.status(200).json(updatedSpace);
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error });
    }
  }
};
export default updateSpace;
