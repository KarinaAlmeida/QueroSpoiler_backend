import { Router } from 'express';
// import {authenticateToken} from '@/middlewares';
import { getResults } from '@/controller';

const resultsRouter = Router();
resultsRouter
.get("/", getResults )



export {resultsRouter};