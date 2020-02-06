import DeliveryProblem from '../models/DeliveryProblem';
import Package from '../models/Package';
import * as Yup from 'yup';



class DeliveryProblemController {

    async index(req, res) {
        const deliverysProblem = await DeliveryProblem.findAll({ attributes: ['id', 'description'], include: [ { model: Package, as: 'delivery', attributes: ['id', 'product']} ]});
        
        return res.json(deliverysProblem)
    }

    async show(req, res) {
        const deliveryProblems = await DeliveryProblem.findAll({ where: { delivery_id: req.params.id } });

        if (deliveryProblems.length === 0) {
            return res.json({ message: 'No problems registered for this package.' })
        }

        return res.json(deliveryProblems);
    }

    async store(req, res) {
        const schema = Yup.object().shape({
            deliveryman_id: Yup.number().required(),
            description: Yup.string().required(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.json({ error: 'Validation fails.' });
        }

        const { idPackage } = req.params;
        const { deliveryman_id, description } = req.body;

        const hasPackage = await Package.findOne({ where: { id: idPackage, deliveryman_id } });

        if (!hasPackage) {
            return res.status(400).json({ error: 'Package not found for this deliveryman.' })
        }

        const deliveyProblem = await DeliveryProblem.create({ delivery_id: idPackage, description });

        return res.json(deliveyProblem);        
    }
}

export default new DeliveryProblemController();