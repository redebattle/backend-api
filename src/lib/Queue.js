import Bee from 'bee-queue';

import CadastroMail from '../app/jobs/CadastroMail';
import ForgotPasswordMail from '../app/jobs/ForgotPasswordMail';
import NewSessionMail from '../app/jobs/NewSessionMail';
import ResendForgotPasswordMail from '../app/jobs/ResendForgotPasswordMail';
import ResetPasswordEmail from '../app/jobs/ResetPasswordEmail';
import redisConfig from '../config/redis';

const jobs = [
  ForgotPasswordMail,
  ResetPasswordEmail,
  ResendForgotPasswordMail,
  CadastroMail,
  NewSessionMail,
];

class Queue {
  constructor() {
    this.queues = {};
    this.init();
  }

  init() {
    jobs.forEach(({ key, handle }) => {
      this.queues[key] = {
        bee: new Bee(key, {
          redis: redisConfig,
        }),
        handle,
      };
    });
  }

  add(queue, job) {
    return this.queues[queue].bee.createJob(job).save();
  }

  processQueue() {
    jobs.forEach((job) => {
      const { bee, handle } = this.queues[job.key];

      bee.on('failed', this.handleFailure).process(handle);
    });
  }

  handleFailure(job, err) {
    console.log(`Queu ${job.queue.name}: FAILED`, err);
  }
}
export default new Queue();
