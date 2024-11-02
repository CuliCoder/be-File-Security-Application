import * as regex from '../utils/regex.js';
import * as userServices from '../services/user.js';
export const changePassword = async (req, res) => {
    try {
        const id = req.data.id;
        const { password, newPassword, repeatPassword } = req.body;
        if (!id || !password || !newPassword || !repeatPassword) {
            return res.status(400).json({
                error: 1,
                message: "Vui lòng điền đầy đủ thông tin!"
            });
        }
        if (!regex.rgPw.test(newPassword)) {
            return res.status(400).json({
                error: 1,
                message: "Mật khẩu phải có ít nhất 8 ký tự, trong đó có ít nhất 1 ký tự viết hoa",
            });
        }
        if (newPassword !== repeatPassword) {
            return res.status(400).json({
                error: 1,
                message: "Mật khẩu xác nhận không trùng khớp!"
            });
        }
        const response = await userServices.changePassword(id, password, newPassword);
        return res.status(200).json(response);
    }
    catch (error) {
        return res.status(500).json(error);
    }

}
export const save_Key = async (req, res) => {
    try {
        const id = req.data.id;
        const { privateKey_rsa, key_aes } = req.body;
        if (!id || !privateKey_rsa || !key_aes) {
            return res.status(400).json({
                error: 1,
                message: "thiếu key"
            });
        }
        const response = await userServices.save_Key(id, JSON.stringify(privateKey_rsa), JSON.stringify(key_aes));
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json(error);
    }
}
export const get_Key = async (req, res) => {
    try {
        const id = req.data.id;
        if (!id) {
            return res.status(400).json({
                error: 1,
                message: "Vui lòng điền đầy đủ thông tin!"
            });
        }
        const response = await userServices.get_Key(id);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json(error);
    }
}