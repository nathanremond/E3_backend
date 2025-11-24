import express from "express";
import connectMongo from "./config/db.mongo.js";
import trainingRoutes from "./routes/trainingRoutes.js";
import sessionRoutes from "./routes/sessionRoutes.js";
import registrationRoutes from "./routes/registrationRoutes.js";

const app = express();
connectMongo();

app.use(express.json());

app.use("/trainings", trainingRoutes);
app.use("/sessions", sessionRoutes);
app.use("/registrations", registrationRoutes);

app.get("/", (req, res) => res.json({ message: "API OK" }));

export default app;