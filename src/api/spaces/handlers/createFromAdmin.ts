/* eslint-disable no-console */

import { SpaceHandlers } from "./../interface";
import prisma from "../../../../prisma/client";

const createSpaceFromAdmin: SpaceHandlers["createFromAdmin"] = async (
  req,
  res
) => {
  const { role } = req.user;
  const { name, siteId, ownerId, description, imageUrl } = req.body;

  try {
    if (role === "ADMIN" || role === "SUPER_ADMIN") {
      if (name && siteId && description && imageUrl && ownerId) {
        const createSpace = await prisma.space.create({
          data: {
            name: name,
            imageUrl: imageUrl,
            siteId: siteId,
            ownerId: ownerId,
            description: description,
            members: {
              connect: {
                id: ownerId,
              },
            },
            categories: {
              create: {
                name: "Général",
                imageUrl: imageUrl,
                ownerId: ownerId,
                members: { connect: { id: ownerId } },
                description:
                  "Ceci est la catégorie où tous les membres de l'espace peuvent accéder.",
                isGeneral: true,
              },
            },
          },
        });
        res.status(200).json(createSpace);
      } else {
        res.status(500).json({
          message: "Tous les champs ne sont pas correctement remplis",
        });
      }
    } else {
      res.status(403).json("Unauthorized");
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
};

export default createSpaceFromAdmin;
