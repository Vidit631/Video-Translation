# Video Translation Simulation (Node.js)

This project uses Fibonacci backoff as the main strategy for polling through client.

## Running the Integration Test

Install 'express' and 'axios' if not present, using the following command:
npm install express axios

To run the integration test, change the active directory to 'video-translation-simulation' and run the following command:
npm test

## Using the client library in your own code:

1. Import the library in your code

const Client = require('./client');

const client = new Client('http://localhost:3000');

async function checkStatus() {
  const result = await client.getTaskStatus();
  console.log('Final status:', result);
}

checkStatus();

2. You can also call getStatus() if you just need a direct single request.