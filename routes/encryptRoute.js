import express from "express";
import { supabase } from "../app.js";
import { mongoDB } from "../app.js";
import { ObjectId } from "mongodb";
import encryptMiddleWare from "../middleware/encryptMiddleware.js";
const encrypted = express();

encrypted.post("/", encryptMiddleWare, async (req, res) => {
  const messages = req.body;
  const encrypt = messages.messages.split("").reverse().join("");
  const { data, error } = await supabase.from("messages").insert({
    username: req.headers.username,
    cipher_type: messages.cipher_type,
    encrypted_text: encrypt,
  });
  await mongoDB
    .collection("users")
    .updateOne({ username: "ari" }, { $inc: { encryptedMessagesCount: +1 } });

  res.status(200).json({
    id: 1,
    cipher_type: messages.cipher_type,
    encrypted_text: encrypt,
  });
});

export default encrypted;
