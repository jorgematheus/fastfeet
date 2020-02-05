import * as Yup from 'yup';
import Package from '../models/Package';
import Deliveryman from '../models/Deliveryman';
import Queue from '../../lib/Queue';
import NotificationPackageMail from '../jobs/NotificationPackageMail';

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

    const { deliveryman_id, product } = await Package.create(req.body);

    const { email, name } = await Deliveryman.findByPk(deliveryman_id);


    const deliveryman = {
      product,
      email, 
      name      
    };

    await Queue.add(NotificationPackageMail.key, { deliveryman });


    return res.json(deliveryman);

    // return res.json();
  }
}

export default new PackageController();
