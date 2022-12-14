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
  res.status(200).json(await client.hGetAll("funds"));
});

app.get("/people", async (req, res) => {
  res.status(200).json(Object.keys(funds));
});

app.post("/reset/", async (req, res) => {
  await client.hSet(
    "funds",
    [...Object.entries(funds).flat()],
    function (err, reply) {
      console.log(reply); // OK
    }
  );
  const value = await client.hGetAll("funds");
  console.log(value);
  res.status(200).json(value);
});

app.post("/topup/", async (req, res) => {
  const { user, amount } = req.body;
  await client.hIncrBy("funds", user, amount, function (err, reply) {
    console.log(reply);
  });
  const value = await client.hGetAll("funds");
  res.status(200).json(value);
});

app.post("/withdraw/", async (req, res) => {
  const { user, amount } = req.body;
  await client.hIncrBy("funds", user, -amount, function (err, reply) {
    console.log(reply);
  });
  const value = await client.hGetAll("funds");
  res.status(200).json(value);
});

app.post("/transfer/", async (req, res) => {
  const { from, to, amount } = req.body;
  await client.multi().hIncrBy("funds", from, -amount).hIncrBy("funds", to, amount).exec();
  res.status(200).json(await client.hGetAll("funds"));
});

app.listen(config.port, config.host);
