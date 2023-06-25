import {signin } from "@/services";
import { faker } from "@faker-js/faker";
import { createUser } from "./users.factory";

export async function createToken() {
  const user = {
    email: faker.internet.email(),
    password: faker.internet.password({ length: 6 }),
  };
  const {email, password}= user;
  await createUser(user.email, user.password);

  const login = await signin({email, password});

  return login.token;
}