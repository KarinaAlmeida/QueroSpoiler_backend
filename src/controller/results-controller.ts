import { searchSum } from "@/services";
import { NextFunction, Request, Response } from "express";
import httpStatus from 'http-status';

export async function getResults(req: Request, res: Response, next: NextFunction) {
const title = req.query.title as string;
const author = req.query.author as string;
    try {
        
        const result= await searchSum (title, author);

        return res.status(httpStatus.OK).send(result);
        } catch (error) {
        console.log(error)
        next(error);
    }

}
