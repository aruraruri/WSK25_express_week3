import express from 'express';
import {authUser} from '../controllers/auth-controller';

const authRouter = express.Router();

authRouter.route('/login').post(authUser);

export default authRouter;
