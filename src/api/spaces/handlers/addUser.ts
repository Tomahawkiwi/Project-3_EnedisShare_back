/* eslint-disable no-console */
import prisma from "../../../../prisma/client";
import { SpaceHandlers } from "./../interface";

type connectUserToSpaceAndCategoryProps = {
  spaceId: string;
  userIds: string[];
};

export const connectUserToSpaceAndCategory = async ({
  spaceId,
  userIds,
}: connectUserToSpaceAndCategoryProps) => {
  try {
    const updatedSpace = await prisma.space.update({
      where: {
        id: spaceId,
      },
      data: {
        members: {
          connect: userIds.map((userId) => ({ id: userId })),
        },
      },
      include: {
        categories: true,
      },
    });

    const generalCategory = updatedSpace.categories.find(
      (cat) => cat.name === "Général"
    );

    await prisma.category.update({
      where: {
        id: generalCategory?.id,
      },
      data: {
        members: {
          connect: userIds.map((userId) => ({ id: userId })),
        },
      },
    });

    return updatedSpace;
  } catch (error) {
    console.log(error);
    throw error; // Throwing so that error can be caught in calling function
  }
};

const addUser: SpaceHandlers["addUser"] = async (req, res) => {
  const { id } = req.params;
  const usersToConnect = req.body;
  const { role } = req.user;
  const { fromAdmin } = req.query;

  // Only from admin
  if ((role === "ADMIN" || role === "SUPER_ADMIN") && fromAdmin === "true") {
    try {
      const updatedSpace = await connectUserToSpaceAndCategory({
        spaceId: id,
        userIds: usersToConnect,
      });
      res.status(200).json(updatedSpace);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error });
    }
  } else {
    res.status(403).json({ message: "Forbidden" });
  }
  return;
};

export default addUser;
