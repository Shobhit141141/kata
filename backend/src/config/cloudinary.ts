import { v2 as cloudinary } from 'cloudinary';
import { CONSTANTS } from './constants.js';

cloudinary.config({
  cloud_name: CONSTANTS.CLOUDINARY_CLOUD_NAME,
  api_key: CONSTANTS.CLOUDINARY_API_KEY,
  api_secret: CONSTANTS.CLOUDINARY_API_SECRET,
});

export default cloudinary;
