import pool from "../config/db.postgres.js";

class Registration{

    static async getallbyidsession(id){
        const result = await pool.query("SELECT * FROM registrations WHERE session_id = $1",
            [id]
        );
        return result.rows;
    }

    static async createbyidsession(id, { firstname, lastname, email, status }){
        const result = await pool.query(`INSERT INTO registrations
            (firstname, lastname, email, status, session_id)
            VALUES ($1, $2, $3, $4, $5) 
            RETURNING *`,
            [firstname, lastname, email, status, id]
        );
        return result.rows[0];
    }

    static async update(id, { firstname, lastname, email, status }){
        const result = await pool.query(`UPDATE registrations 
            SET firstname = $1, lastname = $2, email = $3, status = $4 
            WHERE id = $5 
            RETURNING *`,
            [firstname, lastname, email, status, id]
        );
        return result.rows[0];
    }
}

export default Registration;