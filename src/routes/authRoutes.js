import express from "express";
import AuthController from "../controllers/authController.js";

const router = express.Router();

/**
 * @openapi
 * /auth/register:
 *  post:
 *    tags:
 *      - Auth
 *    summary: Enregistre un nouvel utilisateur
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *              - username
 *              - password
 *              - role
 *            properties:
 *              username:
 *                type: string
 *              password:
 *                type: string
 *              role:
 *                type: string
 *    responses:
 *      201:
 *        description: Utilisateur créé avec succès
 *      400:
 *        description: Erreur de validation des données
 */
router.post("/register", AuthController.register);

/**
 * @openapi
 * /auth/login:
 *  post:
 *    tags:
 *      - Auth
 *    summary: Connecte un utilisateur existant et renvoie un token JWT
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *              - id
 *              - password
 *            properties:
 *              id:
 *                type: integer
 *              password:
 *                type: string
 *    responses:
 *      200:
 *        description: Connexion réussie
 *      400:
 *        description: Erreur de validation des données
 *      401:
 *        description: Identifiants invalides
 */
router.post("/login", AuthController.login);

export default router;