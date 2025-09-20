import { upload } from '../src/middlewares/multer.js';

describe('multer upload', () => {
  it('should be defined', () => {
    expect(upload).toBeDefined();
  });
});
