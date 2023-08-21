import prisma from "../../../../prisma/client";
import IPostHandler from "../interface";

const getAllPostsByAdmin: IPostHandler["getAllPostsByAdmin"] = async (
  req,
  res
) => {
  const { role } = req.user;

  if (role === "ADMIN" || role === "SUPER_ADMIN") {
    try {
      const allPostsByAdmin = await prisma.post.findMany({
        include: {
          author: { select: { firstname: true, lastname: true } },
          category: {
            select: { name: true, space: { select: { name: true } } },
          },
        },
      });

      res.status(200).json(allPostsByAdmin);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log("Cannot get all posts");
      res.status(500).json({ message: error });
    }
  }
};

export default getAllPostsByAdmin;
