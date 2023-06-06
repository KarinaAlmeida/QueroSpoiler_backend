import { NextFunction, Request, Response } from "express";
import httpStatus from 'http-status';
import { postSumService } from "@/services/post-services";
import { AuthenticatedRequest } from "@/middlewares";




export async function postSummary(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    const {user_id}= req
    const { title, author, coverUrl, summary } = req.body;

    try {
        await postSumService({ title, author, coverUrl, summary, user_id });
        return res.sendStatus(httpStatus.CREATED);
    } catch (error) {
        console.log(error)
        next(error);
    }

}