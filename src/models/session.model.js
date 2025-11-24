import pool from "../config/db.postgres.js";

class Session{

    static async getall(){
        const result = await pool.query("SELECT * FROM sessions");
        return result.rows;
    }

    static async create(date, time, duration, trainer_name, max_participants, training_id, company_id){
        const result = await pool.query(`INSERT INTO sessions
            (date, time, duration, trainer_name, max_participants, training_id, company_id)
            VALUES ($1, $2, $3, $4, $5, $6, $7) 
            RETURNING *`,
            [date, time, duration, trainer_name, max_participants, training_id, company_id]
        );
        return result.rows[0];
    }

    static async update(id, { date, time, duration, trainer_name, max_participants, training_id, company_id }){
        const result = await pool.query(`UPDATE sessions 
            SET date = $1, time = $2, duration = $3, trainer_name = $4, max_participants = $5, training_id = $6, company_id = $7 
            WHERE id = $8 
            RETURNING *`,
            [date, time, duration, trainer_name, max_participants, training_id, company_id, id]
        );
        return result.rows[0];
    }

    static async delete(id){
        const result = await pool.query("DELETE FROM sessions WHERE id = $1",
            [id]
        );
        return result.rowCount;
    }

}

export default Session;