/* eslint-disable import/prefer-default-export */
/**
 * Needs
 * Email
 *  1 Store
 *  Multiple Stores
 *  All Stores
 *
 * If store email doesn't send (IDK)
 * Mark store and proceed to next.
 *
 * Then return List of all stores that didn't get emailed.
 *
 */
import axios from 'axios';

const data = {
  service_id: 'service_jryhiqz',
  template_id: 'template_ukq1p99',
  user_id: 'user_QnKCUkpKVhofDrMfz4mUx',
  template_params: {
    subject: 'test subject',
    name: 'test name',
    email: 'kinggiuseppe1@gmail.com',
    message: 'test message',
  },
};
export const emailStore = async (): Promise<boolean> => {
  axios.post('https://api.emailjs.com/api/v1.0/email/send', data)
    .then((result) => {
      console.log(result);
    }, (error) => {
      console.log(error);
    });

  return false;
};
