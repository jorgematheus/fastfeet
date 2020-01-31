import Recipient from '../models/Recipient';
import * as Yup from 'yup';

class RecipientController {

    async index(req, res) {
        try {
            const recipient = await Recipient.findAll();
            return res.json(recipient);

        } catch(err) {
            return res.status(500).json(err)
        }
    }

    async store(req, res) {
        try {
            const schema = Yup.object().shape({
                name: Yup.string().required(),
                street: Yup.string().required(),
                number: Yup.number().required(),
                state: Yup.string().required().max(2),
                cep: Yup.string().required(),
                complement: Yup.string()
            });

            if (!(await schema.isValid(req.body))) {
                return res.status(400).json({ error: 'Validation fails' });
            }
            const recipient = await Recipient.create(req.body);
            return res.json(recipient);
        } catch(err) {
            return res.status(500).json(err);
        }
    }
}

export default new RecipientController();