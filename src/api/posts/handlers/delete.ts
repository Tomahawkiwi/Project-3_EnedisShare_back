import IPostHandler from "../interface";
import prisma from "../../../../prisma/client";

const deletePost: IPostHandler["delete"] = async (req, res) => {
  const { id } = req.params;
  const { role } = req.user;
  const { fromAdmin } = req.query;

  // Only from admin
  if ((role === "ADMIN" || role === "SUPER_ADMIN") && fromAdmin === "true") {
    try {
      await prisma.comment.deleteMany({
        where: { postId: id },
      });
      const postDeleted = await prisma.post.delete({
        where: { id },
      });
      res.status(200).json(postDeleted);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log("Cannot delete the post");
      res.status(500).json({ message: error });
    }
    return;
  } else {
    return res
      .status(403)
      .json({ message: "Forbidden, you don't have the right access" });
  }
};

export default deletePost;
