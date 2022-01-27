// =====DEPENDENCIES=====
require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan")

//=====DATABASE CONNECTION=====
const { PORT, MONGODB_URL } = process.env
mongoose.connect(MONGODB_URL)
db = mongoose.connection

db
    .on("open", () => console.log("You are connected to mongoose"))
    .on("close", () => console.log("You are disconnected from mongoose"))
    .on("error", (error) => console.log(error));

//=====MODEL=====
const playersSchema = new mongoose.Schema ({
    name: String,
    years_played: String,
    position: String,
    stat_one: String,
    stat_two: String,
    stat_three: String,
    image: String,
}, {timestamps: true})

const Players = mongoose.model("Players", playersSchema)

//======MIDDLEWARE======
app.use(cors())
app.use(morgan("dev"))
app.use(express.json())

//======ROUTES======
app.get("/", (req, res) => {
    res.send("hello")
})

//INDEX ROUTE
  app.get("/players", async (req, res) => {
    try {
      // send all players
      res.json(await Players.find({}));
    } catch (error) {
      //send error
      res.status(400).json(error);
    }
  });
  
//CREATE ROUTE
  app.post("/players", async (req, res) => {
    try {
      // send all players
      res.json(await Players.create(req.body));
    } catch (error) {
      //send error
      res.status(400).json(error);
    }
  });
  
//DELETE ROUTE
  app.delete("/players/:id", async (req, res) => {
    try {
      // send all players
      res.json(await Players.findByIdAndRemove(req.params.id));
    } catch (error) {
      //send error
      res.status(400).json(error);
    }
  });
  
//UPDATE ROUTE
  app.put("/players/:id", async (req, res) => {
    try {
      // send all players
      res.json(
        await Players.findByIdAndUpdate(req.params.id, req.body, { new: true })
      );
    } catch (error) {
      //send error
      res.status(400).json(error);
    }
  });

//=====LISTENER=====
app.listen(PORT, () => console.log("I am listening"));
