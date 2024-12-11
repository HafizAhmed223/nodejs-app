import { MongoClient } from "mongodb";
// const password = encodeURIComponent(process.env.MONGO_PASSWORD.trim());
const password = encodeURIComponent("9hmedw9seem");
const connectionString = `mongodb+srv://hafizahmedwaseem:${password}@devcluster.2zzgx.mongodb.net/?retryWrites=true&w=majority`; // clustore url
const client = new MongoClient(connectionString);
let conn;
try {
  conn = await client.connect();
  console.log("connection successful");
} catch (e) {
  console.error(e);
}
let db = conn.db("integration_ninjas");
export default db;
