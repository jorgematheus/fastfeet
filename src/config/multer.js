import multer from 'multer';
import crypto from 'crypto';
import { extname, resolve } from 'path';

class MulterUpload {
  index(path = '') {
    const conf = multer.diskStorage({
      destination: resolve(__dirname, '..', '..', 'tmp', 'uploads', path !== '' ? path : ''),
      filename: (req, file, cb) => {
        crypto.randomBytes(16, (err, res) => {
          if (err) return cb(err);
  
          return cb(null, res.toString('hex') + extname(file.originalname));
        });
      },
    });
    
    return {
      storage: conf
    }
  }
}

export default new MulterUpload();

// export default {
//   storage: multer.diskStorage({
//     destination: resolve(__dirname, '..', '..', 'tmp', 'uploads'),
//     filename: (req, file, cb) => {
//       crypto.randomBytes(16, (err, res) => {
//         if (err) return cb(err);

//         return cb(null, res.toString('hex') + extname(file.originalname));
//       });
//     },
//   }),
// };
