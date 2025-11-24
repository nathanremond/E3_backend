import Session from "../models/session.model.js";

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
            const { date, time, duration, trainer_name, max_participants, training_id, company_id } = req.body;
            const newSession = await Session.create(date, time, duration, trainer_name, max_participants, training_id, company_id);
            return res.status(201).json(newSession);
        } catch (err) {
            console.error(err);
        }
    }

    static async updateSession(req, res) {
        try {
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

