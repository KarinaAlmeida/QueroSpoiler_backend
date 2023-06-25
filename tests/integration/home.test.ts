import app, { init } from "@/app";
import { cleanDb } from "../helpers";
import supertest from "supertest";
import httpStatus from 'http-status';
import { faker } from '@faker-js/faker';
import { prisma } from '@/config';
import { generateFakePosts } from "../factories/post.factory";
import { createUser } from "../factories/users.factory";



beforeAll(async () => {
    await init();
    await cleanDb();
  });

  const server = supertest(app);

  describe("GET /home", () =>{
    it('should return an empty array when theres no recent posts', async () => {
      const response = await server.get('/home');

      expect(response.status).toBe(httpStatus.OK);
      expect(response.body).toEqual([]);
    })

    it('should return an array of recent posts', async () => {
      const user= await createUser();
      const fakePosts = await generateFakePosts(user.id);
      const response = await server.get('/home');

      expect(response.status).toBe(httpStatus.OK);
      expect(response.body).toEqual([{
            id:response.body[0].id,
            title: response.body[0].title,
            author: response.body[0].author,
            coverUrl: response.body[0].coverUrl,
            summary: response.body[0].summary,
    }]);
    })
  })