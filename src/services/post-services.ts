import { duplicatedSummaryError, notFoundError } from "@/errors";
import { Summary } from "@/protocols";
import { deleteFaveSum, findByTitle, getPostById, postFaveSum, postSumRepo } from "@/repositories";


 

export async function validateSummary(title: string) {
    const summaryDuplicated = await findByTitle(title);
    if (summaryDuplicated) throw duplicatedSummaryError(title)
  }


 export async function postSumService({ title, author, coverUrl, summary, user_id }: Summary) {
    await validateSummary (title);

 const post= await postSumRepo({ title, author, coverUrl, summary, user_id }); 
 return post;
  } 

  export async function getPostId ({postId}: any): Promise<Summary>  {
   const post = await getPostById ({postId});
   if (!post) throw notFoundError();
    return post;

  }

  export async function postFavorite (user_id: number, postId: number) {
    if (isNaN(user_id) || isNaN(postId)) throw notFoundError();
    const fave= await postFaveSum (user_id, postId);
    return fave;

  }

  export async function deleteFavorite (user_id: number, postId: number) {
    if (isNaN(user_id) || isNaN(postId)) throw notFoundError();
    const fave= await deleteFaveSum (user_id, postId);
    return fave;

  }