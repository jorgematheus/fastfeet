import jwt from 'jsonwebtoken';
import * as Yup from 'yup';
import User from '../models/User';
import authConfig from '../../config/auth';

class SessionController {
  async store(req, res) {
    try {
      const { email, password } = req.body;

      const schema = Yup.object().shape({
        email: Yup.string()
          .email()
          .required(),
        password: Yup.string().required(),
      });

      if (!(await schema.isValid(req.body))) {
        return res.status(400).json({ error: 'validation fails, try again.' });
      }

      const user = await User.findOne({ where: { email } });

      if (!user) {
        return res.status(401).json({ error: 'Account does not exists.' });
      }

      if (!(await user.checkPassword(password))) {
        return res.status(401).json({ error: 'Validation fails, password not matched' });
      }

      const { id, name } = user;

      return res.json({
        user: {
          id,
          name,
          email,
        },
        token: jwt.sign({ id, name, email }, authConfig.secret, {
          expiresIn: authConfig.expiresIn,
        }),
      });
    } catch (err) {
      return res.status(400).json(err);
    }
  }
}

export default new SessionController();
