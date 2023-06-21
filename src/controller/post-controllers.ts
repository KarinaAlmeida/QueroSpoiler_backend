import { NextFunction, Request, Response } from "express";
import httpStatus from 'http-status';
import { deleteFavorite, getPostId, postFavorite, postSumService } from "@/services/post-services";
import { AuthenticatedRequest } from "@/middlewares";




export async function postSummary(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    const {user_id}= req
    const { title, author, coverUrl, summary } = req.body;

    try {
        const post= await postSumService({ title, author, coverUrl, summary, user_id });
        return res.status(httpStatus.CREATED).send({post})
    } catch (error) {
        console.log(error)
        next(error);
    }

}

export async function getPost(req: Request, res: Response, next: NextFunction) {
    const {postId} = req.params;
    try {
        const posts= await getPostId({postId});
        return res.status(httpStatus.OK).send(posts);
        } catch (error) {
        console.log(error)
        next(error);
    }

}

export async function postFave (req: AuthenticatedRequest, res: Response, next: NextFunction) {
    const {user_id} = req;
    const postId = Number(req.body.postId);
    
    try {
        const fave= await postFavorite(user_id, postId);
        return res.sendStatus(httpStatus.OK)
    } catch (error) {
        next(error);
    }

}

export async function deleteFave(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    const {user_id} = req;
    const postId = Number(req.body.postId);
    try {
        const fave= await deleteFavorite (user_id, postId);
        return res.sendStatus(httpStatus.OK)
    } catch (error) {
        next(error);
    }
}