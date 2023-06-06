import { prisma } from '@/config';
import { SignUp } from '@/protocols';

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

// export async function findById(id:number) {
//     return prisma.user.findUnique({
//       where: {
//         id: id,
//       },
//     });
//   }

