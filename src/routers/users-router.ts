import { Router } from 'express';
import {validateSchema} from '@/middlewares';
import {signup, signin} from '@/schemas';
import {signUp, signIn} from '@/controller';


const userRouter = Router();

userRouter.post("/", validateSchema(signin), signIn)
userRouter.post('/signup', validateSchema(signup), signUp )



export {userRouter};
 