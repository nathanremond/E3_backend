import Registration from "../models/registration.model.js";
import Joi from "joi";

const registrationSchema = Joi.object({
    firstname: Joi.string().min(2).max(50).required(),
    lastname: Joi.string().min(2).max(50).required(),
    email: Joi.string().email().required(),
    status: Joi.string().valid("registered", "present", "absent").required()
});

class RegistrationController {
    static async getRegistrationBySessionId(req, res) {
        try {
            const { id } = req.params;

            const registrations = await Registration.getallbyidsession(id);
            if (!registrations) {
                return res.status(404).json({ error: "Session non trouvée" });
            }

            res.status(200).json(registrations);
        } catch (err) {
            console.error(err);
        }
    }

    static async createRegistrationBySessionId(req, res) {
        try {
            const { error } = registrationSchema.validate(req.body);
            if (error) return res.status(400).json({ error: error.details[0].message });

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
            const { error } = registrationSchema.validate(req.body);
            if (error) return res.status(400).json({ error: error.details[0].message });

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

