import express from "express";
import SessionController from "../controllers/sessionController.js";
import registrationController from "../controllers/registrationController.js";
import { authenticateToken } from "../middlewares/authMiddleware.js";
import { authorizeRoles } from "../middlewares/roleMiddleware.js";

const router = express.Router();

/**
 * @openapi
 * /sessions:
 *  get:
 *    tags:
 *      - Sessions
 *    summary: Affiche toutes les sessions
 *    responses:
 *      201:
 *        description: Sessions affichées avec succès
 *      401:
 *        description: Accès refusé, aucun token fourni
 */
router.get("/", authenticateToken, SessionController.listSessions);

/**
 * @openapi
 * /sessions:
 *  post:
 *    tags:
 *      - Sessions
 *    summary: Crée une nouvelle session
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *              - date
 *              - time
 *              - duration
 *              - trainer_name
 *              - max_participants
 *              - training_id
 *              - company_id
 *            properties:
 *              date:
 *                type: date
 *              time:
 *                type: time
 *              duration:
 *                type: integer
 *              trainer_name:
 *                type: string
 *              max_participants:
 *                type: integer
 *              training_id:
 *                type: integer
 *              company_id:
 *                type: integer
 *    responses:
 *      201:
 *        description: Session créée avec succès
 *      400:
 *        description: Erreur de validation des données
 *      401:
 *        description: Accès refusé, aucun token fourni
 *      403:
 *        description: Accès refusé (rôle non autorisé)
 */
router.post("/", authenticateToken, authorizeRoles("trainer"), SessionController.createSession);

/**
 * @openapi
 * /sessions/{id}:
 *   put:
 *     tags:
 *       - Sessions
 *     summary: Met à jour une session avec son id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Id de la session
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *              - date
 *              - time
 *              - duration
 *              - trainer_name
 *              - max_participants
 *              - training_id
 *              - company_id
 *             properties:
 *              date:
 *                type: date
 *              time:
 *                type: time
 *              duration:
 *                type: integer
 *              trainer_name:
 *                type: string
 *              max_participants:
 *                type: integer
 *              training_id:
 *                type: integer
 *              company_id:
 *                type: integer
 *             description: La date, l'heure, la durée, le nom du formateur, le maximum de participants, l' id du formateur et l'id de l'entreprise rattachés à cette session
 *     responses:
 *       200:
 *         description: Session mise à jour
 *       400:
 *         description: Session non trouvée
 *       401:
 *         description: Accès refusé, aucun token fourni
 *       403:
 *         description: Accès refusé (rôle non autorisé)
 *       404:
 *         description: Erreur de validation des données
 */
router.put("/:id", authenticateToken, authorizeRoles("trainer"), SessionController.updateSession);

/**
 * @openapi
 * /sessions/{id}:
 *   delete:
 *     tags:
 *       - Sessions
 *     summary: Supprime une session avec son id 
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Id de la session
 *     responses:
 *       204:
 *         description: Session supprimée
 *       401:
 *         description: Accès refusé, aucun token fourni
 *       403:
 *         description: Accès refusé (rôle non autorisé)
 *       404:
 *         description: Session non trouvée
 */
router.delete("/:id", authenticateToken, authorizeRoles("admin"), SessionController.deleteSession);

/**
 * @openapi
 * /sessions/{id}/registrations:
 *   get:
 *     tags:
 *       - Sessions
 *     summary: Récupère les registrations avec l'id d'une session
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: L'id de la session
 *     responses:
 *       200:
 *         description: Registrations affichées avec succès
 *       401:
 *         description: Accès refusé, aucun token fourni
 *       403:
 *         description: Accès refusé (rôle non autorisé)
 *       404:
 *         description: Session non trouvée
 */
router.get("/:id/registrations", authenticateToken, authorizeRoles("rh", "admin"), registrationController.getRegistrationBySessionId);

/**
 * @openapi
 * /sessions/{id}/register:
 *  post:
 *    tags:
 *      - Sessions
 *    summary: Crée une nouvelle registration avec l'id d'une session
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *              - firstname
 *              - lastname
 *              - email
 *              - status
 *            properties:
 *              firstname:
 *                type: string
 *              lastname:
 *                type: string
 *              email:
 *                type: string
 *              status:
 *                type: string
 *    responses:
 *      201:
 *        description: Registration créée avec succès
 *      400:
 *        description: Erreur de validation des données
 *      401:
 *        description: Accès refusé, aucun token fourni
 *      403:
 *        description: Accès refusé (rôle non autorisé)
 *      404:
 *        description: Session non trouvée
 */
router.post("/:id/register", authenticateToken, authorizeRoles("user", "rh", "admin"), registrationController.createRegistrationBySessionId);

export default router;