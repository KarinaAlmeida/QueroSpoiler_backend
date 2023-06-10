import { Summary } from "@/protocols";
import { getPosts } from "@/repositories";



export async function getRecentPost(): Promise<Summary[]> {
    const post = await getPosts();
    return post;
  }
