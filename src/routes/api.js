import { Router } from 'express';
import * as authController from '../controllers/auth.js';
import JWTAction from '../middleware/JWTAction.js';
import * as userController from '../controllers/user.js';
const route = Router();

route.post('/auth/login', authController.login);
route.post('/auth/register', authController.register);
route.use(JWTAction);
route.put('/user/change-password', userController.changePassword);
route.get('/auth/checkStatus', authController.checkStatus);
route.get('/auth/logout', authController.logout);
route.post('/user/save-key', userController.save_Key);
route.get('/user/get-key', userController.get_Key);
export default route;