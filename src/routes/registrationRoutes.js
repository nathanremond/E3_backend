import express from "express";
import registrationController from "../controllers/registrationController.js";

const router = express.Router();

router.put("/:id", registrationController.updateRegistration);

export default router;