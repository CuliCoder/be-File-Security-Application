import key from 'keytar';
import jwt from 'jsonwebtoken';
import { get_publicKey_Token } from '../services/user.js';
const JWTAction = async (req, res, next) => {
    const accessToken = await key.getPassword('file-security-app', 'accessToken');
    const id_user = await key.getPassword('file-security-app', 'id_user');
    console.log(accessToken, id_user);
    if (!accessToken || !id_user) {
        return res.status(401).json({
            error: 2,
            message: "Unauthorized"
        });
    }
    const publicKey = await get_publicKey_Token(parseInt(id_user));
    if (publicKey.error === 1) {
        return res.status(401).json({
            error: 2,
            message: "Unauthorized"
        });
    }
    jwt.verify(accessToken, publicKey.publicKey, (err, data) => {
        if (err) {
            return res.status(401).json({
                error: 2,
                message: "Unauthorized"
            });
        }
        req.data = data;
        next();
    })
}
export default JWTAction;