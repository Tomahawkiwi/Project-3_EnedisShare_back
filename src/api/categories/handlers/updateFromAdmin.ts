import prisma from "../../../../prisma/client";
import { CategoryHandlers } from "../interface";

const updateCategorie: CategoryHandlers["updateFromAdmin"] = async (
  req,
  res
) => {
  const { id } = req.params;
  const { name: categorieName, description } = req.body;
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
};
export default updateCategorie;
