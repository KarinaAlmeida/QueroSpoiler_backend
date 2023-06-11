import { Summary } from "@/protocols";
import { prisma } from '@/config';



export async function getPosts(): Promise<Summary[]> {
 const posts= await prisma.post.findMany({
    take: 4,
    orderBy: {
        createdAt: 'desc'
  },
    select: {
        id: true,
        title: true,
        author: true,
        coverUrl: true,
        summary: true
  }
    });

    const limitedPosts = posts.map(post => ({
        ...post,
        summary: post.summary.length > 200 ? post.summary.substring(0, 200) + '...' : post.summary
      }));
      
      return limitedPosts;

  }