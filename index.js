import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import connectDB from "./mongoC.js";

dotenv.config();
const port = 4000;
const app = express();

app.use((_req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

// Middleware to parse JSON and URL encoded data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Default route
app.get("/", (req, res) => {
  res.send("Hello World, from express");
});

// POST route to add a user
app.post("/addUser", async (req, res) => {
  try {
    const db = await connectDB(); // Ensure DB connection
    const collection = db.collection("users");

    let newDocument = req.body;
    newDocument.date = new Date();
    
    const result = await collection.insertOne(newDocument);
    console.log("Added user:", req.body);
    
    res.status(201).send({ message: "User added successfully", result });
  } catch (error) {
    console.error("Error adding user:", error);
    res.status(500).send({ message: "Error adding user" });
  }
});

// GET route to fetch all users
app.get("/getUsers", async (req, res) => {
  try {
    const db = await connectDB(); // Ensure DB connection
    const collection = db.collection("users");

    const results = await collection.find({}).toArray();
    
    res.status(200).send(results);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).send({ message: "Error fetching users" });
  }
});

// Start the server
app.listen(port, function () {
  console.log("Server is listening at port:" + port);
});
