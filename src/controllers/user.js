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
