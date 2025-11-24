import pool from "../config/db.postgres.js";

class Training{

    static async getall(){
        const result = await pool.query("SELECT * FROM trainings");
        return result.rows;
    }

    static async getbyid(id) {
        const result = await pool.query("SELECT * FROM trainings WHERE id = $1", [id]);
        return result.rows[0];
    }

    static async create(title, category, description){
        const result = await pool.query("INSERT INTO trainings(title, category, description) VALUES ($1, $2, $3) RETURNING *",
            [title, category, description]
        );
        return result.rows[0];
    }

    static async update(id, { title, category, description }){
        const result = await pool.query("UPDATE trainings SET title = $1, category = $2, description = $3 WHERE id = $4 RETURNING *",
            [title, category, description, id]
        );
        return result.rows[0];
    }

    static async delete(id){
        const result = await pool.query("DELETE FROM trainings WHERE id = $1",
            [id]
        );
        return result.rowCount;
    }

}

export default Training;