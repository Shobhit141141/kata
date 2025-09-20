import * as cloudinaryUtils from '../src/utils/cloudinary.js';

jest.mock('../src/config/cloudinary.js', () => ({
  uploader: {
    upload_stream: jest.fn((options, cb) => {
      return {
        end: (buffer: Buffer) => {
          if (!buffer) cb(new Error('No file'), null);
          else cb(null, { url: 'mock_url', public_id: options.public_id });
        },
      };
    }),
    destroy: jest.fn((publicId, opts) => {
      if (!publicId) return Promise.reject(new Error('No publicId'));
      return Promise.resolve({ result: 'ok' });
    }),
  },
}));

describe('cloudinary utils', () => {
  it('should throw if file is missing for uploadImage', async () => {
    await expect(cloudinaryUtils.uploadImage(undefined as any, 'test')).rejects.toBeDefined();
  });

  it('should throw if publicId is missing for deleteImage', async () => {
    await expect(cloudinaryUtils.deleteImage(undefined as any)).rejects.toBeDefined();
  });

  it('should throw if publicId or file is missing for updateImage', async () => {
    await expect(cloudinaryUtils.updateImage(undefined as any, undefined as any)).rejects.toBeDefined();
  });
});
