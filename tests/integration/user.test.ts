import httpStatus from 'http-status';
import { faker } from '@faker-js/faker';
import supertest from 'supertest';
import { cleanDb } from '../helpers';
import app, { init } from '@/app';
import { createUser } from '../factories/users.factory';
import { createToken } from '../factories/auth.factory';
import jwt from "jsonwebtoken";



beforeAll(async () => {
    await init();
    await cleanDb();
  });

  const server = supertest(app);

  describe("GET /user", () => {
    
    it('should respond with unauthorized if no token is provided', async () => {
        const response= await server.get('/user');
        expect(response.status).toBe(httpStatus.UNAUTHORIZED);   
     })

     it('should respond with unauthorized if given token is invalid', async () => {
      const payload = {
        userId: 123456,
        username: 'exemplo',
      };
        const invalidToken = jwt.sign(payload, process.env.JWT_SECRET);

        const response= await server.get('/user').set('Authorization', `Bearer ${invalidToken}`);
        expect(response.status).toBe(httpStatus.UNAUTHORIZED);   
     })

   
  })

//   describe("DELETE /user/:postId", () => {

//   })

//   describe("PUT /user", () => {

//   })

//   describe ("GET /user/favorite", () => {

//   })