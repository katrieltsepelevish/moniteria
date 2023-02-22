import SuperTest, { Test } from 'supertest';

import User from '../models/user';
import jestServer from '../jestServer';
import { mongoClient } from '../setup/database';

const setup = async () => SuperTest(await jestServer());

let request: SuperTest.SuperTest<Test>;

beforeAll(async () => {
  request = await setup();
});

afterAll(async () => await mongoClient.connection.close());

describe('AUTH API ENDPOINTS', () => {
  describe('POST LOGIN /api/v1/auth/login', () => {
    it('Should not login user without passing data', async () => {
      const { status, body } = await request
        .post('/api/v1/auth/login')
        .send({});

      expect(status).toBe(422);
      expect(body).toMatchSnapshot();
    });

    it('Should successfully login a user', async () => {
      const testUser = {
        name: 'Moniteria',
        email: 'hi@moniteria.com',
        password: '2023',
      };

      await request.post('/api/v1/auth/register').send(testUser);

      const { status, body } = await request.post('/api/v1/auth/login').send({
        email: testUser.email,
        password: testUser.password,
      });

      expect(status).toBe(200);
      // expect(body.token).toBeTruthy();

      // const verifiedUser = await User.verifyToken(body.token);

      expect(body.user.email).toBe(testUser?.email);

      await User.findOneAndRemove({
        email: testUser.email,
      });
    });
  });

  describe('POST REGISTER /api/v1/auth/register', () => {
    it('Register without passing data should fail', async () => {
      const { status, body } = await request
        .post('/api/v1/auth/register')
        .send({});

      expect(status).toBe(422);
      expect(body).toMatchSnapshot();
    });

    it('Should successfully register a new user', async () => {
      const testUser = {
        name: 'Moniteria',
        email: 'hi@moniteria.com',
        password: '2023',
      };

      const { status, body } = await request
        .post('/api/v1/auth/register')
        .send(testUser);

      expect(status).toBe(201);
      // expect(body.token).toBeTruthy();

      const user = await User.findOne({
        email: testUser.email,
      });

      expect(user?.email).toBe(testUser.email);
      expect(user?.name).toBe(testUser.name);

      // const verifiedUser = await User.verifyToken(body.token);

      expect(user?.email).toBe(testUser?.email);

      await User.findOneAndRemove({
        email: testUser.email,
      });
    });
  });
});
