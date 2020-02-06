import DeliveryProblem from '../models/DeliveryProblem';
import Package from '../models/Package';
import NotificationCancelledPackage from '../jobs/NotificationCancelledPackage';
import Deliveryman from '../models/Deliveryman';
import Queue from '../../lib/Queue';

class CancelledDeliveryController {

    async delete(req, res) {
        const { delivery_id } = await DeliveryProblem.findOne({ where: { id: req.params.idProblem } });

        if (!delivery_id) {
            res.json({ error: 'Delivery Problem not found.' });
        }
        

        const cancellation = await Package.findOne({ where: { id: delivery_id }, include: [{
            model: Deliveryman,
            as: 'deliveryman',
            attributes: ['name', 'email']
        }] });

        if (cancellation.canceled_at !== null) {
            res.json({ error: 'This package has already been canceled.' }); 
        }

        if (!cancellation) {
            res.json({ error: 'Package not found.' });
        }

        const deliveryman = {
            product: cancellation.product,
            email: cancellation.deliveryman.email,
            name: cancellation.deliveryman.name,
          };

          console.log(deliveryman)
      
        await Queue.add(NotificationCancelledPackage.key, { deliveryman });

        cancellation.canceled_at = new Date();
        cancellation.save();

        
        return res.json({ message: 'Package has been cancelled.' });

    }
}

export default new CancelledDeliveryController();