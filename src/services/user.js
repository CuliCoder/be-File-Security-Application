import connection from "../config/database.js";
import bcrypt from "bcrypt";
const saltRounds = 10;
const hashPassword = (password) => {
    return bcrypt.hashSync(password, saltRounds);
};
export const get_publicKey_Token = (id) => new Promise(async (resolve, reject) => {
    try {
        const [publicKey] = await connection.query(`SELECT publicKey_Token FROM user where id = ? `, [id]);
        if (publicKey.length === 0) {
            resolve({
                error: 1,
                message: "User not found",
            });
            return;
        }
        resolve({
            error: 0,
            publicKey: publicKey[0].publicKey_Token
        })
    }
    catch (err) {
        console.log(err);
        reject({
            error: 1,
            message: "Get public key failed",
        });
    }
})
export const setPublicKey_Token = (id, publicKey) => new Promise(async (resolve, reject) => {
    try {
        const [result] = await connection.execute(`UPDATE user SET publicKey_Token = ? WHERE id = ?`, [publicKey, id]);
        resolve({
            error: result.affectedRows === 0 ? 1 : 0,
            message: result.affectedRows === 0 ? "Set public key failed" : "Set public key successfully"
        })
    } catch (error) {
        console.log(error);
        reject({
            error: 1,
            message: "Set public key failed"
        })
    }
})
export const changePassword = (id, password, newPassword) => new Promise(async (resolve, reject) => {
    try {
        const [Old_password] = await connection.query(`SELECT password FROM user where id = ? `, [id]);
        if (password.length === 0) {
            resolve({
                error: 1,
                message: "Mật khẩu cũ không chính xác",
            });
            return;
        }
        const match = bcrypt.compareSync(password, Old_password[0].password);
        if (!match) {
            resolve({
                error: 1,
                message: "Mật khẩu cũ không chính xác"
            });
            return;
        }
        const [result] = await connection.execute(`UPDATE user SET password = ? WHERE id = ?`, [hashPassword(newPassword), id]);
        resolve({
            error: result.affectedRows === 0 ? 1 : 0,
            message: result.affectedRows === 0 ? "Đổi mật khẩu thất bại" : "Đổi mật khẩu thành công"
        })
    } catch (error) {
        console.log(error);
        reject({
            error: 1,
            message: "Đổi mật khẩu thất bại"
        })
    }
})