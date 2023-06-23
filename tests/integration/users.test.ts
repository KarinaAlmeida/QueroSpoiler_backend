import httpStatus from 'http-status';
import { faker } from '@faker-js/faker';
import supertest from 'supertest';
import { cleanDb } from '../helpers';
import { prisma } from '@/config';
import app, { init } from '@/app';
import { BadRequestError, duplicatedEmailError } from '@/errors';
import { createUser } from '../factories/users.factory';

beforeAll(async () => {
    await init();
    await cleanDb();
  });

  const server = supertest(app);

  describe('POST /signup', () => {
    it('should respond with status 400 when body is not given', async () => {
      const response = await server.post('/signup');

      expect(response.status).toBe(httpStatus.BAD_REQUEST);
      expect(response.body).toEqual(BadRequestError());
    });
  
    it('should respond with status 400 when body is not valid', async () => {
      const invalidBody = { [faker.lorem.word()]: faker.lorem.word() };
  
      const response = await server.post('/signup').send(invalidBody);
  
      expect(response.status).toBe(httpStatus.BAD_REQUEST);
    });
  
    // describe('when body is valid', () => {
    //   const generateValidBody = () => ({
    //     name: faker.person.firstName(),
    //     email: faker.internet.email(),
    //     password: faker.internet.password({ length: 6 }),
    //     picture: faker.internet.url(),
    //   });
  
    //     it('should respond with status 409 when there is an user with given email', async () => {
    //       const body = generateValidBody();
    //       await createUser(body);
  
    //       const response = await server.post('/signup').send(body);
  
    //       expect(response.status).toBe(httpStatus.CONFLICT);
    //       expect(response.body).toEqual(duplicatedEmailError(body.email));
    //     });
  
      //   it('should respond with status 201 and create user when given email is unique', async () => {
      //     const body = generateValidBody();
  
      //     const response = await server.post('/signup').send(body);
      //     expect(response.status).toBe(httpStatus.CREATED);
      //   expect(response.body).toEqual({
      //     id: expect.any(Number),
      //     email: body.email,
      //   });
      // });

      // it('should save user on db', async () => {
      //   const body = generateValidBody();

      //   const response = await server.post('/signup').send(body);

      //   const user = await prisma.user.findUnique({
      //     where: { email: body.email },
      //   });
      //   expect(user).toEqual(
      //     expect.objectContaining({
      //       id: response.body.id,
      //       email: body.email,
      //     }),
      //     );
      // });
    // });
  });