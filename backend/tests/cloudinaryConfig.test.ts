import cloudinary from '../src/config/cloudinary.js';

describe('cloudinary config', () => {
  it('should have uploader property', () => {
    expect(cloudinary.uploader).toBeDefined();
  });
});
