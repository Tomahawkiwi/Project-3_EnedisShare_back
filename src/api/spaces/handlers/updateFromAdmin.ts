import prisma from "../../../../prisma/client";
import { SpaceHandlers } from "../interface";

const updateSpace: SpaceHandlers["updateFromAdmin"] = async (req, res) => {
  const { id } = req.params;
  const { role: roleUser } = req.user;
  const { name: spaceName, description, imageUrl } = req.body;
  if (roleUser === "ADMIN" || roleUser === "SUPER_ADMIN") {
    try {
      const updatedSpace = await prisma.space.update({
        where: {
          id: id,
        },
        data: {
          name: spaceName || undefined,
          description: description || undefined,
          imageUrl: imageUrl || undefined,
          siteId: "88aab5a1-4d7d-412e-9da2-0f082e569dfd",
        },
      });
      res.status(200).json(updatedSpace);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error });
    }
  }
};
export default updateSpace;
