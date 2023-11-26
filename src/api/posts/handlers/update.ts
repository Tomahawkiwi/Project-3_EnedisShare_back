import prisma from "../../../../prisma/client";
import IPostHandler from "../interface";

const updatePost: IPostHandler["update"] = async (req, res) => {
  const { id } = req.params;
  const { id: authId, role } = req.user;
  const { fromAdmin } = req.query;

  // Only from admin
  if ((role === "ADMIN" || role === "SUPER_ADMIN") && fromAdmin === "true") {
    const { isDisabled } = req.body;
    try {
      const updateAPost = await prisma.post.update({
        where: {
          id,
        },
        data: {
          isDisabled,
        },
      });
      res.status(200).json(updateAPost);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log("Cannot update this post");
      res.status(500).json({ message: error });
    }
    return;
  }

  // All users
  if (id === authId) {
    const { authorId, categoryId, content, title } = req.body;
    try {
      const updateAPost = await prisma.post.update({
        where: {
          id,
        },
        data: {
          authorId,
          categoryId,
          content,
          title,
        },
      });
      res.status(200).json(updateAPost);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log("Cannot update this post");
      res.status(500).json({ message: error });
    }
  } else {
    res.status(403).json({ message: "Forbidden" });
  }
};

export default updatePost;
