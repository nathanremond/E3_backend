import express from "express";
import TrainingController from "../controllers/trainingController.js";
import { authenticateToken } from "../middlewares/authMiddleware.js";
import { authorizeRoles } from "../middlewares/roleMiddleware.js";

const router = express.Router();

router.get("/", TrainingController.listTraining);
router.post("/", authenticateToken, authorizeRoles("admin"), TrainingController.createTraining);
router.put("/:id", authenticateToken, authorizeRoles("admin"), TrainingController.updateTraining);
router.delete("/:id", authenticateToken, authorizeRoles("admin"), TrainingController.deleteTraining);
router.get("/:id/details", TrainingController.getDetailByTrainingId);
router.post("/:id/details", authenticateToken, authorizeRoles("admin"), TrainingController.createDetailByTrainingId);
router.put("/:id/details", authenticateToken, authorizeRoles("admin"), TrainingController.updateDetailByTrainingId);

export default router;