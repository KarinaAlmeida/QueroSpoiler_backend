import { NextFunction, Request, Response } from "express";
import httpStatus from 'http-status';
import { getRecentPost } from "@/services";




export async function getRecent(req: Request, res: Response, next: NextFunction) {

    try {
        
        const posts= await getRecentPost();
        return res.status(httpStatus.OK).send(posts);
        } catch (error) {
        console.log(error)
        next(error);
    }

}