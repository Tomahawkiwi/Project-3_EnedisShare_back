import prisma from "../../../../prisma/client";
import IPostHandler from "../interface";

const getAllPosts: IPostHandler["getAll"] = async (req, res) => {
  const { categoryId, category, limit, image, spaceId, author, fromAdmin } =
    req.query;
  const { id, role } = req.user;

  // Only from admin
  if ((role === "ADMIN" || role === "SUPER_ADMIN") && fromAdmin === "true") {
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
    return;
  }

  // All users
  try {
    const allPosts = await prisma.post.findMany({
      where: {
        categoryId: { contains: categoryId },
        category: {
          AND: [
            {
              space: {
                id: {
                  contains: spaceId,
                },
              },
              members: {
                some: {
                  id: id,
                },
              },
            },
          ],
        },
        isDisabled: false,
      },

      include: {
        images: image === "true" ? { where: { isDisabled: false } } : false,
        category: category === "true" ? true : false,
        author: author === "true" ? true : false,
      },
      take: limit ? parseInt(limit) : undefined,
      skip: 0,
      orderBy: { createdAt: "desc" },
    });

    res.status(200).setHeader("Content-Range", "bytes : 0-9/*").json(allPosts);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log("Cannot get all posts");
    res.status(500).json({ message: error });
  }
};

export default getAllPosts;
