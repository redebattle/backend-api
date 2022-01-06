import crypto from 'crypto';
import multer from 'multer';
import { resolve, extname } from 'path';

const folderDestination = resolve(
  __dirname,
  '..',
  '..',
  '..',
  'tmp',
  'uploads',
  'img'
);

const allowedMimes = ['image/jpg', 'image/png', 'image/jpeg', 'image/gif'];

export default {
  directory: folderDestination,

  storage: multer.diskStorage({
    destination: folderDestination,
    filename: (req, file, cb) => {
      const fileHash = crypto.randomBytes(16).toString('HEX');
      return cb(null, fileHash + extname(file.originalname));
    },
  }),
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
  fileFilter: (req, file, cb) => {
    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Tipo de arquivo inválido.'));
    }
  },
};
