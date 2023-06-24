import bcrypt from "bcrypt";
import {duplicatedEmailError,invalidCredentialsError, notFoundError } from '@/errors';
import jwt from "jsonwebtoken";
import "dotenv/config";
import {SignUp, SignIn, Summary } from '@/protocols';
import {deletePostById, findByEmail, findPostById, getFavesByUserId, getFavoritePosts, getPostById, getPostsByUserId, signUp, updatePic } from '@/repositories';


export async function validateEmail(email: string) {
    const emailDuplicated = await findByEmail(email);
    if (emailDuplicated) throw duplicatedEmailError(email)
  }


export async function signup({ name, email, password, picture }:SignUp) {
    await validateEmail(email)

    const hashPassword = await bcrypt.hash(password, 10);
    const user = await signUp({ name, email, password: hashPassword, picture });
    return user;
  }


 export async function signin({ email, password }: SignIn) {
    const user = await findByEmail(email)
    if (!user) throw invalidCredentialsError();
  
    const correctPassword = await bcrypt.compare(password, user.password);
    if (!correctPassword) throw invalidCredentialsError();

    const pic = user.picture
    const token = jwt.sign({ user_id: user.id }, process.env.JWT_SECRET);
  
    return {token, pic};
  }  

  export async function userPost(user_id: number): Promise<Summary[]> {
    const posts = await getPostsByUserId(user_id);
    if (!posts || posts.length === 0) throw notFoundError();
    return posts;
  }

  export async function deletePost(postId:number) {
    const postExists = await findPostById (postId);
    if(!postExists) throw notFoundError();

    await deletePostById (postId);
  }
  
  export async function userPic (user_id:number, picture: string) {
    if (isNaN(user_id)) throw notFoundError();
    const pic = await updatePic(user_id, picture);
    return pic;
  }

  export async function userFaves(user_id: number){
    const postIdObj = await getFavesByUserId(user_id);
    const postIds= postIdObj.map((obj)=> obj.postId);

    const posts = await getFavoritePosts(postIds);


    if (!posts || posts.length === 0) throw notFoundError();
    return posts;
  }

