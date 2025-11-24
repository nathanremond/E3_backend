import Session from "../models/session.model.js";
import Joi from "joi";

const sessionSchema = Joi.object({
    date: Joi.string()
        .pattern(/^\d{4}-\d{2}-\d{2}$/)
        .required()
        .messages({
            "string.pattern.base": "La date doit être au format YYYY-MM-DD"
        }),
    time: Joi.string()
        .pattern(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/)
        .required()
        .messages({
            "string.pattern.base": "L'heure doit être au format HH:MM:SS"
        }),
    duration: Joi.number().integer().min(1).required(),
    trainer_name: Joi.string().min(3).max(100).required(),
    max_participants: Joi.number().integer().min(1).required(),
    training_id: Joi.number().integer().required(),
    company_id: Joi.number().integer().required()
});

class SessionController {
    static async listSessions(req, res) {
        try {
            const sessions = await Session.getall();
            res.status(200).json(sessions);
        } catch (err) {
            console.error(err);
        }
    }

    static async createSession(req, res) {
        try {
            const { error } = sessionSchema.validate(req.body);
            if (error) return res.status(400).json({ error: error.details[0].message });

            const { date, time, duration, trainer_name, max_participants, training_id, company_id } = req.body;
            const newSession = await Session.create(date, time, duration, trainer_name, max_participants, training_id, company_id);
            return res.status(201).json(newSession);
        } catch (err) {
            console.error(err);
        }
    }

    static async updateSession(req, res) {
        try {
            const { error } = sessionSchema.validate(req.body);
            if (error) return res.status(400).json({ error: error.details[0].message });
            
            const { id } = req.params;
            const { date, time, duration, trainer_name, max_participants, training_id, company_id } = req.body;
            const updatedSession = await Session.update(Number(id), { date, time, duration, trainer_name, max_participants, training_id, company_id });
            if (!updatedSession) {
                return res.status(404).json({ error: "Session non trouvée" });
            }
            return res.status(200).json(updatedSession);
        } catch (err) {
            console.error(err);
        }
    }

    static async deleteSession(req, res) {
        try {
            const { id } = req.params;
            const deletedSession = await Session.delete(Number(id));

            if (!deletedSession) return res.status(404).json({ message: "Session non trouvée" });
            
            res.status(204).end();
        } catch (err) {
            console.error(err);
        }
    }
}
export default SessionController;

