/* eslint-disable no-console */

import { ICommentHandlers } from "../interface";
import prisma from "../../../../prisma/client";

const getAllComments: ICommentHandlers["getAll"] = async (req, res) => {
  const { post, postId, author, authorId, fromAdmin } = req.query;
  const { id: userId, role } = req.user;

  // Only from admin
  if ((role === "ADMIN" || role === "SUPER_ADMIN") && fromAdmin === "true") {
    try {
      const comments = await prisma.comment.findMany({
        where: {
          postId: {
            equals: postId,
          },
          authorId: { equals: authorId },
        },
        include: {
          author: author === "true" ? true : false,
          post: post === "true" ? true : false,
        },
        orderBy: { createdAt: "asc" },
      });
      res
        .status(200)
        .setHeader("Content-Range", "bytes : 0-9/*")
        .json(comments);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error });
    }
    return;
  }

  // All users
  try {
    const comments = await prisma.comment.findMany({
      where: {
        post: {
          category: { members: { some: { id: { equals: userId } } } },
        },
        postId: {
          equals: postId,
        },
        authorId: { equals: authorId },
        isDisabled: false,
      },
      include: {
        author: author === "true" ? true : false,
        post: post === "true" ? true : false,
      },
      orderBy: { createdAt: "asc" },
    });
    res.status(200).json(comments);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
};

export default getAllComments;
