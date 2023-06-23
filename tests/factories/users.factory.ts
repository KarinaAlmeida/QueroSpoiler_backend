import bcrypt from 'bcrypt';
import faker from '@faker-js/faker';
import { User } from '@prisma/client';
import { prisma } from '@/config';

export async function createUser(params: Partial<User> = {}): Promise<User> {
    const incomingPassword = params.password || faker.faker.internet.password({ length: 6 });  const hashedPassword = await bcrypt.hash(incomingPassword, 10);

    return prisma.user.create({
        data: {
          name: params.name || faker.faker.person.firstName(),
          picture: params.picture || faker.faker.internet.url(),
          email: params.email || faker.faker.internet.email(),
          password: hashedPassword,
        },
      });
}