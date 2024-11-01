import * as authServices from '../services/auth.js';
import * as regex from '../utils/regex.js';
import * as userServices from '../services/user.js';
import keytar from 'keytar';
import create_token from '../utils/create-token.js';
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                error: 1,
                message: "Vui lòng điền đầy đủ thông tin!"
            });
        }
        const response = await authServices.login(email, password);
        if (response.error === 0) {
            const accessToken = create_token(response.id);
            console.log(accessToken);
            const setToken = await userServices.setPublicKey_Token(response.id, accessToken.public_key_token);
            if (setToken.error === 1) {
                return res.status(500).json({
                    error: 1,
                    message: "Đăng nhập thất bại"
                });
            }
            console.log(response.id);
            await keytar.setPassword('file-security-app', "id_user", response.id.toString());
            await keytar.setPassword('file-security-app', "accessToken", accessToken.token);
        }
        return res.status(200).json({
            error: response.error,
            message: response.message
        });
    } catch (error) {
        return res.status(500).json(error);
    }
}

export const register = async (req, res) => {
    try {
        const { email, password, repeatPassword } = req.body;
        if (!email || !password || !repeatPassword) {
            return res.status(400).json({
                error: 1,
                message: "Vui lòng điền đầy đủ thông tin!"
            });
        }
        if (!regex.rgEmail.test(email)) {
            return res.status(400).json({
                error: 1,
                message: "Email không hợp lệ!"
            });
        }
        if (!regex.rgPw.test(password)) {
            return res.status(400).json({
                error: 1,
                message: "Mật khẩu phải có ít nhất 8 ký tự, trong đó có ít nhất 1 ký tự viết hoa",
            });
        }
        if (password !== repeatPassword) {
            return res.status(400).json({
                error: 1,
                message: "Mật khẩu xác nhận không trùng khớp!"
            });
        }
        const response = await authServices.register(email, password);
        return res.status(200).json(response);
    }
    catch (err) {
        return res.status(500).json(err);
    }
}
export const checkStatus = async (req, res) => {
    return res.status(200).json({
        error: 0,
        message: "Success"
    });
}
export const logout = async (req, res) => {
    try {
        await keytar.deletePassword('file-security-app', 'accessToken');
        await keytar.deletePassword('file-security-app', 'id_user');
        return res.status(200).json({
            error: 0,
            message: "Logout successfully"
        });
    } catch (error) {
        return res.status(500).json(error);
    }
}