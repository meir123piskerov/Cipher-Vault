import { MongoClient } from "mongodb";
import "dotenv/config";

let db;
export async function connectMongo(uri, dbName) {
  const client = new MongoClient(uri);
  await client.connect();
  const db = client.db(dbName);
  return db;
}
