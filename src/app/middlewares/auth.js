import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import authConfig from '../../config/auth';

export default {
  async store(req, res, next) {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.status(401).send({ error: 'Token not found.' });
    }

    const [, token] = authorization.split(' ');

    try {
      const decoded = await promisify(jwt.verify)(token, authConfig.secret);
      req.userId = decoded.id;

      next();

      // return res.json({ token: decoded });
    } catch (err) {
      return res.status(500).json({ error: err });
    }
  },
};
