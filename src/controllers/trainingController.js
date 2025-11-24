import Training from "../models/training.model.js";
import Detail from "../models/detail.model.js"

class TrainingController {
    static async listTraining(req, res) {
        try {
            const trainings = await Training.getall();
            res.status(200).json(trainings);
        } catch (err) {
            console.error(err);
        }
    }

    static async getDetailByTrainingId(req, res) {
        try {
            const { id } = req.params;

            const training = await Training.getbyid(id);
            if (!training) return res.status(404).json({ error: "training non trouvé" });

            const trainingDetails = await Detail.find({ training_id: Number(id) });
            if (!trainingDetails) return res.status(404).json({ error: "détails du training non trouvés" });

            res.status(200).json(trainingDetails);
        } catch (err) {
            console.error(err);
        }
    }

    static async createTraining(req, res) {
        try {
            const { title, category, description } = req.body;
            const newTraining = await Training.create(title, category, description);
            return res.status(201).json(newTraining);
        } catch (err) {
            console.error(err);
        }
    }

    static async createDetailByTrainingId(req, res) {
        try {
            const { id } = req.params;

            const training = await Training.getbyid(id);
            if (!training) return res.status(404).json({ error: "training non trouvé" });

            const detailData = {
                ...req.body,
                training_id: id
            };

            const createdDetails = await Detail.create(detailData);

            return res.status(201).json(createdDetails);
        } catch (err) {
            console.error(err);
        }
    }

    static async updateTraining(req, res) {
        try {
            const { id } = req.params;
            const { title, category, description } = req.body;
            const updatedTraining = await Training.update(Number(id), { title, category, description });
            if (!updatedTraining) {
                return res.status(404).json({ error: "Training non trouvé" });
            }
            return res.status(200).json(updatedTraining);
        } catch (err) {
            console.error(err);
        }
    }

    static async updateDetailByTrainingId(req, res) {
        try {
            const { id } = req.params;

            const training = await Training.getbyid(id);
            if (!training) return res.status(404).json({ error: "training non trouvé" });

            const updatedData = { ...req.body, training_id: id };

            const result = await Detail.replaceOne({ training_id: id }, updatedData, { upsert: false });

            const updatedDetails = await Detail.findOne({ training_id: id });

            return res.status(200).json(updatedDetails);
        } catch (err) {
            console.error(err);
        }
    }

    static async deleteTraining(req, res) {
        try {
            const { id } = req.params;
            const deletedTraining = await Training.delete(Number(id));

            if (!deletedTraining) return res.status(404).json({ message: "Training non trouvé" });
            
            res.status(204).end();
        } catch (err) {
            console.error(err);
        }
    }
}
export default TrainingController;

