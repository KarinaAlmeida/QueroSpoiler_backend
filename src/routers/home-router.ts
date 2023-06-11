import { Router } from 'express';
// import {authenticateToken} from '@/middlewares';
import { getRecent } from '@/controller';

const homeRouter = Router();
homeRouter
.get("/", getRecent)

export {homeRouter};