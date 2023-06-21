import { Router } from 'express';
import {authenticateToken, validateSchema} from '@/middlewares';
import { postSum } from '@/schemas';
import { deleteFave, getPost, postFave, postSummary } from '@/controller';

const postRouter = Router();
postRouter
.get("/:postId", getPost)
.all('/*', authenticateToken)
.post("/", validateSchema(postSum), postSummary)
.post("/favorite", postFave )
.delete("/favorite", deleteFave)



export {postRouter};