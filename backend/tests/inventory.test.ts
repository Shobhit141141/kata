import request from 'supertest';
import express from 'express';
import mongoose from 'mongoose';
import inventoryRouter from '../src/routes/inventory.routes.js';
import Sweet from '../src/models/sweet.model.js';
import { Request, Response, NextFunction } from 'express';

const app = express();
app.use(express.json());
jest.mock("../src/middlewares/verifyToken", () => (req: Request, res: Response, next: NextFunction) => {
  (req as any).user = { id: "test-user", role: "admin" }; 
  (req as any).isAdmin = true;
  next();
});
app.use('/api/inventory', inventoryRouter);

beforeAll(async () => {
  await mongoose.connect('mongodb://127.0.0.1:27017/sweets_test');
});
afterAll(async () => {
  await mongoose.disconnect();
});
afterEach(async () => {
  await Sweet.deleteMany({});
});

describe('Inventory API', () => {
  it('should purchase a sweet (decrease quantity)', async () => {
    const sweet = await Sweet.create({
      name: 'Kaju Katli',
      category: 'Indian',
      price: 30,
      quantity: 5,
    });
    const res = await request(app).post(`/api/inventory/${sweet._id}/purchase`);
    expect(res.statusCode).toBe(200);
    expect(res.body.sweet.quantity).toBe(4);
  });

  it('should restock a sweet (increase quantity)', async () => {
    const sweet = await Sweet.create({
      name: 'Soan Papdi',
      category: 'Indian',
      price: 18,
      quantity: 10,
    });
    const res = await request(app).post(`/api/inventory/${sweet._id}/restock`).send({ amount: 5 });
    expect(res.statusCode).toBe(200);
    expect(res.body.sweet.quantity).toBe(15);
  });
});
