/* eslint-disable no-console */

import argon2 from "argon2";
import { IUserHandlers } from "../interface";
import prisma from "../../../../prisma/client";
import { connectUserToSpaceAndCategory } from "../../spaces/handlers/addUser";

const createUser: IUserHandlers["create"] = async (req, res) => {
  try {
    const {
      id,
      birthday,
      email,
      firstname,
      password,
      imageUrl,
      lastname,
      workLocation,
      isDisabled,
      teamId,
      role,
      site,
    } = req.body;

    const hashingOptions = {
      type: argon2.argon2id,
      memoryCost: 2 ** 16,
      timeCost: 5,
      parallelism: 1,
    };
    const hashedPassword = await argon2.hash(password, hashingOptions);

    const newUser = await prisma.user.create({
      data: {
        id,
        birthday,
        email,
        firstname,
        password: hashedPassword,
        imageUrl,
        lastname,
        workLocation,
        isDisabled,
        teamId,
        role,
        inSites: { connect: { id: site } },
      },
    });

    const userSpaceUpdated = await prisma.user.update({
      where: { id: newUser.id },
      data: {
        inSpaces: {
          connectOrCreate: {
            create: {
              name: "Général",
              siteId: site,
              ownerId: newUser.id,
              description: "Espace général",
              imageUrl: "",
            },
            where: { name: "Général" },
          },
        },
      },
      include: {
        inSpaces: {
          where: { name: "Général" },
          include: { categories: { where: { isGeneral: true } } },
        },
      },
    });

    console.log(userSpaceUpdated);

    await prisma.user.update({
      where: { id: newUser.id },
      data: {
        inCategories: {
          connectOrCreate: {
            create: {
              name: "Général",
              spaceId: userSpaceUpdated.inSpaces[0].id,
              ownerId: userSpaceUpdated.inSpaces[0].ownerId,
              description: "Catégorie générale",
              imageUrl: "",
              isGeneral: true,
            },
            where: { id: userSpaceUpdated.inSpaces[0].categories[0].id },
          },
        },
      },
    });

    const { password: removedPassword, ...userWithoutPassword } = newUser;

    const idOfGeneralSpace = "519a5e35-f543-425b-8f74-ffaddd53b5e1";
    await connectUserToSpaceAndCategory({
      spaceId: idOfGeneralSpace,
      userIds: [newUser.id],
    });
    res.status(200).json(userWithoutPassword);
  } catch (error) {
    console.log(500);
    res.status(500).json({ message: error });
  }
};

export default createUser;
