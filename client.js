/**
This file would act as the Client library. I have used Fibonacci backoff strategy for polling.
Here, I'm assuming that in the real scenarios, the task duration of the video would be dynamic and hence the
error handling would be done dynamically which would instantly return the "error" status if there are any technical issues
and in that case, the client would stop polling for the status updates. But since currently there is no error handling or any
technical exceptions, the client would be polling for the updates until the task duration is completed (until last polling 
attempt after the task is completed)
*/

const axios = require('axios');

class Client {
  constructor(url) {
    this.url = url;
  }

  async getStatus() {
    const response = await axios.get(`${this.url}/status`);
    return response.data.result;
  }

  async getTaskStatus() {
    let n1 = 1000, n2 = 1000;
    let next = n1;
  
    while (true) {
      let result;
      try {
        result = await this.getStatus();
        console.log(`Server returned "${result}"`);
      } catch (err) {
        console.log(`Error: ${err.message}`);
        result = 'error';
      }
  
      if (result === 'completed' || result === 'error') {
        return result;
      }
  
      console.log(`Waiting for ${next}ms`);
      await this.sleep(next);
      
      const temp = n1 + n2;
      n1 = n2;
      n2 = temp;
      next = temp;
    }
  }

  sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}

module.exports = Client;
