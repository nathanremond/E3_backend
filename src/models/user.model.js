import pool from "../config/db.postgres.js";

class User{

    static async getbyid(id) {
        const result = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
        return result.rows[0];
    }

    static async create( username, password, role ){
        const result = await pool.query("INSERT INTO users(username, password, role) VALUES ($1, $2, $3) RETURNING *",
            [username, password, role]
        );
        const user = result.rows[0];

        return user;
    }
}

export default User;