/* eslint-disable no-console */
import { IUserHandlers } from "../interface";
import prisma from "../../../../prisma/client";

function exclude<User, Key extends keyof User>(
  user: User,
  keys: Key[]
): Omit<User, Key> {
  for (const key of keys) {
    delete user[key];
  }
  return user;
}

const getAllUsers: IUserHandlers["getAll"] = async (req, res) => {
  const { userExcluded, team, limit, spaceId, categoryId, role } = req.query;
  const limitParsed = parseInt(limit);
  const { role: roleInApp } = req.user;
  const { fromAdmin } = req.query;

  //Only from admin
  if (
    (roleInApp === "ADMIN" || roleInApp === "SUPER_ADMIN") &&
    fromAdmin === "true"
  ) {
    try {
      const users = await prisma.user.findMany({
        where: {
          teamId: { contains: team },
          id: { not: userExcluded },
          inSpaces: { some: { id: { equals: spaceId } } },
          inCategories: { some: { id: { equals: categoryId } } },
          role: { equals: role ? role : undefined },
        },
        take: limitParsed ? limitParsed : undefined,
        skip: 0,
        orderBy: [
          {
            lastname: "asc",
          },
        ],
        include: {
          inSpaces: true,
          inCategories: { include: { space: { select: { name: true } } } },
          posts: true,
          comments: true,
          inSites: true,
          team: true,
        },
      });
      users.map((user) => exclude(user, ["password"]));
      res.status(200).setHeader("Content-Range", "bytes : 0-9/*").json(users);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error });
    }
    return;
  }

  // All users
  try {
    const users = await prisma.user.findMany({
      where: {
        teamId: { contains: team },
        id: { not: userExcluded },
        inSpaces: { some: { id: { equals: spaceId } } },
        inCategories: { some: { id: { equals: categoryId } } },
        isDisabled: false,
      },
      take: limitParsed ? limitParsed : undefined,
      skip: 0,
      orderBy: [
        {
          lastname: "asc",
        },
      ],
    });
    users.map((user) => exclude(user, ["password"]));
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
};

export default getAllUsers;
