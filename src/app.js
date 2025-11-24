import express from "express";
import connectMongo from "./config/db.mongo.js";
import trainingRoutes from "./routes/trainingRoutes.js";
import sessionRoutes from "./routes/sessionRoutes.js";
import registrationRoutes from "./routes/registrationRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import cors from "cors";
import rateLimit from "express-rate-limit";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./swagger.js";

const app = express();
connectMongo();

app.use(express.json());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

const limiter = rateLimit({
    windowMs: 15*60*1000,
    max: 100,
    message: {
        status: 429,
        message: "Trop de requêtes. Réessayez plus tard."
    },
    standardHeaders: true,
    legacyHeaders: false
});
app.use(limiter);

app.use("/auth", authRoutes);
app.use("/trainings", trainingRoutes);
app.use("/sessions", sessionRoutes);
app.use("/registrations", registrationRoutes);

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get("/", (req, res) => res.json({ message: "API OK" }));

export default app;