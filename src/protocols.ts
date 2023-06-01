import { Url } from "url";

export type ApplicationError = {
    name: string;
    message: string;
  };

  export type SignUp ={
    name:string;
    email: string;
    password: string;
    picture:string;
  }
  export type SignIn = {
    email: string;
    password: string;
  }