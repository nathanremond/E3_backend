import express from "express";
import SessionController from "../controllers/sessionController.js";
import registrationController from "../controllers/registrationController.js";

const router = express.Router();

router.get("/", SessionController.listSessions);
router.post("/", SessionController.createSession);
router.put("/:id", SessionController.updateSession);
router.delete("/:id", SessionController.deleteSession);
router.get("/:id/registrations", registrationController.getRegistrationBySessionId);
router.post("/:id/register", registrationController.createRegistrationBySessionId);

export default router;