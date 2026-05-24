import { MongoClient } from "mongodb";

const url = process.env.MONGODB_URL;
if (!url) {
  throw new Error('Missing environment variable: "MONGODB_URL"');
}

const globalMongo = globalThis as any;

export const clientPromise: Promise<MongoClient> =
  process.env.NODE_ENV === "development"
    ? (globalMongo._mongoClientPromise ??= new MongoClient(url).connect())
    : new MongoClient(url).connect();

export default clientPromise;
