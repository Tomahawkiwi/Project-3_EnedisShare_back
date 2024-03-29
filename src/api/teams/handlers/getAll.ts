import prisma from "../../../../prisma/client";
import { ITeamHandlers } from "./../interface";

const getAllTeams: ITeamHandlers["getAll"] = async (req, res) => {
  const { role } = req.user;
  const { fromAdmin } = req.query;

  // Only from admin
  if ((role === "ADMIN" || role === "SUPER_ADMIN") && fromAdmin === "true") {
    try {
      const teams = await prisma.team.findMany();

      res.status(200).setHeader("Content-Range", "bytes : 0-9/*").json(teams);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log("Can't get all the teams");
      res.status(500).json({ message: error });
    }
  } else {
    return res.status(403).json({ message: "Forbidden" });
  }
};

export default getAllTeams;
