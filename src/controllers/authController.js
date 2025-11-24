import User from "../models/user.model.js";
import Auth from "../models/auth.model.js";
import Joi from "joi";

const registerSchema = Joi.object({
    username: Joi.string().min(3).max(30).required(),
    password: Joi.string().min(6).required(),
    role: Joi.string().valid("user", "admin", "trainer", "rh").required()
});

const loginSchema = Joi.object({
    id: Joi.number().integer().required(),
    password: Joi.string().required()
});


class AuthController {

    static async register(req, res) {
        try {
            const { error } = registerSchema.validate(req.body);
            if (error) return res.status(400).json({ error: error.details[0].message });

            const { username, password, role } = req.body;

            const hashedPassword = await Auth.hashPassword(password);

            const newUser = await User.create(username, hashedPassword, role);

            return res.status(201).json({
                message: "Utilisateur créé avec succès",
                user: newUser
            });

        } catch (err) {
            console.error(err);
        }
    }

    static async login(req, res) {
        try {
            const { error } = loginSchema.validate(req.body);
            if (error) return res.status(400).json({ error: error.details[0].message });
            
            const { id, password } = req.body;

            const user = await User.getbyid(id);

            if (!user) {
                return res.status(401).json({ message: "Identifiants invalides" });
            }

            const match = await Auth.comparePassword(password, user.password);
            if (!match) return res.status(401).json({ message: "Identifiants invalides" });

            const token = Auth.generateToken(user);

            return res.status(200).json({
                message: "Connexion réussie",
                token
            });

        } catch (err) {
            console.error(err);
        }
    }
}

export default AuthController;
