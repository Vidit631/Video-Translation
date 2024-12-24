/**
This file represents the integration test. Here I've assumed that a single client would be executing a single task and
hence when a Client object is created, it represents a single task
*/

const { startServer, stopServer } = require('./server');
const Client = require('./client');

(async function runIntegrationTest() {
  try {

    await startServer(3000);
    const client = new Client('http://localhost:3000');
    
    console.log('Polling started...');
    const finalResult = await client.getTaskStatus();
    console.log(`Final result: "${finalResult}"`);

  } catch (error) {
    console.error('Error occured', error.message);
  } finally {
    await stopServer();
  }
})();