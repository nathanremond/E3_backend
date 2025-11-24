import express from "express";
import TrainingController from "../controllers/trainingController.js";

const router = express.Router();

router.get("/", TrainingController.listTraining);
router.post("/", TrainingController.createTraining);
router.put("/:id", TrainingController.updateTraining);
router.delete("/:id", TrainingController.deleteTraining);
router.get("/:id/details", TrainingController.getDetailByTrainingId);
router.post("/:id/details", TrainingController.createDetailByTrainingId);
router.put("/:id/details", TrainingController.updateDetailByTrainingId);

export default router;