import express from "express";
import registrationController from "../controllers/registrationController.js";
import { authenticateToken } from "../middlewares/authMiddleware.js";
import { authorizeRoles } from "../middlewares/roleMiddleware.js";

const router = express.Router();

router.put("/:id", authenticateToken, authorizeRoles("user"), registrationController.updateRegistration);

export default router;