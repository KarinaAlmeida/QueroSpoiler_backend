import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { unauthorizedError } from "@/errors";


export async function authenticateToken( req: AuthenticatedRequest, res: Response,next: NextFunction) {
  const { authorization } = req.headers;
  if (!authorization) throw unauthorizedError();

  const parts = authorization.split(" ");
  if (parts.length !== 2) throw unauthorizedError();

  const [schema, token] = parts;
  if (schema !== "Bearer") throw unauthorizedError();

  try {
    const { user_id } = jwt.verify(token, process.env.JWT_SECRET) as JWTPayload;

    if (!user_id) throw unauthorizedError();

    req.user_id = user_id;

    return next();
  } catch (err) {
   next(err);
  }
}

export type AuthenticatedRequest = Request & JWTPayload;

type JWTPayload = {
  user_id: number;
};