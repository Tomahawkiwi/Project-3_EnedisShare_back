import prisma from "../../../../prisma/client";
import { ITeamHandlers } from "./../interface";

const createTeam: ITeamHandlers["create"] = async (req, res) => {
  const { name } = req.body;
  const { role } = req.user;
  const { fromAdmin } = req.query;

  // Only from admin
  if ((role === "ADMIN" || role === "SUPER_ADMIN") && fromAdmin === "true") {
    try {
      const newTeam = await prisma.team.create({
        data: { name },
      });
      res.status(200).json(newTeam);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log("Can't create a new Team");
      res.status(500).json({ message: error });
    }
    return;
  } else {
    return res.status(403).json({ message: "Forbidden" });
  }
};

export default createTeam;
