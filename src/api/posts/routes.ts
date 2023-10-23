import { Router } from "express";
import checkIfIsAdminOrSuper from "../../middlewares/permissions/checkIfIsAdminOrSuper";
import checkIfIsAuthor from "../../middlewares/permissions/checkIfIsAuthor";
import checkIfIsDisabledForGetOne from "../../middlewares/permissions/checkIfIsDisabledForGetOne";
import controller from "./controller";

const router = Router();

router.get("/", controller.getAll);
router.get("/admin", controller.getAllPostsByAdmin);
router.get("/:id", checkIfIsDisabledForGetOne("post"), controller.getOne);
router.post("/", controller.create);
router.put("/:id", checkIfIsAuthor("post"), controller.update);
router.put("/admin/:id", checkIfIsAdminOrSuper(), controller.updatePostByAdmin);
router.delete("/:id", checkIfIsAdminOrSuper(), controller.delete);
router.put("/:id/disable", checkIfIsAdminOrSuper(), controller.disable);
router.put("/:id/undisable", checkIfIsAdminOrSuper(), controller.undisable);

export default router;
