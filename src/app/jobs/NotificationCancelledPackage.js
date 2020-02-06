import Mail from '../../lib/Mail';

class NotificationCancelledPackage {
  get key() {
    return 'NotificationCancelledPackage';
  }

  // responsável pela realização da tarefa
  async handle({ data }) {
    const { deliveryman } = data;
    await Mail.sendMail({
      to: `${deliveryman.name} <${deliveryman.email}>`,
      subject: 'Entrega cancelada.',
      template: 'packageCancelled',
      context: {
        deliveryman: deliveryman.name,
        product: deliveryman.product,
      },
    });
  }
}

export default new NotificationCancelledPackage();
