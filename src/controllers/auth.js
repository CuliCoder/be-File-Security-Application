import * as authServices from '../services/auth.js';
export const login = async (req, res) => {
    console.log("Login request received");
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }
        const user = await authServices.login(email, password);
        return res.status(200).json(user);
    }
    catch (err) {
        return res.status(400).json({ message: err });
    }
}