import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Mail from '../../lib/Mail';

class NotificationPackageMail {
  get key() {
    return 'NotificationPackageMail';
  }

  // responsável pela realização da tarefa
  async handle({ data }) {
    console.log('fila executada...', deliveryman);
    const { deliveryman } = data;
    await Mail.sendMail({
      to: `${deliveryman.name} <${deliveryman.email}>`,
      subject: 'Nova entrega cadastrada!',
      template: 'packageDone',
      context: {
        deliveryman: deliveryman.name,
        product: deliveryman.product
      },
    });
  }
}

export default new NotificationPackageMail();
