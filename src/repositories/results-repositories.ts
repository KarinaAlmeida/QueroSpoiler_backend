import { prisma } from '@/config';


export async function getPostsByAuthorAndTitle (title: string, author: string) {
    const posts = await prisma.post.findMany({
        where: {

          author: {
            equals: author.toLowerCase(),
            mode: 'insensitive',
          },
          title: {
            equals:title.toLowerCase(),
            mode: 'insensitive',
          } ,
        },
        select:{
            id:true,
            title:true,
            author: true,
            coverUrl:true,
            summary:true,
        
        }
      });
      const limitedPosts = posts.map(post => ({
        ...post,
        summary: post.summary.length > 100 ? post.summary.substring(0, 100) + '...' : post.summary,
      }));
      return limitedPosts;
}

export async function getPostsByAuthor(author: string) {
    const posts = await prisma.post.findMany({
        where: {
          author: {
            equals: author.toLowerCase(),
            mode: 'insensitive',
          },
        },
        select:{
            id:true,
            title:true,
            author: true,
            coverUrl:true,
            summary:true,
        }

      });
      const limitedPosts = posts.map(post => ({
        ...post,
        summary: post.summary.length > 100 ? post.summary.substring(0, 100) + '...' : post.summary,
      }));
      return limitedPosts;
    }

export async function getPostsByTitle (title: string) {
    const posts = await prisma.post.findMany({
        where: {
          title: {
            equals:title.toLowerCase(),
            mode: 'insensitive',
          } 
        },
        select:{
            id:true,
            title:true,
            author: true,
            coverUrl:true,
            summary:true,
        }
      });
      const limitedPosts = posts.map(post => ({
        ...post,
        summary: post.summary.length > 100 ? post.summary.substring(0, 100) + '...' : post.summary,
      }));
      return limitedPosts;
    }
