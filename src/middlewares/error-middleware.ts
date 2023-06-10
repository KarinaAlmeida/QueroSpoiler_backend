import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import { ApplicationError } from '@/protocols';

export function handleApplicationErrors(err: ApplicationError | Error, req: Request, res: Response, next: NextFunction) {
  if (err.name === 'ConflictError' || err.name === 'DuplicatedEmailError' || err.name === 'DuplicatedSummaryError') {
    return res.status(httpStatus.CONFLICT).send({
      message: err.message,
    });
  }

  
    if (err.name === "InvalidCredentialsError") {
      return res.status(httpStatus.UNAUTHORIZED).send({
        message: err.message,
      });
    }
  
    if (err.name === "UnauthorizedError") {
      return res.status(httpStatus.UNAUTHORIZED).send({
        message: err.message,
      });
    }
  
    if (err.name === "NotFoundError") {
      return res.status(httpStatus.NOT_FOUND).send({
        message: err.message,
      });
    }

    if (err.name==="NotAllowed") {
      return res.status(httpStatus.CONFLICT).send({ message: err.message});
    }

    console.error(err);
  
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
      error: "InternalServerError",
      message: "Internal Server Error",
    });
  }