import cloudinary from '../config/cloudinary.js';
import logger from './logger.js';

export const uploadImage = (file: Express.Multer.File, title: string) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: 'kata_images/sweets',
        public_id: title,
        resource_type: 'image',
      },
      (error, result) => {
        if (error) {
          logger.error('Cloudinary upload error:', error);
          reject(error);
        } else {
          logger.info('Cloudinary upload response:', result);
          resolve(result);
        }
      },
    );
    stream.end(file.buffer);
  });
};

export const deleteImage = async (publicId: string) => {
  return cloudinary.uploader.destroy(publicId, {
    resource_type: 'image',
  });
};

export const updateImage = async (
  publicId: string,
  newFile: Express.Multer.File,
  newTitle?: string,
) => {
  await deleteImage(publicId);
  return uploadImage(newFile, newTitle || publicId);
};
