import express from "express";
import { MongoClient } from "mongodb";

import * as dotenv from "dotenv"; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config();

const app = express();
const PORT = process.env.PORT;

const Mongo_URL = process.env.Mongo_URL;
const Client = new MongoClient(Mongo_URL);
await Client.connect();
console.log("MongoDB is Ready");

app.get("/", async (request, response) => {
  response.send(`Welome to Hall Booking`);
});

app.use(express.json());

app.post("/createroom", async (request, response) => {
  const { bed, amenities, price } = request.body;
  const room = await db("BookingHall")
    .collection("create")
    .insertOne({ bed: bed, amenities: amenities, price: price });
  room ? response.send("Room Created") : response.send("Room not Created");
});

app.post("/booking", async (request, response) => {
  const { customer_name, date, start_time, end_time, room_id } = request.body;
  const customer = (room_id, start_time) => {
    return db("BookingHall").collection("boooking").find({});
  };
  if (customer) {
    response.send("Booking Already Done");
  } else {
    const book = await db("BookingHall").collection("boooking").insertOne({
      customer_name: customer_name,
      date: date,
      start_time: start_time,
      end_time: end_time,
      room_id: room_id,
    });
    book
      ? response.send("Booking Success")
      : response.send("Booking Error Try again");
  }
});

app.get("/bookingdetails", async (request, response) => {
  const result = await db("bookingHall")
    .collection("booking")
    .find({})
    .toArray();
  response.send(result);
});

app.get("/bookinghistory", async (request, response) => {
  const result = await db("bookingHall")
    .collection("booking")
    .find({})
    .toArray();
  response.send(result);
});

app.listen(PORT, () => console.log(`server ready ${PORT}`));
