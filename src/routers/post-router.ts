import { Router } from 'express';
import {authenticateToken, validateSchema} from '@/middlewares';
import { postSum } from '@/schemas';
import { postSummary } from '@/controller';

const postRouter = Router();
postRouter
.all('/*', authenticateToken)
.post("/", validateSchema(postSum), postSummary)



export {postRouter};