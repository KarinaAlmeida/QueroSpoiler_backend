import { prisma } from '@/config';
import { Summary } from "@/protocols";

export async function findByTitle (title:string) {
    return prisma.post.findFirst({
        where: {
          title: title,
        },
      });
}

export async function postSumRepo({ title, author, coverUrl, summary, user_id }: Summary) {
    return prisma.post.create({
        data: {
          title: title,
          author: author,
          coverUrl: coverUrl,
          summary: summary,
          userId: user_id
        },
      });
}