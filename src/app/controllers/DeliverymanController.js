import * as Yup from 'yup';
import Deliveryman from '../models/Deliveryman';

class DeliverymanController {
  async index(req, res) {
    try {
      const deliveryman = await Deliveryman.findAll();

      console.log(deliveryman);

      return res.json(deliveryman);
    } catch (err) {
      return res.json(err);
    }
  }

  async store(req, res) {
    const { name, email } = req.body;

    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails.' });
    }

    const deliverymanExists = await Deliveryman.findOne({ where: { email } });

    if (deliverymanExists) {
      return res.status(400).json({ error: 'User already exists.' });
    }

    const deliveryman = await Deliveryman.create({ name, email });

    return res.json(deliveryman);
  }

  async update(req, res) {
    return res.json();
  }

  async delete(req, res) {
    return res.json();
  }
}

export default new DeliverymanController();