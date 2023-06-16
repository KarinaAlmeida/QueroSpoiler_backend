import { Router } from 'express';
import {authenticateToken, validateSchema} from '@/middlewares';
import {signup, signin} from '@/schemas';
import {signUp, signIn, getUserPost} from '@/controller';


const userRouter = Router();

userRouter
.post("/", validateSchema(signin), signIn)
.post('/signup', validateSchema(signup), signUp )
.all('/user*', authenticateToken)
.get("/user", getUserPost)
// .put("/user")
// .delete("/user")



export {userRouter};
 