import {signup, signin, userPost, deletePost, userPic, userFaves } from '@/services';
import httpStatus, { BAD_REQUEST } from 'http-status';
import { NextFunction, Request, Response } from "express";
import { AuthenticatedRequest } from '@/middlewares';
import { notFoundError } from '@/errors';

export async function signUp (req: Request, res: Response, next: NextFunction) {
  const { name, email, password, picture } = req.body;
  try {
    const user= await signup({ name, email, password, picture });
    return res.status(httpStatus.CREATED).json({id: user.id, name: user.name, picture: user.picture, email: user.email});;
  } catch (err) {
    next(err);
    }
}

export async function signIn(req: Request, res: Response, next: NextFunction) {
  const { email, password } = req.body;
  try {
    const user = await signin({ email, password });
    return res.status(httpStatus.OK).send({user});

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

export async function deleteUserPost (req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const postId = parseInt(req.params.postId);
    if(isNaN(postId) || postId <=0 || !postId) return res.sendStatus(httpStatus.BAD_REQUEST)
    await deletePost(postId)
    return res.sendStatus(httpStatus.OK)

  }catch(error) {
    console.log(error);
    next(error);
  }
}

export async function updateUserPic (req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const { user_id } = req;
    const {picture} = req.body;
    if (!user_id) throw notFoundError();

    const pic= await userPic(user_id, picture);
    return res.status(httpStatus.OK).send(pic)

  } catch (error) {
    console.log(error);
    next(error);
  }
  
}

export async function getUserFaves(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const { user_id } = req;
    const posts = await userFaves(user_id);
    return res.status(httpStatus.OK).send(posts);
  } catch (error) {
    console.log(error);
    next(error);
  }
}