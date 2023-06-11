import { Router } from 'express';
import {authenticateToken, validateSchema} from '@/middlewares';
import { postSum } from '@/schemas';
import { getPost, postSummary } from '@/controller';

const postRouter = Router();
postRouter
.get("/:postId", getPost)
.all('/*', authenticateToken)
.post("/", validateSchema(postSum), postSummary)



export {postRouter};