/* eslint-disable no-console */
import { SpaceHandlers } from "./../interface";
import prisma from "../../../../prisma/client";

const getAllSpaces: SpaceHandlers["getAll"] = async (req, res) => {
  const { categories, owner } = req.query;

  if (req.user.role === "ADMIN" || req.user.role === "SUPER_ADMIN") {
    try {
      const spaces = await prisma.space.findMany({
        include: {
          categories: categories === "true" ? true : false,
        },
      });
      res.status(200).setHeader("Content-Range", "bytes : 0-9/*").json(spaces);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error });
    }
  }
  if (req.user.role === "USER") {
    try {
      const spaces = await prisma.space.findMany({
        where: {
          members: {
            some: {
              id: req.user.id,
            },
          },
          isDisabled: false,
        },
        include: {
          categories:
            categories === "true"
              ? {
                  where: {
                    members: { some: { id: req.user.id } },
                    isDisabled: false,
                  },
                  orderBy: { name: "asc" },
                }
              : false,
          owner: owner === "true" ? true : false,
        },
        orderBy: { name: "asc" },
      });
      res.status(200).json(spaces);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error });
    }
  }
};

export default getAllSpaces;
