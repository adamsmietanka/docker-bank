const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const config = {
    name: 'backend',
    port: 8000,
    host: '0.0.0.0',
};
const { createClient } = require('redis');
const redisClient = createClient({
  socket: {
      host: 'cache',
      port: 6379
  },
});

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get('/', async (req, res) => {
    res.status(200).json({value: 500});

    redisClient.on("error", (error) => console.error(`Error : ${error}`));
    await redisClient.connect();
    await redisClient.set('test', 'tes', function(err, reply) {
        console.log(reply); // OK
      });
    const value = await redisClient.get('test');
    console.log(value)
});

app.listen(config.port, config.host);