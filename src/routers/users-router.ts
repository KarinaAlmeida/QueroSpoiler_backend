import { Router } from 'express';
import {validateSchema} from '@/middlewares';
import {signup, signin} from '@/schemas';
import {signUp, signIn} from '@/controller';


const userRouter = Router();

userRouter.post('/signup', validateSchema(signup), signUp )
userRouter.post("/signin", validateSchema(signin), signIn)



export {userRouter};
 