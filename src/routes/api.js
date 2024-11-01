import { Router } from 'express';
import * as authController from '../controllers/auth.js';
import JWTAction from '../middleware/JWTAction.js';
import * as userController from '../controllers/user.js';
const route = Router();

route.post('/auth/login', authController.login);
route.post('/auth/register', authController.register);
route.use(JWTAction);
route.put('/user/change-password', userController.changePassword);
export default route;