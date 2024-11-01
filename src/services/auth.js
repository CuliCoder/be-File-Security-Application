import connection from '../config/database.js';
export const login = (email, password) => new Promise(async (resolve, reject) => {
    try {
        const [result] = await connection.query(`SELECT * FROM user`, [email, password]);
        if (result.length === 0) {
            reject("User not found");
        }
        if (result[0].password !== password) {
            reject("Invalid password");
        }
        resolve(result[0]);
    }
    catch (err) {
        reject(err);
    }
})