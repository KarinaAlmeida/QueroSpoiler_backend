import {faker} from '@faker-js/faker';
import { prisma } from '@/config';

export async function generateFakePosts(userId:number) {

    return prisma.post.create({
        data: {
            title: faker.lorem.sentence(),
            author: faker.person.firstName(),
            coverUrl: faker.internet.url(),
            summary: faker.lorem.paragraph(),
            userId: userId,
        },

  })
}