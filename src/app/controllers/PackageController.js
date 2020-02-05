import * as Yup from 'yup';
import Package from '../models/Package';

class PackageController {
  async store(req, res) {
    const schema = Yup.object().shape({
      recipient_id: Yup.number().required(),
      deliveryman_id: Yup.number().required(),
      product: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ err: 'Validations fails.' });
    }

    const create = await Package.create(req.body);

    return res.json(create);

    // return res.json();
  }
}

export default new PackageController();
