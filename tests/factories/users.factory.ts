import bcrypt from 'bcrypt';
import {faker} from '@faker-js/faker';
import { User } from '@prisma/client';
import { prisma } from '@/config';

export async function createUser(email?: string, password?: string,name?: string, picture?:string): Promise<User> {
    const incomingPassword = password || faker.internet.password({ length: 6 });  
    const hashedPassword = await bcrypt.hash(incomingPassword, 10);

    return prisma.user.create({
        data: {
          name: name || faker.person.firstName(),
          picture: picture || faker.internet.url(),
          email: email || faker.internet.email(),
          password: hashedPassword,
        },
      });
}