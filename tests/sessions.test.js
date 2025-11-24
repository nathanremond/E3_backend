import request from "supertest";
import app from "../src/app.js";
import pool from "../src/config/db.postgres.js";

let trainerToken;
let adminToken;
let sessionId;

beforeAll(async () => {
    await pool.query('TRUNCATE TABLE users RESTART IDENTITY CASCADE');
    await pool.query('TRUNCATE TABLE sessions RESTART IDENTITY CASCADE');
    await pool.query('TRUNCATE TABLE companies RESTART IDENTITY CASCADE');
    await pool.query('TRUNCATE TABLE trainings RESTART IDENTITY CASCADE');

    await pool.query("INSERT INTO companies (name, sector, city) VALUES ('company1', 'sector1', 'city1')");
    await pool.query("INSERT INTO trainings (title, category, description) VALUES ('title1', 'sport', 'description1')");

    await request(app).post("/auth/register").send({
      username: "trainer1",
      password: "trainer123",
      role: "trainer"
    });

    await request(app).post("/auth/register").send({
      username: "admin1",
      password: "admin123",
      role: "admin"
    });

    const trainerLogin = await request(app).post("/auth/login").send({
      id: 1,
      password: "trainer123"
    });
    trainerToken = trainerLogin.body.token;

    const adminLogin = await request(app).post("/auth/login").send({
      id: 2,
      password: "admin123"
    });
    adminToken = adminLogin.body.token;

    console.log("TRAINER LOGIN:", trainerLogin.body);
    console.log("ADMIN LOGIN:", adminLogin.body);

    const session1 = await request(app)
      .post("/sessions")
      .set("Authorization", `Bearer ${trainerToken}`)
      .send({ date: "2025-11-24",
              time: "12:00:00",
              duration: 20,
              trainer_name: "Pedro",
              max_participants: 20,
              training_id: 1,
              company_id: 1
            });
    console.log("SESSION 1 POST:", session1.status, session1.body);

    const res = await request(app)
      .get("/sessions")
      .set("Authorization", `Bearer ${adminToken}`);
    console.log("GET /sessions:", res.status, res.body);

    if (res.body.length > 0) {
      sessionId = res.body[0].id;
      console.log("Session ID:", sessionId);
    } else {
      throw new Error("Aucune session trouvée après insertion");
    }
});

afterAll(async () => {
    await pool.end();
});

describe("Tests unitaires /sessions", () => {

    test("GET /sessions avec token admin => 200", async () => {
        const res = await request(app)
          .get("/sessions")
          .set("Authorization", `Bearer ${adminToken}`);
        expect(res.status).toBe(200);
        expect(res.body.length).toBeGreaterThan(0);
    });

    test("POST /sessions avec token trainer => 201", async () => {
        const res = await request(app)
          .post("/sessions")
          .set("Authorization", `Bearer ${trainerToken}`)
          .send({ date: "2025-11-24",
                  time: "12:00:00",
                  duration: 60,
                  trainer_name: "Pedrito",
                  max_participants: 25,
                  training_id: 1,
                  company_id: 1 
                });
        expect(res.status).toBe(201);
        expect(res.body).toHaveProperty("trainer_name", "Pedrito");
    });

    test("PUT /sessions/:id avec token admin (non trainer) => 403", async () => {
        const res = await request(app)
          .put(`/sessions/${sessionId}`)
          .set("Authorization", `Bearer ${adminToken}`)
          .send({ date: "2025-11-26",
                  time: "12:00:00",
                  duration: 20,
                  trainer_name: "Pedro",
                  max_participants: 10,
                  training_id: 1,
                  company_id: 1 
                });
        expect(res.status).toBe(403);
        expect(res.body.message).toMatch(/non autorisé/i);
    });
});
