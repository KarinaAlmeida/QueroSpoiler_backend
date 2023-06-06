import { duplicatedSummaryError } from "@/errors";
import { Summary } from "@/protocols";
import { findByTitle, postSumRepo } from "@/repositories";


 

export async function validateSummary(title: string) {
    const summaryDuplicated = await findByTitle(title);
    if (summaryDuplicated) throw duplicatedSummaryError(title)
  }


 export async function postSumService({ title, author, coverUrl, summary, user_id }: Summary) {
    await validateSummary (title);

  await postSumRepo({ title, author, coverUrl, summary, user_id }); 
  } 