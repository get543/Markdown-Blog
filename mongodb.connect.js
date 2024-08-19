/* eslint-disable no-undef */
const mongoose = require("mongoose");

module.exports = async function connectToMongo() {
  const mongoUri =
    process.env.SESSION_STATS === "dev" ? process.env.MONGO_DEV_URI : process.env.MONGO_PROD_URI;

  try {
    await mongoose.connect(mongoUri);
    console.log("Database connection status:", mongoose.connection.readyState);
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};
