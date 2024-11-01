import connection from '../config/database.js';
import bcrypt from "bcrypt";
const saltRounds = 10;
const hashPassword = (password) => {
    return bcrypt.hashSync(password, saltRounds);
};
export const login = (email, password) => new Promise(async (resolve, reject) => {
    try {
        const [user] = await connection.query(`SELECT * FROM user where email = ? `, [email]);
        if (user.length === 0) {
            resolve({
                error: 1,
                message: "Email hoặc mật khẩu không chính xác",
            });
            return;
        }
        const match = bcrypt.compareSync(password, user[0].password);
        resolve({
            error: match ? 0 : 1,
            message: match ? "Đăng nhập thành công" : "Email hoặc mật khẩu không chính xác",
            id: match ? user[0].id : null
        })
    }
    catch (err) {
        console.log(err);
        reject({
            error: 1,
            message: "Đăng nhập thất bại",
        });
    }
})
export const register = (email, password) => new Promise(async (resolve, reject) => {
    try {
        const [checkEmail] = await connection.query(`SELECT * FROM user WHERE email = ?`, [email]);
        if (checkEmail.length > 0) {
            resolve({
                error: 1,
                message: "Email đã tồn tại",
            })
            return;
        }
        const [result] = await connection.execute(
            "INSERT into user (email,password) SELECT ?, ? WHERE not EXISTS( SELECT * FROM user WHERE email = ? )",
            [email, hashPassword(password), email]
        );
        resolve({
            error: result.affectedRows === 0 ? 1 : 0,
            message: result.affectedRows === 0 ? "Đăng ký thất bại" : "Đăng ký thành công"
        })
    } catch (error) {
        console.log(error);
        reject({
            error: 1,
            message: "Đăng ký thất bại"
        })
    }
})