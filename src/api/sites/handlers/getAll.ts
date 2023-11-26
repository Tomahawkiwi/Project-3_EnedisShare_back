/* eslint-disable no-console */

import { ISiteHandlers } from "../interface";
import prisma from "../../../../prisma/client";

const getAllSites: ISiteHandlers["getAll"] = async (req, res) => {
  const { id, role } = req.user;
  const { fromAdmin } = req.query;

  // Only from admin
  try {
    if ((role === "ADMIN" || role === "SUPER_ADMIN") && fromAdmin === "true") {
      const sites = await prisma.site.findMany();
      return res
        .status(200)
        .setHeader("Content-Range", "bytes : 0-9/*")
        .json(sites);
    }

    // All users
    const sites = await prisma.site.findMany({
      where: {
        members: {
          some: {
            id: id,
          },
        },
      },
    });
    res.status(200).json(sites);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
};

export default getAllSites;
