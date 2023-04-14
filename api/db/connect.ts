import mongoose, { ConnectOptions } from "mongoose";

const connectDB = (url: string) => {
  return mongoose
    .connect(url, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    } as ConnectOptions)
    .then(() => console.log("Connected to MongoDb"))
    .catch((err) => console.log("Error connecting to MongoDB:", err.message));
};

module.exports = connectDB;
