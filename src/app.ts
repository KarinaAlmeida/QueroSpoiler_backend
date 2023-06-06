import express, { Express } from "express";
import cors from "cors";

import { handleApplicationErrors } from '@/middlewares';

import {
  postRouter,
  userRouter
} from '@/routers';

import { loadEnv, connectDb, disconnectDB } from "@/config";
loadEnv();

const app = express();
app
  .use(cors())
  .use(express.json())
  .use('/', userRouter)
  .use('/post', postRouter)
  .use(handleApplicationErrors);

  

export function init(): Promise<Express> {
  connectDb();
  return Promise.resolve(app);
}

export async function close(): Promise<void> {
  await disconnectDB();
}

export default app;
