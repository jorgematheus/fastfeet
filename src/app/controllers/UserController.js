import User from '../models/User';

class UserController {
  async index(req, res) {
    const users = await User.findAll();
    return res.json(users);
  }

  async store(req, res) {
    const userExist = await User.findOne({ where: { email: req.body.email } });

    if (userExist) {
      return res.status(400).json({ error: 'User already exists.' });
    }
    const { name, email } = await User.create(req.body);
    return res.json({ name, email });
  }
}

export default new UserController();
