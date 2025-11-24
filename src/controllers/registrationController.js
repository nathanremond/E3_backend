import Registration from "../models/registration.model.js";

class RegistrationController {
    static async getRegistrationBySessionId(req, res) {
        try {
            const { id } = req.params;

            const registrations = await Registration.getallbyidsession(id);
            res.status(200).json(registrations);
        } catch (err) {
            console.error(err);
        }
    }

    static async createRegistrationBySessionId(req, res) {
        try {
            const { id } = req.params;

            const newRegistration = await Registration.createbyidsession(id, req.body);
            if (!newRegistration) {
                return res.status(404).json({ error: "Session non trouvée" });
            }

            return res.status(201).json(newRegistration);
        } catch (err) {
            console.error(err);
        }
    }

    static async updateRegistration(req, res) {
        try {
            const { id } = req.params;
            
            const updatedRegistration = await Registration.update(id, req.body);
            if (!updatedRegistration) {
                return res.status(404).json({ error: "Registration non trouvée" });
            }

            return res.status(200).json(updatedRegistration);
        } catch (err) {
            console.error(err);
        }
    }
}
export default RegistrationController;

