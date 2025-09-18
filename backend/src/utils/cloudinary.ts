import cloudinary from '../config/cloudinary.js';

export const uploadImage = async (filePath: string, title: string) => {
  return cloudinary.uploader.upload(filePath, {
    folder: 'images',
    public_id: title,
    resource_type: 'image',
  });
};

export const deleteImage = async (publicId: string) => {
  return cloudinary.uploader.destroy(publicId, {
    resource_type: 'image',
  });
};

export const updateImage = async (publicId: string, newFilePath: string, newTitle?: string) => {
  // Delete the old image
  await deleteImage(publicId);
  // Upload the new image (optionally with a new title)
  return uploadImage(newFilePath, newTitle || publicId);
};
