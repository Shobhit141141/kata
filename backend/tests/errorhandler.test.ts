import { errorHandler } from '../src/middlewares/errorhandler.js';

describe('errorHandler', () => {
  it('should be a function', () => {
    expect(typeof errorHandler).toBe('function');
  });
});
