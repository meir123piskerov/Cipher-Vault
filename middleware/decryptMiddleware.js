import { mongoDB } from "../app.js";

export default async function decryptMiddleWare(req, res, next) {
  const username = req.headers.username;
  const password = req.headers.password;
  const result = await mongoDB.collection("users").find().toArray();
  for (let i = 0; i < result.length; i++) {
    if (result[i].username === username && result[i].password === password) {
      return next();
    }
  }
  res.status(404).json({ error: "user or password incorrect" });
}
