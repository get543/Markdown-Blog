/* eslint-disable no-undef */
const mongoose = require("mongoose");

module.exports = async function connectToMongo() {
  let timeout = 25;
  while (mongoose.connection.readyState === 0) {
    if (timeout === 0) {
      console.log("timeout");
      throw new Error("timeout occured with mongoose connection");
    }

    if (process.env.SESSION_STATS === "dev") {
      await mongoose.connect(process.env.MONGO_DEV_URI);
    } else if (process.env.SESSION_STATS === "prod") {
      await mongoose.connect(process.env.MONGO_PROD_URI);
    }

    timeout--;
  }
  console.log("Database connection status:", mongoose.connection.readyState);
};
