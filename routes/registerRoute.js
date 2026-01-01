import express from "express";
import { mongoDB } from "../app.js";
import { ObjectId } from "mongodb";
const register = express();

register.post("/", async (req, res) => {
  const user = req.body;
  const users = await mongoDB.collection("users").find().toArray();
  console.log(users);
  for (let i = 0; i < users.length; i++) {
    if (users[i].username === user.username) {
      res.status(404).json({ error: "user already register" });
    }
  }
  const registerUser = {
    username: user.username,
    password: user.password,
    encryptedMessagesCount: 0,
    createdAt: new Date().toISOString(),
  };
  const result = await mongoDB.collection("users").insertOne(registerUser);
  res.json({ id: result.insertedId, name: user.username });
});

export default register;
