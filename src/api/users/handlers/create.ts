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
