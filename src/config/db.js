import mongoose from "mongoose";
import { configDBLocal } from "../../config.js";
import { configDb } from "../../config-mongodb-atlas.js";

const dbUsername = configDb.dbUsername;
const dbPassword = configDb.dbPassword;
const dbName = configDb.dbName;

// mongo atlas
// const connectionString = `mongodb+srv://${dbUsername}:${dbPassword}@clusteralpha.tbqc45e.mongodb.net/${dbName}?retryWrites=true&w=majority`;

// mongodb local
const connectionString = configDBLocal;

const options = {
  autoIndex: false,
  maxPoolSize: 10,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 60000,
  family: 4,
};

export const db = mongoose
  .connect(connectionString, options)
  .then((res) => {
    if (res) {
      console.log(`Database connection successfully to ${dbName}`);
    }
  })
  .catch((err) => {
    console.log(`[Database connection error] => ${err}`);
  });
