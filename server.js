/**
Here the server simulates the video translation process. As mentioned in the question, the whole task runs for TASK_DURATION
amount of time, during which it returns "pending" status. In real scenarios, this task duration would be different for each
video depending on its size and other factors. After the task duration is complete, the server returns "completed" or "error".
Currently, I'm handling the error randomly based on variable CHANCE_OF_ERROR. However, the error handling would be different
in real scenarios.
*/

const express = require('express');
const app = express();

const TASK_DURATION = Math.floor(Math.random() * (50000 - 1000 + 1)) + 1000;

const starttime = Date.now();

app.get('/status', (req, res) => {
    const currentTime = Date.now();
    const elapsedTime = currentTime - starttime;

    if (elapsedTime < TASK_DURATION) {
        return res.json({ result: 'pending' });
    }

    if (Math.random() < 0.4) {
        return res.json({ result: 'error' });
    } else {
        return res.json({ result: 'completed' });
    }
});

let serverobj;

function startServer(port = 3000) {
    return new Promise((resolve) => {
        serverobj = app.listen(port, () => {
            console.log(`Video translation started`);
            console.log(`Task Duration is: ${TASK_DURATION}`);
            resolve();
        });
    });
}

function stopServer() {
    return new Promise((resolve, reject) => {
        if (!serverobj) {
            return resolve();
        }
        serverobj.close((err) => {
            if (err) return reject(err);
            console.log('Stopped');
            resolve();
        });
    });
}

if (require.main === module) {
    startServer();
}

module.exports = { startServer, stopServer };
