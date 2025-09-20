import request from 'supertest';
import express from 'express';
import mongoose from 'mongoose';
import sweetsRouter from '../src/routes/sweets.routes.js';
import inventoryRouter from '../src/routes/inventory.routes.js';
import Sweet from '../src/models/sweet.model.js';
import { Request, Response, NextFunction } from 'express';

const app = express();
app.use(express.json());

app.use('/api/sweets', sweetsRouter);
app.use('/api/inventory', inventoryRouter);

jest.mock(
  '../src/middlewares/verifyToken',
  () => (req: Request, res: Response, next: NextFunction) => {
    (req as any).user = { id: 'test-user', role: 'admin' };
    (req as any).isAdmin = true;
    next();
  },
);

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI_TEST || 'mongodb://127.0.0.1:27017/sweets_test');
});
afterAll(async () => {
  await mongoose.disconnect();
});
afterEach(async () => {
  await Sweet.deleteMany({});
});

describe('Sweets API', () => {
  it('should add a new sweet', async () => {
    const res = await request(app)
      .post('/api/sweets')
      .send({ name: 'Ladoo', category: 'Mithai', price: 10, quantity: 100, description : 'Delicious Indian sweet' });
    expect(res.statusCode).toBe(201);
    expect(res.body.sweet.name).toBe('Ladoo');
    expect(res.body.sweet).not.toHaveProperty('imageUrl');
  });

  it('should get all sweets', async () => {
    await Sweet.create({ name: 'Barfi', category: 'Mithai', price: 15, quantity: 50, description : 'Delicious Indian sweet' });
    const res = await request(app).get('/api/sweets');
    expect(res.statusCode).toBe(200);
    expect(res.body.sweets.length).toBeGreaterThan(0);
  });

  it('should search sweets by name', async () => {
    await Sweet.create({ name: 'Jalebi', category: 'Mithai', price: 12, quantity: 30 });
    const res = await request(app).get('/api/sweets/search?name=Jalebi');
    expect(res.statusCode).toBe(200);
    expect(res.body.sweets[0].name).toBe('Jalebi');
  });

  it('should update a sweet', async () => {
    const sweet = await Sweet.create({
      name: 'Rasgulla',
      category: 'Bengali',
      price: 20,
      quantity: 40,
      description : 'Delicious Indian sweet'
    });
    const res = await request(app).put(`/api/sweets/${sweet._id}`).send({ price: 25 });
    expect(res.statusCode).toBe(200);
    expect(res.body.sweet.price).toBe(25);
    expect(res.body.sweet).not.toHaveProperty('imageUrl');
  });

  it('should delete a sweet', async () => {
    const sweet = await Sweet.create({ name: 'Peda', category: 'Mithai', price: 8, quantity: 60, description : 'Delicious Indian sweet' });
    const res = await request(app).delete(`/api/sweets/${sweet._id}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toMatch(/deleted/i);
  });
});
