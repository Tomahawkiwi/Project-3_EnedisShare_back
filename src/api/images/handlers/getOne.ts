/* eslint-disable no-console */

import { ImageHandlers } from "./../interface";
import prisma from "../../../../prisma/client";

const getOneImage: ImageHandlers["getOne"] = async (req, res) => {
  const { id } = req.params;
  const { role } = req.user;
  const { fromAdmin } = req.query;

  if ((role === "ADMIN" || role === "SUPER_ADMIN") && fromAdmin === "true") {
    try {
      const getImage = await prisma.image.findUniqueOrThrow({
        where: {
          id: id,
        },
      });
      res.status(200).json(getImage);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error });
    }
  } else {
    return res.status(403).json({ message: "Forbidden" });
  }
};

export default getOneImage;
