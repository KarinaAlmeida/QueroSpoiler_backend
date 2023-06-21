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
  const createdPost = await prisma.post.create({
    data: {
      title: title,
      author: author,
      coverUrl: coverUrl,
      summary: summary,
      userId: user_id
    },
  });
  return createdPost.id;
}

export async function getPostById ({postId}: any) {
  const id = parseInt(postId);
  const posts= await prisma.post.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      title: true,
      author: true,
      coverUrl: true,
      summary: true
}

  })
  return posts;
}

export async function postFaveSum (user_id: number, postId: number) {
  const fave = await prisma.favorite.create({
    data: {
      postId: postId,
      userId: user_id,
    },
  });

  return fave;
}

export async function deleteFaveSum (user_id: number, postId: number) {
  const fave = await prisma.favorite.deleteMany({
    where: {
      postId: postId,
      userId: user_id
    },
  });

  return fave;
}