import { prisma } from '@/config';
import { SignUp, Summary } from '@/protocols';

export async function findByEmail (email:string) {
    return prisma.user.findFirst({
        where: {
          email: email,
        },
      });
}
export async function signUp ({ name, email, password, picture }:SignUp) {
    return prisma.user.create({
        data: {
          name: name,
          email: email,
          password: password,
          picture: picture
        },
      });
}

export async function getPostsByUserId(user_id: number): Promise<Summary[]> {
  const posts = await prisma.post.findMany({
    where: {
      userId: user_id,
    },
    select: {
      id: true,
      title: true,
      author: true,
      coverUrl: true,
      summary: true
    },
  });
  const limitedPosts = posts.map(post => ({
    ...post,
    summary: post.summary.length > 200 ? post.summary.substring(0, 200) + '...' : post.summary
  }));
  
  return limitedPosts;
} 