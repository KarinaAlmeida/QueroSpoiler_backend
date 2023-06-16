import { Router } from 'express';
import { getResults } from '@/controller';

const resultsRouter = Router();
resultsRouter
.get("/", getResults )



export {resultsRouter};