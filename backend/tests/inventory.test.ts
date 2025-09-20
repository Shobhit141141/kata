import request from 'supertest';
import express, { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import inventoryRouter from '../src/routes/inventory.routes.js';
import Sweet from '../src/models/sweet.model.js';
import User from '../src/models/user.model.js';

const app = express();
app.use(express.json());

let testUserId: mongoose.Types.ObjectId;

// Create a real ObjectId before mocking
jest.mock(
  '../src/middlewares/verifyToken',
  () => (req: Request, res: Response, next: NextFunction) => {
    (req as any).user = { id: testUserId?.toString(), role: 'admin' };
    (req as any).isAdmin = true;
    next();
  },
);

app.use('/api/inventory', inventoryRouter);

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI_TEST || 'mongodb://127.0.0.1:27017/sweets_test');
  await User.deleteMany({});

  const user = await User.create({
    username: 'testuser',
    email: 'test@example.com',
    password: 'password123',
    role: 'user',
    tokens: 10,
  });

  testUserId = user._id as mongoose.Types.ObjectId;
});

afterAll(async () => {
  await User.deleteMany({});
  await mongoose.disconnect();
});

afterEach(async () => {
  await Sweet.deleteMany({});
});

describe('Inventory API', () => {
  it('should purchase a sweet (decrease quantity, return tokens)', async () => {
    const sweet = await Sweet.create({
      name: 'Kaju Katli',
      category: 'Mithai',
      price: 30,
      quantity: 5,
      description: 'Delicious Indian sweet',
    });

    const res = await request(app).post(`/api/inventory/${sweet._id}/purchase`).send({ amount: 2 });

    expect(res.statusCode).toBe(200);
    expect(res.body.sweet.quantity).toBe(3); // 5 - 2
    expect(res.body.purchased.quantity).toBe(2);
    expect(res.body.purchased.totalPrice).toBe(60);
    expect(res.body.purchased.tokensDeducted).toBe(Math.ceil(60 / 100));
  });

  it('should restock a sweet (increase quantity)', async () => {
    const sweet = await Sweet.create({
      name: 'Soan Papdi',
      category: 'Mithai',
      price: 18,
      quantity: 10,
      description: 'Delicious Indian sweet',
    });

    const res = await request(app).post(`/api/inventory/${sweet._id}/restock`).send({ amount: 5 });

    expect(res.statusCode).toBe(200);
    expect(res.body.sweet.quantity).toBe(15);
  });
});
