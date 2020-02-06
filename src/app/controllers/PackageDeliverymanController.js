import { Op } from 'sequelize';
import { getHours, parseISO, getMinutes, endOfDay, startOfDay } from 'date-fns';
import * as Yup from 'yup';
import Package from '../models/Package';
import Deliveryman from '../models/Deliveryman';
import Signature from '../models/Signature';

class PackageDeliverymanController {
  async index(req, res) {
    const deliverymanExists = await Deliveryman.findByPk(req.params.id);

    if (!deliverymanExists) {
      return res.json({ err: 'User not found.' });
    }

    const packages = await Package.findAll({
      where: {
        deliveryman_id: req.params.id,
        canceled_at: null,
        end_date: null,
      },
    });

    return res.json(packages);
  }

  async show(req, res) {
    const deliverymanExists = await Deliveryman.findByPk(req.params.id);

    if (!deliverymanExists) {
      return res.json({ err: 'User not found.' });
    }

    const packages = await Package.findAll({
      where: {
        deliveryman_id: req.params.id,
        end_date: { [Op.ne]: null },
      },
    });

    return res.json(packages);
  }

  async start(req, res) {
    const schema = Yup.object().shape({
      deliveryman_id: Yup.number().required(),
      package_id: Yup.number().required(),
      start_date: Yup.date().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.json({ error: 'Validation fails.' });
    }

    const { deliveryman_id, package_id: id, start_date } = req.body;

    const quantityToday = await Package.count({
      where: {
        deliveryman_id,
        start_date: {
          [Op.between]: [startOfDay(new Date()), endOfDay(new Date())],
        },
      },
    });

    if (quantityToday === 5) {
      return res.json({ error: 'Maximum daily number exceeded.' });
    }

    const packageDelivery = await Package.findOne({
      where: { deliveryman_id, id },
    });

    if (!packageDelivery) {
      return res
        .status(401)
        .json({ error: 'Package not found for this deliveryman' });
    }

    if (packageDelivery.start_date !== null) {
      return res.json({ error: 'Package already withdrawn.' });
    }

    // gethours ta retonando a hora com +1, entao estou sbtraindo 1
    const hour = getHours(parseISO(start_date)) - 1;

    const minutes = getMinutes(parseISO(start_date));

    // verificaro horário e também verifica os minutos, se for 18:01 não sera
    // mais possível retirar

    if (!(hour >= 8 && hour <= 18)) {
      return res.json({ error: 'Delivery time is 8:00H to 18:00H' });
    }

    if (hour === 18 && minutes !== 0) {
      return res.json({ error: 'Delivery time is 8:00H to 18:00H' });
    }

    packageDelivery.start_date = new Date();
    packageDelivery.save();
    return res.json(packageDelivery);
  }

  async end(req, res) {
    const schema = Yup.object().shape({
      deliveryman_id: Yup.number().required(),
      package_id: Yup.number().required(),
    });

    if (!(await schema.isValid(req.query))) {
      return res.json({ error: 'Validation fails.' });
    }

    const { deliveryman_id, package_id: id } = req.query;

    const { originalname: name, filename: path } = req.file;

    const packageDelivery = await Package.findOne({
      where: { deliveryman_id, id },
    });

    if (!packageDelivery) {
      return res
        .status(401)
        .json({ error: 'Package not found for this deliveryman.' });
    }

    if (packageDelivery.end_date !== null) {
      return res.json({ error: 'Package already delivered.' });
    }

    const { id: idSignature } = await Signature.create({
      name,
      path,
    });

    packageDelivery.signature_id = idSignature;
    packageDelivery.end_date = new Date();
    packageDelivery.save();
    return res.json(packageDelivery);
  }
}

export default new PackageDeliverymanController();
