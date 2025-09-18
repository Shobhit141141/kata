import request from 'supertest';
import app from '../src/app.js';
import mongoose from 'mongoose';

beforeAll(async () => {
  const uri = 'mongodb://127.0.0.1:27017/myapp_test';
  await mongoose.connect(uri);
});

beforeEach(async () => {
  await mongoose.connection.collection('users').deleteMany({});
});

afterAll(async () => {
  await mongoose.connection.collection('users').deleteMany({});
  await mongoose.disconnect();
  
});

describe('Auth Routes', () => {
  it('should register a new user', async () => {
    const res = await request(app).post('/api/auth/register').send({
      username: 'testuser',
      email: 'testuser@example.com',
      password: 'testpassword',
    });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('user');
  });

  it('should login a user', async () => {
    await request(app).post('/api/auth/register').send({
      username: 'testuser',
      email: 'testuser@example.com',
      password: 'testpassword',
    });

    const res = await request(app).post('/api/auth/login').send({
      email: 'testuser@example.com',
      password: 'testpassword',
    });
    expect(res.statusCode).toBe(200);
    const cookies = res.headers['set-cookie'];
    expect(cookies).toBeDefined();
    const cookiesArray = Array.isArray(cookies) ? cookies : [cookies];
    expect(cookiesArray.some((cookie) => cookie.startsWith('token='))).toBe(true);
  });
});
