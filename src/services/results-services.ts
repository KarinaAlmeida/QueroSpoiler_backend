import { notFoundError } from "@/errors";
import { Search } from "@/protocols";
import { getPostsByAuthor, getPostsByAuthorAndTitle, getPostsByTitle } from "@/repositories";


export async function searchSum(title?:string, author?:string): Promise<Search[]>{
  // console.log(title, author);
    if (author === undefined && title === undefined) {
        throw notFoundError() 
        
      } else if (author !== undefined && title !== undefined) {
        const post= await getPostsByAuthorAndTitle(title, author);
        return post

      } else if (author !== undefined) {
        const post= await getPostsByAuthor(author);
        return post

      } else {
        const post= await getPostsByTitle(title);
        return post

  }
}