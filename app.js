import express from "express";
import "dotenv/config";
import { connectMongo } from "./connetion/mongoDB.js";
import register from "./routes/registerRoute.js";
import encrypted from "./routes/encryptRoute.js";
import { connectToSupabase } from "./connetion/supabase.js";
import decrypt from "./routes/decryptRoute.js";
import profile from "./routes/profileRoute.js";
const uri = process.env.MONGO_URI;
const dbName = process.env.DB_NAME;
const port = process.env.PORT;
export const mongoDB = await connectMongo(uri, dbName);

export const supabase = await connectToSupabase(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

const app = express();
app.use(express.json());

app.use("/api/auth/register", register);
app.use("/api/messages/encrypt", encrypted);
app.use("/api/messages/decrypt", decrypt);
app.use("/api/users/me", profile);

app.listen(port, () => {
  console.log("Server running on http://localhost:8004");
});
