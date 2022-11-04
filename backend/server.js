import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { createClient } from "redis";

const config = {
  name: "backend",
  port: 8000,
  host: "0.0.0.0",
};

const funds = {
  Bob: 1000,
  Alice: 2000,
  John: 500,
};
const client = createClient({
  socket: {
    host: "cache",
    port: 6379,
  },
});

client.on("error", (err) => {
  console.log(err);
});

const app = express();

app.use(bodyParser.json());
app.use(cors());

await client.connect();

app.get("/", async (req, res) => {
  await client.set("test", "tes", function (err, reply) {
    console.log(reply); // OK
  });
  const value = await client.get("test");
  console.log(value);
  res.status(200).json({ value: 500 });
});

app.get("/people", async (req, res) => {
  res.status(200).json(Object.keys(funds));
});

app.post('/reset/', async (req, res) => {
    await client.hSet('funds', [...Object.entries(funds).flat()], function(err, reply) {
        console.log(reply); // OK
      });
    const value = await client.hGetAll('funds');
    console.log(value)
    res.status(200).json(value);
});

app.listen(config.port, config.host);
