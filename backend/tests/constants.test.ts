import { CONSTANTS } from '../src/config/constants.js';

describe('CONSTANTS', () => {
  it('should have required properties', () => {
    expect(CONSTANTS).toHaveProperty('MONGO_URI');
    expect(CONSTANTS).toHaveProperty('PORT');
    expect(CONSTANTS).toHaveProperty('JWT_SECRET');
    expect(CONSTANTS).toHaveProperty('CLOUDINARY_CLOUD_NAME');
    expect(CONSTANTS).toHaveProperty('CLOUDINARY_API_KEY');
    expect(CONSTANTS).toHaveProperty('CLOUDINARY_API_SECRET');
    expect(CONSTANTS).toHaveProperty('NODE_ENV');
    expect(CONSTANTS).toHaveProperty('CLIENT_URL');
    expect(CONSTANTS).toHaveProperty('GEMINI_API_KEY');
  });
});
