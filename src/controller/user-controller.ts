import {signup, signin } from '@/services';
import httpStatus from 'http-status';
import { NextFunction, Request, Response } from "express";

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
    const token = await signin({ email, password });
    return res.send({ token });

  } catch (err) {
    next(err);
  }

}