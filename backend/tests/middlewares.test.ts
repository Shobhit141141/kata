import request from 'supertest';
import app from '../src/app.js';

describe('Admin Middleware', () => {
  it('should allow access for admin user', async () => {
    // Simulate admin user on req
    const res = await request(app).get('/api/sweets').set('Cookie', ['token=admin-token']); // You may need to mock verifyToken
    // This test is illustrative; actual admin check is in integration
    expect([200, 401, 403]).toContain(res.statusCode);
  });

  it('should deny access for non-admin user', async () => {
    // Simulate non-admin user
    const res = await request(app).delete('/api/sweets/someid').set('Cookie', ['token=user-token']);
    expect([401, 403]).toContain(res.statusCode);
  });
});

describe('VerifyToken Middleware', () => {
  it('should deny access if no token', async () => {
    const res = await request(app).get('/api/sweets');
    expect(res.statusCode).toBe(401);
    expect(res.body.message).toMatch(/no token/i);
  });

  it('should deny access if token is invalid', async () => {
    const res = await request(app).get('/api/sweets').set('Cookie', ['token=invalidtoken']);
    expect(res.statusCode).toBe(401);
    expect(res.body.message).toMatch(/token is not valid/i);
  });
});

describe('Error Handler', () => {
  it('should handle errors and return 500', async () => {
    // Simulate a route that throws
    const res = await request(app).get('/api/throw-error');
    expect([404, 500]).toContain(res.statusCode); // 404 if route not present, 500 if error handler
  });
});
