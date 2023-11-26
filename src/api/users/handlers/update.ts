/* eslint-disable no-console */
import { IUserHandlers } from "../interface";
import prisma from "../../../../prisma/client";
import asyncFormParse from "../../../middlewares/upload/formParse";
import { uploadImage } from "../../../middlewares/upload/uploadCloudinary";

const updateUser: IUserHandlers["update"] = async (req, res) => {
  const { id } = req.params;
  const { id: userId, role: authRole } = req.user;
  const { fromAdmin } = req.query;

  // Only from admin
  if (
    (authRole === "ADMIN" || authRole === "SUPER_ADMIN") &&
    fromAdmin === "true"
  ) {
    const {
      firstname,
      lastname,
      birthday,
      email,
      isDisabled,
      showBirthday,
      showEmail,
      role,
      teamId,
      workLocation,
    } = req.body;

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
          role: role || undefined,
          isDisabled: isDisabled || undefined,
          showBirthday: showBirthday || undefined,
          showEmail: showEmail || undefined,
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
    return;
  }

  // All users
  if (id === userId) {
    const { fields, files } = await asyncFormParse(req);
    const { showBirthday, showEmail } = fields;

    try {
      const dataProfilePicture =
        files.profileImage &&
        (await uploadImage(files.profileImage[0].path, "/profileImages"));

      const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: {
          imageUrl: dataProfilePicture
            ? dataProfilePicture.securePath
            : undefined,
          showBirthday:
            typeof showBirthday === "undefined" ? undefined : showBirthday[0],
          showEmail:
            typeof showEmail === "undefined" ? undefined : showEmail[0],
        },
      });
      const { password: removedPassword, ...userWithoutPassword } = updatedUser;
      res.status(200).json(userWithoutPassword);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error });
    }
  } else {
    res.status(403).json({ message: "Forbidden" });
  }
};

export default updateUser;
