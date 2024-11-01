import { Router } from 'express';
import * as authController from '../controllers/auth.js';
const route = Router();

route.post('/login', authController.login);
export default route;