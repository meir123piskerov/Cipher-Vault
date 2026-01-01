import express from "express";
import { supabase } from "../app.js";
import decryptMiddleWare from "../middleware/decryptMiddleware.js";
const decrypt = express();

decrypt.post("/", decryptMiddleWare, async (req, res) => {
  const messagesToDecrypt = req.body.messageId;
  const { data, error } = await supabase
    .from("messages")
    .select()
    .eq("id", messagesToDecrypt);
  for (let i = 0; i < data.length; i++) {
    console.log(data[i].id);
    if (data[i]["id"] === messagesToDecrypt) {
      const decryptMessage = data[i].encrypted_text
        .split("")
        .reverse()
        .join("");
      res
        .status(200)
        .json({ id: messagesToDecrypt, decryptedText: decryptMessage });
    }
  }
  res.status(404).json({
    id: messagesToDecrypt,
    decryptedText: null,
    error: "CANNOT_DECRYPT",
  });
});
export default decrypt;
