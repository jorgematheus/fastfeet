import Bee from 'bee-queue';
import NotificationPackageMail from '../app/jobs/NotificationPackageMail';
import redisConfig from '../config/redis';

const jobs = [NotificationPackageMail];

class Queue {
  constructor() {
    this.queues = {};

    this.init();
  }

  init() {
    try {
        jobs.forEach(({ key, handle }) => {
            this.queues[key] = {
              bee: new Bee(key, {
                redis: redisConfig,
              }),
              handle,
            };
          });
    } catch(err) {
        console.log('error em lib/queue. ', err)
        return err;
    }
  }

  // adicionar novos jobs
  add(queue, job) {
    try {
        return this.queues[queue].bee.createJob(job).save();
    } catch(err) {
        console.log('error em lib/queue. ', err)
        return err;
    }
  }

  // processa as filas
  processQueue() {
    try {
        jobs.forEach(job => {
            const { bee, handle } = this.queues[job.key];
      
            bee.on('failed', this.handleFailure).process(handle);
          });
    } catch(err) {
        console.log('error em lib/queue. ', err)
        return err;
    }
  }

  handleFailure(job, err) {
    console.log(`Queue ${job.queue.name} FAILED `, err);
  }
}

export default new Queue();
