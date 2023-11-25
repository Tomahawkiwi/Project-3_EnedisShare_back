/* eslint-disable no-console */
import { ImageHandlers } from "./../interface";
import prisma from "../../../../prisma/client";
import { uploadImage } from "../../../middlewares/upload/uploadCloudinary";
import asyncFormParse from "../../../middlewares/upload/formParse";

const createImageForSpace: ImageHandlers["createForSpace"] = async (
  req,
  res
) => {
  const { id: userIdAuth } = req.user;

  const { files } = await asyncFormParse(req);

  try {
    const dataImage = await uploadImage(
      files.postImage[0].path,
      "/spacesImages"
    );
    if (dataImage) {
      const createImage = await prisma.image.create({
        data: {
          userId: userIdAuth,
          name: dataImage.name,
          url: dataImage.securePath,
        },
      });
      res.status(200).json(createImage);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
};

export default createImageForSpace;
