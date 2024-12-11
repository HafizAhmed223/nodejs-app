import { MongoClient } from "mongodb";

const password = encodeURIComponent(process.env.MONGO_PASSWORD || "9hmedw9seem"); // Use environment variable or fallback value
const connectionString = `mongodb+srv://hafizahmedwaseem:${password}@devcluster.2zzgx.mongodb.net/?retryWrites=true&w=majority`; // Cluster URL
const client = new MongoClient(connectionString);

let db;

const connectDB = async () => {
  if (db) return db; // If db is already connected, reuse the connection

  try {
    const conn = await client.connect();
    console.log("MongoDB connected successfully");
    db = conn.db("integration_ninjas"); // Access the specific database
    return db;
  } catch (e) {
    console.error("Error connecting to MongoDB:", e);
    throw new Error("MongoDB connection failed");
  }
};

export default connectDB;
