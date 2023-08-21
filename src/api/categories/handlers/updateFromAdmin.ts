import prisma from "../../../../prisma/client";
import { CategoryHandlers } from "../interface";

const updateCategorie: CategoryHandlers["updateFromAdmin"] = async (
  req,
  res
) => {
  console.log("updateCategorie");
  const { id } = req.params;
  const { role: roleUser } = req.user;
  const { name: categorieName, description } = req.body;
  if (roleUser === "ADMIN" || roleUser === "SUPER_ADMIN") {
    try {
      const updatedSpace = await prisma.category.update({
        where: {
          id: id,
        },
        data: {
          name: categorieName,
          description: description || undefined,
        },
      });
      res.status(200).json(updatedSpace);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error });
    }
  }
};
export default updateCategorie;
