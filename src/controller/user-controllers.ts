import {signup, signin, userPost } from '@/services';
import httpStatus from 'http-status';
import { NextFunction, Request, Response } from "express";
import { AuthenticatedRequest } from '@/middlewares';

export async function signUp (req: Request, res: Response, next: NextFunction) {
  const { name, email, password, picture } = req.body;
  try {
    await signup({ name, email, password, picture });
    return res.sendStatus(httpStatus.CREATED);
  } catch (err) {
    next(err);
    }
}

export async function signIn(req: Request, res: Response, next: NextFunction) {
  const { email, password } = req.body;
  try {
    const user = await signin({ email, password });
    return res.send({ user });

  } catch (err) {
    next(err);
  }

}

export async function getUserPost(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const { user_id } = req;
    const posts = await userPost(user_id);
    return res.status(httpStatus.OK).send(posts);
  } catch (error) {
    console.log(error);
    next(error);
  }
}