import httpStatus from 'http-status';
import { faker } from '@faker-js/faker';
import supertest from 'supertest';
import { cleanDb } from '../helpers';
import app, { init } from '@/app';
import { createUser } from '../factories/users.factory';

beforeAll(async () => {
    await init();
    await cleanDb();
  });

  const server = supertest(app);

  describe("GET /post/:postId", () => {

  })

  describe("POST /post", () => {

  })

  describe("POST /post/favorite", () => {

  })

  describe("DELETE /post/favorite", () => {
    
  })