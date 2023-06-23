import * as jwt from 'jsonwebtoken';
import { User } from '@prisma/client';

import { prisma } from '@/config';
import { createUser } from './factories/users.factory';


export async function cleanDb() {
  await prisma.favorite.deleteMany({});
  await prisma.post.deleteMany({});
  await prisma.user.deleteMany({});

}

export async function generateValidToken(user?: User) {
  const incomingUser = user || (await createUser());
  const token = jwt.sign({ userId: incomingUser.id }, process.env.JWT_SECRET);

  return token;
}