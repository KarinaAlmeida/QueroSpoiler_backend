import { Router } from 'express';
import {authenticateToken, validateSchema} from '@/middlewares';
import {signup, signin, update} from '@/schemas';
import {signUp, signIn, getUserPost, deleteUserPost, updateUserPic, getUserFaves} from '@/controller';


const userRouter = Router();

userRouter
.post("/", validateSchema(signin), signIn)
.post('/signup', validateSchema(signup), signUp )
.all('/user*', authenticateToken)
.get("/user", getUserPost)
.delete("/user/:postId", deleteUserPost)
.put("/user", validateSchema(update), updateUserPic)
.get("/user/favorite", getUserFaves)



export {userRouter};
 