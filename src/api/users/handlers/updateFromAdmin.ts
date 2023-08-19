import prisma from "../../../../prisma/client";
import { IUserHandlers } from "../interface";

const updateUser: IUserHandlers["updateFromAdmin"] = async (req, res) => {
  const { id } = req.params;
  const { role: roleUser } = req.user;
  const {
    firstname,
    lastname,
    birthday,
    email,
    role,
    imageUrl,
    isDisabled,
    showBirthday,
    showEmail,
    teamId,
    workLocation,
  } = req.body;
  if (roleUser === "ADMIN" || roleUser === "SUPER_ADMIN") {
    try {
      const updatedUser = await prisma.user.update({
        where: {
          id: id,
        },
        data: {
          firstname: firstname || undefined,
          lastname: lastname || undefined,
          birthday: birthday || undefined,
          email: email || undefined,
          imageUrl: imageUrl || undefined,
          role: role,
          isDisabled: isDisabled || false,
          showBirthday: showBirthday || false,
          showEmail: showEmail || false,
          teamId: teamId || undefined,
          workLocation: workLocation || undefined,
        },
      });
      const { password: removedPassword, ...userWithoutPassword } = updatedUser;
      res.status(200).json(userWithoutPassword);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error });
    }
  }
};
export default updateUser;
