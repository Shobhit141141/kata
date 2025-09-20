import { v4 as uuidv4 } from 'uuid';
import User from '../src/models/user.model.js';

describe('User Model', () => {
  it('should create a user instance', () => {
    const user = new User({
      _id: uuidv4(),
      username: 'Test User',
      email: 'test@example.com',
      password: 'hashedpassword',
      role: 'user',
      tokens: 10,
    });
    expect(user.username).toBe('Test User');
    expect(user.email).toBe('test@example.com');
    expect(user.role).toBe('user');
    expect(user.tokens).toBe(10);
  });
});
