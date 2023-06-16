import { Router } from 'express';
import { getRecent } from '@/controller';

const homeRouter = Router();
homeRouter
.get("/", getRecent)

export {homeRouter};