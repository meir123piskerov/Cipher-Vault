import express from "express";
import { mongoDB } from "../app.js";
import { ObjectId } from "mongodb";
import profileMiddleWare from "../middleware/profileMiddleware.js";
const profile = express();

profile.get("/", profileMiddleWare, async (req, res) => {
  const username = req.headers.username;
  const result = await mongoDB.collection("users").find().toArray();
  for (let i = 0; i < result.length; i++) {
    if (result[i].username === username) {
      res
        .status(200)
        .json({
          username: username,
          encryptedMessagesCount: result[i].encryptedMessagesCount,
        });
    }
  }
});

export default profile;
